"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.endpoints.article_api import article_api
from api.endpoints.artist_api import artist_api
from api.endpoints.cart_api import cart_api
from api.endpoints.collection_api import collection_api
from api.endpoints.favorite_api import favorite_api
from api.endpoints.inbox_admin_api import inbox_admin_api
from api.endpoints.inbox_user_api import inbox_user_api
from api.endpoints.message_deleted_api import message_deleted_api
from api.endpoints.message_sent_api import message_sent_api
from api.endpoints.offer_api import offer_api
from api.endpoints.order_api import order_api
from api.endpoints.track_api import track_api
from api.endpoints.user_api import user_api

from api.admin import setup_admin
from api.commands import setup_commands

#from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type = True)
db.init_app(app)

# Allow CORS requests to this API
CORS(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')
app.register_blueprint(article_api, url_prefix='/api/articles')
app.register_blueprint(artist_api, url_prefix='/api/artists')
app.register_blueprint(cart_api, url_prefix='/api/carts')
app.register_blueprint(collection_api, url_prefix='/api/collections')
app.register_blueprint(favorite_api, url_prefix='/api/favorites')
app.register_blueprint(inbox_admin_api, url_prefix='/api/inbox_admin')
app.register_blueprint(inbox_user_api, url_prefix='/api/inbox_user')
app.register_blueprint(message_deleted_api, url_prefix='/api/message_deleted')
app.register_blueprint(message_sent_api, url_prefix='/api/message_sent')
app.register_blueprint(offer_api, url_prefix='/api/offers')
app.register_blueprint(order_api, url_prefix='/api/orders')
app.register_blueprint(track_api, url_prefix='/api/tracks')
app.register_blueprint(user_api, url_prefix='/api/users')

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0 # avoid cache memory
    return response


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
