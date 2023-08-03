import React from "react";
import { Link } from "react-router-dom";


export const Contact = () => {

    return (
        <div className="container">
            <h1 className="fs-2">Soy una vista de prueba </h1>
            <br />
            <Link to="/">
                <button className="btn btn-primary">Back home</button>
            </Link>
        </div>
    );
};
