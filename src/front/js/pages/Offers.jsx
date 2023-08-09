import React, { useEffect, useContext } from 'react'
import { Context } from '../store/appContext';
import styles from "../../styles/Offers.module.css";
import { useNavigate } from "react-router-dom";



const Offers = () => {

    const { store, actions } = useContext(Context)
    const article = JSON.parse(localStorage.getItem('currentArticle'));
    const navigate = useNavigate()

    useEffect(() => {
        actions.getOffers(article.id)
    }, [])

    // const article = {
    //     'titulo': 'Younger Than Me - 90s Wax One',
    //     'sello': '90s Wax One',
    //     'formato': 'Vinyl, Limited Edition, Numbered, Yellow',
    //     'pais': 'UK',
    //     'publicado': '6 Oct 2000',
    //     'genero': 'Electronica',
    //     'estilos': 'House, Acid House, New Beat',
    //     'url_imagen': 'https://i.discogs.com/BLXOkeKHYuLrZATYJ1a61EP4m308Sv6PlEskMqGhywc/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTExMDU4/ODk3LTE1MTY2NTEx/NDctOTQ3OS5qcGVn.jpeg'
    // }

    // const offer = {
    //     'vendedor': 'Fer Ferchito',
    //     'articulo': 'Younger Than Me - 90s Wax One',
    //     'funda': 'Near Mint (NM)',
    //     'soporte': 'Very Good Plus (VG+)',
    //     'pais_vendeor': 'United Kingdom',
    //     'valoracion': '98%, 145 valoraciones',
    //     'precio': '€19.00',
    //     'comentario': 'Funda con esquina torcida. Pegatina en la galleta del disco'
    // }




    return (
        <div>
            <div id='upper_content' className={styles.upperContent}>
                <div id='left_content'>
                    <img style={{ width: '160px', marginRight: '13px' }} src={article.url_imagen} alt="" />
                </div>
                <div>
                    <p style={{ fontSize: '1.35rem' }}> <strong>{article.titulo}</strong></p>
                    <div className={styles.properties}>
                        <p style={{ width: '100px' }}>Sello:</p>
                        <p>{article.sello}</p>
                    </div>
                    <div className={styles.properties}>
                        <p style={{ width: '100px' }}>Formato:</p>
                        <p>{article.formato}</p>
                    </div>
                    <div className={styles.properties}>
                        <p style={{ width: '100px' }}>Pais:</p>
                        <p>{article.pais}</p>
                    </div>
                    <div className={styles.properties}>
                        <p style={{ width: '100px' }}>Publicado:</p>
                        <p>{article.publicado}</p>
                    </div>
                    <div className={styles.properties}>
                        <p style={{ width: '100px' }}>Genero:</p>
                        <p>{article.genero}</p>
                    </div>
                    <div className={styles.properties}>
                        <p style={{ width: '100px' }}>Estilos:</p>
                        <p>{article.estilos}</p>
                    </div>
                </div>
                <div id='upper_content_buttons' className={styles.btnDiv}>
                    <div>
                        <button onClick={() => {navigate(`/article/${article.id}`)}} type="button" className={`btn btn-dark ${styles.upperBtn}`}>Ver la pagina de la edición</button>
                        <button onClick={() => navigate(`/sell/${article.id}`)} type="button" className={`btn ${styles.upperBtn}`} style={{ backgroundColor: '#336494' }}>Vender este articulo</button>
                    </div>
                </div>
            </div>

            <div id='offers'>
                <table className={styles.table}>
                    <thead className={styles.tableHead}>
                        <tr>
                            <th style={{ width: '40%', paddingLeft: '10px' }}>Articulo</th>
                            <th style={{ width: '30%', paddingLeft: '10px' }}>Vendedor</th>
                            <th style={{ width: '15%', paddingLeft: '10px' }}>Precio</th>
                            <th style={{ width: '15%', paddingLeft: '10px' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {store.currentOffers.length > 0 ? (
                            store.currentOffers.map((offer, index) => {
                                return (
                                    <tr key={index} style={{marginBottom: '40px'}}>
                                        <td style={{ width: '40%', paddingLeft: '10px' }}>
                                            <p style={{ marginBottom: '5px' }}><strong>{article.titulo}</strong></p>
                                            <div className={styles.properties}>
                                                <p className={styles.articleConditions}>Estado del soporte:</p>
                                                <p>{offer.condicion_soporte}</p>
                                            </div>
                                            <div className={styles.properties}>
                                                <p className={styles.articleConditions}>Condición de la funda:</p>
                                                <p>{offer.condicion_funda}</p>
                                            </div>
                                            <div className={styles.properties}>
                                                <p>{offer.comentario}</p>
                                            </div>
                                        </td>
                                        <td style={{ width: '25%', paddingLeft: '10px' }}>
                                            <p style={{ marginBottom: '5px' }}><strong>{offer.vendedor_nombre}</strong></p>
                                            {/* <p>{offer.valoracion}</p> */}
                                            <div className={styles.properties}>
                                                <p className={styles.articleConditions}>Enviado desde:</p>
                                                <p>{offer.pais_vendeor}</p>
                                            </div>
                                        </td>
                                        <td style={{ width: '18%', paddingLeft: '10px' }}>
                                            <p style={{ color: '#CD2906' }}><strong>{offer.precio}</strong></p>
                                            <div style={{ display: 'flex' }}>
                                                <p>+  </p>
                                                <p style={{ color: '#033BDB' }}>envío</p>
                                            </div>
                                        </td>
                                        <td style={{ width: '16%', padding: '0px 20px 0px 10px' }}>
                                            <button type="button" class={`btn btn-success ${styles.cartBtn}`}>Añadir al carrito</button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="4"></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export default Offers