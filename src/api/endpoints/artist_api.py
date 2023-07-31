"""
This module takes care of starting the API Server for users, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Artista
from api.utils import generate_sitemap, APIException
from api.endpoints.utils import saveImages

artist_api = Blueprint('artist_api', __name__)

@artist_api.route('/hello_artist/<string:artist_name>', methods=['GET'])
def hello_user(artist_name):
    return {"message": "hello " + artist_name}, 200

@artist_api.route('/', methods=['GET'])
def get_all():
    artists = Artista.query.all()
    print("artists size: " + str(len(artists)))
    response = [artist.to_dict() for artist in artists]

    return jsonify(response), 200

@artist_api.route('/delete_all', methods=['GET'])
def delete_all():
    Artista.query.delete()
    db.session.commit()

    return jsonify({"message": "All items deleted"}), 200

@artist_api.route('/create', methods=['POST'])
def create_artist():
    artist_data = request.get_json()

    print(artist_data)
    
    if artist_data:
        try:
            url_imagen = saveImages(artist_data["url_imagen"])
            artist_data["url_imagen"] = url_imagen
            artist = Artista(**artist_data)
            db.session.add(artist)
            db.session.commit()
        except Exception as e:
            print("#artist_api" + str(e))
            return jsonify({"message": "Ha ocurrido un error con la base de datos"})

        return jsonify({'message': 'Artista creado satisfactoriamente'}), 200
    else:
        return jsonify({'message': 'Petición JSON inválida'}), 400


