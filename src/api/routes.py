from flask import render_template, url_for, flash, redirect, request
from . import app, db 
from .models import User, Lugar, LugarFavorito, Comentario  
from flask_login import login_user, current_user, logout_user, login_required

@app.route("/")
def home():
    lugares = Lugar.query.all()
    return render_template('home.html', lugares=lugares)

@app.route("/registro", methods=['GET', 'POST'])
def registro():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        
        user = User(username=username, email=email, password=password)
        db.session.add(user)
        db.session.commit()
        
        flash('Cuenta creada!', 'success')
        return redirect(url_for('login'))
    
    return render_template('registro.html')

@app.route("/login", methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        user = User.query.filter_by(username=username).first()
        
        if user and user.password == password:
            login_user(user)
            return redirect(url_for('home'))
        else:
            flash('Credenciales incorrectas', 'danger')
    
    return render_template('login.html')

@app.route("/logout")
def logout():
    logout_user()
    return redirect(url_for('home'))

@app.route("/lugar/<int:lugar_id>")
def lugar(lugar_id):
    lugar = Lugar.query.get_or_404(lugar_id)
    comentarios = Comentario.query.filter_by(lugar_id=lugar_id).all()
    return render_template('lugar.html', lugar=lugar, comentarios=comentarios)

@app.route("/favorito/<int:lugar_id>", methods=['POST'])
@login_required
def favorito(lugar_id):
    favorito = LugarFavorito(user_id=current_user.id, lugar_id=lugar_id)
    db.session.add(favorito)
    db.session.commit()
    flash('Añadido a favoritos', 'success')
    return redirect(url_for('lugar', lugar_id=lugar_id))

@app.route("/comentar/<int:lugar_id>", methods=['POST'])
@login_required
def comentar(lugar_id):
    contenido = request.form['comentario']
    comentario = Comentario(contenido=contenido, user_id=current_user.id, lugar_id=lugar_id)
    db.session.add(comentario)
    db.session.commit()
    flash('Comentario publicado', 'success')
    return redirect(url_for('lugar', lugar_id=lugar_id))
