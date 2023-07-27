"""
This module takes inbox_usere of starting the API Server for users, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

inbox_user_api = Blueprint('inbox_user_api', __name__)

@inbox_user_api.route('/messages', methods=['GET'])
def hello_inbox_user(inbox_user_name):
    return {"message": "hello " + inbox_user_name}, 200