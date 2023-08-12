import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import PayPal1 from '../../img/PayPal1.png'
import PayPal2 from '../../img/PayPal2.png'
import PayPal3 from '../../img/PayPal3.png'

import { Context } from "../store/appContext";

export const UserSellerDataEdit = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const [sellerData, setSellerData] = useState({
        cliente_ID_paypal: "",
        secret_key_paypal: "",
        update_or_delete: 'update',
    });

    const [formErrors, setFormErrors] = useState({
        cliente_ID_paypal: "",
        secret_key_paypal: "",
    });

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setSellerData({
            ...sellerData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const validateForm = () => {
        const newErrors = {
            cliente_ID_paypal: "",
            secret_key_paypal: "",
        };

        let isValid = true;

        if (sellerData.cliente_ID_paypal.trim() === "") {
            newErrors.cliente_ID_paypal = "El Cliente ID es obligatorio.";
            isValid = false;
        }

        if (sellerData.secret_key_paypal.trim() === "") {
            newErrors.secret_key_paypal = "La Secret Key es obligatoria.";
            isValid = false;
        }

        setFormErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const responseMessage = await actions.editSeller(sellerData);

            console.log(responseMessage);

            // Redirigir al usuario después de guardar los cambios
            navigate('/user-profile');

        } catch (error) {
            console.error(error.message);
            // Manejo de errores
        }
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
                        <button type="submit" className="btn btn-outline-dark" data-mdb-ripple-color="dark" style={{ zIndex: '1' }} onClick={handleSubmit} >
                            <i className="fa-solid fa-gear"></i> Guardar cambios
                        </button>

                    </div>
                </div>
                <div className="card-body p-4 text-black">
                    <div className="container">
                        <h1>Editar informacion de vendedor</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="cliente_ID_paypal">Cliente ID*:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cliente_ID_paypal"
                                    name="cliente_ID_paypal"
                                    value={sellerData.cliente_ID_paypal}
                                    onChange={handleInputChange}
                                />
                                {formErrors.cliente_ID_paypal && <div className="error">{formErrors.cliente_ID_paypal}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="secret_key_paypal">Secret Key*:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="secret_key_paypal"
                                    name="secret_key_paypal"
                                    value={sellerData.secret_key_paypal}
                                    onChange={handleInputChange}
                                />
                                {formErrors.secret_key_paypal && <div className="error">{formErrors.secret_key_paypal}</div>}
                            </div>
                            <p>*esta información no presenta riesgos de seguridad; su único propósito es identificar al vendedor en las comunicaciones con PayPal.</p>
                        </form>
                        <h5><strong>¿Como encuentro esta información?</strong></h5>
                        <p><strong>Disco Stu Store utiliza PayPal como plataforma de pago. Para completar los pasos, debes registrarte en <a href="https://www.paypal.com/" target="_blank">PayPal</a>.</strong></p>
                        <p>1) Ingresa en el Dashboard de <a href="https://developer.paypal.com" target="_blank">PayPal Developer</a> con tu cuenta de PayPal.</p>
                        <p>2) Activa el formato <strong>Live</strong> y crea tu cuenta Business en caso de no tenerla.</p>
                        <img style={{ width: '100%', border: 'solid 1px #eeeeee', marginBottom: '20px' }} src={PayPal1} alt="" />
                        <p>3) En la pagina de PayPal Developer, dirigete a <strong>Apps & Credentials</strong> y haz click en la seccion editar de tu empresa.</p>
                        <img style={{ width: '100%', border: 'solid 1px #eeeeee', marginBottom: '20px' }} src={PayPal2} alt="" />
                        <p>4) Copia los valores de <strong>Client ID</strong> y <strong>Secret Key</strong> y pegalo en tu informacion de vendedor.</p>
                        <img style={{ width: '100%', border: 'solid 1px #eeeeee', marginBottom: '20px' }} src={PayPal3} alt="" />
                    </div>
                </div>
            </div>
        </div>

    );
};

