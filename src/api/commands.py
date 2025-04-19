from src.api.extensions import db
from src.api.models import User, Lugar

def setup_commands(app):
    @app.cli.command("init-db")
    def init_db():
        db.drop_all()
        db.create_all()
        print("Base de datos inicializada.")

    @app.cli.command("seed-db")
    def seed_db():
        user1 = User(username="Pochoclo", email="pochocloi@gmail.com")
        user1.set_password("password1")
        user2 = User(username="Letal", email="Letal@examplemail.com")
        user2.set_password("password2")

        db.session.add(user1)
        db.session.add(user2)

        lugares_muestra = [
            {
                "nombre": "Capilla de los huesos Osario de Sedlec, república checa",
                "descripcion": "Esta iglesia está decorada con 30.000 huesos de víctimas de la peste...",
                "ubicacion": "49.9614, 15.2886",
                "categoria": "histórico",
                "imagen": "/static/img/imagen1.jpg"
            },
            {
                "nombre": "Bosque de Hoia Baciu, Rumania-Transilvania",
                "descripcion": "Es un lugar conocido por su misterio y las numerosas leyendas que lo rodean...",
                "ubicacion": "46.7706, 23.5222",
                "categoria": "paranormal",
                "imagen": "/static/img/imagen2.jpg"
            },
            {
                "nombre": "La isla de Poveglia, en la laguna de Venecia",
                "descripcion": "Poveglia es una pequeña isla situada entre Venecia y Lido...",
                "ubicacion": "45.3819, 12.3308",
                "categoria": "histórico",
                "imagen": "/static/img/imagen3.jpg"
            },
            {
                "nombre": "Lago Natron, Gran Valle del Rift, Africa Oriental, Tanzania",
                "descripcion": "Presenta una peculiar costra de sal rojiza...",
                "ubicacion": "2.4167, 36.0167",
                "categoria": "naturaleza",
                "imagen": "/static/img/imagen4.jpg"
            },
            {
                "nombre": "Socotra (Yemen)",
                "descripcion": "Sus paisajes son tan extraños que se le llama el lugar más alienígena de la Tierra...",
                "ubicacion": "12.4634, 53.8230",
                "categoria": "naturaleza",
                "imagen": "/static/img/imagen5.jpg"
            },
            {
                "nombre": "Fly Geyser (Nevada, EE.UU.)",
                "descripcion": "El géiser Fly fue creado accidentalmente durante la perforación de pozos en 1917...",
                "ubicacion": "40.8593, -119.3313",
                "categoria": "naturaleza",
                "imagen": "/static/img/imagen6.jpg"
            },
            {
                "nombre": "Bosque de Aokigahara, Japón",
                "descripcion": "Ubicado al noroeste de la base del monte Fuji...",
                "ubicacion": "35.4714, 138.6081",
                "categoria": "paranormal",
                "imagen": "/static/img/imagen7.jpg"
            },
            {
                "nombre": "La Mansión Winchester (California, EE.UU.)",
                "descripcion": "Las almas de todas las personas que murieron por culpa del famoso rifle...",
                "ubicacion": "37.3184, -121.9511",
                "categoria": "histórico",
                "imagen": "/static/img/imagen8.jpg"
            },
            {
                "nombre": "El Misterio de las Piedras Deslizantes (EE.UU.)",
                "descripcion": "El misterio de las piedras deslizantes se da en Racetrack Playa...",
                "ubicacion": "36.6821, -117.5694",
                "categoria": "naturaleza",
                "imagen": "/static/img/imagen9.jpg"
            }
        ]

        for lugar_data in lugares_muestra:
            lugar = Lugar(
                nombre=lugar_data["nombre"],
                descripcion=lugar_data["descripcion"],
                ubicacion=lugar_data["ubicacion"],
                categoria=lugar_data["categoria"],
                imagen=lugar_data["imagen"]
            )
            db.session.add(lugar)

        db.session.commit()
        print("Datos de prueba agregados correctamente.")
    
    