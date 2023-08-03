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


@user_api.route('/hello_user/<string:user_name>', methods=['GET'])
def crear_usuario(user_name):
    return {"message": "hello " + user_name}, 200


@user_api.route('/signup', methods=['POST'])
def signup():

    # Datos quemados para nombre y is_admin
    nombre_usuario = "En espera a editar"
    admin_default = False

    username = request.json.get("username")
    mail = request.json.get("mail")
    password = request.json.get("password")

    # Si el campo "name" está presente en la solicitud y no está vacío, usar ese valor como nombre real
    nombre_real_manual = request.json.get("name")
    if nombre_real_manual and nombre_real_manual.strip():
        nombre_real = nombre_real_manual
    else:
        # Si no se proporciona un nombre, generar un En espera a editar no repetido
        last_quemado = User.query.filter(User.nombre_real.like(
            f"{nombre_usuario} %")).order_by(User.id.desc()).first()
        if last_quemado:
            last_number = int(last_quemado.nombre_real.split()[-1])
            new_number = last_number + 1
        else:
            new_number = 1
        nombre_real = f"{nombre_usuario} {new_number}"

    is_admin = request.json.get("is_admin", admin_default)

    if not mail or not password:
        return jsonify({"error": "Correo y contraseña son requeridos"}), 400

    existing_user = User.query.filter_by(mail=mail).first()
    if existing_user:
        return jsonify({"error": "El correo ya existe"}), 400

    password_hash = generate_password_hash(password)
    new_user = User(username=username, nombre_real=nombre_real,
                    mail=mail, password=password_hash, is_admin=is_admin)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully."}), 201


@user_api.route('/login', methods=['POST'])
def create_token():
    try:
        data = request.get_json()

        username_or_mail = data.get('username_or_mail')
        password = data.get('password')

        if not username_or_mail or not password:
            return jsonify({"error": "Nombre de usuario o correo electrónico y contraseña son requeridos"}), 400

        user = User.query.filter(
            (User.username == username_or_mail) | (
                User.mail == username_or_mail)
        ).first()

        if not user:
            return jsonify({"error": "Usuario o contraseña incorrecta"}), 404

        if not check_password_hash(user.password, password):
            return jsonify({"error": "Contraseña incorrecta"}), 401

        access_token = create_access_token(identity=user.mail)

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
        "name": user.nombre_real,
        "email": user.mail,
        'is_admin': user.is_admin
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
