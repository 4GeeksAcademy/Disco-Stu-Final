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

        <div className="container mt-3">
            <main>
                <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-2 col-xs-3">
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-8 col-xs-6">
                        <h1 className="text-center mb-4">Vista Admin</h1>
                    </div>
                    <div style={{ display: 'flex', margin: '30px 100px 30px 100px' }}>
                        <div id='messages_control' style={{ width: '200px' }}>
                            <div style={{ marginTop: '10px' }}>
                                <div>
                                    <button style={{ width: '100%', textAlign: 'left', padding: '6px' }} type="button" className="btn btn-outline">Notificaciones</button>
                                    <button onClick={() => handleNavigateUsers()} style={{ width: '100%', textAlign: 'left', padding: '6px' }} type="button" className="btn btn-outline">Usuarios</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div >
            </main >
        </div >


    );
};
