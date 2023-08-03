import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../../styles/navbar.css";

import { Context } from "../store/appContext";

export const Navbar = () => {
	const [isExpanded, setIsExpanded] = useState(false);
	const searchRef = useRef(null);
	const navigate = useNavigate();

	const { store, actions } = useContext(Context);
	const { isLoggedIn, isAdmin, userId } = store.user;

	console.log("Is Logged In:", isLoggedIn);
	console.log("Is Admin:", isAdmin);
	console.log("UserID:", userId);

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (searchRef.current && !searchRef.current.contains(event.target)) {
				setIsExpanded(false);
			}
		};

		document.addEventListener("click", handleOutsideClick);

		return () => {
			document.removeEventListener("click", handleOutsideClick);
		};
	}, []);

	const handleSearchIconClick = () => {
		setIsExpanded(!isExpanded);
	};

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
					<span className="navbar-brand text-white" href="#">
						DiscoStu
					</span>
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
						<div
							className={`input-group ${isExpanded ? "expanded" : ""}`}
							ref={searchRef}
						>
							<input
								id="search-input"
								className={`search-click border-start-0 ${isExpanded ? "expanded" : ""
									}`}
								type="search"
								placeholder="Buscar artistas, álbumes y otros..."
								aria-label="Search"
							/>
							<span
								id="search-icon"
								className="search-icon input-group-text bg-white border-end-0"
								onClick={handleSearchIconClick}
							>
								<i className="fa-solid fa-magnifying-glass"></i>
							</span>
						</div>

						<li className="nav-item dropdown mx-3">
							<Link
								to=""
								className="nav-link dropdown-toggle text-white"
								href="#"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								Explorar
							</Link>
							<ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
								<li><a className="dropdown-item" href="#">Action</a></li>
								<li><a className="dropdown-item" href="#">Another action</a></li>
								<li><hr className="dropdown-divider" /></li>
								<li><a className="dropdown-item" href="#">Something else here</a></li>
							</ul>
						</li>
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
