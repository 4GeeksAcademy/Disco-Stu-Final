import React, {useState, useContext} from 'react';
import { Context } from '../store/appContext'
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../../styles/SellArticle.css';

const SellArticle = () => {
    const article_example = {
        'titulo': 'Younger Than Me - 90s Wax One',
        'sello': '90s Wax One',
        'formato': 'Vinyl, Limited Edition, Numbered, Yellow',
        'pais': 'UK',
        'publicado': '6 Oct 2000',
        'genero': 'Electronica',
        'estilos': 'House, Acid House, New Beat',
        'url_imagen': 'https://i.discogs.com/BLXOkeKHYuLrZATYJ1a61EP4m308Sv6PlEskMqGhywc/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTExMDU4/ODk3LTE1MTY2NTEx/NDctOTQ3OS5qcGVn.jpeg'
    };

    const { store, actions } = useContext(Context)

    const [ soporte, setSoporte ] = useState({})
    const [ funda, setFunda ] = useState('')
    const [ comentario, setComentario ] = useState('')
    const [ cantidad, setCantidad ] = useState('')
    const [ precio, setPrecio ] = useState('')

    const handleSoporte = (event) => {
        setSoporte(event.target.value)
    }
    const handleFunda = (event) => {
        setFunda(event.target.value)
    }
    const handleComentario = (event) => {
        setComentario(event.target.value)
    }
    const handleCantidad = (event) => {
        setCantidad(event.target.value)
    }
    const handlePrecio = (event) => {
        setPrecio(event.target.value)
    }

    // Falta traernos el id del articulo

    const postOffer = () => {
        const user_id = localStorage.getItem('userId');
        offer = {
            'vendedor_id': user_id,
            'articulo_id': '12',
            'condicion_soporte': soporte,
            'condicion_funda': funda,
            'comentario': comentario,
            'cantidad': cantidad,
            'precio': precio,
        }
        actions.post_offer(offer)
    }

    return (
        <div className="container">
            <div id='title'>
                <h4><strong>Vender articulo</strong></h4>
                <p>Por favor, verifica que este sea el articulo que deseas vender.</p>
            </div>
            <div id="article_info" className="row d-flex">
                <div id="image" className='col-md-2'>
                    <img className="img-fluid" src={article_example.url_imagen} alt="" />
                </div>
                <div className="col-md-9">
                    <p className="h5 font-weight-bold">{article_example.titulo}</p>
                    <div className="d-flex">
                        <p>Sello:</p>
                        <p>{article_example.sello}</p>
                    </div>
                    <div className="d-flex">
                        <p>Formato:</p>
                        <p>{article_example.formato}</p>
                    </div>
                    <div className="d-flex">
                        <p>Pais:</p>
                        <p>{article_example.pais}</p>
                    </div>
                    <div className="d-flex">
                        <p>Publicado:</p>
                        <p>{article_example.publicado}</p>
                    </div>
                    <div className="d-flex">
                        <p>Genero:</p>
                        <p>{article_example.genero}</p>
                    </div>
                    <div className="d-flex">
                        <p>Estilos:</p>
                        <p>{article_example.estilos}</p>
                    </div>
                </div>
            </div>
            <div id='advertencia'>
                <p style={{ fontSize: '1rem', padding: '5px 0px 5px 10px' }}><strong>El listado de articulos es gratis, Disco Stu cobrara una tarifa del _% una vez finalizada la venta.</strong></p>
            </div>
            <div id='properties'>
                <div>
                    <h5><strong>Estado y comentarios</strong></h5>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <label htmlFor="condicionSoporte">Condición del soporte</label>
                    <select onChange={(e) => handleSoporte(e)} value={soporte} className="form-select form-select-sm" id='condicionSoporte' aria-label="Small select example">
                        <option selected>Seleccionar condicion</option>
                        <option value="1">Nuevo (N)</option>
                        <option value="2">Casi Nuevo (CN)</option>
                        <option value="3">Buen Estado (BE)</option>
                        <option value="4">Gastado (G)</option>
                        <option value="5">Deteriorado (D)</option>
                    </select>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <label htmlFor="condicionFunda">Condición de la funda</label>
                    <select onChange={(e) => handleFunda(e)} value={funda} className="form-select form-select-sm" id='condicionFunda' aria-label="Small select example">
                        <option selected>Seleccionar condicion</option>
                        <option value="1">Genérico</option>
                        <option value="2">Sin Funda</option>
                        <option value="3">Nuevo (N)</option>
                        <option value="4">Casi Nuevo (CN)</option>
                        <option value="5">Buen Estado (BE)</option>
                        <option value="6">Gastado (G)</option>
                        <option value="7">Deteriorado (D)</option>
                    </select>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <label htmlFor="comentarios">Comentarios específicos</label>
                    <textarea onChange={(e) => handleComentario(e)} value={comentario} maxLength="300" className="form-control" id='comentarios' placeholder='ejemplo: funda con bordes dañados y soporte con etiqueta de precio en galleta.'></textarea>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <label htmlFor="cantidad">Cantidad</label>
                    <select onChange={(e) => handleCantidad(e)} value={cantidad} style={{ width: '80px' }} className="form-select form-select-sm" id='cantidad' aria-label="Small select example">
                        <option selected></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div id='precio' style={{ marginTop: '20px' }}>
                    <h5><strong>Precio</strong></h5>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <label htmlFor="precio">Precio (USD)</label>
                    <div style={{ paddingLeft: '10px' }}>
                        <span>$</span>
                        <input onChange={(e) => handlePrecio(e)} value={precio} type="text" style={{width: '100px'}}/>
                    </div>
                </div>
                <button onClick={() => postOffer()} type='button' className='btn btn-dark'>Poner articulos en venta</button>
            </div>
        </div>
    );
};

export default SellArticle;
