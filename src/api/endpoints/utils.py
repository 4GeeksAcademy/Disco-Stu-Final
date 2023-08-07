"""
This module takes care of starting the API Server for users, Loading the DB and Adding the endpoints
"""
import requests, time, secrets, string, os, json
from flask import Flask, request, jsonify, url_for, Blueprint, send_from_directory
from api.models import db, Articulo, Tracks, Artista, User
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash
import cloudinary
import cloudinary.uploader
import cloudinary.api

utils_api = Blueprint('utils_api', __name__)

"""
Solo para pruebas iniciales. Este método no debería estar en productivo
"""

#@utils_api.route('/cloud-test', methods=['GET'])
def save_to_cloudinary(image_url, custom_public_id):
    cloudinary.config(
        cloud_name='disco-stu',
        api_key='639893174366669',
        api_secret='NOzrJLcM6aktcSU7Qt32ocZR6ik'
    )

    folder_path='images/'

    try:
        upload_result = cloudinary.uploader.upload(
        image_url, 
        folder=folder_path,
        public_id=custom_public_id)

        return upload_result["secure_url"]
    except cloudinary.exceptions.Error as e:
        # Handle Cloudinary API errors
        print("Cloudinary API Error:", e)
        return jsonify({'message': "error al subir imagen"}), 500
    except cloudinary.uploader.Error as e:
        # Handle Cloudinary uploader errors
        print("Cloudinary Uploader Error:", e)
        return jsonify({'message': "error al subir imagen"}), 500

def save_initial_data_from_discosg(data):
    directory_name = "src/api/data"
    file_name = "data_inicial.json"
    folder_path = os.path.join(os.getcwd(), directory_name)
    file_path = os.path.join(folder_path, file_name)
    
    with open(file_path, "w") as file:
        json.dump(data, file, indent=4, ensure_ascii=False)

@utils_api.route('/execute_initial_data', methods=['GET'])
def load_initial_file():
    filename = os.getcwd() + "/src/api/data/data_inicial.json"  
    final_releases = None

    with open(filename, "r") as file:
        final_releases = json.load(file)

    session = db.session

    try:
        session.begin()
        for release_item in final_releases:
            articulo_data = release_item["release"]
            artista_data = release_item.get("artist", None)
            tracklist_data = release_item["tracklist"]

            articulo = Articulo(**articulo_data)
            artista = None

            if artista_data is not None:
                artista = Artista(**artista_data)
                
            tracks = [Tracks(articulo=articulo, **track_data) for track_data in tracklist_data]

            if artista is not None:
                articulo.artista = artista

            articulo.tracks = tracks

            try:
                image_release_name = filename = articulo.url_imagen.split("/")[-1]
                articulo.url_imagen = save_to_cloudinary(articulo.url_imagen, image_release_name)
                if artista is not None:
                    image_artist_name = filename = artista.url_imagen.split("/")[-1]
                    artista.url_imagen = save_to_cloudinary(artista.url_imagen, image_artist_name)
            except Exception as e:
                return jsonify({'message': e})


            session.add(articulo)
            if artista is not None:
                session.add(artista)
            session.add_all(tracks)
            session.commit()

        hashed_pass_admin = generate_password_hash("Admin123!")
        hashed_pass_user = generate_password_hash("User123!")
        user_admin = User(usuario="Admin", nombre="Admin", correo="admin@discostu.com", contrasenha=hashed_pass_admin, is_admin=True)
        user = User(usuario="User", nombre="User", correo="user@discostu.com", contrasenha=hashed_pass_user, is_admin=False)
        session.add(user_admin)
        session.add(user)
        session.commit()
        print("inserción de datos e imagenes terminada")
    except Exception as e:
        session.rollback()
        print(f"Transaction failed: {e}")
    finally:
        session.close()

    return jsonify(final_releases), 200

"""
Ejecutar solo cuando no exista el archivo JSON inicial para generarlo
"""
@utils_api.route('/load_initial_realeases', methods=['GET'])
def load_initial_realeases():
    GENRES = ['electronic', 'rock', 'jazz', 'blues', 'pop']
    RECORDS_NUMBER = 20
    final_realases = []
    
    print("Empezando extracción de datos de discosg...")

    for genre in GENRES:
        url=f"https://api.discogs.com/database/search?genre={genre}&type=master&key=RXfBUdaMFaqAXOnguGZG&secret=mVbHxlSJOTEIiUJYPsFXSynoEpmtPHqB&per_page={RECORDS_NUMBER}&page=1"

        response_release = requests.get(url)
        data_general = response_release.json()
        data_release = data_general["results"]
        #print("data_release: " + str(data_release))

        counter = 1

        for release in data_release:
            print("Intentando el release no: " + str(counter))
            counter += 1

            release_item = {}
            single_release = {}
            single_release["titulo"] = release["title"]
            single_release["url_imagen"] = release["cover_image"]
            #single_release["url_imagen"] = save_to_cloudinary(release["cover_image"], release["master_id"])
            single_release["sello"] = release["catno"]
            single_release["formato"] = release["format"][0]
            if(release["genre"]):
                single_release["genero"] = ", ".join(release["genre"]) if len(release["genre"]) > 1 else release["genre"][0]            
            single_release["pais"] = release["country"]
            single_release["publicado"] = release.get("year", "unassigned") #DUDAS DE ESTE CAMPO
            if(release["style"]):
                single_release["estilos"] = ", ".join(release["style"]) if len(release["style"]) > 1 else release["style"][0]
            release_item["release"] = single_release

            #SE OBTIENE INFORMACIÓN MASTER DEL RELEASE
            url_master = release["master_url"] + "?key=RXfBUdaMFaqAXOnguGZG&secret=mVbHxlSJOTEIiUJYPsFXSynoEpmtPHqB"
            response_master = requests.get(url_master)
            data_master = response_master.json()
            #print("data_master: " + str(data_master))
            tracklist = data_master.get("tracklist", [])
            #print("tracklist: " + str(tracklist))

            #SE OBTIENE INFORMACIÓN DEL TRACKLIST
            new_tracklist =[]
            for track in tracklist:
                new_track = {}
                new_track["nombre"] = track["title"]
                new_track["posicion"] = track["position"]
                new_tracklist.append(new_track)
            release_item["tracklist"] = new_tracklist
            
            #SE OBTIENE INFORMACIÓN DEL ARTISTA        
            artist = data_master.get("artists", None)
            if artist is not None:
                if artist and artist[0]["resource_url"]:
                    url_artist = artist[0]["resource_url"] + "?key=RXfBUdaMFaqAXOnguGZG&secret=mVbHxlSJOTEIiUJYPsFXSynoEpmtPHqB"
                    response_artist = requests.get(url_artist)
                    data_artist = response_artist.json()
                    #print("data_artist: " + str(data_artist));

                    single_artist = {}
                    single_artist["nombre"] = data_artist.get("name", "unasigned")
                    single_artist["nombre_real"] = data_artist.get("nombre_real", "unasigned")
                    single_artist["perfil"] = data_artist.get("profile", "unasigned")
                    if "images" in data_artist and data_artist["images"]:
                        single_artist["url_imagen"] = data_artist["images"][0].get("resource_url", "unasigned")
                        #if data_artist["images"][0].get("resource_url", "unasigned") != "unasigned":
                            #single_artist["url_imagen"] = save_to_cloudinary( data_artist["images"][0].get("resource_url"), data_artist["id"])
                    #else:
                        #single_artist["url_imagen"] = "unasigned"
                
                release_item["artist"] = single_artist

            final_realases.append(release_item)
            #print("4 segundos para el siguiente fetch y evitar error 429...")
            time.sleep(2)
    print("Extración de datos de discosg terminada...")

    save_initial_data_from_discosg(final_realases)

    return jsonify(final_realases), 200