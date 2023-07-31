"""
This module takes care of starting the API Server for users, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Articulo
from api.utils import generate_sitemap, APIException
from sqlalchemy import func

article_api = Blueprint('article_api', __name__)

@article_api.route('/hello_article/<string:article_name>', methods=['GET'])
def hello_article(article_name):
    return {"message": "hello " + article_name}, 200

@article_api.route('/', methods=['GET'])
def get_all():
    articles = Articulo.query.all()
    print("articles size: " + str(len(articles)))
    response = [article.to_dict() for article in articles]

    return jsonify(response), 200

@article_api.route('/genre/<string:genre_name>', methods=['GET'])
def get_by_genre(genre_name):
    articles = Articulo.query.filter(func.lower(Articulo.genero) == genre_name.lower()).all()
    response = [article.to_dict() for article in articles]

    return jsonify(response), 200

@article_api.route('/delete_all', methods=['GET'])
def delete_all():
    Articulo.query.delete()
    db.session.commit()

    return jsonify({"message": "All items deleted"}), 200
    