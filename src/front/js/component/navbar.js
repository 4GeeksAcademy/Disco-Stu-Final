import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import "../../styles/navbar.css";


export const Navbar = () => {
	const [isExpanded, setIsExpanded] = useState(false);
	const searchRef = useRef(null);

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

	return (

		<nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-gradient text-white">
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
						<div className={`input-group ${isExpanded ? "expanded" : ""}`} ref={searchRef}>
							<input
								id="search-input"
								className={`search-click border-start-0 ${isExpanded ? "expanded" : ""}`}
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
						<Link to="/" className="nav-link text-white" href="#" tabIndex="-1" aria-disabled="true">Iniciar sesión</Link>
						<Link to="/register">
							<button className="btn btn-success" type="submit">Registrarse</button>
						</Link>
					</form>
				</div>
			</div >
		</nav >

	);
};
