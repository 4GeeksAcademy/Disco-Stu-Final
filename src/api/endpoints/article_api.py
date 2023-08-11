"""
This module takes care of starting the API Server for users, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Articulo, Artista, Aprobaciones
from sqlalchemy import func, or_
from api.endpoints.utils import save_to_cloudinary
import json

article_api = Blueprint('article_api', __name__)

@article_api.route('/', methods=['GET'])
def get_all():
    articles = Articulo.query.all()
    print("articles size: " + str(len(articles)))
    response = [article.to_dict() for article in articles]

    return jsonify(response), 200

@article_api.route('/search/<string:term>', methods=['GET'])
def search(term):
    term = term.lower()
    articles = Articulo.query.filter(
        or_(
            Articulo.titulo.ilike(f'%{term}%'),
            Articulo.sello.ilike(f'%{term}%'),
            Articulo.formato.ilike(f'%{term}%'),
            Articulo.pais.ilike(f'%{term}%'),
            Articulo.genero.ilike(f'%{term}%'),
            Articulo.estilos.ilike(f'%{term}%'),
            Articulo.artista.has(nombre=term) | Articulo.artista.has(nombre_real=term)
        )
    ).all()

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
            Articulo.genero == genre).limit(10).all()

        article_list = [article.to_dict() for article in group]

        response[genre] = article_list

    return jsonify(response), 200


@article_api.route('/style/<string:style_name>', methods=['GET'])
def get_by_style(style_name):
    style_name = style_name.replace("%20", " ").strip()
    #response = db.session.query(Articulo).filter(Articulo.estilos.ilike(f"%, {style_name},") |
    #                                            Articulo.estilos.ilike(f"{style_name}, %")).all()
    response = db.session.query(Articulo).filter(or_(
        Articulo.estilos.ilike(f"%{style_name},%"),
        Articulo.estilos.ilike(f"%{style_name}"),
        Articulo.estilos.ilike(f"{style_name},%"),
    )).all()
    matching_articulos_json = [articulo.to_dict() for articulo in response]
    return jsonify(matching_articulos_json), 200

@article_api.route('/country/<string:country_name>', methods=['GET'])
def get_by_country(country_name):
    response = db.session.query(Articulo).filter(Articulo.pais == country_name).all()
    matching_articulos_json = [articulo.to_dict() for articulo in response]
    return jsonify(matching_articulos_json), 200

@article_api.route('/get_all_filter', methods=['GET'])
def get_all_filters():
    distinct_generos = db.session.query(Articulo.genero).distinct().all()
    distinct_estilos = db.session.query(Articulo.estilos).distinct().all()
    distinct_pais = db.session.query(Articulo.pais).distinct().all()

    generos = [item[0] for item in distinct_generos]
    estilos = [style for item in distinct_estilos for style in (
        item[0].split(', ') if item[0] else [])]
    pais = [item[0] for item in distinct_pais]

    result = {
        "generos": generos,
        "estilos": estilos,
        "paises": pais
    }

    return jsonify(result)


@article_api.route('/genres', methods=['GET'])
def get_genres():
    genres = db.session.query(Articulo.genero).distinct().all()

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
