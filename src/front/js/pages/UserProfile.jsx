import React, { useState, useEffect, useRef, useContext } from "react";

import { Context } from "../store/appContext";

export const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const { store, actions } = useContext(Context);

    const randomIMG = "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-2.webp";

    useEffect(() => {

        const fetchUserData = async () => {
            try {

                const uid = localStorage.getItem('user');
                const userId = uid;
                const userData = await actions.getUserById(userId);

                console.log(userData);
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
                <div className=" text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                    <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                        <img
                            src={randomIMG}
                            alt="Generic placeholder image"
                            className="img-fluid img-thumbnail mt-4 mb-2"
                            style={{ width: '150px', zIndex: '1' }}
                        />

                    </div>
                    <div className="ms-3" style={{ marginTop: '130px' }}>
                        {/* <h5>{userData}</h5>
                                <p>{userData}</p> */}
                    </div>
                </div>
                <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                    <div className="d-flex justify-content-end text-center py-1">

                        <button type="button" className="btn btn-outline-dark" data-mdb-ripple-color="dark" style={{ zIndex: '1' }}>
                            <i className="fa-solid fa-gear"></i> Configuración
                        </button>

                    </div>
                </div>
                <div className="card-body p-4 text-black">
                    <div className="mb-5">
                        <p className="lead fw-normal mb-1">Dirección de envio:</p>
                        <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                            <p className="font-italic mb-1">Dirección: </p>
                            <p className="font-italic mb-1">Cuidad: </p>
                            <p className="font-italic mb-0">Pais</p>
                            <p className="font-italic mb-0">Codigo Postal: </p>
                            <p className="font-italic mb-0">Telefono: </p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <p className="lead fw-normal mb-0">Recent tracks</p>
                        <p className="mb-0">
                            <a href="#!" className="text-muted">
                                Show all
                            </a>
                        </p>
                    </div>
                    {/* <div className="row g-2">
                    <div className="col mb-2">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                            alt="image 1"
                            className="w-100 rounded-3"
                        />
                    </div>
                    <div className="col mb-2">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                            alt="image 1"
                            className="w-100 rounded-3"
                        />
                    </div>
                </div>
                <div className="row g-2">
                    <div className="col">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                            alt="image 1"
                            className="w-100 rounded-3"
                        />
                    </div>
                    <div className="col">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                            alt="image 1"
                            className="w-100 rounded-3"
                        />
                    </div> */}
                </div>
            </div>
        </div>

    );
};

