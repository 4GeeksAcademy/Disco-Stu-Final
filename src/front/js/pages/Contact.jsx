import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    email: yup.string().email('Correo electrónico inválido').required('El correo electrónico es obligatorio'),
    subject: yup.string().required('El asunto es obligatorio'),
    message: yup.string().required('El mensaje es obligatorio'),
});

export const ContactForm = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            subject: '',
            message: '',
        },
        validationSchema,
        onSubmit: values => {
            console.log(values);
        },
    });

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            {formik.touched.email && formik.errors.email && <div className="invalid-feedback">{formik.errors.email}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="subject" className="form-label">Asunto:</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                className={`form-control ${formik.touched.subject && formik.errors.subject ? 'is-invalid' : ''}`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.subject}
                            />
                            {formik.touched.subject && formik.errors.subject && <div className="invalid-feedback">{formik.errors.subject}</div>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">Mensaje:</label>
                            <textarea
                                id="message"
                                name="message"
                                className={`form-control ${formik.touched.message && formik.errors.message ? 'is-invalid' : ''}`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.message}
                            />
                            {formik.touched.message && formik.errors.message && <div className="invalid-feedback">{formik.errors.message}</div>}
                        </div>
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-primary">Enviar</button>
                            <button type="button" className="btn btn-secondary">Cancelar</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

