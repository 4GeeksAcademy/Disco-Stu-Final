"""
This module takes ordere of starting the API Server for users, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Pedido, pedido_articulos
from api.utils import generate_sitemap, APIException
from datetime import datetime

order_api = Blueprint('order_api', __name__)

# Ruta para crear un pedido


@order_api.route('/', methods=['POST'])
def create_order():
    try:
        data = request.json

        user_id = data.get('usuario_id')
        articles_ids = data.get('articles_ids', [])
        precio_envio = data.get('precio_envio', 0)
        precio_total = data.get('precio_total', 0)
        impuesto = data.get('impuesto', 0)
        condicion_funda = data.get('condicion_funda', '')
        condicion_soporte = data.get('condicion_soporte', '')
        vendedor_id = data.get('vendedor_id')
        pagado = False

        if not user_id or not articles_ids:
            return jsonify({'error': 'Datos incompletos'}), 400

        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'Usuario no encontrado'}), 404

        pedido = Pedido(
            precio_envio=precio_envio,
            precio_total=precio_total,
            impuesto=impuesto,
            condicion_funda=condicion_funda,
            condicion_soporte=condicion_soporte,
            user_id=user_id,
            vendedor_id=vendedor_id,
            pagado=pagado
        )

        db.session.add(pedido)
        db.session.commit()

        for article_id in articles_ids:
            pedido_articulo = pedido_articulos.insert().values(
                pedido_id=pedido.id, articulo_id=article_id)
            db.session.execute(pedido_articulo)

        db.session.commit()

        return jsonify({'message': 'Pedido creado con éxito'}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Ruta para obtener el pedido


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
                'vendedor_id': pedido.vendedor_id,
                'condicion_funda': pedido.condicion_funda,
                'condicion_soporte': pedido.condicion_soporte,
                'articulos': [],
                'pagado': pedido.pagado
            }

            for articulo in pedido.articulos:
                articulo_data = {
                    'id': articulo.id,
                    'titulo': articulo.titulo,
                }

                pedido_data['articulos'].append(articulo_data)

            pedidos_list.append(pedido_data)

        return jsonify({'pedidos': pedidos_list}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Ruta para borrar un pedido


@order_api.route('/<int:user_id>/<int:order_id>', methods=['DELETE'])
def delete_order(user_id, order_id):
    try:
        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'Usuario no encontrado'}), 404

        order = Pedido.query.filter_by(id=order_id, user_id=user_id).first()
        if not order:
            return jsonify({'error': 'Pedido no encontrado'}), 404

        db.session.delete(order)
        db.session.commit()

        return jsonify({'message': 'Pedido eliminado con éxito'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Ruta para actualizar el estado de pagado de un pedido


@order_api.route('/<int:pedido_id>', methods=['PUT'])
def actualizar_estado_pago_pedido(pedido_id):
    pedido = Pedido.query.get(pedido_id)

    if pedido:
        try:
            nuevo_estado_pagado = request.json.get('pagado')
            if nuevo_estado_pagado is not None:
                pedido.pagado = nuevo_estado_pagado
                db.session.commit()
                return jsonify({'message': 'Estado de pago del pedido actualizado'}), 200
            else:
                return jsonify({'message': 'La propiedad "pagado" no fue proporcionada'}), 400
        except Exception as e:
            db.session.rollback()
            return jsonify({'message': 'Error al actualizar el estado de pago del pedido', 'error': str(e)}), 500
    else:
        return jsonify({'message': 'Pedido no encontrado'}), 404
