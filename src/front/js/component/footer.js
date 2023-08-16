import React, { Component } from "react";
import { Link } from "react-router-dom";

export const Footer = () => (
	<footer class="footer mt-auto py-3 bg-black">
		<div class="container d-flex justify-content-between align-items-center">
			<p class="mb-0 text-white fs-6">
				<span class="fs-3">Disco Stu</span>© 2023 Company, Inc
			</p>
			<ul class="nav d-flex align-items-center mb-0 link-light text-decoration-none">
				<li class="nav-item text-white">
					<Link to="" class="nav-link px-2">
						Inicio
					</Link>
				</li>
				<li class="nav-item text-white">
					<Link to="/about" class="nav-link px-2">
						Acerca
					</Link>
				</li>
				<li class="nav-item text-white">
					<Link to="/explorer" class="nav-link px-2">
						Explorar
					</Link>
				</li>
			</ul>
		</div>
	</footer>
);
