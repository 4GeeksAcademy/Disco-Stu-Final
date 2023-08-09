import React from "react";
import { Link } from "react-router-dom";

export const About = () => {
    return (
        <div>
            <div>
                {/* Jumbotron o Header */}
                <section className="jumbotron py-4 text-center bg-dark text-white mb-5">
                    <div className="container text-center">
                        <h1 className="jumbotron-heading mb-4">Disco Stu Store</h1>
                        <p className="lead mb-5">
                            El proyecto ‘Disco Stu Store’ busca crear una aplicación web al
                            estilo eCommerce para compra, venta y publicación de artículos de
                            registro musical como vinilos, cassettes y cd’s. La página brinda
                            un servicio de intercambio entre compradores y vendedores para
                            coordinar la entrega de los paquetes a cualquier parte del mundo,
                            facilitando el acceso a distintos artículos para personas que no
                            tengan la posibilidad de obtenerlos localmente. Además, las
                            características de la página generan una comunidad de intercambio
                            de música, con usuarios habilitados a agregar nuevos artículos y a
                            editar los artículos existentes.
                        </p>
                    </div>
                </section>

                <div>
                    {/* Carousel */}
                    <div
                        id="carouselExampleSlidesOnly"
                        className="carousel"
                        data-bs-ride="carousel"
                        style={{ maxHeight: "300px" }}
                    >
                        <div className="carousel-inner">
                            <div className="carousel-item active  text-center">
                                <img
                                    src="https://picsum.photos/1000/300?random=1"
                                    className="d-block"
                                    alt="..."
                                    style={{ maxHeight: "100%", objectFit: "cover" }}
                                />
                            </div>
                            <div className="carousel-item  text-center">
                                <img
                                    src="https://picsum.photos/1000/300?random=2"
                                    className=""
                                    alt="..."
                                    style={{ maxHeight: "100%", objectFit: "cover" }}
                                />
                            </div>
                            <div class="carousel-item text-center">
                                <img
                                    src="https://picsum.photos/1000/300?random=3"
                                    class=""
                                    alt="..."
                                    style={{ maxHeight: "100%", objectFit: "cover" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    {/* Seccion Integrantes */}
                    <div className="container mt-4 text-center">
                        <h2 className="fs-2 m-4">Disco Stu Team</h2>
                        {/* Three columns of text below the carousel */}
                        <div className="row g-4">
                            <div className="col-lg-4 p-4">
                                <img
                                    className="rounded-circle mb-4"
                                    src="https://picsum.photos/200/300?random=5"
                                    alt="Profile picture 1"
                                    width="140"
                                    height="140"
                                />
                                <h2>Andres</h2>
                                <p>
                                    <p className="text-muted">Full Stack Web Developer</p>
                                    <ul className="list-group text-start list-group-flush">
                                        <li className="list-group-item">
                                            <i className="fa-brands fa-github nav-link"></i>

                                        </li>
                                        <li className="list-group-item">
                                            <i className="fa-brands fa-linkedin nav-link"></i>
                                        </li>
                                    </ul>
                                </p>
                            </div>
                            <div className="col-lg-4 p-4">
                                <img
                                    className="rounded-circle mb-4"
                                    src="https://picsum.photos/200/300?random=6"
                                    alt="Profile picture 2"
                                    width="140"
                                    height="140"
                                />
                                <h2>Karai</h2>
                                <p>
                                    <p className="text-muted">Full Stack Web Developer</p>
                                    <ul className="list-group text-start list-group-flush">
                                        <li className="list-group-item">
                                            <i className="fa-brands fa-github nav-link"></i>
                                        </li>
                                        <li className="list-group-item nav-link">
                                            <i className="fa-brands fa-linkedin nav-link"></i>
                                        </li>
                                    </ul>
                                </p>
                            </div>
                            <div className="col-lg-4 p-4">
                                <img
                                    className="rounded-circle mb-4"
                                    src="https://picsum.photos/200/300?random=7"
                                    alt="Profile picture 3"
                                    width="140"
                                    height="140"
                                />
                                <h2>Fercho</h2>
                                <p>
                                    <p className="text-muted">Full Stack Web Developer</p>
                                    <ul className="list-group text-start list-group-flush">
                                        <li className="list-group-item">
                                            <i className="fa-brands fa-github nav-link"></i>

                                        </li>
                                        <li className="list-group-item">
                                            <i className="fa-brands fa-github nav-link">

                                            </i>
                                        </li>
                                    </ul>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};
