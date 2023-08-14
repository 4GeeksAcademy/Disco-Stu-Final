"""
This module takes ordere of starting the API Server for users, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Pedido
from api.utils import generate_sitemap, APIException

order_api = Blueprint('order_api', __name__)


@order_api.route('/hello_order/<string:order_name>', methods=['GET'])
def hello_order(order_name):
    return {"message": "hello " + order_name}, 200


@order_api.route('/<int:user_id>', methods=['POST'])
def create_order(user_id):
    try:
        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'Usuario no encontrado'}), 404

        data = request.json
        precio_envio = data['precio_envio']
        precio_total = data['precio_total']
        impuesto = data['impuesto']
        articulo_id = data['articulo_id']
        vendedor_id = data['vendedor_id']

        pedido = Pedido(
            precio_envio=precio_envio,
            precio_total=precio_total,
            impuesto=impuesto,
            articulo_id=articulo_id,
            user_id=user_id,
            vendedor_id=vendedor_id
        )

        db.session.add(pedido)
        db.session.commit()

        return jsonify({'message': 'Pedido creado con éxito'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@order_api.route('/<int:user_id>', methods=['GET'])
def get_pedidos_by_user_id(user_id):
    try:
        pedidos = Pedido.query.filter_by(user_id=user_id).all()
        if not pedidos:
            return jsonify({'message': 'No se encontraron pedidos para este usuario'}), 404

        pedidos_list = []
        for pedido in pedidos:
            pedido_data = {
                'id': pedido.id,
                'precio_envio': pedido.precio_envio,
                'precio_total': pedido.precio_total,
                'impuesto': pedido.impuesto,
                'articulo_id': pedido.articulo_id,
                'vendedor_id': pedido.vendedor_id
            }
            pedidos_list.append(pedido_data)

        return jsonify({'pedidos': pedidos_list}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
