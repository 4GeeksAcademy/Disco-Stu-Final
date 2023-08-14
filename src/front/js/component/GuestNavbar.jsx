
import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import SearchBar from "./SearchBar.jsx";
import logoNabVar from '../../img/LOGO_NAVBAR.png'

import { Context } from "../store/appContext";

export const GuestNavbar = () => {
    const navigate = useNavigate()
    const logged = localStorage.getItem('token');
    const Auth = localStorage.getItem('Auth');
    const { actions } = useContext(Context);

    const handlerNavigateToExplorer = () => {
        navigate('/explorer')
    }

    const handleLoginClick = (e) => {
        sessionStorage.setItem("lastVisitedPage", window.location.href);
        navigate("/login");
    };

    const handleLogoutClick = () => {
        actions.logout();
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-black text-white">
            <div className="container-fluid">
                <Link className="nav-link my-4" to="/">
                    <img style={{ width: '160px' }} src={logoNabVar} alt="logo_navbar" />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarScroll"
                    aria-controls="navbarScroll"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarScroll">
                    <ul className="navbar-nav me-auto my-lg-0">
                        <SearchBar />
                        <li
                            onClick={() => handlerNavigateToExplorer()}
                            style={{
                                padding: '9px 0px 0px 18px',
                                margin: 0,
                                cursor: 'pointer'
                            }}>
                            Explorar
                        </li>
                    </ul>

                    <form className="d-flex">
                        <>
                            <button
                                onClick={handleLoginClick}
                                className="nav-link text-white btn btn-link me-2"
                                tabIndex="-1"
                                aria-disabled="true"
                                type="button"
                            >
                                Iniciar sesión
                            </button>
                            <Link to="/signup">
                                <button className="btn btn-success" type="submit">
                                    Registrarse
                                </button>
                            </Link>
                        </>
                    </form>

                </div>
            </div>
        </nav >
    );
};
