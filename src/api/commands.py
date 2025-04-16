from src.api.extensions import db

def setup_commands(app):
    @app.cli.command("init-db")
    def init_db():
        db.create_all()
        print("Base de datos inicializada")
    