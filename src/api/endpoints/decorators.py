
from functools import wraps
from flask_jwt_extended import get_jwt_identity
from api.models import User
from flask import jsonify


def admin_required(fn):
    @wraps(fn)
    def decorated_function(*args, **kwargs):
        current_user_email = get_jwt_identity()
        current_user = User.query.filter_by(mail=current_user_email).first()

        if not current_user or not current_user.is_admin:
            return jsonify({"error": "Acceso no autorizado para esta ruta"}), 403

        return fn(*args, **kwargs)

    return decorated_function


def regular_user_required(fn):
    @wraps(fn)
    def decorated_function(*args, **kwargs):
        current_user_email = get_jwt_identity()
        current_user = User.query.filter_by(mail=current_user_email).first()

        if not current_user:
            return jsonify({"error": "Acceso no autorizado para esta ruta"}), 403

        return fn(*args, **kwargs)

    return decorated_function
