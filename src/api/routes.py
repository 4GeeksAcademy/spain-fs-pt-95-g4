from flask import Blueprint, jsonify, request, session, current_app
from src.api.extensions import db
from .models import User, Lugar, LugarFavorito, Comentario

routes = Blueprint('routes', __name__)

@routes.route('/')
def home():
    import urllib
    links = []
    for rule in current_app.url_map.iter_rules():
        if rule.endpoint == 'static':
            continue
        url = urllib.parse.unquote(f"{request.host_url.rstrip('/')}{rule.rule}")
        methods = ', '.join(rule.methods - {'HEAD', 'OPTIONS'})
        links.append({"endpoint": rule.endpoint, "url": url, "methods": methods})
    return jsonify({"endpoints": links})


@routes.route('/home')
def home_page():
    lugares = Lugar.query.all()
    lugares_serializados = [
        {
            "id": lugar.id,
            "nombre": lugar.nombre,
            "descripcion": lugar.descripcion,
            "ubicacion": lugar.ubicacion,
            "categoria": lugar.categoria,
            "imagen": lugar.imagen
        }
        for lugar in lugares
    ]
    return jsonify(lugares_serializados)


@routes.route('/registro', methods=['POST'])
def registro():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No se enviaron datos."}), 400

        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        if not username or not email or not password:
            return jsonify({"error": "Faltan datos obligatorios."}), 400

        if User.query.filter_by(email=email).first():
            return jsonify({"error": "El correo ya está registrado."}), 400

        if User.query.filter_by(username=username).first():
            return jsonify({"error": "El nombre de usuario ya está en uso."}), 400

        user = User(username=username, email=email)
        user.set_password(password)  
        db.session.add(user)
        db.session.commit()

        return jsonify({"message": "Cuenta creada con éxito."}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"Error al registrar el usuario: {str(e)}"}), 500


@routes.route('/login', methods=['POST'])
def login():
    try:
    
        data = request.get_json()
        if not data:
            return jsonify({"error": "No se enviaron datos."}), 400

        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({"error": "Faltan datos obligatorios."}), 400

        user = User.query.filter_by(username=username).first()

        if user and user.check_password(password):
            
            session['user_id'] = user.id
            session.permanent = True
            return jsonify({"message": "Inicio de sesión exitoso."}), 200
        else:
            return jsonify({"error": "Credenciales incorrectas."}), 401
    except Exception as e:
        
        return jsonify({"error": f"Error al iniciar sesión: {str(e)}"}), 500
    
@routes.route('/perfil', methods=['GET'])
def perfil():
    if 'user_id' not in session:
        return jsonify({"error": "No autorizado"}), 401

    user_id = session['user_id']
    user = User.query.get_or_404(user_id)

    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email
    }), 200

@routes.route('/perfil', methods=['PUT'])
def editar_perfil():
    if 'user_id' not in session:
        return jsonify({"error": "No autorizado"}), 401

    user_id = session['user_id']
    user = User.query.get_or_404(user_id)

    data = request.get_json()
    username = data.get('username')
    email = data.get('email')

    if username:
        user.username = username
    if email:
        user.email = email

    db.session.commit()
    return jsonify({"message": "Perfil actualizado con éxito."}), 200


@routes.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({"message": "Sesión cerrada con éxito."})


@routes.route('/lugar/<int:lugar_id>')
def lugar(lugar_id):
    lugar = Lugar.query.get_or_404(lugar_id)
    comentarios = Comentario.query.filter_by(lugar_id=lugar_id).all()
    comentarios_serializados = [
        {
            "id": comentario.id,
            "contenido": comentario.contenido,
            "user_id": comentario.user_id,
            "username": comentario.user.username,  
            "lugar_id": comentario.lugar_id
        }
        for comentario in comentarios
    ]
    lugar_serializado = {
        "id": lugar.id,
        "nombre": lugar.nombre,
        "descripcion": lugar.descripcion,
        "ubicacion": lugar.ubicacion,
        "categoria": lugar.categoria,
        "comentarios": comentarios_serializados
    }
    return jsonify(lugar_serializado)


@routes.route('/lugares/<string:categoria>')
def lugares_por_categoria(categoria):
    lugares = Lugar.query.filter_by(categoria=categoria).all()
    if not lugares:
        return jsonify({"error": f"No se encontraron lugares en la categoría '{categoria}'"}), 404

    lugares_serializados = [
        {
            "id": lugar.id,
            "nombre": lugar.nombre,
            "descripcion": lugar.descripcion,
            "ubicacion": lugar.ubicacion,
            "categoria": lugar.categoria,
            "imagen": lugar.imagen
        }
        for lugar in lugares
    ]
    return jsonify(lugares_serializados)


@routes.route('/favorito/<int:lugar_id>', methods=['POST'])
def favorito(lugar_id):
    if 'user_id' not in session:
        return jsonify({"message": "No autorizado"}), 401

    user_id = session['user_id']
    if LugarFavorito.query.filter_by(user_id=user_id, lugar_id=lugar_id).first():
        return jsonify({"message": "El lugar ya está en favoritos."}), 400

    try:
        favorito = LugarFavorito(user_id=user_id, lugar_id=lugar_id)
        db.session.add(favorito)
        db.session.commit()
        return jsonify({"message": "Añadido a favoritos."}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error al añadir a favoritos."}), 500


@routes.route('/comentar/<int:lugar_id>', methods=['POST'])
def comentar(lugar_id):
    if 'user_id' not in session:
        return jsonify({"message": "No autorizado"}), 401

    data = request.get_json()
    contenido = data.get('comentario')

    if not contenido:
        return jsonify({"error": "El comentario no puede estar vacío."}), 400

    try:
        user_id = session['user_id']
        user = User.query.get_or_404(user_id)  
        comentario = Comentario(contenido=contenido, user_id=user_id, lugar_id=lugar_id)
        db.session.add(comentario)
        db.session.commit()
        return jsonify({
            "message": "Comentario publicado con éxito.",
            "username": user.username  
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Error al publicar el comentario."}), 500


@routes.route('/sitemap')
def sitemap():
    import urllib
    links = []
    for rule in current_app.url_map.iter_rules():
        if rule.endpoint == 'static':
            continue
        url = urllib.parse.unquote(f"{request.host_url.rstrip('/')}{rule.rule}")
        methods = ', '.join(rule.methods - {'HEAD', 'OPTIONS'})
        links.append({"endpoint": rule.endpoint, "url": url, "methods": methods})
    return jsonify({"endpoints": links})