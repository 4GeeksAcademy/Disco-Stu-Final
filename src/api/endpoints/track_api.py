"""
This module takes tracke of starting the API Server for users, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Tracks
from api.utils import generate_sitemap, APIException

track_api = Blueprint('track_api', __name__)

@track_api.route('/hello_track/<string:track_name>', methods=['GET'])
def hello_track(track_name):
    return {"message": "hello " + track_name}, 200

@track_api.route('/', methods=['GET'])
def get_all():
    tracks = Tracks.query.all()
    print("tracks size: " + str(len(tracks)))
    response = [track.to_dict() for track in tracks]

    return jsonify(response), 200

@track_api.route('/delete_all', methods=['GET'])
def delete_all():
    Tracks.query.delete()
    db.session.commit()

    return jsonify({"message": "All items deleted"}), 200