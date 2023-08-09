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

    messages = Bandeja_de_entrada.query.filter_by(receptor_id=user_id).all()
    sent_messages = Mensajes_enviados.query.filter_by(emisor_id=user_id).all()
    deleted_messages = Mensajes_eliminados.query.filter_by(
        receptor_id=user_id).all()

    inbox = []
    for element in messages:
        message_dict = {
            'id': element.id,
            'emisor_id': element.emisor_id,
            'asunto': element.asunto,
            'mensaje': element.mensaje,
            'fecha': element.fecha
        }
        inbox.append(message_dict)

    sent = []
    for element in sent_messages:
        sent_message_dict = {
            'id': element.id,
            'receptor_id': element.receptor_id,
            'asunto': element.asunto,
            'mensaje': element.mensaje,
            'fecha': element.fecha
        }
        sent.append(sent_message_dict)

    deleted = []
    for element in deleted_messages:
        deleted_message_dict = {
            'id': element.id,
            'emisor_id': element.emisor_id,
            'asunto': element.asunto,
            'mensaje': element.mensaje,
            'fecha': element.fecha
        }
        deleted.append(deleted_message_dict)

    return jsonify({'inbox': inbox, 'sent_messages': sent, 'deleted_messages': deleted}), 200


@inbox_user_api.route('/messages/sent/<int:user_id>', methods=['POST'])
def send_message(user_id):

    try:
        emisor_id = user_id
        receptor_id = request.json.get('receptor_id')
        asunto = request.json.get('asunto')
        mensaje = request.json.get('mensaje')
        fecha = request.json.get('fecha')

        sent_message = Mensajes_enviados(
            emisor_id=emisor_id,
            receptor_id=receptor_id,
            asunto=asunto,
            mensaje=mensaje,
            fecha=fecha
        )
        received_message = Bandeja_de_entrada(
            emisor_id=emisor_id,
            receptor_id=receptor_id,
            asunto=asunto,
            mensaje=mensaje,
            fecha=fecha
        )
        db.session.add(sent_message)
        db.session.add(received_message)
        db.session.commit()

        response = {
            'emisor_id': emisor_id,
            'receptor_id': receptor_id,
            'asunto': asunto,
            'mensaje': mensaje,
            'fecha': fecha
        }

        return jsonify({'Message sended succesfully': response})

    except Exception as e:
        return jsonify({'error': 'Error sending message: ' + str(e)}), 500


@inbox_user_api.route('/messages/trash/', methods=['POST'])
def delete_inbox_message():

    try:
        message_id = request.json.get('message_id')

        message = Bandeja_de_entrada.query.filter_by(id=message_id).first()

        if message:
            deleted_message = Mensajes_eliminados(
                id=message.id,
                emisor_id=message.emisor_id,
                receptor_id=message.receptor_id,
                asunto=message.asunto,
                mensaje=message.mensaje,
                fecha=message.fecha
            )
            db.session.delete(message)
            db.session.add(deleted_message)
            db.session.commit()

            response = {
                'emisor_id': message.emisor_id,
                'receptor_id': message.receptor_id,
                'asunto': message.asunto,
                'mensaje': message.mensaje,
                'fecha': message.fecha
            }

            return jsonify({'Message added to trash successfully': response})
        else:
            return jsonify({'error': f'Message with id {message_id} not found'}), 404

    except Exception as e:
        return jsonify({'error': 'Error deleting message: ' + str(e)}), 500


@inbox_user_api.route('/messages/trash/<int:message_id>', methods=['DELETE'])
def delete_message_permanently(user_id):

    try:
        emisor_id = request.json.get('emisor_id')
        receptor_id = user_id
        message_id = request.json.get('message_id')

        message = Mensajes_eliminados.query.filter_by(id=message_id).first()

        db.session.delete(message)
        db.session.commit()

        response = {
            'emisor_id': emisor_id,
            'receptor_id': receptor_id,
            'message_id': message_id
        }

        return jsonify({'Message deleted permanently': response})

    except Exception as e:
        return jsonify({'error': 'Error deleting message: ' + str(e)}), 500


@inbox_user_api.route('/messages', methods=['POST'])
def recover_deleted_message():

    try:
        message_id = request.json.get('message_id')

        deleted_message = Mensajes_eliminados.query.filter_by(
            id=message_id).first()

        recover_message = Bandeja_de_entrada(
            id=deleted_message.id,
            emisor_id=deleted_message.emisor_id,
            receptor_id=deleted_message.receptor_id,
            asunto=deleted_message.asunto,
            mensaje=deleted_message.mensaje,
            fecha=deleted_message.fecha
        )
        db.session.delete(deleted_message)
        db.session.add(recover_message)
        db.session.commit()

        response = {
            'message_id': deleted_message.id,
            'emisor_id': deleted_message.emisor_id,
            'receptor_id': deleted_message.receptor_id,
            'asunto': deleted_message.asunto,
            'mensaje': deleted_message.mensaje,
            'fecha': deleted_message.fecha
        }

        return jsonify({'Message recovered succesfully': response})

    except Exception as e:
        return jsonify({'error': 'Error recovering message: ' + str(e)}), 500


@inbox_user_api.route('/messages/sent', methods=['DELETE'])
def delete_sent_message():

    try:
        message_id = request.json.get('message_id')

        message = Mensajes_enviados.query.filter_by(id=message_id).first()

        db.session.delete(message)
        db.session.commit()

        response = {
            'emisor_id': message.emisor_id,
            'receptor_id': message.receptor_id,
            'asunto': message.asunto,
            'mensaje': message.mensaje,
            'fecha': message.fecha
        }

        return jsonify({'Sent messagge deleted succesfully': response})

    except Exception as e:
        return jsonify({'error': 'Error deleting sent message: ' + str(e)}), 500
