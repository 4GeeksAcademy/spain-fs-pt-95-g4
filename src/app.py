"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, send_from_directory, jsonify
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands

def create_app():
    # Configuración inicial
    ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
    static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
    
    # Crear aplicación Flask
    app = Flask(__name__)
    app.url_map.strict_slashes = False

    # Configuración de la base de datos
    db_url = os.getenv("DATABASE_URL")
    if db_url is not None:
        app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
    else:
        app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"
    
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Inicializar extensiones
    db.init_app(app)
    Migrate(app, db, compare_type=True)

    # Configurar admin y comandos
    setup_admin(app)
    setup_commands(app)

    # Registrar blueprints
    app.register_blueprint(api, url_prefix='/api')

    # Manejadores de errores
    @app.errorhandler(APIException)
    def handle_invalid_usage(error):
        return jsonify(error.to_dict()), error.status_code

    # Rutas principales
    @app.route('/')
    def sitemap():
        if ENV == "development":
            return generate_sitemap(app)
        return send_from_directory(static_file_dir, 'index.html')

    @app.route('/<path:path>', methods=['GET'])
    def serve_any_other_file(path):
        if not os.path.isfile(os.path.join(static_file_dir, path)):
            path = 'index.html'
        response = send_from_directory(static_file_dir, path)
        response.cache_control.max_age = 0  # evitar caché
        return response

    return app

app = create_app()

if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
