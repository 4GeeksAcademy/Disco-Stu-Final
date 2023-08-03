import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";

const Article = () => {
    const[isSubmitting, setIsSubmitting] = useState(false);

    const initialValues = () => {}
    const validationSchema = () => {}
    const handleSubmit = () => {}

    return (
        <div className="container">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div>
                        <label htmlFor="title">Título</label>
                        <Field type="text" id="title" name="title" />
                        <ErrorMessage name="title" component="div" className="error" />
                    </div>
                    <div>
                        <label htmlFor="sello">Sello</label>
                        <Field type="text" id="sello" name="sello" />
                        <ErrorMessage name="sello" component="div" className="error" />
                    </div>
                    <div>
                        <label htmlFor="formato">Formato</label>
                        <Field type="text" id="formato" name="formato" />
                        <ErrorMessage name="formato" component="div" className="error" />
                    </div>
                    <div>
                        <label htmlFor="pais">País</label>
                        <Field type="text" id="pais" name="pais" />
                        <ErrorMessage name="pais" component="div" className="error" />
                    </div>
                    <div>
                        <label htmlFor="publicado">Publicado</label>
                        <Field type="text" id="publicado" name="publicado" />
                        <ErrorMessage name="publicado" component="div" className="error" />
                    </div>
                    <div>
                        <label htmlFor="genero">Género</label>
                        <Field type="text" id="genero" name="genero" />
                        <ErrorMessage name="genero" component="div" className="error" />
                    </div>
                    <div>
                        <label htmlFor="estilos">Estilos</label>
                        <Field type="text" id="estilos" name="estilos" />
                        <ErrorMessage name="estilos" component="div" className="error" />
                    </div>
                    <button type="submit" disabled="{isSubmitting}">
                        {isSubmitting ? 'Procesando...': "Envíado"}
                    </button>
                </Form>
            </Formik>
        </div>
    );
}

export default Article;