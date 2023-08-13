import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../store/appContext'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import "../../styles/home.css";

export const UserFavorites = () => {
    const { actions } = useContext(Context);
    const [favoritesData, setFavoritesData] = useState([])
    const user_id = localStorage.getItem('userID')
    const [articleIds, setArticleIds] = useState([]);
    const [articlesData, setArticlesData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await actions.getFavoritesByUserId(user_id);
                console.log("Estos son los favoritos por usuario:", response);

                setFavoritesData(response);

            } catch (error) {
                console.error("Error al obtener los favoritos:", error);
                // Mostrar un mensaje de error al usuario si es apropiado
            }
        };

        fetchFavorites();
    }, [user_id, actions]);

    useEffect(() => {
        if (favoritesData.favorites) {
            const ids = favoritesData.favorites.map(favorite => favorite.articulo_id);
            setArticleIds(ids);
        }
    }, [favoritesData.favorites]);

    const fetchAndSetArticles = async () => {
        try {
            const response = await actions.getAllArticles();
            console.log("Estos son los artículos:", response);

            setArticlesData(response);

        } catch (error) {
            console.error("Error al obtener los artículos:", error);
        }
    };

    useEffect(() => {
        fetchAndSetArticles();
    }, []);

    const handleDelete = async (user_id, article_id, favorite_id) => {
        try {
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: 'Esta acción eliminará el favorito. ¿Deseas continuar?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Eliminar',
                cancelButtonText: 'Cancelar',
            });

            if (result.isConfirmed) {
                await actions.deleteFavorite(user_id, article_id); // Eliminar en el servidor
                const updatedFavorites = favoritesData.favorites.filter(favorite => favorite.id !== favorite_id);
                setFavoritesData({ ...favoritesData, favorites: updatedFavorites }); // Actualizar el estado local
            }
        } catch (error) {
            console.error('Error deleting favorite:', error);
        }
    };

    const handleImageClick = (article) => {
        navigate(`/article/${article.id}`);
        localStorage.setItem('currentArticle', JSON.stringify(article));
    };

    return (
        <div>
            {/* header fondo negro */}
            <div className="card border-0 rounded-0">
                <div className=" text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '100px' }}>
                    <div className="ms-3" style={{ marginTop: '130px' }}>
                    </div>
                </div>
            </div>
            <div
                className="p-4 text-black"
                style={{ backgroundColor: "#f8f9fa" }}
            >
                <h3 className="text-center">Lista de Favoritos</h3>
                <div className="d-flex justify-content-end text-center py-1">
                </div>
            </div>

            {/* Tabla */}
            <div className="container-">
                <div className="container-fluid">
                    <div className="row">
                        <div id="messages_center" className="">
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            {/* <th>
                                                    <input type="checkbox" />
                                                </th> */}
                                            <th>#</th>
                                            <th>Portada</th>
                                            <th>Nombre del articulo</th>
                                            <th>Artista</th>
                                            <th>Genero</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {articleIds.map((articleId, index) => {
                                            const favorite = favoritesData.favorites.find(fav => fav.articulo_id === articleId);
                                            const article = articlesData.find(article => article.id === articleId);
                                            return (
                                                <tr key={`${articleId}-${index}`}>
                                                    <td>{articleId}</td>
                                                    <td>
                                                        <span
                                                            onClick={() => handleImageClick(article)} style={{ cursor: 'pointer' }}
                                                        >
                                                            {article ? (
                                                                <img src={article.url_imagen} alt={article.title} className="img-fluid" />
                                                            ) : (
                                                                "Imagen no disponible"
                                                            )}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        {article ? article.title : "Título no disponible"}
                                                    </td>
                                                    <td>{article ? article.artista : "Artista no disponible"}</td>
                                                    <td>{article ? article.genero : "Género no disponible"}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-outline-dark"
                                                            onClick={() => handleDelete(user_id, articleId, favorite.id)}
                                                        >
                                                            <i className="fas fa-trash"></i> Eliminar
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


        </div>

    );
};
