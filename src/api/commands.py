import click
from .models import Lugar  # Importación relativa
from . import app, db

@app.cli.command("init_db")
def init_db():
    """Inicializa la base de datos"""
    db.create_all()
    click.echo('Base de datos inicializada')
    

@app.cli.command("add_sample_data")
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
    click.echo('Datos de ejemplo añadidos')