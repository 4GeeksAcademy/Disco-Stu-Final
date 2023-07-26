"""
This module takes offere of starting the API Server for users, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

offer_api = Blueprint('offer_api', __name__)

@offer_api.route('/hello_offer/<string:offer_name>', methods=['GET'])
def hello_offer(offer_name):
    return {"message": "hello " + offer_name}, 200