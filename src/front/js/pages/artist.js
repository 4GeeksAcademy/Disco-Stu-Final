import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const Artist = () => {
    const {actions} = useContext(Context);

    const [formData, setFormData] = useState({
        nombre: '',
        nombre_real: '',
        perfil: '',
        url_imagen: ''
    });
    const [errors, setErrors] = useState({});

    const errorMessage = {
        color: 'red',
        position: 'absolute',
        right: 0
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const response = await actions.createArtist(formData);
            alert(response.message);
        }
    }

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if (!formData.nombre.trim()) {
            newErrors.nombre = "Nombre es requerido";
            isValid = false;
        }

        if (!formData.nombre_real.trim()) {
            newErrors.nombre_real = "Nombre real es requerido";
            isValid = false;
        }

        if (!formData.perfil.trim()) {
            newErrors.perfil = "Perfil es requerido";
            isValid = false;
        }

        if (!formData.url_imagen.trim()) {
            newErrors.url_imagen = "La url de la imagen es requerido";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;

    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" className="form-control" name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange} />
                    {errors.nombre && (
                        <div className="row justify-content-end">
                            <div className="col-auto text-danger">{errors.nombre}</div>
                        </div>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="nombre_real">Nombre real</label>
                    <input type="text" className="form-control" name="nombre_real"
                        value={formData.nombre_real}
                        onChange={handleInputChange} />
                    {errors.nombre_real && (
                        <div className="row justify-content-end">
                            <div className="col-auto text-danger">{errors.nombre_real}</div>
                        </div>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="perfil">Perfil</label>
                    <input type="text" className="form-control" name="perfil"
                        value={formData.perfil}
                        onChange={handleInputChange} />
                    {errors.perfil && (
                        <div className="row justify-content-end">
                            <div className="col-auto text-danger">{errors.perfil}</div>
                        </div>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="url_imagen">Foto</label>
                    <input type="text" className="form-control" name="url_imagen"
                        value={formData.url_imagen}
                        onChange={handleInputChange} />
                    {errors.url_imagen && (
                        <div className="row justify-content-end">
                            <div className="col-auto text-danger">{errors.url_imagen}</div>
                        </div>
                    )}
                </div>

                <button type="submit" className="btn btn-primary mt-2">Guardar</button>
            </form>
        </div>
    );
};
