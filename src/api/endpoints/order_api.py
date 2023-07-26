"""
This module takes ordere of starting the API Server for users, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

order_api = Blueprint('order_api', __name__)

@order_api.route('/hello_order/<string:order_name>', methods=['GET'])
def hello_order(order_name):
    return {"message": "hello " + order_name}, 200