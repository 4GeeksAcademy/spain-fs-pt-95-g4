import click
from flask.cli import with_appcontext
from .models import db, Lugar  

def setup_commands(app):
    """Registra los comandos personalizados con la aplicación Flask"""
    
    @app.cli.command("init-db")
    @with_appcontext
    def init_db():
        """Inicializa la base de datos"""
        db.create_all()
        click.echo('✅ Base de datos inicializada')

    @app.cli.command("add-sample-data")
    @with_appcontext
    def add_sample_data():
        """Añade datos de ejemplo"""
        lugar1 = Lugar(
            nombre="Bosque de los Espejos",
            descripcion="Un bosque donde los árboles tienen superficies reflectantes naturales.",
            ubicacion="Coordenadas: 45.6789, -12.3456",
            categoria="extravagante"
        )
        db.session.add(lugar1)
        db.session.commit()
        click.echo('✅ Datos de ejemplo añadidos')

    