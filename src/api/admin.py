from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from src.api.extensions import db
from .models import User, Lugar

def setup_admin(app):
    admin = Admin(app, name='Admin Panel')
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Lugar, db.session))