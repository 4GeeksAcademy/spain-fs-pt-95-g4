from flask import Flask
from datetime import timedelta
from src.api.extensions import db, migrate
from src.api.routes import routes
from src.api.commands import setup_commands

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///hiddenworlds.db'
    app.config['SECRET_KEY'] = 'tu-clave-secreta'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(hours=1)

    db.init_app(app)
    migrate.init_app(app, db)
    setup_commands(app)

    app.register_blueprint(routes)

    return app