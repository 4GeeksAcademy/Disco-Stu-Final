"""
This module takes favoritee of starting the API Server for users, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Favoritos
from api.utils import generate_sitemap, APIException

favorite_api = Blueprint('favorite_api', __name__)


# @favorite_api.route('/hello_favorite/<string:favorite_name>', methods=['GET'])
# def hello_favorite(favorite_name):
#     return {"message": "hello " + favorite_name}, 200


@favorite_api.route('/', methods=['GET'])
def get_all():
    favorites = Favoritos.query.all()
    response = [favorites.to_dict() for approval in approvals]

    return jsonify(response), 200


@favorite_api.route('/favorites/<int:user_id>', methods=['GET'])
def favorites_by_user_id(user_id):
    user_favorites = Favoritos.query.filter_by(user_id=user_id).all()

    if not user_favorites:
        return jsonify({'message': 'User not found or no favorites'}), 404

    favorites_list = [{'articulo_id': fav.articulo_id}
                      for fav in user_favorites]
    return jsonify({'user_id': user_id, 'favorites': favorites_list}), 200


@favorite_api.route('/favorites/<int:user_id>', methods=['POST'])
def add_favorite(user_id):
    data = request.get_json()

    if 'articulo_id' not in data:
        return jsonify({'message': 'Missing articulo_id'}), 400

    new_favorite = Favoritos(user_id=user_id, articulo_id=data['articulo_id'])
    db.session.add(new_favorite)
    db.session.commit()

    return jsonify({'message': 'Favorite added successfully'}), 201


@favorite_api.route('/favorites/<int:user_id>/<int:articulo_id>', methods=['DELETE'])
def delete_favorite(user_id, articulo_id):
    favorite = Favoritos.query.filter_by(
        user_id=user_id, articulo_id=articulo_id).first()

    if not favorite:
        return jsonify({'message': 'Favorite not found'}), 404

    db.session.delete(favorite)
    db.session.commit()

    return jsonify({'message': 'Favorite deleted successfully'}), 200
