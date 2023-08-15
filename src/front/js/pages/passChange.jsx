import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage } from 'formik';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';


export const ChangePassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const validationSchema = Yup.object().shape({
        currentPassword: Yup.string().required('Este campo es requerido'),
        newPassword: Yup.string().required('Este campo es requerido'),
        confirmPassword: Yup.string()
            .required('Este campo es requerido')
            .oneOf([Yup.ref('newPassword'), null], 'Las contraseñas no coinciden'),
    });
    const handleSubmit = async (values, actions) => {
        try {
            const response = await actions.changePassword({
                currentPassword: values.currentPassword,
                newPassword: values.newPassword
            });

            if (response.error) {

                Swal.fire('Error', response.error, 'error');
            } else {

                actions.resetForm();

                Swal.fire('Éxito', 'Contraseña cambiada exitosamente.', 'success');
            }
        } catch (error) {
            actions.setFieldError('currentPassword', 'Contraseña actual incorrecta');
        }
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
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
                    className="text-white d-flex flex-row"
                    style={{ backgroundColor: "#000", height: "100px" }}
                >
                    <div
                        className="ms-4 mt-5 d-flex flex-column"
                        style={{ width: "150px" }}
                    ></div>
                    <div className="ms-3" style={{ marginTop: "130px" }}></div>
                </div>
                <div
                    className="p-4 text-black"
                    style={{ backgroundColor: "#f8f9fa" }}
                >
                </div>

                {/* Botones */}
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
                                        Información Personal
                                    </button>
                                    <button
                                        onClick={() => changePassword()}
                                        style={{ width: "100%", textAlign: "left", padding: "6px" }}
                                        type="button"
                                        className="btn btn-outline"
                                    >
                                        <strong>Cuenta</strong>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="col-lg-6 col-md-6 col-sm-8 col-xs-6">
                                <Formik
                                    initialValues={{
                                        currentPassword: "",
                                        newPassword: "",
                                        confirmPassword: "",
                                    }}
                                    validationSchema={validationSchema}
                                    onSubmit={handleSubmit}
                                >
                                    {({ isSubmitting }) => (
                                        <Form>
                                            <div className="form-group mb-3">
                                                <label htmlFor="currentPassword">Contraseña Actual</label>
                                                <Field
                                                    className="form-control mt-2"
                                                    type={showPassword ? "text" : "password"} // Use the showPassword state to toggle password visibility
                                                    name="currentPassword"
                                                    id="currentPassword"
                                                />
                                                <ErrorMessage
                                                    name="currentPassword"
                                                    component="div"
                                                    className="error-message"
                                                />
                                                <label htmlFor="newPassword">Nueva Contraseña</label>
                                                <Field
                                                    className="form-control mt-2"
                                                    type={showPassword ? "text" : "password"} // Use the showPassword state to toggle password visibility
                                                    name="newPassword"
                                                    id="newPassword"
                                                />
                                                <ErrorMessage
                                                    name="newPassword"
                                                    component="div"
                                                    className="error-message"
                                                />
                                                <label htmlFor="confirmPassword">
                                                    Confirmar Nueva Contraseña
                                                </label>
                                                <Field
                                                    className="form-control mt-2"
                                                    type={showPassword ? "text" : "password"} // Use the showPassword state to toggle password visibility
                                                    name="confirmPassword"
                                                    id="confirmPassword"
                                                />
                                                <ErrorMessage
                                                    name="confirmPassword"
                                                    component="div"
                                                    className="error-message"
                                                />
                                                <div className="d-grid gap-2 mt-4">
                                                    <button
                                                        type="button"
                                                        id="show_hide_password"
                                                        className="btn btn-outline-secondary btn-sm"
                                                        onClick={handleTogglePassword}
                                                    >
                                                        {showPassword ? "Ocultar" : "Mostrar"}
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        className="btn btn-outline-success btn-block"
                                                        disabled={isSubmitting}
                                                    >
                                                        Cambiar Contraseña
                                                    </button>
                                                    <Link
                                                        to="/user-profile"
                                                        className="btn btn-outline-secondary"
                                                        data-mdb-ripple-color="dark"
                                                    >
                                                        Cancelar
                                                    </Link>
                                                </div>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};