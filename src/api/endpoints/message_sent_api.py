"""
This module takes message_sente of starting the API Server for users, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

message_sent_api = Blueprint('message_sent_api', __name__)

@message_sent_api.route('/hello_message_sent/<string:message_sent_name>', methods=['GET'])
def hello_message_sent(message_sent_name):
    return {"message": "hello " + message_sent_name}, 200