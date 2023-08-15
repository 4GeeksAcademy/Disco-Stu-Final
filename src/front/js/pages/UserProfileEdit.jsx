import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const UserProfileEdit = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const userId = localStorage.getItem('userID');
    const handleSubmit = async (event) => {
        event.preventDefault();

        const userData = {
            nombre: event.target.nombre.value,
            direccion_comprador: event.target.direccion_comprador.value,
        };

        try {
            const new_data = await actions.editUser(userId, userData);
            console.log(new_data);
            navigate("/user-profile");
        } catch (error) {
            console.error(error.message); // Maneja el error en caso de fallo
        }
    };

    const editProfile = () => {

        navigate('/edit-profile')
    }

    const changePassword = () => {
        navigate('/update-password')
    }

    return (
        <div className="container-fluid px-0 mx-0">
            <div className="card border-0 rounded-0">
                <div
                    className=" text-white d-flex flex-row"
                    style={{ backgroundColor: "#000", height: "100px" }}
                >
                    <div
                        className="ms-4 mt-5 d-flex flex-column"
                        style={{ width: "150px" }}
                    ></div>
                    <div className="ms-3" style={{ marginTop: "130px" }}></div>
                </div>
                <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                </div>
                <div className="container-fluid" style={{ margin: "30px" }}>
                    <div className="row me-3">
                        <div className="col-md-3">
                            <div style={{ marginTop: "10px" }}>
                                <div>
                                    <button
                                        onClick={() => editProfile()}
                                        style={{ width: "100%", textAlign: "left", padding: "6px" }}
                                        type="button"
                                        className="btn btn-outline"
                                    >
                                        <strong>Información Personal</strong>
                                    </button>
                                    <button
                                        onClick={() => changePassword()}
                                        style={{ width: "100%", textAlign: "left", padding: "6px" }}
                                        type="button"
                                        className="btn btn-outline"
                                    >
                                        Cuenta
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="col-lg-6 col-md-6 col-sm-8 col-xs-6">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="nombre">Nombre:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="nombre"
                                            name="nombre"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="direccion_comprador">
                                            Dirección del Comprador:
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="direccion_comprador"
                                            name="direccion_comprador"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="ciudad_comprador">
                                            Ciudad del Comprador:
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="ciudad_comprador"
                                            name="ciudad_comprador"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="estado_comprador">
                                            Estado del Comprador:
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="estado_comprador"
                                            name="estado_comprador"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="codigo_postal_comprador">
                                            Código Postal del Comprador:
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="codigo_postal_comprador"
                                            name="codigo_postal_comprador"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="pais_comprador">
                                            País del Comprador:
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="pais_comprador"
                                            name="pais_comprador"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="telefono_comprador">Teléfono:</label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            id="telefono_comprador"
                                            name="telefono_comprador"
                                        />
                                    </div>
                                    <div className="d-grid gap-2 mt-4">
                                        <button
                                            type="submit"
                                            className="btn btn-outline-success btn-block"
                                        >
                                            <i className="fa-solid fa-gear"></i> Guardar cambios
                                        </button>
                                        <Link to="/user-profile" className="btn btn-outline-secondary" data-mdb-ripple-color="dark">
                                            Cancelar
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfileEdit;