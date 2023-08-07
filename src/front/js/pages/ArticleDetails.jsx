import React from "react";
import { Link, useLocation } from "react-router-dom";

const ArticleDetails = () => {
    const location = useLocation();
    const { element } = location.state;
    const [artist, title] = element.titulo.split(' - ')

    if (!element) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-3">
                    <img src={element.url_imagen} alt="{element.title}"
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
                            {element.id}
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
                            {element.sello}
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-md-2">
                            <strong>Formato:</strong>
                        </div>
                        <div className="col-md-3">
                            {element.formato}
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-md-2">
                            <strong>País:</strong>
                        </div>
                        <div className="col-md-3">
                            {element.pais}
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-md-2">
                            <strong>Publicado:</strong>
                        </div>
                        <div className="col-md-3">
                            {element.publicado}
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-md-2">
                            <strong>Género:</strong>
                        </div>
                        <div className="col-md-3">
                            {element.genero}
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-md-2">
                            <strong>Estilos:</strong>
                        </div>
                        <div className="col-md-3">
                            {element.estilos}
                        </div>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="btn-group-vertical btn-block" role="group">
                        <Link
                            to={`/articles/edit/${element.id}`}
                            state={{ element: element }}
                            className="mb-2"
                        >
                            Editar artículo
                        </Link>
                        <button className="btn btn-success mb-2">Agregar a deseados</button>
                        <button className="btn btn-secondary mb-2">Comprar Vinilo</button>
                        <button className="btn btn-secondary mb-2">Vender Vinilo</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArticleDetails;
