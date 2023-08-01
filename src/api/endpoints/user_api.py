"""
This module takes care of starting the API Server for users, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash

user_api = Blueprint('user_api', __name__)


@user_api.route('/hello_user/<string:user_name>', methods=['GET'])
def crear_usuario(user_name):
    return {"message": "hello " + user_name}, 200


@user_api.route('/register', methods=['POST'])
def create_user():

    # Datos quemados para nombre y is_admin
    nombre_real_quemado = "Nombre Quemado"
    is_admin_quemado = False

    username = request.json.get("username")
    mail = request.json.get("mail")
    password = request.json.get("password")

    # Si el campo "name" está presente en la solicitud y no está vacío, usar ese valor como nombre real
    nombre_real_manual = request.json.get("name")
    if nombre_real_manual and nombre_real_manual.strip():
        nombre_real = nombre_real_manual
    else:
        # Si no se proporciona un nombre, generar un nombre quemado no repetido
        last_quemado = User.query.filter(User.nombre_real.like(
            f"{nombre_real_quemado} %")).order_by(User.id.desc()).first()
        if last_quemado:
            last_number = int(last_quemado.nombre_real.split()[-1])
            new_number = last_number + 1
        else:
            new_number = 1
        nombre_real = f"{nombre_real_quemado} {new_number}"

    is_admin = request.json.get("is_admin", is_admin_quemado)

    if not mail or not password:
        return jsonify({"error": "Email and Password are required"}), 400

    existing_user = User.query.filter_by(mail=mail).first()
    if existing_user:
        return jsonify({"error": "Email already exists."}), 400

    password_hash = generate_password_hash(password)
    new_user = User(username=username, nombre_real=nombre_real,
                    mail=mail, password=password_hash, is_admin=is_admin)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully.", "nombre_real": nombre_real}), 200

@user_api.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        username_or_mail = data.get('username_or_mail')  # Aquí usa el nombre correcto del campo
        password = data.get('password')

        print(username_or_mail)

        if not username_or_mail or not password:
            return jsonify({"error": "Nombre de usuario o correo electrónico y contraseña son requeridos"}), 400

        user = User.query.filter(
            (User.username == username_or_mail) | (User.mail == username_or_mail)
        ).first()

        if not user:
            return jsonify({"error": "Usuario no encontrado"}), 404

        if not check_password_hash(user.password, password):
            return jsonify({"error": "Contraseña incorrecta"}), 401

        access_token = create_access_token(identity=user.id)
        response_data = {'access_token': access_token, 'user_id': user.id}
        return jsonify(response_data), 200

    except Exception as e:
        return jsonify({"Error": "Ocurrió un error durante el proceso de inicio de sesión: " + str(e)}), 500


@user_api.route('/userslist', methods=['GET'])
def get_users():

    users = User.query.all()

    users_data = []
    for user in users:
        user_data = {
            "id": user.id,
            "username": user.username,
            "nombre_real": user.nombre_real,
            "mail": user.mail,
            "is_admin": user.is_admin
        }
        users_data.append(user_data)

    return jsonify(users_data), 200

@user_api.route('/delete_all', methods=['GET'])
def delete_all():
    User.query.delete()
    db.session.commit()

    return jsonify({"message": "All users deleted"})
