from .models import Lugar  
from . import db  

def buscar_lugares(termino):
    """Busca lugares"""
    return Lugar.query.filter(
        (Lugar.nombre.contains(termino)) | 
        (Lugar.descripcion.contains(termino)) |
        (Lugar.categoria.contains(termino))
    ).all()

def obtener_favoritos(user_id):
    """Obtiene los lugares favoritos de un usuario"""
    return Lugar.query.join(Lugar).filter(Lugar.user_id == user_id).all()