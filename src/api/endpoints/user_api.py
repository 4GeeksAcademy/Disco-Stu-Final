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
def get_token():
    try:
        email = request.json.get('email')
        password = request.json.get('password')

        login_user = User.query.filter_by(email=email).one()
        password_db = login_user.password
        true_o_false = check_password_hash(password_db, password)

        if true_o_false:
            # Lógica para crear y enviar el token
            user_id = login_user.id
            access_token = create_access_token(identity=user_id)
            return {'access_token': access_token}, 200

        else:
            return {"Error": "Contraseña incorrecta"}, 401

    except Exception as e:
        return {"Error": "El email proporcionado no corresponde a ninguno registrado: " + str(e)}, 500

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
