import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

import "../../styles/home.css";


export const AdminApprovals = () => {
    const [approvalData, setApprovalData] = useState([]);
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const data = await actions.getArticleForApproval();
            setApprovalData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleArticleReview = (item) => {
        actions.setArticleToApprove(item);
        navigate(`/article-review/${item.id}`);
    }

    return (
        <div>
            <div className="container-fluid px-0 mx-0">
                <div className="card border-0 rounded-0">
                    <div
                        className="p-4 text-black"
                        style={{ backgroundColor: "#f8f9fa" }}
                    >
                        <h3 className="text-center">Panel de Administrador</h3>
                        <div className="d-flex justify-content-end text-center py-1">
                        </div>
                    </div>
                    <div className="card-body p-4 text-black"></div>
                </div>
            </div>

            {/* Tabla y menu izquierdo */}
            <div className="container-">
                <div style={{ display: 'flex', margin: '30px 100px 30px 100px' }}>
                    <div className="container-fluid" style={{ margin: '30px' }}>
                        <div className="row" style={{ margin: '30px 100px' }}>
                            <div id="messages_center" className="">
                                <h1 className="mb-3">Articulos pendientes de aprobación</h1>
                                {/*<div className="d-flex justify-content-between mb-3">
                                    <button className="btn btn-light"><i className="fa-solid fa-trash"></i> Aprobar</button>
                                    <button className="btn btn-light"><i className="fa-solid fa-trash"></i> Rechazar</button>
                                </div>*/}

                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <tr>
                                            <th>
                                                <input type="checkbox" />
                                            </th>
                                            <th>Titulo:</th>
                                            <th>Usuario: </th>
                                            <th>Genero:</th>
                                            <th>Pais:</th>
                                        </tr>
                                        <tbody>
                                            {approvalData.map((item, index) => (
                                                <tr key={index}>
                                                    <td style={{ width: "30px", padding: "0.5rem" }}>
                                                        <input type="checkbox" />
                                                    </td>
                                                    <td>
                                                        <a onClick={() => handleArticleReview(item)}>{item.titulo}</a>
                                                    </td>
                                                    <td>{item.user.usuario}</td>
                                                    <td>{item.genero}</td>
                                                    <td>{item.pais}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
};
