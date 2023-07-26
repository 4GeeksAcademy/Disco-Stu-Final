"""
This module takes care of starting the API Server for users, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

artist_api = Blueprint('artist_api', __name__)

@artist_api.route('/hello_artist/<string:artist_name>', methods=['GET'])
def hello_user(artist_name):
    return {"message": "hello " + artist_name}, 200