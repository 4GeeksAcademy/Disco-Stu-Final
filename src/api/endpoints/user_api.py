"""
This module takes care of starting the API Server for users, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

user_api = Blueprint('user_api', __name__)

@user_api.route('/hello_user/<string:user_name>', methods=['GET'])
def hello_user(user_name):
    return {"message": "hello " + user_name}, 200