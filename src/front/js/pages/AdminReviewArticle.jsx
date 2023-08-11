import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export const ArticleReview = ({ id }) => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const [articlesWithDataAndId, setArticlesWithDataAndId] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await actions.getArticleForApproval();
                console.log(response);

                const articlesWithDataAndId = response.map(item => ({
                    id: item.id,
                    data: item
                }));

                console.log("Este es el arreglo obtenido por id", articlesWithDataAndId);
                setArticlesWithDataAndId(articlesWithDataAndId);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleAddArticle = async (selectedArticle) => {
        try {
            const addedArticle = await actions.addArticle(selectedArticle);
            console.log('Article added:', addedArticle);

        } catch (error) {
            console.error('Error adding Article:', error);

        }
    };

    const handleRejectedArticle = async (favorite_id) => {
        try {
            const rejectedArticle = await actions.deleteFavorite(favorite_id);
            console.log('Article rejected:', rejectedArticle);

        } catch (error) {
            console.error('Error to delete Article:', error);

        }
    };

    return (
        <div className="container-fluid">
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

            <div className="container mt-3">
                {articlesWithDataAndId.map(articleData => (
                    <div key={articleData.id} className="row">
                        <div className="col-md-3">
                            <img src={articleData.data.url_imagen} alt="{articleData.data.title}"
                                className="img-fluid" />
                        </div>
                        <div className="col-md-7">
                            <div className="row mb-3">
                                <div className="col-md-7">
                                    <h3>{articleData.data.title}</h3>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-2">
                                    <strong>ID:</strong>
                                </div>
                                <div className="col-md-3">
                                    {articleData.data.id}
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-2">
                                    <strong>Arista:</strong>
                                </div>
                                <div className="col-md-3">
                                    {articleData.artist}
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-2">
                                    <strong>Sello:</strong>
                                </div>
                                <div className="col-md-3">
                                    {articleData.data.sello}
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-2">
                                    <strong>Formato:</strong>
                                </div>
                                <div className="col-md-3">
                                    {articleData.data.formato}
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-2">
                                    <strong>País:</strong>
                                </div>
                                <div className="col-md-3">
                                    {articleData.data.pais}
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-2">
                                    <strong>Publicado:</strong>
                                </div>
                                <div className="col-md-3">
                                    {articleData.data.publicado}
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-2">
                                    <strong>Género:</strong>
                                </div>
                                <div className="col-md-3">
                                    {articleData.data.genero}
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-md-2">
                                    <strong>Estilos:</strong>
                                </div>
                                <div className="col-md-3">
                                    {articleData.data.estilos}
                                </div>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <button
                                    className="btn btn-light"
                                    onClick={() => {
                                        Swal.fire({
                                            title: '¿Estás seguro de aprobar este artículo?',
                                            text: 'Esta acción no se puede deshacer.',
                                            icon: 'warning',
                                            showCancelButton: true,
                                            confirmButtonColor: '#3085d6',
                                            cancelButtonColor: '#d33',
                                            confirmButtonText: 'Sí, aprobar',
                                            cancelButtonText: 'Cancelar'
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                handleAddArticle(articleData.data);
                                            }
                                        });
                                    }}
                                >
                                    <i className="fa-solid fa-check"></i> Aprobar
                                </button>
                                <button
                                    className="btn btn-light"
                                    onClick={() => {
                                        Swal.fire({
                                            title: '¿Estás seguro de rechazar este artículo?',
                                            text: 'Esta acción no se puede deshacer.',
                                            icon: 'warning',
                                            showCancelButton: true,
                                            confirmButtonColor: '#3085d6',
                                            cancelButtonColor: '#d33',
                                            confirmButtonText: 'Sí, rechazar',
                                            cancelButtonText: 'Cancelar'
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                handleRejectArticle(articleData.data);
                                            }
                                        });
                                    }}
                                >
                                    <i className="fa-solid fa-trash"></i> Rechazar
                                </button>
                            </div>

                        </div>
                    </div>
                ))}
            </div >
        </div>

    )
}

