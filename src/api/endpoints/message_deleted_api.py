"""
This module takes message_deletede of starting the API Server for users, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

message_deleted_api = Blueprint('message_deleted_api', __name__)

@message_deleted_api.route('/hello_message_deleted/<string:message_deleted_name>', methods=['GET'])
def hello_message_deleted(message_deleted_name):
    return {"message": "hello " + message_deleted_name}, 200