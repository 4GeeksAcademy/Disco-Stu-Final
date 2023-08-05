import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const UserProfileEdit = () => {
    const newUserData = {
        nombre: user.nombre,
        correo: user.correo,
        direccion_comprador: user.direccion_comprador,
        ciudad_comprador: user.ciudad_comprador,
        estado_comprador: user.estado_comprador,
        codigo_postal_comprador: user.codigo_postal_comprador,
        pais_comprador: user.pais_comprador,
        telefono_comprador: user.telefono_comprador,
    };


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
                    <form>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre:</label>
                            <input type="text" class="form-control" id="nombre" value="John Doe" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="usuario">Usuario:</label>
                            <input type="text" class="form-control" id="usuario" value="johndoe" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="correo">Correo:</label>
                            <input type="email" class="form-control" id="correo" value="john@example.com" />
                        </div>
                        <div className="form-check">
                            <input type="checkbox" class="form-check-input" id="is_admin" />
                            <label class="form-check-label" for="is_admin">Es Administrador</label>
                        </div>
                        <div className="form-group">
                            <label for="direccion_comprador">Dirección del Comprador:</label>
                            <input type="text" class="form-control" id="direccion_comprador" value="123 Main St" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="ciudad_comprador">Ciudad del Comprador:</label>
                            <input type="text" class="form-control" id="ciudad_comprador" value="New York" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="estado_comprador">Estado del Comprador:</label>
                            <input type="text" class="form-control" id="estado_comprador" value="NY" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="codigo_postal_comprador">Código Postal del Comprador:</label>
                            <input type="text" class="form-control" id="codigo_postal_comprador" value="10001" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="pais_comprador">País del Comprador:</label>
                            <input type="text" class="form-control" id="pais_comprador" value="USA" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="telefono_comprador">Teléfono del Comprador:</label>
                            <input type="tel" class="form-control" id="telefono_comprador" value="123-456-7890" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="valoracion">Valoración:</label>
                            <input type="number" step="0.1" class="form-control" id="valoracion" value="4.5" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cantidad_de_valoraciones">Cantidad de Valoraciones:</label>
                            <input type="number" class="form-control" id="cantidad_de_valoraciones" value="10" />
                        </div>
                        <button type="submit" className="btn btn-primary">Guardar Cambios</button>
                    </form>
                </div>
            </div>
        </div>

    );
};

