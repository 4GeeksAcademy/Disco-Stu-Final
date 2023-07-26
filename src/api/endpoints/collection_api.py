"""
This module takes collectione of starting the API Server for users, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

collection_api = Blueprint('collection_api', __name__)

@collection_api.route('/hello_collection/<string:collection_name>', methods=['GET'])
def hello_collection(collection_name):
    return {"message": "hello " + collection_name}, 200