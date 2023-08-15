import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const ArticleDetails = () => {
    const { store, actions } = useContext(Context);
    const article = JSON.parse(localStorage.getItem('currentArticle'));
    const [artist, title] = article.titulo.split(' - ')
    const user_id = localStorage.getItem('userID');
    const navigate = useNavigate();


    const handleAddFavorites = async (user_id, article_id) => {
        try {
            const response = await actions.addFavorites(user_id, article_id);
            console.log('Favorite added successfully:', response);

            Swal.fire({
                title: 'Agregado a favoritos',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            });

        } catch (error) {
            console.error('Error adding favorite:', error);

            Swal.fire({
                title: 'Uppss...',
                text: error.message,
                icon: 'warning',
                confirmButtonText: 'Cerrar',
                customClass: {
                    confirmButton: 'btn btn-success border-0 rounded-0'
                }
            });
        }
    };

    const handlerVenderVinilo = () => {
        const sellerValidation = async () => {
            const user_id = localStorage.getItem('userID')
            const backendUrl = process.env.BACKEND_URL + `api/users/validate_seller/${user_id}`;
            return await fetch(backendUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
                .then((response) => response.json())
                .then((result) => {
                    console.log(result)
                    if (result == 'VALIDATED') {
                        navigate(`/sell/${article.id}`)
                    }else{
                        navigate('/sellers')
                    }
                });
        };
        sellerValidation()
    }

    if (!article) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-3">
                    <img src={article.url_imagen} alt="{article.title}"
                        className="img-fluid" />
                </div>
                <div className="col-md-7">
                    <div className="row mb-3">
                        <div className="col-md-7">
                            <h3>{title}</h3>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-md-2">
                            <strong>ID:</strong>
                        </div>
                        <div className="col-md-3">
                            {article.id}
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-md-2">
                            <strong>Arista:</strong>
                        </div>
                        <div className="col-md-3">
                            {artist}
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-md-2">
                            <strong>Sello:</strong>
                        </div>
                        <div className="col-md-3">
                            {article.sello}
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-md-2">
                            <strong>Formato:</strong>
                        </div>
                        <div className="col-md-3">
                            {article.formato}
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-md-2">
                            <strong>País:</strong>
                        </div>
                        <div className="col-md-3">
                            {article.pais}
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-md-2">
                            <strong>Publicado:</strong>
                        </div>
                        <div className="col-md-3">
                            {article.publicado}
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-md-2">
                            <strong>Género:</strong>
                        </div>
                        <div className="col-md-3">
                            {article.genero}
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-md-2">
                            <strong>Estilos:</strong>
                        </div>
                        <div className="col-md-3">
                            {article.estilos}
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="btn-group-vertical btn-block" role="group">
                        <div onClick={() => navigate(`/articles/edit/${article.id}`)} style={{ cursor: 'pointer' }}>
                            Editar artículo
                        </div>
                        <button className="btn btn-success mb-2" onClick={() => handleAddFavorites(user_id, article.id)}>Agregar a deseados</button>
                        <button onClick={() => navigate(`/offers/${article.id}`)} className="btn btn-secondary mb-2">Comprar Vinilo</button>
                        <button onClick={() => navigate(`/sell/${article.id}`)} className="btn btn-secondary mb-2">Vender Vinilo</button>
                        <button onClick={() => window.history.back()} className="btn btn-secondary mb-2">Regresar</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ArticleDetails;
