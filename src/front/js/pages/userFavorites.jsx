import React, { useContext, useState, useEffect } from "react";

import "../../styles/home.css";


export const UserFavorites = () => {

    const [favoriteData, setFavoriteData] = useState([]);
    const { actions } = useContext(Context);

    const user_id = localStorage.getItem('userId')

    const fetchData = async () => {
        try {
            const response = await actions.getFavoritesByUserId(user_id);
            console.log(response)
            setApprovalData(response);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData(); // Fetch data when component mounts
    }, []);

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
                                <h1 className="mb-3">Solicitudes de articulo nuevo</h1>
                                <div className="mb-3">
                                    <button className="btn btn-light"><i className="fa-solid fa-trash"></i> Aprobar </button>
                                </div>
                                <div className="mb-3">
                                    <button className="btn btn-light"><i className="fa-solid fa-trash"></i> Rechazar </button>
                                </div>

                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <tr>
                                            <th>
                                                <input type="checkbox" />
                                            </th>
                                            <th>something</th>
                                            <th>something</th>
                                            <th>something</th>
                                            <th></th>
                                        </tr>
                                        <tbody>

                                            <tr >
                                                <td style={{ width: '30px', padding: '0.5rem' }}>
                                                    <input
                                                        type="checkbox"

                                                    />
                                                </td>
                                                <td style={{ width: '25%' }}></td>
                                                <td style={{ width: '54%' }}></td>
                                                <td style={{ width: '18%' }}></td>
                                                <td style={{ width: '18%' }}></td>
                                            </tr>

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
