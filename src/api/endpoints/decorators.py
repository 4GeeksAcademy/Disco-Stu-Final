
from functools import wraps
from flask_jwt_extended import get_jwt_identity
from api.models import User
from flask import jsonify


def admin_required(fn):
    @wraps(fn)
    def decorated_function(*args, **kwargs):
        correo_usuario_actual = get_jwt_identity()
        usuario_actual = User.query.filter_by(
            correo=correo_usuario_actual).first()

        if not usuario_actual or not usuario_actual.is_admin:
            return jsonify({"error": "Acceso no autorizado para esta ruta"}), 403

        return fn(*args, **kwargs)

    return decorated_function


def regular_user_required(fn):
    @wraps(fn)
    def decorated_function(*args, **kwargs):
        correo_usuario_actual = get_jwt_identity()
        usuario_actual = User.query.filter_by(
            correo=correo_usuario_actual).first()

        if not usuario_actual:
            return jsonify({"error": "Acceso no autorizado para esta ruta"}), 403

        return fn(*args, **kwargs)

    return decorated_function
