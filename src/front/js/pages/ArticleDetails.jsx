import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const ArticleDetails = () => {
    const { store } = useContext(Context);
    const navigate = useNavigate();
    const article = store.articleToEdit;
    const [artist, title] = store.articleToEdit.titulo.split(' - ')

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
                        <button className="btn btn-success mb-2">Agregar a deseados</button>
                        <button className="btn btn-secondary mb-2">Comprar Vinilo</button>
                        <button className="btn btn-secondary mb-2">Vender Vinilo</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ArticleDetails;
