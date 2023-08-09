import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage } from 'formik';
import Swal from 'sweetalert2';

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
        <div className="container mt-3">
            <main>
                <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-2 col-xs-3"></div>
                    <div className="col-lg-6 col-md-6 col-sm-8 col-xs-6">
                        <h1 className="text-center mb-4">Cambiar Contraseña</h1>
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
                                                className="btn btn-success btn-block"
                                                disabled={isSubmitting}
                                            >
                                                Cambiar Contraseña
                                            </button>
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