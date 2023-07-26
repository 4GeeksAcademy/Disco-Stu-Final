"""
This module takes carte of starting the API Server for users, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

cart_api = Blueprint('cart_api', __name__)

@cart_api.route('/hello_cart/<string:cart_name>', methods=['GET'])
def hello_cart(cart_name):
    return {"message": "hello " + cart_name}, 200