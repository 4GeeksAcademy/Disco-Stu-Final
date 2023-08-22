
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import SearchBar from "./SearchBar.jsx";
import logoNabVar from '../../img/LOGO_NAVBAR.png'

import { Context } from "../store/appContext.js";

export const AdminNavbar = () => {
    const navigate = useNavigate()
    const logged = localStorage.getItem('token');
    const Auth = localStorage.getItem('Auth');
    const { actions } = useContext(Context);
    const [pendingApprovalsCount, setPendingApprovalsCount] = useState(
        sessionStorage.getItem("pendingApprovals") || 0
    );

    useEffect(() => {
        const fetchPendingApprovals = async () => {
            const pendingApprovals = await actions.getArticleForApproval();
            if (pendingApprovals)
                sessionStorage.setItem("pendingApprovals", pendingApprovals.length);
            setPendingApprovalsCount(pendingApprovals.length);
        };

        const handlePendingApprovalsUpdate = (event) => {
            if (event.data && event.data.type === "pendingApprovalsUpdated") {
                const newValue = event.data.value;
                setPendingApprovalsCount(newValue);
            }
        };

        fetchPendingApprovals();

        window.addEventListener("message", handlePendingApprovalsUpdate);

        return () => {
            window.removeEventListener("message", handlePendingApprovalsUpdate);
        };
    }, []);

    const handlerNavigateToExplorer = async () => {
        await actions.search();
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
        <nav className="navbar navbar-expand-lg navbar-dark bg-black text-white" style={{ marginRight: '0' }}>
            <div className="container-fluid">
                <Link className="nav-link" to="/">
                    <img className="p-2" style={{ width: '160px' }} src={logoNabVar} alt="logo_navbar" />
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
                    <ul className="navbar-nav me-auto my-lg-0" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                </div>
                <form className="d-flex">
                    {logged ? (
                        <ul className="navbar-nav me-auto my-2 my-lg-0">
                            <li className="nav-item dropdown mx-3">
                                <div className="d-flex align-items-center">
                                    <div className="nav-item me-3 me-lg-0">
                                        <Link to="/home-edition" className="nav-link text-white">
                                            <i class="fa-solid fa-pencil"></i>
                                        </Link>
                                    </div>
                                    <div className="nav-item me-3 me-lg-0">
                                        <Link to="/admin-panel" className="nav-link text-white">
                                            <i className="fa-solid fa-users"></i>
                                        </Link>
                                    </div>
                                    <div className="nav-item me-3 me-lg-0">
                                        <Link to="/approvals" className="nav-link text-white">
                                            <i className="fa-solid fa-clipboard"></i>
                                            {pendingApprovalsCount > 0 && (
                                                <span className="badge bg-danger top-0 start-100 translate-middle"
                                                    style={{
                                                        fontSize: '0.5rem',
                                                        padding: '0.2rem 0.5rem',
                                                        top: '-1rem'
                                                    }}
                                                >
                                                    {pendingApprovalsCount}
                                                </span>
                                            )}
                                        </Link>
                                    </div>
                                    <div className="nav-item me-3 me-lg-0">
                                        <Link to="/admin-inbox" className="nav-link text-white">
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
                                        <i className="fa-solid fa-power-off"></i>
                                    </div>
                                    <ul
                                        className="dropdown-menu dropdown-menu-end dropdown-menu-dark bg-black"
                                        aria-labelledby="navbarScrollingDropdown"
                                    >
                                        <button
                                            onClick={handleLogoutClick}
                                            className="dropdown-item"

                                        >
                                            Cerrar sesión
                                        </button>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    ) : (
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
                    )}
                </form>
            </div>
        </nav >
    );
};
