"""
This module takes favoritee of starting the API Server for users, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Curiosidades_home
from api.utils import generate_sitemap, APIException

home_api = Blueprint('home_api', __name__)


@home_api.route('/', methods=['GET'])
def get_home():

    db_curiosidades = Curiosidades_home.query.all()
    curiosidades = []
    for curiosidad in db_curiosidades:
        curiosidades_dict = {
            # 'posicion': curiosidad.posicion,
            'titulo': curiosidad.titulo,
            'descripcion': curiosidad.descripcion,
            'url_imagen': curiosidad.url_imagen
        }
        curiosidades.append(curiosidades_dict)

    return jsonify(curiosidades), 200


@home_api.route('/edit', methods=['PUT'])
def edit_home():

    body = request.json

    posicion = body.get('posicion')
    titulo = body.get('titulo')
    descripcion = body.get('descripcion')
    url_imagen = body.get('url_imagen')

    curiosidad = Curiosidades_home.query.filter_by(posicion=posicion).first()

    curiosidad.titulo = titulo
    curiosidad.descripcion = descripcion
    curiosidad.url_imagen = url_imagen

    db.session.commit()

    response_body = {
        'posicion': curiosidad.posicion,
        'titulo': curiosidad.titulo,
        'descripcion': curiosidad.descripcion,
        'url_imagen': curiosidad.url_imagen
    }

    return jsonify('COMPLETED', response_body), 200


@home_api.route('/add', methods=['POST'])
def add_home():

    body = request.json

    posicion = body.get('posicion')
    titulo = body.get('titulo')
    descripcion = body.get('descripcion')
    url_imagen = body.get('url_imagen')

    curiosidad = Curiosidades_home(
        posicion= posicion,
        titulo= titulo,
        descripcion= descripcion,
        url_imagen= url_imagen
    )
    
    db.session.add(curiosidad)
    db.session.commit()

    response_body = {
        'posicion': curiosidad.posicion,
        'titulo': curiosidad.titulo,
        'descripcion': curiosidad.descripcion,
        'url_imagen': curiosidad.url_imagen
    }

    return jsonify('COMPLETED', response_body), 200
