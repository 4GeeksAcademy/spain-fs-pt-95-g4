from datetime import datetime
from . import db  
from flask_login import UserMixin

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    lugares_favoritos = db.relationship('LugarFavorito', backref='usuario', lazy=True)
    comentarios = db.relationship('Comentario', backref='autor', lazy=True)

class Lugar(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    descripcion = db.Column(db.Text, nullable=False)
    ubicacion = db.Column(db.String(200), nullable=False)
    categoria = db.Column(db.String(50), nullable=False)
    favoritos = db.relationship('LugarFavorito', backref='lugar', lazy=True)
    comentarios = db.relationship('Comentario', backref='lugar', lazy=True)

class LugarFavorito(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    lugar_id = db.Column(db.Integer, db.ForeignKey('lugar.id'), nullable=False)

class Comentario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    contenido = db.Column(db.Text, nullable=False)
    fecha = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    lugar_id = db.Column(db.Integer, db.ForeignKey('lugar.id'), nullable=False)