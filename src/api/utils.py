from flask import jsonify, url_for, current_app
from .models import db  

class APIException(Exception):
    def __init__(self, message, status_code=400):
        self.message = message
        self.status_code = status_code
        super().__init__(message)

    def to_dict(self):
        return {
            'message': self.message,
            'status_code': self.status_code
        }

def generate_sitemap(app=None):
   
    if app is None:
        app = current_app
    
    routes = []
    for rule in app.url_map.iter_rules():
        if 'GET' in rule.methods and not rule.rule.startswith(('/static', '/admin')):
            routes.append({
                'endpoint': rule.endpoint,
                'path': rule.rule,
                'methods': list(rule.methods)
            })
    
    return jsonify({
        'success': True,
        'routes': routes,
        'total_routes': len(routes)
    })

def get_all_endpoints():
    app = current_app
    return [str(rule) for rule in app.url_map.iter_rules()]