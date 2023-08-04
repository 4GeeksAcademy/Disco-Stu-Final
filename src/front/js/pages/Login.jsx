import React, { useContext, useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";

import fondo from '../../img/LOGO2.png';

export const Login = () => {
    const navigate = useNavigate();

    const handleLogin = async (values, { setSubmitting, setFieldError }) => {
        try {
            // Aquí realizarías la lógica de inicio de sesión usando los valores (values) del formulario.
            // Por ejemplo, enviar una solicitud POST a la API para autenticar al usuario.

            // Simulación de inicio de sesión exitoso después de 1 segundo (eliminar esto en el código real).
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Redirigir al usuario a la página de inicio después del inicio de sesión exitoso.
            navigate("/");
        } catch (error) {
            // Manejar errores de inicio de sesión, por ejemplo, mostrar mensajes de error en el formulario.
            setFieldError("usernameOrMail", "Usuario o contraseña incorrecta");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container mt-3">
            <main>
                <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-2 col-xs-3"></div>
                    <div className="col-lg-6 col-md-6 col-sm-8 col-xs-6">
                        <img style={{ width: '300px' }} src={fondo} className="bg-black border-rounded" alt="store-logo" />
                        <Formik
                            initialValues={{ usernameOrMail: "", password: "" }}
                            onSubmit={handleLogin}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <div className="form-group mb-3">
                                        <label htmlFor="usernameOrMail">Nombre de usuario o correo:</label>
                                        <Field
                                            type="text"
                                            id="usernameOrMail"
                                            name="usernameOrMail"
                                            className="form-control mt-2"
                                            required
                                        />
                                        <ErrorMessage
                                            name="usernameOrMail"
                                            component="div"
                                            className="alert alert-danger mt-2"
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="password">Contraseña:</label>
                                        <Field
                                            type="password"
                                            id="password"
                                            name="password"
                                            className="form-control mt-2"
                                            required
                                        />
                                        <ErrorMessage
                                            name="password"
                                            component="div"
                                            className="alert alert-danger mt-2"
                                        />
                                    </div>
                                    <div className="d-grid gap-2 mt-4">
                                        <button
                                            type="submit"
                                            className="btn btn-success btn-block"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
                                        </button>
                                    </div>
                                    <p className="text-center mt-3">
                                        ¿No eres usuario de DiscoStu?
                                        <Link to="/register" className="ms-2">
                                            Crea una cuenta
                                        </Link>
                                    </p>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </main>
        </div>
    );
};
