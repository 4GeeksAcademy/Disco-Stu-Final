
import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import SearchBar from "./SearchBar.jsx";
import logoNabVar from '../../img/LOGO_NAVBAR.png'

import { Context } from "../store/appContext";

export const Navbar = () => {
	const navigate = useNavigate()
	const { store, actions } = useContext(Context);
	const { isLoggedIn } = store.user;

	console.log("Is Logged In:", isLoggedIn);

	const handlerNavigateToExplorer = () => {
		navigate('/explorer')
	}

	const handleLoginClick = () => {
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
					<ul className="navbar-nav me-auto my-2 my-lg-0">
						<SearchBar />
						<p
							onClick={() => handlerNavigateToExplorer()}
							style={{
								padding: '9px 0px 0px 18px',
								margin: 0,
								cursor: 'pointer'
							}}>
							Explorar
						</p>
					</ul>
					<form className="d-flex">
						{isLoggedIn ? (
							<>
								<ul className="navbar-nav me-auto my-2 my-lg-0">
									<li className="nav-item dropdown mx-3">
										<div className="d-flex align-items-center">
											<li className="nav-item me-3 me-lg-0">
												<Link to="" className="nav-link text-white"><i className="fa-solid fa-face-smile-wink"></i></Link>
											</li>
											<li className="nav-item me-3 me-lg-0">
												<Link to="" className="nav-link text-white"><i className="fas fa-shopping-cart"></i></Link>
											</li>
											<li className="nav-item me-3 me-lg-0">
												<Link to="" className="nav-link text-white"><i class="fa-solid fa-message"></i></Link>
											</li>
											<div
												className="nav-link dropdown-toggle text-white"
												href="#"
												role="button"
												data-bs-toggle="dropdown"
												aria-expanded="false"
											>
												<i className="far fa-user"></i>
											</div>
											<ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark bg-black" aria-labelledby="navbarScrollingDropdown">
												<li><hr className="dropdown-divider" /></li>
												<li><Link className="dropdown-item" to="/admin-panel"><i class="fa-solid fa-face-smile-wink"></i> Perfil</Link></li>
												<li><Link className="dropdown-item" to="/admin-panel"> <i class="fa-solid fa-circle-question"></i> Ayuda</Link></li>
												<li><Link className="dropdown-item" to="/admin-panel"> <i class="fa-solid fa-gear"></i> Configuración</Link></li>
												<li>
													<button
														onClick={handleLogoutClick}
														className="dropdown-item"
														type="submit"
													>
														<i className="fa-solid fa-power-off"></i> Cerrar sesión
													</button>
												</li>
											</ul>
										</div>

									</li>
								</ul>
							</>
						) : (
							<>
								<button
									onClick={handleLoginClick}
									className="nav-link text-white btn btn-link"
									tabIndex="-1"
									aria-disabled="true"
								>
									Iniciar sesión
								</button>
								<Link to="/register">
									<button className="btn btn-success" type="submit">
										Registrarse
									</button>
								</Link>
							</>
						)}
					</form>
				</div>
			</div>
		</nav >
	);
};
