import React, { Component } from "react";

export const Footer = () => (
	<div className="container-fluid bg-dark bg-gradient text-white">
		<footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
			<p className="col-md-4 mb-0 text-muted fs-6"><span className="fs-3 text-white">DiscoStu </span>© 2023 Company, Inc</p>

			<a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
			</a>

			<ul className="nav col-md-4 justify-content-end">
				<li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Inicio</a></li>
				<li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Acerca</a></li>
				<li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Contacto</a></li>
				<li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Explorar</a></li>
			</ul>
		</footer>
	</div>
);
