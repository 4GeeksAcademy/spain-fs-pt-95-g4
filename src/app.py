"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask
from src.api.extensions import db, migrate
from src.api.routes import api

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///hiddenworlds.db'
    app.config['SECRET_KEY'] = 'tu-clave-secreta'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    migrate.init_app(app, db)

    from src.api.admin import setup_admin
    from src.api.commands import setup_commands

    app.register_blueprint(api, url_prefix='/api')  # Registro del Blueprint con prefijo
    setup_admin(app)
    setup_commands(app)

    return app


if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=3001, debug=True)
    
