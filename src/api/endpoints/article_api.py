"""
This module takes care of starting the API Server for users, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

article_api = Blueprint('article_api', __name__)

@article_api.route('/hello_article/<string:article_name>', methods=['GET'])
def hello_article(article_name):
    return {"message": "hello " + article_name}, 200