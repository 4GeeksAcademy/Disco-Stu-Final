"""
This module takes carte of starting the API Server for users, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Aprobaciones, Artista
from api.endpoints.utils import save_to_cloudinary
from api.utils import generate_sitemap, APIException
import json

approvals_api = Blueprint('approvals_api', __name__)

@approvals_api.route('/', methods=['GET'])
def get_all():
    approvals = Aprobaciones.query.all()
    response = [approval.to_dict() for approval in approvals]

    return jsonify(response), 200

@approvals_api.route('/add', methods=['POST'])
def add():
    data = json.loads(request.form.get('article'))
    file = request.files['file']
    file_name = file.filename
    
    session = db.session()

    if data and file:
        if data['tipo'] == "add":
            try:
                session.begin()
                aprobacion = Aprobaciones(**data)
                artist = Artista.query.get(aprobacion.artista_id)
                aprobacion.titulo = artist.nombre + " - " + aprobacion.titulo
                aprobacion.url_imagen = save_to_cloudinary(file, file_name)
                db.session.add(aprobacion)
                db.session.commit()

                print("Articulo agregado para aprobación")
                return jsonify({'mensaje:': "Articulo agregado para aprobación"}), 200
            except Exception as e:
                db.session.rollback()
                print("Error al guardar el articulo para aprobación: " + str(e))
                return jsonify({'mensaje:': "Error al guardar el articulo para aprobación"}), 405