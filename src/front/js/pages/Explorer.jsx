import React, { useEffect, useContext } from 'react'
import { Context } from '../store/appContext'
import styles from "../../styles/Explorer.module.css";
import ArticleCard from '../component/ArticleCardExplorer.jsx';
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from 'react-router-dom';


const Explorer = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate();

    useEffect(() => {
        actions.getAllArticles()
    }, [])

    return (
        <div id='general_div' className={styles.generalDiv}>
            <div id='filter_center' className={styles.filterCenter}>
                <div id='genres_filters'>
                    <p><strong>Género</strong></p>
                    <p>Rock</p>
                    <p>Electronica</p>
                    <p>Pop</p>
                </div>
                <div id='styles_filters'>
                    <p><strong>Estilo</strong></p>
                    <p>House</p>
                    <p>Techno</p>
                </div>
                <div id='country_filters'>
                    <p><strong>Pais</strong></p>
                    <p>Alemania</p>
                    <p>Uruguay</p>
                </div>
            </div>
            <div id='content_center' className={styles.contentCenter}>
                <div id='upper_filter'>
                    <ul className={styles.upperFilter}>
                        <li>Todo</li>
                        <li style={{ paddingLeft: '100px' }}>Publicaciones</li>
                        <li style={{ paddingLeft: '100px' }}>Artistas</li>
                    </ul>
                </div>
                <h4>Explorar articulos y artistas</h4>
                <div id='content'>
                    <ul className={styles.content}>
                        {store.on_filtered_or_explorer &&
                            store.explorer_articles.map((element, index) => {
                                const [artist, title] = element.titulo.split(' - ')
                                return (
                                    <li key={index}>
                                        <div onClick={() => {navigate(`/article/${element.id}`); actions.setArticleToEdit(element)}} style={{ cursor: 'pointer' }}>
                                            <ArticleCard
                                                key={index}
                                                title={title}
                                                artist={artist}
                                                url_imagen={element.url_imagen}
                                            />
                                        </div>
                                    </li>
                                )
                            })
                        }
                        {!store.on_filtered_or_explorer &&
                            store.filtered_explorer_articles.map((element, index) => {
                                const [artist, title] = element.titulo.split(' - ')
                                return (
                                    <li key={index}>
                                        <ArticleCard
                                            key={index}
                                            title={title}
                                            artist={artist}
                                            url_imagen={process.env.BACKEND_URL + "api/utils/images/" + element.url_imagen}
                                        />
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}


export default Explorer