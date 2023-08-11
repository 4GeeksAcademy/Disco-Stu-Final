import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

import "../../styles/home.css";


export const AdminApprovals = () => {
    const [approvalData, setApprovalData] = useState([]);
    const [users, setUsers] = useState([]);
    const [articleUsers, setArticleUsers] = useState({});
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await actions.getArticleForApproval();
            setApprovalData(response);
            console.log(response)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchUsers = async () => {
        try {
            const usersData = await actions.getAllUsersInfo();
            setUsers(usersData);
            console.log(usersData.id)
        } catch (error) {
            console.error("Error fetching users:", error.message);
        }
    };

    useEffect(() => {
        fetchData();
        fetchUsers();
    }, [actions]);

    useEffect(() => {
        const articleUsersMap = {};
        approvalData.forEach((item) => {
            const user = users.find((user) => user.id === item.user_id);
            if (user) {
                articleUsersMap[item.id] = user;
            }
        });
        setArticleUsers(articleUsersMap);
    }, [approvalData, users]);


    return (
        <div>
            <div className="container-fluid px-0 mx-0">
                <div className="card border-0 rounded-0">
                    <div
                        className="text-white d-flex flex-row"
                        style={{ backgroundColor: "#000", height: "200px" }}
                    >
                        <div
                            className="ms-4 mt-5 d-flex flex-column"
                            style={{ width: "150px" }}
                        ></div>
                        <div className="ms-3" style={{ marginTop: "130px" }}></div>
                    </div>
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
                                <div className="d-flex justify-content-between mb-3">
                                    <button className="btn btn-light"><i className="fa-solid fa-trash"></i> Aprobar</button>
                                    <button className="btn btn-light"><i className="fa-solid fa-trash"></i> Rechazar</button>
                                </div>

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
                                                        <Link to={`/article-review/${item.id}`}>{item.titulo}</Link>
                                                    </td>
                                                    <td>{articleUsers[item.id]?.username}</td>
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
