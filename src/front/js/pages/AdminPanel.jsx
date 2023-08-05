import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";
import Swal from "sweetalert2";

export const AdminPanel = () => {
    const { store } = useContext(Context);

    const navigate = useNavigate()

    const handleNavigateUsers = () => {
        navigate('/admin-users')
    }

    return (

        <div className="container-fluid px-0 mx-0">

            <div className="card border-0 rounded-0">
                <div className=" text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                    <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                    </div>
                    <div className="ms-3" style={{ marginTop: '130px' }}>
                    </div>
                </div>
                <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                    <div className="d-flex justify-content-end text-center py-1">

                        <Link to="/user-profile" className="nav-link text-dark btn" data-mdb-ripple-color="dark" style={{ zIndex: '1' }}>
                            Cancelar
                        </Link>
                        <button type="button" className="btn btn-outline-dark" data-mdb-ripple-color="dark" style={{ zIndex: '1' }}>
                            <i className="fa-solid fa-gear"></i> Guardar datos
                        </button>

                    </div>
                </div>
                <div className="card-body p-4 text-black">
                </div>
            </div>
        </div>
    );
};
