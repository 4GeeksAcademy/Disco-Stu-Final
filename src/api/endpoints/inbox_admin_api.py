"""
This module takes inbox_admine of starting the API Server for users, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

inbox_admin_api = Blueprint('inbox_admin_api', __name__)

@inbox_admin_api.route('/hello_inbox_admin/<string:inbox_admin_name>', methods=['GET'])
def hello_inbox_admin(inbox_admin_name):
    return {"message": "hello " + inbox_admin_name}, 200