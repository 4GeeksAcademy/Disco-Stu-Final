"""
This module takes care of starting the API Server for users, Loading the DB and Adding the endpoints
"""
import requests, time
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Articulo, Tracks, Artista
from api.utils import generate_sitemap, APIException

utils_api = Blueprint('utils_api', __name__)

"""
Solo para pruebas iniciales. Este método no debería estar en productivo
"""
@utils_api.route('/load_initial_realeases', methods=['GET'])
def load_initial_realeases():
    url="https://api.discogs.com/database/search?genre=HIP+HOP&type=master&key=RXfBUdaMFaqAXOnguGZG&secret=mVbHxlSJOTEIiUJYPsFXSynoEpmtPHqB&per_page=40&page=1"
    final_realases = []
    release_item = {}

    response_release = requests.get(url)
    data_general = response_release.json()
    data_release = data_general["results"]
    #print("data_release: " + str(data_release))

    for release in data_release:
        release_item = {}
        single_release = {}
        single_release["titulo"] = release["title"]
        single_release["url_imagen"] = release["cover_image"]
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
                else:
                    single_artist["url_imagen"] = "unasigned"
            
            release_item["artist"] = single_artist

        final_realases.append(release_item)
        time.sleep(1)

    #UNA VEZ OBTENIDO LOS DATOS DE API EXTERNA PROCEDEMOS A TRABAJAR LOCALMENTE LAS INSERCIONES DE BD
    session = db.session
    try:
        session.begin()
        for release_item in final_realases:
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

            session.add(articulo)
            if artista is not None:
                session.add(artista)
            session.add_all(tracks)
        
        session.commit()
    except Exception as e:
        session.rollback()
        print(f"Transaction failed: {e}")
    finally:
        session.close()

    return jsonify(final_realases), 200