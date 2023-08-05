import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";
import * as Yup from 'yup';
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { useLocation } from "react-router-dom";

const Article = ({ mode }) => {
    const { actions } = useContext(Context);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [genres, setGenres] = useState([]);
    const location = useLocation();
    const element = mode ? location?.state?.element : null;
    const [successNoti, setSuccessNoti] = useState(false);
    const [errorNoti, setErrorNoti] = useState(false);

    useEffect(() => {
        const fetchGenres = async () => {
            const response = await actions.getGenres();
            console.log(response);
            const option_genres = response.map((genre) => ({
                label: genre.name,
                value: genre.name
            }));
            setGenres(option_genres);
        }

        fetchGenres();
    }, []);

    const initialValues = {
        titulo: '',
        sello: '',
        formato: '',
        pais: '',
        publicado: '',
        genero: '',
        estilos: '',
        artista_id: ''
    };

    if (mode && mode === "edit") {
        initialValues.titulo = element.titulo;
        initialValues.sello = element.sello;
        initialValues.formato = element.formato;
        initialValues.pais = element.pais;
        initialValues.publicado = element.publicado;
        initialValues.genero = {
            label: element.genero,
            value: element.genero
        }
        initialValues.estilos = element.estilos;

        const [artist, title] = element.titulo.split(' - ')
        initialValues.artista_id = {
            label: artist,
            value: element.artista_id
        }
    }

    const validationSchema = Yup.object().shape({
        titulo: Yup.string().required("Campo requerido"),
        sello: Yup.string().required("Campo requerido"),
        pais: Yup.string().required("Campo requerido"),
        publicado: Yup.string().required("Campo requerido"),
        genero: Yup.mixed().required("Campo requerido"),
        artista_id: Yup.mixed().required("Campo requerido"),
    });

    const loadArtists = async (inputValue) => {
        try {
            if (inputValue.length >= 2) {
                const response = await actions.getAllArtistsLikeName(inputValue);
                console.log(JSON.stringify(response));
                return response.map((artist) => ({
                    label: artist.nombre,
                    value: artist.id
                }));
            } else {
                return [];
            }

        } catch (error) {
            console.error("Error loading artists: " + error);
            return [];
        }
    }

    const handleSubmit = (values, { resetForm }) => {
        setIsSubmitting(true);

        if (mode && mode === "edit")
            values.id = element.id;

        values.genero = values.genero.value;
        values.artista_id = values.artista_id.value;

        console.log("values: " + JSON.stringify(values));

        setTimeout(async () => {
            try {
                const response_data = await actions.addArticle(values);
                console.log("values: " + JSON.stringify(values));

                console.log("Success");
                setIsSubmitting(false);
                setSuccessNoti(true);
                mode = null;
                resetForm();
            } catch (error) {
                console.log(error);
                setIsSubmitting(false);
                setErrorNoti(true);
                resetForm();
            }

        }, 2000);

        setTimeout(() => {
            setSuccessNoti(false);
            setErrorNoti(false);
        }, 6000);

    };

    return (
        <div className="container">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue }) => (
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            {successNoti && (
                                <div className="row mt-3">
                                    <div className="alert alert-success" role="alert">
                                        Artículo guardado satisfatoriamente.
                                    </div>
                                </div>
                            )}
                            {errorNoti && (
                                <div className="row mt-3">
                                    <div className="alert alert-danger" role="alert">
                                        Error al guardar el artículo
                                    </div>
                                </div>
                            )}
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="titulo">Título</label>
                                    <Field className="form-control" type="text" id="titulo" name="titulo" />
                                    <ErrorMessage name="titulo" component="div" className="text-danger" />
                                </div>
                                <div>
                                    <label htmlFor="sello">Sello</label>
                                    <Field className="form-control" type="text" id="sello" name="sello" />
                                    <ErrorMessage name="sello" component="div" className="text-danger" />
                                </div>
                                <div>
                                    <label htmlFor="formato">Formato</label>
                                    <Field className="form-control" type="text" id="formato" name="formato" />
                                    <ErrorMessage name="formato" component="div" className="text-danger" />
                                </div>
                                <div>
                                    <label htmlFor="pais">País</label>
                                    <Field className="form-control" type="text" id="pais" name="pais" />
                                    <ErrorMessage name="pais" component="div" className="text-danger" />
                                </div>
                                <div>
                                    <label htmlFor="publicado">Publicado</label>
                                    <Field className="form-control" type="text" id="publicado" name="publicado" />
                                    <ErrorMessage name="publicado" component="div" className="text-danger" />
                                </div>
                                <div>
                                    <label htmlFor="genero">Género</label>
                                    <Field
                                        as={Select}
                                        id="genero"
                                        name="genero"
                                        options={genres}
                                        value={values.genero}
                                        onChange={(selectedOption) => setFieldValue("genero", selectedOption)}
                                    />
                                    <ErrorMessage name="genero" component="div" className="text-danger" />
                                </div>
                                <div>
                                    <label htmlFor="estilos">Estilos</label>
                                    <Field className="form-control" type="text" id="estilos" name="estilos" />
                                    <ErrorMessage name="estilos" component="div" className="text-danger" />
                                </div>
                                <div>
                                    <label htmlFor="artista_id">Artista</label>
                                    <AsyncSelect
                                        id="artista_id"
                                        name="artista_id"
                                        cacheOptions
                                        defaultOptions
                                        loadOptions={loadArtists}
                                        value={values.artista_id}
                                        onChange={(selectedOption) => setFieldValue("artista_id", selectedOption)}
                                    />
                                    <ErrorMessage name="artista_id" component="div" className="text-danger" />
                                </div>
                                <button className="form-control btn btn-success mt-3" type="submit">
                                    {isSubmitting ? 'Procesando...' : "Enviar"}
                                </button>
                            </Form>
                        </div>
                    </div>
                )}
            </Formik>
        </div>
    );
}

export default Article;