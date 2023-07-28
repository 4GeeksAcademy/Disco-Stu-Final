"""
This module takes inbox_usere of starting the API Server for users, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Bandeja_de_entrada, Mensajes_enviados, Mensajes_eliminados
from api.utils import generate_sitemap, APIException

inbox_user_api = Blueprint('inbox_user_api', __name__)

@inbox_user_api.route('/messages/<int:user_id>', methods=['GET'])
def get_all_messages(user_id):

    if not user_id:
        return jsonify('User not found'), 400

    messages = Bandeja_de_entrada.query.filter_by(receptor_id='user_id')
    sent_messages = Mensajes_enviados.query.filter_by(emisor_id='user_id')
    deleted_messages = Mensajes_eliminados.query.filter_by(receptor_id='user_id')

    inbox = []
    for element in messages:
        message_dict = {
            'emisor_id': element.emisor_id,
            'asunto': element.asunto,
            'mensaje': element.mensaje,
            'fecha': element.fecha
        }
        inbox.append(message_dict)

    sent = []
    for element in sent_messages:
        sent_message_dict = {
            'receptor_id': element.receptor_id,
            'asunto': element.asunto,
            'mensaje': element.mensaje,
            'fecha': element.fecha
        }
        sent.append(sent_message_dict)

    deleted = []
    for element in deleted_messages:
        deleted_message_dict = {
            'emisor_id': element.emisor_id,
            'asunto': element.asunto,
            'mensaje': element.mensaje,
            'fecha': element.fecha
        }
        deleted.append(deleted_message_dict)

    return jsonify({'inbox': inbox, 'sent': sent_messages, 'deleted': deleted_messages}), 200

@inbox_user_api.route('/messages/sent/<int:user_id>', methods=['POST'])
def send_message(user_id):

    try:
        emisor_id = user_id
        receptor_id = request.json.get('receptor_id')
        asunto = request.json.get('asunto')
        mensaje = request.json.get('mensaje')
        fecha = request.json.get('fecha')

        new_message = Mensajes_enviados(
            emisor_id = emisor_id,
            receptor_id = receptor_id,
            asunto = asunto,
            mensaje = mensaje,
            fecha = fecha
        )
        db.session.add(new_message)
        db.session.commit()

        response = {
            'receptor_id': receptor_id,
            'receptor_id': receptor_id,
            'asunto': asunto,
            'mensaje': mensaje,
            'fecha': fecha
        }

        return jsonify({'Message sended': response})

    except Exception as e:
        return jsonify({'error': 'Error sending message: ' + str(e)}), 500

@inbox_user_api.route('/messages/trash/<int:user_id>', methods=['POST'])
def delete_message(user_id):

    try:
        emisor_id = request.json.get('emisor_id')
        receptor_id = user_id
        asunto = request.json.get('asunto')
        mensaje = request.json.get('mensaje')
        fecha = request.json.get('fecha')

        message = Bandeja_de_entrada.query.filter_by(
            emisor_id = emisor_id,
            receptor_id = receptor_id,
            asunto = asunto,
            mensaje = mensaje,
            fecha = fecha
        ).first()

        deleted_message = Mensajes_eliminados(
            emisor_id = emisor_id,
            receptor_id = receptor_id,
            asunto = asunto,
            mensaje = mensaje,
            fecha = fecha
        )
        db.session.delete(message)
        db.session.add(deleted_message)
        db.session.commit()

        response = {
            'emimsor_id': emisor_id,
            'asunto': asunto,
            'mensaje': mensaje,
            'fecha': fecha
        }

        return jsonify({'Message deleted succesfully': response})

    except Exception as e:
        return jsonify({'error': 'Error deleting message: ' + str(e)}), 500

@inbox_user_api.route('/messages/trash/<int:user_id>', methods=['DELETE'])
def delete_message_permanently(user_id):

    try:
        emisor_id = request.json.get('emisor_id')
        receptor_id = user_id
        asunto = request.json.get('asunto')
        mensaje = request.json.get('mensaje')
        fecha = request.json.get('fecha')

        message = Mensajes_eliminados.query.filter_by(
            emisor_id = emisor_id,
            receptor_id = receptor_id,
            asunto = asunto,
            mensaje = mensaje,
            fecha = fecha
        ).first()

        db.session.delete(message)
        db.session.commit()

        response = {
            'emisor_id': emisor_id,
            'asunto': asunto,
            'mensaje': mensaje,
            'fecha': fecha
        }

        return jsonify({'Message deleted permanently': response})

    except Exception as e:
        return jsonify({'error': 'Error deleting message: ' + str(e)}), 500

@inbox_user_api.route('/messages/<int:user_id>', methods=['POST'])
def recover_deleted_message(user_id):

    try:
        emisor_id = request.json.get('receptor_id')
        receptor_id = user_id
        asunto = request.json.get('asunto')
        mensaje = request.json.get('mensaje')
        fecha = request.json.get('fecha')

        deleted_message = Mensajes_eliminados.query.filter_by(
            emisor_id = emisor_id,
            receptor_id = receptor_id,
            asunto = asunto,
            mensaje = mensaje,
            fecha = fecha
        ).first()

        recover_message = Bandeja_de_entrada(
            emisor_id = emisor_id,
            receptor_id = receptor_id,
            asunto = asunto,
            mensaje = mensaje,
            fecha = fecha
        )
        db.session.delete(deleted_message)
        db.session.add(recover_message)
        db.session.commit()

        response = {
            'receptor_id': receptor_id,
            'asunto': asunto,
            'mensaje': mensaje,
            'fecha': fecha
        }

        return jsonify({'Message recovered succesfully': response})

    except Exception as e:
        return jsonify({'error': 'Error recovering message: ' + str(e)}), 500

@inbox_user_api.route('/messages/sent/<int:user_id>', methods=['DELETE'])
def delete_sent_message(user_id):

    try:
        emisor_id = user_id
        receptor_id = request.json.get('receptor_id')
        asunto = request.json.get('asunto')
        mensaje = request.json.get('mensaje')
        fecha = request.json.get('fecha')

        message = Mensajes_enviados(
            emisor_id = emisor_id,
            receptor_id = receptor_id,
            asunto = asunto,
            mensaje = mensaje,
            fecha = fecha
        )
        db.session.delete(message)
        db.session.commit()

        response = {
            'emisor_id': emisor_id,
            'receptor_id': receptor_id,
            'asunto': asunto,
            'mensaje': mensaje,
            'fecha': fecha
        }

        return jsonify({'Sent messagge deleted succesfully': response})

    except Exception as e:
        return jsonify({'error': 'Error deleting sent message: ' + str(e)}), 500
