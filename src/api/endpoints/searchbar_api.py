"""
This module takes offere of starting the API Server for users, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Artista, Articulo, Tracks
from api.utils import generate_sitemap, APIException, Normalize

searchbar_api = Blueprint('searchbar_api', __name__)


@searchbar_api.route('/search/<string:search_content>', methods=['GET'])
def get_filtered_content(search_content):

    try:
        normalized_content = Normalize(search_content)

        # Encontramos los artistas similares

        artists = Artista.query.all()
        similar_artists = []
        added_artists_ids = set()
        artist_dict = {}
        for elem in artists:
            normalized_name = Normalize(elem.nombre)
            if normalized_name.startswith(normalized_content) and elem.id not in added_artists_ids:
                artist_dict = {
                    'id': elem.id,
                    'url_imagen': elem.url_imagen,
                    'nombre': elem.nombre,
                    'nombre_real': elem.nombre_real,
                    'perfil': elem.perfil
                }
                similar_artists.append(artist_dict)
                added_artists_ids.add(elem.id)

        for elem in artists:
            normalized_name = Normalize(elem.nombre)
            if normalized_content in normalized_name and elem.id not in added_artists_ids:
                artist_dict = {
                    'id': elem.id,
                    'url_imagen': elem.url_imagen,
                    'nombre': elem.nombre,
                    'nombre_real': elem.nombre_real,
                    'perfil': elem.perfil
                }
                similar_artists.append(artist_dict)
                added_artists_ids.add(elem.id)

        # Encontramos los articulos similares

        articles = Articulo.query.all()
        similar_articles = []
        added_articles_ids = set()
        article_dict = {}
        for elem in articles:
            normalized_title = Normalize(elem.titulo)
            if normalized_title.startswith(normalized_content) and elem.id not in added_articles_ids:
                artist = Artista.query.filter_by(id=elem.artista_id).first()
                article_dict = {
                    'id': elem.id,
                    'url_imagen': elem.url_imagen,
                    'artista_id': elem.artista_id,
                    'titulo': elem.titulo,
                    'sello': elem.sello,
                    'formato': elem.formato,
                    'pais': elem.pais,
                    'publicado': elem.publicado,
                    'genero': elem.genero,
                    'estilos': elem.estilos
                }
                similar_articles.append(article_dict)
                added_articles_ids.add(elem.id)

        for elem in articles:
            normalized_title = Normalize(elem.titulo)
            if normalized_content in normalized_title and elem.id not in added_articles_ids:
                artist = Artista.query.filter_by(id=elem.artista_id).first()
                article_dict = {
                    'id': elem.id,
                    'url_imagen': elem.url_imagen,
                    'artista_id': elem.artista_id,
                    'titulo': elem.titulo,
                    'sello': elem.sello,
                    'formato': elem.formato,
                    'pais': elem.pais,
                    'publicado': elem.publicado,
                    'genero': elem.genero,
                    'estilos': elem.estilos
                }
                similar_articles.append(article_dict)
                added_articles_ids.add(elem.id)

        # Encontramos los articulos con tracks similares

        tracks = Tracks.query.all()
        similar_articles_by_track = []
        for elem in tracks:
            normalized_title = Normalize(elem.nombre)
            if normalized_title.startswith(normalized_content) and elem.articulo_id not in added_articles_ids:
                article = Articulo.query.filter_by(id=elem.articulo_id).first()
                artist = Artista.query.filter_by(id=article.artista_id).first()
                article_dict = {
                    'id': article.id,
                    'url_imagen': article.url_imagen,
                    'artista_id': article.artista_id,
                    'titulo': article.titulo,
                    'sello': article.sello,
                    'formato': article.formato,
                    'pais': article.pais,
                    'publicado': article.publicado,
                    'genero': article.genero,
                    'estilos': article.estilos
                }
                similar_articles_by_track.append(article_dict)

        similar_artists = similar_artists[:100]
        similar_articles = similar_articles[:100]
        similar_articles_by_track = similar_articles_by_track[:100]

        return jsonify({'artists': similar_artists, 'articles': similar_articles, 'articles_by_track': similar_articles_by_track}), 200

    except Exception as e:
        return jsonify({'error': 'Error getting similars: ' + str(e)}), 500
