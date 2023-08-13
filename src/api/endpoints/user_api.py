"""
This module takes care of starting the API Server for users, Loading the DB and Adding the endpoints
"""
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, create_refresh_token, get_jwt_identity, unset_access_cookies
from flask import Flask, request, jsonify, url_for, Blueprint
from datetime import timedelta, datetime, timezone
from api.models import db, User
from werkzeug.security import generate_password_hash, check_password_hash
import json
from api.endpoints.decorators import admin_required, regular_user_required
from sqlalchemy.exc import SQLAlchemyError

user_api = Blueprint('user_api', __name__)

jwt_manager = JWTManager()


@user_api.route('/signup', methods=['POST'])
def signup():

    admin_default = False
    username = request.json.get("username")
    email = request.json.get("email")
    password = request.json.get("password")

    if not email or not password:
        return jsonify({"error": "Correo y contraseña son requeridos"}), 400

    existing_user = User.query.filter_by(correo=email).first()
    if existing_user:
        return jsonify({"error": "El correo ya existe"}), 400

    password_hash = generate_password_hash(password)
    new_user = User(usuario=username,
                    correo=email, contrasenha=password_hash, is_admin=admin_default)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"mensaje": "Usuario creado exitosamente."}), 201


@user_api.route('/login', methods=['GET', 'POST'])
def create_token():
    try:
        data = request.get_json()

        username_or_email = data.get('username_or_email')
        password = data.get('password')

        if not username_or_email or not password:
            return jsonify({"error": "Nombre de usuario o correo electrónico y contraseña son requeridos"}), 400

        user = User.query.filter(
            (User.usuario == username_or_email) | (
                User.correo == username_or_email)
        ).first()

        if not user or not check_password_hash(user.contrasenha, password):
            return jsonify({"error": "Usuario o contraseña incorrecta"}), 404

        access_token = create_access_token(identity=user.id)

        return jsonify({
            'access_token': access_token,
            'user_id': user.id,
            'is_admin': user.is_admin,
            'email': user.correo
        }), 200

    except Exception:
        return jsonify({"Error": "Ocurrió un error durante el proceso de inicio de sesión. Por favor, verifica tus credenciales e inténtalo de nuevo."}), 500


@user_api.route('/update-password', methods=['POST'])
@jwt_required()
def change_password():
    try:
        data = request.get_json()

        old_password = data.get('old_password')
        new_password = data.get('new_password')

        if not old_password or not new_password:
            return jsonify({"error": "Contraseña actual y nueva contraseña son requeridas"}), 400

        user_id = get_jwt_identity()
        user = User.query.get(user_id)

        if not user or not check_password_hash(user.contrasenha, old_password):
            return jsonify({"error": "Contraseña actual incorrecta"}), 401

        new_password_hash = generate_password_hash(new_password)
        user.contrasenha = new_password_hash
        db.session.commit()

        return jsonify({"mensaje": "Contraseña cambiada exitosamente."}), 200

    except Exception:
        return jsonify({"Error": "Ocurrió un error durante el proceso de cambio de contraseña. Por favor, inténtalo de nuevo."}), 500


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
@jwt_required()
def logout():
    response = jsonify({"msg": "Sesión cerrada con exito"})
    unset_access_cookies(response)
    return response


@user_api.route('/profile/<int:user_id>', methods=['GET'])
@jwt_required()
@regular_user_required
def user_profile(user_id):
    try:
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

    except Exception as e:
        return jsonify({"error": "Error al obtener información del usuario"}), 500


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
@jwt_required()
@regular_user_required
def edit_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "Usuario no encontrado"}), 404

    try:
        data = request.get_json()
        user.nombre = data.get('name', user.nombre)
        user.correo = data.get('email', user.correo)
        user.is_admin = data.get('is_admin', user.is_admin)
        # user.contrasenha = data.get('password', user.contrasenha)
        user.direccion_comprador = data.get(
            'address', user.direccion_comprador)
        user.ciudad_comprador = data.get('city', user.direccion_comprador)
        user.estado_comprador = data.get('state', user.direccion_comprador)
        user.codigo_postal_comprador = data.get(
            'postal_code', user.direccion_comprador)
        user.pais_comprador = data.get('country', user.direccion_comprador)
        user.telefono_comprador = data.get(
            'telephone', user.direccion_comprador)
        # user.valoracion = data.get('country', user.valoracion)
        # user. cantidad_de_valoraciones = data.get(
        #     'telephone', user.cantidad_de_valoraciones)

        db.session.commit()
        return jsonify({"message": "Usuario editado exitosamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error al editar el usuario", "error": str(e)}), 500


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
                'username': user.usuario,
                'name': user.nombre,
                'email': user.correo,
                'cliente_ID_paypal': user.cliente_ID_paypal,
                'secret_key_paypal': user.secret_key_paypal,
                'is_admin': user.is_admin
            }
            user_list.append(user_data)

        return jsonify(user_list), 200

    except Exception as e:
        return jsonify({"error": "A ocurrido un error al intentar obtener usuarios: " + str(e)}), 500


# @user_api.route('/delete_all', methods=['GET'])
# def delete_all():
#     User.query.delete()
#     db.session.commit()

#     return jsonify({"message": "Todos los usuarios han sido eliminados"})

# Desde aca Karai

@user_api.route('/seller/<int:user_id>', methods=['PUT'])
@jwt_required()
@regular_user_required
def update_sell_data(user_id):

    cliente_ID_paypal = request.json.get('cliente_ID_paypal')
    secret_key_paypal = request.json.get('secret_key_paypal')
    update_or_delete = request.json.get('update_or_delete')
    
    user = User.query.get(user_id)
    
    if user:
        if update_or_delete == 'update': 
            
            user.cliente_ID_paypal = cliente_ID_paypal
            user.secret_key_paypal = secret_key_paypal
            
            db.session.commit()
            
        if update_or_delete == 'delete':
            user.cliente_ID_paypal = None
            user.secret_key_paypal = None

            db.session.commit()
        
        return jsonify({"message": "Información actualizada correctamente."}), 200
    else:
        return jsonify({"message": "Usuario no encontrado."}), 404

@user_api.route('/became_seller/<int:user_id>', methods=['PUT'])
# @jwt_required()
# @regular_user_required
def became_user(user_id):

    user = User.query.get(user_id)
    user.isSeller = True
    db.session.commit()

    return jsonify('COMPLETED')
