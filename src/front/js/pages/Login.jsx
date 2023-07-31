import React, { useContext, useState, useEffect, useRef } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Login = () => {
    const { actions } = useContext(Context);
    const formRef = useRef(null);
    const [usernameOrMail, setUsernameOrMail] = useState(""); // Renombrar para unificar el campo
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        document.addEventListener("click", handleDocumentClick);
        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoginSuccess(false);

        if (!usernameOrMail || !password) {
            setError("Por favor ingrese usuario y contraseña");
            return;
        }

        try {
            await actions.login({ username_or_mail: usernameOrMail, password });

            setLoginSuccess(true);
            setError("");
        } catch (err) {
            setError(
                "Error al iniciar sesión. Por favor revise sus credenciales e intente de nuevo"
            );
            setLoginSuccess(false);
        }
    };

    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleDocumentClick = (event) => {
        if (
            formRef.current &&
            !formRef.current.contains(event.target) &&
            event.target.getAttribute("id") !== "show_hide_password"
        ) {
            setShowPassword(false);
            setLoginSuccess(false);
        }
    };

    return (
        <div className="container mt-3">
            <main>
                <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-2 col-xs-3"></div>
                    <div className="col-lg-6 col-md-6 col-sm-8 col-xs-6">
                        <h1 className="text-center mb-4">Inicia sesión en DiscoStu</h1>
                        <form className="mb-3" ref={formRef}>
                            <div className="form-group mb-3">
                                <div className="form-group mb-3">
                                    {loginSuccess && <div className="alert alert-success">Inicio de sesión exitoso</div>}
                                    {error && <div className="alert alert-danger">{error}</div>}
                                </div>
                                <label htmlFor="usernameOrMail">Nombre de usuario o correo: </label>
                                <input
                                    aria-invalid="false"
                                    autoFocus=""
                                    className="form-control mt-2"
                                    id="usernameOrMail" // Cambiar el id para que coincida con el htmlFor
                                    name="usernameOrMail" // Cambiar el name para que coincida con el estado
                                    required
                                    type="text"
                                    value={usernameOrMail}
                                    onChange={(e) => setUsernameOrMail(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === "Enter") {
                                            handleLogin(e);
                                        }
                                    }}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="password">Contraseña: </label>
                                <div className="input-group mt-2" id="password_group_wrapper">
                                    <input
                                        aria-invalid="false"
                                        autoFocus=""
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        required
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onKeyPress={(e) => {
                                            if (e.key === "Enter") {
                                                handleLogin(e);
                                            }
                                        }}
                                    />
                                    <div className="input-group-append" id="show_hide_password">
                                        <span className="input-group-text">
                                            <button
                                                type="button"
                                                className="border-0"
                                                aria-pressed="false"
                                                onClick={handleTogglePassword}
                                            >
                                                <span className="sr-only">
                                                    {showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                                </span>
                                                <i
                                                    role="img"
                                                    aria-hidden="true"
                                                    className={`far ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
                                                ></i>
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="d-grid gap-2 mt-4">
                                <button
                                    type="button"
                                    className="btn btn-success btn-block"
                                    onClick={handleLogin}
                                >
                                    Iniciar sesión
                                </button>
                            </div>
                            <p className="text-center mt-3">
                                ¿No eres usuario de DiscoStu?
                                <a href="/register" className="ms-2">Crea una cuenta</a>
                            </p>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};
