from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager

app = Flask(__name__)
app.config['SECRET_KEY'] = 'Mi_Idolo_Messi_Goat'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///lugares.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'

from .models import User, Lugar, LugarFavorito, Comentario
from .routes import *
from .admin import *
from .commands import *