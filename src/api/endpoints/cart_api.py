"""
This module takes carte of starting the API Server for users, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User,  Carrito, Ofertas
from api.utils import generate_sitemap, APIException

cart_api = Blueprint('cart_api', __name__)

@cart_api.route('/get', methods=['GET'])
def get_cart():

    user_id = request.json.get('user_id')

    cart_element_unordered = Carrito.query.filter_by(user_id=user_id).all()

    sellers_ids = {elem.vendedor_id for elem in cart_element_unordered}

    cart_content = []

    for seller_id in sellers_ids:
        object_dict = {
            'seller': {},
            'ofertas': []
        }
        seller = User.query.filter_by(user_id=seller_id).first()
        object_dict['seller']=seller
        offers_ids = [elem.oferta_id for elem in cart_element_unordered if elem.vendedor_id == seller_id]
        ofertas_dict = []
        for id in offers_ids:
            oferta_dict = Ofertas.query.filter_by(id=id).first()
            ofertas_dict.append(oferta_dict)
        object_dict['ofertas']=ofertas_dict

        cart_content.append(object_dict)
    
    return jsonify({'content': cart_content}), 200


@cart_api.route('/add', methods=['POST'])
def new_cart_element():

    user_id=request.json.get('user_id')
    vendedor_id=request.json.get('vendedor_id')
    oferta_id=request.json.get('oferta_id')

    new_element=Carrito(
        user_id=user_id,
        vendedor_id=vendedor_id,
        oferta_id=oferta_id
    )
    db.session.add(new_element)
    db.session.commit

    return jsonify({'Cart element added': new_element})


@cart_api.route('/delete_item', methods=['DELETE'])
def delete_one_article():

    user_id=request.json.get('user_id')
    vendedor_id=request.json.get('vendedor_id')
    articulo_id=request.json.get('articulo_id')

    element_to_delete=Carrito(
        user_id=user_id,
        vendedor_id=vendedor_id,
        articulo_id=articulo_id
    )
    db.session.delete(element_to_delete)
    db.session.commit()

    return jsonify({'Cart element. deleted': element_to_delete})


@cart_api.route('/delete_by_seller', methods=['DELETE'])
def delete_articles_for_seller():

    user_id=request.json.get('user_id')
    vendedor_id=request.json.get('vendedor_id')

    articles = Carrito.query.filter_by(user_id=user_id, vendedor_id=vendedor_id).all()

    for article in articles:
        db.session.delete(article)
        db.session.commit

    return jsonify('Cart elements for a seller deleted')