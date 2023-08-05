import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";

import "../../styles/home.css";

import Swal from "sweetalert2";


export const AdminUsers = () => {
    const { store, actions } = useContext(Context);
    const [usersData, setUsersData] = useState([]);
    const [status, setStatus] = useState("loading");
    const [isAdminLoaded, setIsAdminLoaded] = useState(false); // Estado para controlar si isAdmin se ha cargado

    console.log("Is Admin:", store.user.isAdmin); // Cambia store.isAdmin por store.user.isAdmin

    useEffect(() => {
        const getUsersData = async () => {
            try {
                const data = await actions.getAllUsersInfo();
                const userDataWithDefaults = data.map((user) => ({
                    ...user,
                    isSelected: false,
                    isAdmin: user.is_admin,
                }));
                setUsersData(userDataWithDefaults);
                setStatus("success");
            } catch (error) {
                setStatus("error");
            }
        };

        const checkAdminStatus = async () => {
            // Verificar si el usuario ha iniciado sesión y es un administrador
            if (!store.user.isLoggedIn || !store.user.isAdmin) {
                // Si el usuario no ha iniciado sesión o no es un administrador, mostrar mensaje de error
                setStatus("error");
            } else {
                // Si el usuario ha iniciado sesión y es un administrador, obtener los datos de los usuarios
                await getUsersData();
                setIsAdminLoaded(true); // Marcar isAdmin como cargado
            }
        };


        checkAdminStatus();
    }, [actions, store.user.isAdmin]);

    // Si isAdmin aún no se ha cargado, muestra un mensaje de carga o lo que consideres adecuado
    if (!isAdminLoaded) {
        return <p>Cargando...</p>;
    }

    const toggleUserSelection = (e, userId) => {
        const updatedUsers = usersData.map((user) =>
            user.id === userId ? { ...user, isSelected: e.target.checked } : user
        );
        setUsersData(updatedUsers);
    };

    const handleDeleteUser = async (userId) => {
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
                await actions.deleteUser(userId);
                // Remove the deleted user from the local state
                setUsersData(usersData.filter((user) => user.id !== userId));
                Swal.fire(
                    "¡Eliminado!",
                    "El usuario ha sido eliminado exitosamente.",
                    "success"
                );
            } catch (error) {
                console.error("Error al eliminar el usuario:", error.message);
                Swal.fire(
                    "¡Error!",
                    "Ha ocurrido un error al intentar eliminar el usuario.",
                    "error"
                );
            }
        }
    };


    return (
        <div className="container-fluid">
            {status === "loading" ? (
                <p>Cargando...</p>
            ) : status === "error" ? (
                <p>Acceso no autorizado o error al obtener los usuarios.</p>
            ) : (
                <div className="admin-users-container">
                    <div className="messages-control">
                        <button className="btn btn-outline" type="button">
                            <strong>Administrar usuarios</strong>
                        </button>
                    </div>
                    <div className="table-center">
                        <h1 className="users-title">Usuarios registrados</h1>
                        {usersData.length === 0 ? (
                            <p>No hay usuarios registrados</p>
                        ) : (
                            <div className="table-container">
                                <table className="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th>
                                                <input type="checkbox" />
                                            </th>
                                            <th>Usuario</th>
                                            <th>Nombre Real</th>
                                            <th>Correo Electrónico</th>
                                            <th>Administrador</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {usersData.map((user) => (
                                            <tr key={user.id}>
                                                <td>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        onChange={(e) => toggleUserSelection(e, user.id)}
                                                        checked={user.isSelected}
                                                    />
                                                </td>
                                                <td>{user.username}</td>
                                                <td>{user.nombre_real}</td>
                                                <td>{user.mail}</td>
                                                <td>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        readOnly
                                                        checked={user.is_admin}
                                                    />
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-light"
                                                        type="button"
                                                        onClick={() => handleDeleteUser(user.id)}
                                                    >
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );

};