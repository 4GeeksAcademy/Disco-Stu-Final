"""
This module takes care of starting the API Server for users, Loading the DB and Adding the endpoints
"""
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, create_refresh_token, get_jwt_identity, unset_access_cookies
from flask import Flask, request, jsonify, url_for, Blueprint
from datetime import timedelta, datetime, timezone
from api.models import db, User
from werkzeug.security import generate_password_hash, check_password_hash
import json
from api.endpoints.decorators import admin_required, regular_user_required

user_api = Blueprint('user_api', __name__)

jwt_manager = JWTManager()


@user_api.route('/signup', methods=['POST'])
def signup():

    admin_default = False
    usuario = request.json.get("usuario")
    correo = request.json.get("correo")
    contrasenha = request.json.get("contrasenha")

    if not correo or not contrasenha:
        return jsonify({"error": "Correo y contraseña son requeridos"}), 400

    existing_user = User.query.filter_by(correo=correo).first()
    if existing_user:
        return jsonify({"error": "El correo ya existe"}), 400

    password_hash = generate_password_hash(contrasenha)
    new_user = User(usuario=usuario,
                    correo=correo, contrasenha=password_hash, is_admin=admin_default)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully."}), 201


@user_api.route('/login', methods=['POST'])
def create_token():
    try:
        data = request.get_json()

        usuario_o_correo = data.get('usuario_o_correo')
        contrasenha = data.get('contrasenha')

        if not usuario_o_correo or not contrasenha:
            return jsonify({"error": "Nombre de usuario o correo electrónico y contraseña son requeridos"}), 400

        user = User.query.filter(
            (User.usuario == usuario_o_correo) | (
                User.contrasenha == usuario_o_correo)
        ).first()

        if not user:
            return jsonify({"error": "Usuario o contraseña incorrecta"}), 404

        if not check_password_hash(user.contrasenha, contrasenha):
            return jsonify({"error": "Contraseña incorrecta"}), 401

        access_token = create_access_token(identity=user.correo)

        return jsonify({
            'access_token': access_token,
            'user_id': user.id,
            'is_admin': user.is_admin
        }), 200

    except Exception:
        return jsonify({"Error": "Ocurrió un error durante el proceso de inicio de sesión. Por favor, verifica tus credenciales e inténtalo de nuevo."}), 500


@user_api.after_request
def refresh_expiring_jwts(response):
    try:
        # Asegurar que el access token está presente en la respuesta
        access_token = create_access_token(identity=get_jwt_identity())
        data = response.get_json()
        if type(data) is dict:
            data["access_token"] = access_token
            response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        return response


@user_api.route('/refresh', methods=['POST'])
@jwt_required()
def refresh_token():
    current_user = get_jwt_identity()
    access_token = create_access_token(identity=current_user)
    return jsonify({'access_token': access_token}), 200


@user_api.route('/logout', methods=["POST"])
def logout():
    response = jsonify({"msg": "Sesión cerrada con exito"})
    unset_access_cookies(response)
    return response


@user_api.route('/profile/<int:user_id>')
@jwt_required()
@regular_user_required
def user_profile(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    response_body = {
        "id": user.id,
        "nombre": user.nombre,
        "usuario": user.usuario,
        "correo": user.correo,
        "is_admin": user.is_admin,
        "direccion_comprador": user.direccion_comprador,
        "ciudad_comprador": user.ciudad_comprador,
        "estado_comprador":  user.estado_comprador,
        "codigo_postal_comprador": user.codigo_postal_comprador,
        "pais_comprador": user.pais_comprador,
        "telefono_comprador": user.telefono_comprador,
        "valoracion": user.valoracion,
        "cantidad_de_valoraciones": user.cantidad_de_valoraciones

    }
    return jsonify(response_body), 200


@user_api.route('/all_users', methods=['GET'])
def get_users():
    try:
        users = User.query.all()
        if not users:
            return jsonify({"message": "Usuarios no encontrados."}), 404

        user_list = []
        for user in users:
            user_data = {
                'id': user.id,
                'username': user.username,
                'nombre_real': user.nombre_real,
                'mail': user.mail,
                'is_admin': user.is_admin
            }
            user_list.append(user_data)

        return jsonify(user_list), 200

    except Exception as e:
        return jsonify({"error": "A ocurrido un error al intentar obtener usuarios: " + str(e)}), 500


@user_api.route('/delete_user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "Usuario no encontrado"}), 404

    try:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "Usuario eliminado exitosamente"}), 200
    except:
        db.session.rollback()
        return jsonify({"message": "Error al eliminar el usuario"}), 500


@user_api.route('/edit_user/<int:user_id>', methods=['PUT'])
def edit_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "Usuario no encontrado"}), 404

    try:
        data = request.get_json()
        user.username = data.get('username', user.username)
        user.nombre_real = data.get('nombre_real', user.nombre_real)
        user.mail = data.get('mail', user.mail)
        user.is_admin = data.get('is_admin', user.is_admin)
        db.session.commit()
        return jsonify({"message": "Usuario editado exitosamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error al editar el usuario", "error": str(e)}), 500
