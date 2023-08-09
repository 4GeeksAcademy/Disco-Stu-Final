"""
This module takes offere of starting the API Server for users, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Articulo, Ofertas
from api.utils import generate_sitemap, APIException

offer_api = Blueprint('offer_api', __name__)

@offer_api.route('/<int:article_id>', methods=['GET'])
def get_offers(article_id):

    articles = Articulo.query.filter_by(articulo_id=article_id).all()

    articles_response = []

    for article in articles:
        article_dict = {
            'vendedor_id': article.vendedor_id,
            'articulo_id': article.articulo_id,
            'condicion_funda': article.condicion_funda,
            'condicion_soporte': article.condicion_soporte,
            'precio': article.precio,
            'comentario': article.comentario
        }
        articles_response.append(article_dict)

    return jsonify({'Offers': articles_response}), 200

@offer_api.route('/post', methods=['POST'])
def post_offer():

    vendedor_id = request.query.get('vendedor_id')
    articulo_id = request.query.get('articulo_id')
    condicion_soporte = request.query.get('condicion_soporte')
    condicion_funda = request.query.get('condicion_funda')
    precio = request.query.get('precio')
    comentario = request.query.get('comentario')
    cantidad = int.request.query.get('cantidad')

    for _ in range(cantidad):
        article = Articulo(
            vendedor_id=vendedor_id,
            articulo_id=articulo_id,
            condicion_soporte=condicion_soporte,
            condicion_funda=condicion_funda,
            precio=precio,
            comentario=comentario
        )
        db.session.add(article)
        db.session.commit()

    return jsonify('Offer added'), 200

@offer_api.route('/post/<int:offer_id>', methods=['PUT'])
def edit_offer(offer_id):

    condicion_soporte = request.query.get('condicion_soporte')
    condicion_funda = request.query.get('condicion_funda')
    precio = request.query.get('precio')
    comentario = request.query.get('comentario')

    offer = Ofertas.query.filter_by(id=offer_id).first()

    if offer:
        offer.condicion_soporte = condicion_soporte
        offer.condicion_funda = condicion_funda
        offer.precio = precio
        offer.comentario = comentario

        db.session.commit()

        return jsonify('Offer edited'), 200
    else:
        return jsonify('Offer not found'), 404
    
@offer_api.route('/delete/<int:offer_id>', methods=['DELETE'])
def delete_offer(offer_id):

    offer = Ofertas.query.filter_by(id=offer_id).first()

    if offer:

        db.session.delete(offer)
        db.session.commit()

        return jsonify('Offer deleted'), 200
    else:
        return jsonify('Offer not found'), 404
