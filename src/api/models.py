from src.api.extensions import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

class Lugar(db.Model):
    __tablename__ = 'lugar'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    descripcion = db.Column(db.Text, nullable=False)
    ubicacion = db.Column(db.String(200), nullable=False)
    categoria = db.Column(db.String(50), nullable=False)
    imagen = db.Column(db.String(200))  
    favoritos = db.relationship('LugarFavorito', backref='lugar', lazy=True)
    comentarios = db.relationship('Comentario', backref='lugar', lazy=True)

class LugarFavorito(db.Model):
    __tablename__ = 'lugarfavorito'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    lugar_id = db.Column(db.Integer, db.ForeignKey('lugar.id'), nullable=False)

class Comentario(db.Model):
    __tablename__ = 'comentario'
    id = db.Column(db.Integer, primary_key=True)
    contenido = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    lugar_id = db.Column(db.Integer, db.ForeignKey('lugar.id'), nullable=False)