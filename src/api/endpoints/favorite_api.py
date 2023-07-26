"""
This module takes favoritee of starting the API Server for users, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

favorite_api = Blueprint('favorite_api', __name__)

@favorite_api.route('/hello_favorite/<string:favorite_name>', methods=['GET'])
def hello_favorite(favorite_name):
    return {"message": "hello " + favorite_name}, 200