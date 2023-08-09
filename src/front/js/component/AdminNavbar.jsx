
import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import SearchBar from "./SearchBar.jsx";
import logoNabVar from '../../img/LOGO_NAVBAR.png'

import { Context } from "../store/appContext.js";

export const AdminNavbar = () => {
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
                <Link className="nav-link" to="/">
                    <img style={{ width: '160px' }} src={logoNabVar} alt="logo_navbar" />
                </Link>
                <form className="d-flex">
                    {logged ? (
                        <ul className="navbar-nav me-auto my-2 my-lg-0">
                            <li className="nav-item dropdown mx-3">
                                <div className="d-flex align-items-center">
                                    <div className="nav-item me-3 me-lg-0">
                                        <Link to="/admin-panel" className="nav-link text-white">
                                            <i className="fa-solid fa-face-smile-wink"></i>
                                        </Link>
                                    </div>
                                    <div className="nav-item me-3 me-lg-0">
                                        <Link to="/approvals" className="nav-link text-white">
                                            <i className="fa-solid fa-clipboard"></i>
                                        </Link>
                                    </div>
                                    <div className="nav-item me-3 me-lg-0">
                                        <Link to="/messages" className="nav-link text-white">
                                            <i className="fa-solid fa-message"></i>
                                        </Link>
                                    </div>

                                    <div
                                        className="nav-link dropdown-toggle text-white"
                                        href="#"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <i className="far fa-user"></i>
                                    </div>
                                    <ul
                                        className="dropdown-menu dropdown-menu-end dropdown-menu-dark bg-black"
                                        aria-labelledby="navbarScrollingDropdown"
                                    >
                                        <hr className="dropdown-divider" />
                                        <Link className="dropdown-item" to="/user-profile">
                                            <i className="fa-solid fa-face-smile-wink"></i> Perfil
                                        </Link>

                                        <Link className="dropdown-item" to="/update-password">
                                            <i className="fa-solid fa-gear"></i> Configuración
                                        </Link>
                                        <button
                                            onClick={handleLogoutClick}
                                            className="dropdown-item"

                                        >
                                            <i className="fa-solid fa-power-off"></i> Cerrar sesión
                                        </button>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    ) : (
                        <>
                            <button
                                onClick={handleLoginClick}
                                className="nav-link text-white btn btn-link"
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
                    )}
                </form>
            </div>
        </nav >
    );
};
