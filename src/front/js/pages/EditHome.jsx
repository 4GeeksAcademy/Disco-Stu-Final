import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../store/appContext'
import { useNavigate } from 'react-router-dom';


const EditHome = () => {

    const navigate = useNavigate()
    const { actions } = useContext(Context)
    const [posicion, setPosicion] = useState('')
    const [titulo, setTitulo] = useState('')
    const [subtitulo, setSubtitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [imagen, setImagen] = useState(null)

    const handlePosicion = (e) => {
        setPosicion(e.target.value)
    }
    const handleTitulo = (e) => {
        setTitulo(e.target.value)
    }
    const handleSubtitulo = (e) => {
        setSubtitulo(e.target.value)
    }
    const handleDescripcion = (e) => {
        setDescripcion(e.target.value)
    }
    const handleImagen = (e) => {
        setImagen(e.target.files[0])
    }

    const handlerNewCuriositie = async () => {
        const formData = new FormData();
        formData.append('posicion', posicion);
        formData.append('titulo', titulo);
        formData.append('subtitulo', subtitulo);
        formData.append('descripcion', descripcion);
        formData.append('imagen', imagen);
        const response = await actions.addCuriositie(formData)
        if (response.status == 'COMPLETED') {
            navigate('/')
        }
    }

    return (
        <div className="container-flui">
            {/* Encabezado */}
            <div className="container-fluid px-0 mx-0">
                <div className="card border-0 rounded-0">
                    <div
                        className="text-white d-flex flex-row"
                        style={{ backgroundColor: "#000", height: "200px" }}
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
                        <h3 className="text-center">Panel de Administrador</h3>
                        <div className="d-flex justify-content-end text-center py-1">
                        </div>
                    </div>
                    <div className="card-body p-4 text-black"></div>
                </div>
            </div>

            <div id='content' style={{ padding: '20px 80px', border: '1px solid #eeeeee', width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
                <h1>Editar curiosidades</h1>
                <div style={{ marginTop: '20px' }}>
                    <label htmlFor="posicion">Posicion del recuadro</label>
                    <select onChange={(e) => handlePosicion(e)} value={posicion} className="form-select form-select-sm" id='posicion' aria-label="Small select example" style={{ width: '14rem' }}>
                        <option value="">Seleccionar posicion</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div className='d-flex flex-column'>
                    <label htmlFor="titulo">Título</label>
                    <input onChange={(e) => handleTitulo(e)} value={titulo} type="text" id='titulo' />
                </div>
                <div className='d-flex flex-column'>
                    <label htmlFor="subtitulo">Subtítulo</label>
                    <input onChange={(e) => handleSubtitulo(e)} value={subtitulo} type="text" id='subtitulo' />
                </div>
                <div className='d-flex flex-column'>
                    <label htmlFor="descripcion">Descripción</label>
                    <input onChange={(e) => handleDescripcion(e)} value={descripcion} type="text" id='descripcion' maxLength='4000' />
                </div>
                <div className='d-flex flex-column'>
                    <label htmlFor="imagen">Imagen</label>
                    <input onChange={(e) => handleImagen(e)} type="file" id='imagen' accept="image/*" />
                </div>
                <div style={{ marginLeft: '64.8rem', marginTop: '10px' }}>
                    <button onClick={() => handlerNewCuriositie()} type="button" className="btn btn-dark">Confirmar</button>
                </div>
            </div>
        </div>

    )
}

export default EditHome