import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import SearchBar from "./SearchBar.jsx";
import logoNabVar from '../../img/LOGO_NAVBAR.png'


export const Navbar = () => {

	const navigate = useNavigate()

	const handlerNavigateToExplorer = () => {
		navigate('/explorer')
	}

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
						{/* <li className="nav-item dropdown mx-3">
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
								<li><a className="dropdown-item" href="#">Explorar contenido</a></li>
							</ul>
						</li> */}

					</ul>
					<form className="d-flex">
						<Link to="/login" className="nav-link text-white" href="#" tabIndex="-1" aria-disabled="true">Iniciar sesión</Link>
						<Link to="/register">
							<button className="btn btn-success" type="submit">Registrarse</button>
						</Link>
					</form>
				</div>
			</div >
		</nav >

	);
};
