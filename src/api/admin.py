from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from . import app, db  
from .models import User, Lugar, Comentario 

def setup_admin(app):
        admin = Admin(app, name='HiddenWorlds Admin', template_mode='bootstrap3')

admin = Admin(app, name='Admin Panel', template_mode='bootstrap3')

admin.add_view(ModelView(User, db.session))
admin.add_view(ModelView(Lugar, db.session))
admin.add_view(ModelView(Comentario, db.session))