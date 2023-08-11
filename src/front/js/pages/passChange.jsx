import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage } from 'formik';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Este campo es requerido'),
    newPassword: Yup.string().required('Este campo es requerido'),
    confirmPassword: Yup.string()
        .required('Este campo es requerido')
        .oneOf([Yup.ref('newPassword'), null], 'Las contraseñas no coinciden'),
});

export const ChangePassword = () => {
    const handleSubmit = async (values, actions) => {
        try {
            if (response.ok) {
                // Reset form fields
                actions.resetForm();
                // Show SweetAlert success message
                Swal.fire('Éxito', 'Contraseña cambiada exitosamente.', 'success');
            } else {
                // Show SweetAlert error message
                Swal.fire('Error', 'No se pudo cambiar la contraseña.', 'error');
            }
        } catch (error) {
            actions.setFieldError('currentPassword', 'Contraseña actual incorrecta');
        }
    };

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
                    <h3 className="text-center">Administrar contraseña</h3>
                    <div className="d-flex justify-content-end text-center py-1">
                    </div>
                </div>
            </div>
            <main>
                <div className="row mt-4">
                    <div className="col-lg-3 col-md-3 col-sm-2 col-xs-3"></div>
                    <div className="col-lg-6 col-md-6 col-sm-8 col-xs-6">
                        <Formik
                            initialValues={{
                                currentPassword: '',
                                newPassword: '',
                                confirmPassword: '',
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
                                            type="password"
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
                                            type="password"
                                            name="newPassword"
                                            id="newPassword"
                                        />
                                        <ErrorMessage
                                            name="newPassword"
                                            component="div"
                                            className="error-message"
                                        />
                                        <label htmlFor="confirmPassword">Confirmar Nueva Contraseña</label>
                                        <Field
                                            className="form-control mt-2"
                                            type="password"
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
                                                type="submit"
                                                className="btn btn-outline-success btn-block"
                                                disabled={isSubmitting}
                                            >
                                                Cambiar Contraseña
                                            </button>
                                            <Link to="/user-profile" className="btn btn-outline-secondary" data-mdb-ripple-color="dark">
                                                Cancelar
                                            </Link>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </main>
        </div>
    );
};