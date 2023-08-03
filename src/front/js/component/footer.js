import React, { Component } from "react";
import { Link } from "react-router-dom";

export const Footer = () => (
	<div className="container-fluid bg-black text-white">
		<footer className="d-flex p-3 mt-4">
			<p className="col-md-4 ms-13 mb-0 text-muted flex-fill fs-6"><span className="fs-3 text-white">DiscoStu </span>© 2023 Company, Inc</p>

			<ul className="nav col-md-4 d-flex align-items-center justify-content-end mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
				<li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Inicio</a></li>
				<li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Acerca</a></li>
				<li className="nav-item"><Link to="/contact" className="nav-link px-2 text-muted">Contacto</Link></li>
				<li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Explorar</a></li>
			</ul>
		</footer>
	</div>
);
