import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserFavorites } from './userFavorites.jsx'

import { Context } from "../store/appContext";

export const UserProfile = () => {
    const [userData, setUserData] = useState({});
    const { actions } = useContext(Context);

    useEffect(() => {

        const fetchUserData = async () => {
            try {
                const userId = localStorage.getItem('userID');
                const userData = await actions.getUserById(userId);
                console.log("Data de usuario", userData);
                setUserData(userData);
            } catch (error) {
                console.error("Error al obtener la información del usuario:", error);
            }
        };
        fetchUserData();
    }, []);

    return (
        <div className="container-fluid px-0 mx-0">

            <div className="card border-0 rounded-0">
                <div className=" text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '100px' }}>
                    <div className="ms-3" style={{ marginTop: '50px' }}>
                        <h5 className="text-white">{userData.usuario}</h5>
                    </div>
                </div>
                <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                    <h3 className="text-center mb-3">Perfil de {userData.nombre}</h3>
                    <div className="d-flex justify-content-center align-items-center flex-column flex-md-row">
                        {/* Agregar cualquier otro contenido aquí */}

                        <div className="mt-3 mt-md-0 ml-md-auto">
                            <Link to="/edit_user" className="btn btn-outline-dark" data-mdb-ripple-color="dark">
                                <i className="fa-solid fa-gear"></i> Editar
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="card-body p-4 text-black">
                    <div className="mb-5">
                        <p className="lead fw-normal mb-1">Información de envio: </p>
                        <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                            <p className="font-italic mb-1">Dirección: {userData.direccion_comprador}</p>
                            <p className="font-italic mb-1">Cuidad: {userData.ciudad_comprador} </p>
                            <p className="font-italic mb-0">Pais: {userData.pais_comprador}</p>
                            <p className="font-italic mb-0">Codigo Postal: {userData.codigo_postal_comprador} </p>
                            <p className="font-italic mb-0">Telefono: {userData.telefono_comprador} </p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <p className="lead fw-normal mb-0">Recent tracks</p>
                        <p className="mb-0">
                        </p>
                    </div>
                </div>
            </div>
        </div>

    );
};

