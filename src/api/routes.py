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

        
        url = urllib.parse.unquote(
            f"{request.host_url.rstrip('/')}{rule.rule}")
        methods = ', '.join(rule.methods - {'HEAD', 'OPTIONS'})
        links.append({"endpoint": rule.endpoint,
                     "url": url, "methods": methods})

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
    if 'user_id' in session:
        return jsonify({"message": "Ya estás autenticado."}), 400

    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({"error": "Faltan datos obligatorios."}), 400

    user = User(username=username, email=email)
    user.set_password(password)  # Cifra la contraseña
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "Cuenta creada con éxito."}), 201


@routes.route('/login', methods=['POST'])
def login():
    if 'user_id' in session:
        return jsonify({"message": "Ya estás autenticado."}), 400

    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if user and user.check_password(password):
        session['user_id'] = user.id
        session.permanent = True
        return jsonify({"message": "Inicio de sesión exitoso."}), 200
    else:
        return jsonify({"error": "Credenciales incorrectas."}), 401


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


@routes.route('/favorito/<int:lugar_id>', methods=['POST'])
def favorito(lugar_id):
    if 'user_id' not in session:
        return jsonify({"message": "No autorizado"}), 401

    user_id = session['user_id']
    favorito = LugarFavorito(user_id=user_id, lugar_id=lugar_id)
    db.session.add(favorito)
    db.session.commit()
    return jsonify({"message": "Añadido a favoritos."}), 201


@routes.route('/comentar/<int:lugar_id>', methods=['POST'])
def comentar(lugar_id):
    if 'user_id' not in session:
        return jsonify({"message": "No autorizado"}), 401

    data = request.get_json()
    contenido = data.get('comentario')

    if not contenido:
        return jsonify({"error": "El comentario no puede estar vacío."}), 400

    user_id = session['user_id']
    comentario = Comentario(contenido=contenido,
                            user_id=user_id, lugar_id=lugar_id)
    db.session.add(comentario)
    db.session.commit()
    return jsonify({"message": "Comentario publicado con éxito."}), 201


@routes.route('/sitemap')
def sitemap():
    import urllib
    links = []
    for rule in current_app.url_map.iter_rules():
        if rule.endpoint == 'static':
            continue

        url = urllib.parse.unquote(
            f"{request.host_url.rstrip('/')}{rule.rule}")
        methods = ', '.join(rule.methods - {'HEAD', 'OPTIONS'})
        links.append({"endpoint": rule.endpoint,
                     "url": url, "methods": methods})

    return jsonify({"endpoints": links})
