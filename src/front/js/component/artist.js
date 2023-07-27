import React, {useState} from "react";

export const Artist = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        nombre_real: '',
        perfil: '',
        url_imagen: ''
    });

    const handleInputChange = (e) => {
        const{name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(JSON.stringify(formData));
    }

	return (
        <div classNameName="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label for="nombre">Nombre</label>
                    <input type="text" className="form-control" name="nombre" 
                        value={formData.nombre}
                        onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label for="nombre_real">Nombre real</label>
                    <input type="text" className="form-control" name="nombre_real" 
                        value={formData.nombre_real} 
                        onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label for="perfil">Perfil</label>
                    <input type="text" className="form-control" name="perfil" 
                        value={formData.perfil} 
                        onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label for="url_imagen">Foto</label>
                    <input type="text" className="form-control" name="url_imagen" 
                        value={formData.url_imagen} 
                        onChange={handleInputChange} />
                </div>                
                <button type="submit" className="btn btn-primary">Guardar</button>
            </form>
        </div>
	);
};
