"""
This module takes inbox_usere of starting the API Server for users, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Bandeja_de_entrada_admin, Archivo_mensajes_admin
from api.utils import generate_sitemap, APIException

inbox_admin_api = Blueprint('inbox_admin_api', __name__)


@inbox_admin_api.route('/messages/', methods=['GET'])
def get_all_messages():

    messages = Bandeja_de_entrada_admin.query.all()
    archived_messages = Archivo_mensajes_admin.query.all()

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

    archived = []
    for element in archived_messages:
        archived_message_dict = {
            'id': element.id,
            'emisor_id': element.emisor_id,
            'asunto': element.asunto,
            'mensaje': element.mensaje,
            'fecha': element.fecha
        }
        archived.append(archived_message_dict)

    return jsonify({'inbox': inbox, 'archived': archived}), 200


@inbox_admin_api.route('/messages/archive', methods=['POST'])
def archive_inbox_message():

    try:
        message_id = request.json.get('message_id')

        message = Bandeja_de_entrada_admin.query.filter_by(
            id=message_id).first()

        message_to_archive = Archivo_mensajes_admin(
            id=message.id,
            emisor_id=message.emisor_id,
            asunto=message.asunto,
            mensaje=message.mensaje,
            fecha=message.fecha
        )
        db.session.delete(message)
        db.session.add(message_to_archive)
        db.session.commit()

        response = {
            'emimsor_id': message.emisor_id,
            'asunto': message.asunto,
            'mensaje': message.mensaje,
            'fecha': message.fecha
        }

        return jsonify({'Message added to archive succesfully': response})

    except Exception as e:
        return jsonify({'error': 'Error archiving message: ' + str(e)}), 500


@inbox_admin_api.route('/messages', methods=['DELETE'])
def delete_message_permanently():

    try:
        message_id = request.json.get('message_id')

        message = Bandeja_de_entrada_admin.query.filter_by(
            id=message_id).first()

        db.session.delete(message)
        db.session.commit()

        response = {
            'emisor_id': message.emisor_id,
            'message_id': message.id
        }

        return jsonify({'Message deleted permanently': response})

    except Exception as e:
        return jsonify({'error': 'Error deleting message: ' + str(e)}), 500


# @inbox_admin_api.route('/messages', methods=['POST'])
# def recover_deleted_message():

#     try:
#         message_id = request.json.get('message_id')

#         deleted_message = Mensajes_eliminados.query.filter_by(id=message_id).first()

#         recover_message = Bandeja_de_entrada(
#             id=deleted_message.id,
#             emisor_id=deleted_message.emisor_id,
#             receptor_id=deleted_message.receptor_id,
#             asunto=deleted_message.asunto,
#             mensaje=deleted_message.mensaje,
#             fecha=deleted_message.fecha
#         )
#         db.session.delete(deleted_message)
#         db.session.add(recover_message)
#         db.session.commit()

#         response = {
#             'message_id': deleted_message.id,
#             'emisor_id': deleted_message.emisor_id,
#             'receptor_id': deleted_message.receptor_id,
#             'asunto': deleted_message.asunto,
#             'mensaje': deleted_message.mensaje,
#             'fecha': deleted_message.fecha
#         }

#         return jsonify({'Message recovered succesfully': response})

#     except Exception as e:
#         return jsonify({'error': 'Error recovering message: ' + str(e)}), 500
