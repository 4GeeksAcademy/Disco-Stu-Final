import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";
import Swal from "sweetalert2";

export const AdminPanel = () => {
    const { actions } = useContext(Context);
    const [users, setUsers] = useState([]);
    const [status, setStatus] = useState("loading");
    const [isAdminLoaded, setIsAdminLoaded] = useState(false);
    const filteredUsers = users.filter(user => !user.isAdmin);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await actions.getAllUsersInfo();
                const userDataWithDefaults = data.map((user) => ({
                    ...user,
                    isSelected: false,
                    isAdmin: user.is_admin,
                }));
                setUsers(userDataWithDefaults);
                setStatus("success");
            } catch (error) {
                console.error('Error fetching users:', error.message);
            }
        };

        const Auth = localStorage.getItem('Auth');

        if (Auth) {
            fetchUsers();
            setIsAdminLoaded(true);
        } else {
            setStatus("error");

        }

    }, [actions]);

    if (!isAdminLoaded) {
        return <p>Parece que no estas autorizado....</p>;
    }

    const handleDeleteSelectedUsers = async () => {
        const selectedUserIds = users.filter(user => user.isSelected).map(user => user.id);

        if (selectedUserIds.length === 0) {
            Swal.fire("¡Error!", "Debes seleccionar al menos un usuario para eliminar.", "error");
            return;
        }

        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "¡No será posible revertir esta acción!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar usuario",
        });

        if (result.isConfirmed) {
            try {
                await Promise.all(selectedUserIds.map(userId => actions.deleteUser(userId)));
                setUsers(users.filter(user => !selectedUserIds.includes(user.id)));
                Swal.fire("¡Eliminados!", "Los usuarios seleccionados han sido eliminados exitosamente.", "success");
            } catch (error) {
                console.error("Error al eliminar usuarios:", error.message);
                Swal.fire("¡Error!", "Ha ocurrido un error al intentar eliminar usuarios.", "error");
            }
        }
    };

    const toggleUserSelection = (e, userId) => {
        const updatedUsers = users.map((user) =>
            user.id === userId ? { ...user, isSelected: e.target.checked } : user
        );
        setUsers(updatedUsers);
    };

    return (
        <div>
            {/* Encabezado */}
            <div className="container-fluid px-0 mx-0">
                <div className="card border-0 rounded-0">
                    <div
                        className="text-white d-flex flex-row"
                        style={{ backgroundColor: "#000", height: "150px" }}
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
                </div>
            </div>

            {/* Tabla y menu izquierdo */}

            <div className="container-fluid">
                <div className="p-4">
                    <h1 className="mb-3">Administrar usuarios</h1>
                    <div className="mb-3">
                        <button onClick={() => handleDeleteSelectedUsers()} className="btn btn-light"><i className="fa-solid fa-trash"></i> Eliminar</button>
                    </div>
                    {status === "loading" ? (
                        <p>Cargando...</p>
                    ) : status === "error" ? (
                        <p>Acceso no autorizado o error al obtener los usuarios.</p>
                    ) : (
                        <div className="table-responsive">
                            {filteredUsers.length === 0 ? (
                                <p>No hay usuarios registrados</p>
                            ) : (
                                <table className="table table-hover">
                                    <tr>
                                        <th>
                                            <input type="checkbox" />
                                        </th>
                                        <th>Usuario</th>
                                        <th>Nombre Real</th>
                                        <th>Correo Electrónico</th>
                                        <th></th>
                                    </tr>
                                    <tbody>
                                        {filteredUsers.map((user) => (
                                            <tr key={user.id}>
                                                <td style={{ width: '30px', padding: '0.5rem' }}>
                                                    <input
                                                        type="checkbox"
                                                        onChange={(e) => toggleUserSelection(e, user.id)}
                                                        checked={user.isSelected}
                                                    />
                                                </td>
                                                <td style={{ width: '25%' }}>{user.username}</td>
                                                <td style={{ width: '54%' }}>{user.nombre_real}</td>
                                                <td style={{ width: '18%' }}>{user.email}</td>
                                                <td style={{ width: '18%' }}>{user.country}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
