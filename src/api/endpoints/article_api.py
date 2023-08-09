"""
This module takes care of starting the API Server for users, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Articulo, Artista, Aprobaciones
from sqlalchemy import func
from api.endpoints.utils import save_to_cloudinary
import json

article_api = Blueprint('article_api', __name__)


# @article_api.route('/hello_article/<string:article_name>', methods=['GET'])
# def hello_article(article_name):
#    return {"message": "hello " + article_name}, 200

@article_api.route('/', methods=['GET'])
def get_all():
    articles = Articulo.query.all()
    print("articles size: " + str(len(articles)))
    response = [article.to_dict() for article in articles]

    return jsonify(response), 200


@article_api.route('/genre/<string:genre_name>', methods=['GET'])
def get_by_genre(genre_name):
    articles = Articulo.query.filter(func.lower(
        Articulo.genero) == genre_name.lower()).all()
    response = [article.to_dict() for article in articles]

    return jsonify(response), 200


@article_api.route('/get_all_grouped_by_genre', methods=['GET'])
def get_all_grouped_by_genre():
    response = {}
    genres = db.session.query(Articulo.genero).distinct().all()

    for genre_tuple in genres:
        genre = genre_tuple[0]
        print(genre)
        group = db.session.query(Articulo).filter(
            Articulo.genero == genre).all()

        article_list = [article.to_dict() for article in group]

        response[genre] = article_list


    return jsonify(response), 200


@article_api.route('/genres', methods=['GET'])
def get_genres():
    genres = db.session.query(Articulo.genero).distinct().all()
    # genre_options = [{'label': genre[0], "value": genre[0]} for genre in genres]

    response_body = [{'name': genre[0]} for genre in genres]

    return jsonify(response_body)


@article_api.route('/add', methods=['POST'])
def add():
    data = json.loads(request.form.get('article'))
    file = request.files['file']
    file_name = file.filename

    try:
        data['url_imagen'] = save_to_cloudinary(file, file_name)

        if data.get('id') and data.get('id') > 0:
            article = db.session.query(Articulo).get(data['id'])
            artist = Artista.query.get(article.artista_id)
            article.titulo = artist.nombre + " - " + article.titulo
            if article:
                for key, value in data.items():
                    setattr(article, key, value)
                db.session.add(article)
                db.session.commit()
        else:
            article = Articulo(**data)
            artist = Artista.query.get(article.artista_id)
            article.titulo = artist.nombre + " - " + article.titulo
            db.session.add(article)
            db.session.commit()
    except Exception as e:
        return jsonify(e), 500

    return jsonify(article.to_dict()), 200


"""
This end-point should be used in testing mode
"""


@article_api.route('/delete_all', methods=['GET'])
def delete_all():
    Articulo.query.delete()
    db.session.commit()

    return jsonify({"message": "All items deleted"}), 200
