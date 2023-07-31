import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";


export const RegisterForm = () => {
    const { actions } = useContext(Context);
    const [passwordValid, setPasswordValid] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const [isRegistered, setIsRegistered] = useState(false);

    const [userData, setUserData] = useState({
        username: "",
        mail: "",
        password: "",
    });

    // Function to show password
    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    // Password validation function
    const validatePassword = (password) => {

        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.!?@])[A-Za-z\d.!?@]{8,}$/;

        const isValid = regex.test(password);

        setPasswordValid(isValid);
        return isValid;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const mail = event.target.mail.value;
        const password = event.target.password.value;

        const isValidPassword = validatePassword(password);

        if (isValidPassword) {
            actions.createUser({ username: username, mail, password });
            setIsRegistered(true); // Set the registration status to true
            setUserData({ username: "", mail: "", password: "" }); // Reset the input fields
        }
    };

    return (

        <div className="container mt-3">
            <main>
                <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-2 col-xs-3">
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-8 col-xs-6">
                        <h1 className="text-center mb-4">Crea una cuenta en Disco Stu</h1>
                        <form className="mb-3" onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <label htmlFor="username">Username</label>
                                <input
                                    aria-invalid="false"
                                    autoFocus=""
                                    className="form-control mt-2"
                                    id="username"
                                    name="username"
                                    required
                                    type="text"
                                    value={userData.username}
                                    onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="mail">Email</label>
                                <input
                                    aria-invalid="false"
                                    className="form-control mt-2"
                                    id="mail"
                                    name="mail"
                                    required
                                    type="text"
                                    value={userData.mail}
                                    onChange={(e) => setUserData({ ...userData, mail: e.target.value })}
                                />

                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="password">Contraseña</label>
                                <div className="input-group mt-2" id="password_group_wrapper">
                                    <input
                                        aria-invalid="false"
                                        className="form-control"
                                        id="password"
                                        maxLength="4096"
                                        minLength="8"
                                        name="password"
                                        required
                                        type={showPassword ? "text" : "password"}
                                        value={userData.password}
                                        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                                    />
                                    <div className="input-group-append" id="show_hide_password">
                                        <span className="input-group-text">
                                            <button type="button" className="border-0" aria-pressed="false" onClick={handleTogglePassword}>
                                                <span className="sr-only">{showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}</span>
                                                <i role="img" aria-hidden="true" className={`far ${showPassword ? "fa-eye" : "fa-eye-slash"}`}></i>
                                            </button>
                                        </span>
                                    </div>
                                </div>
                                {!passwordValid && (
                                    <small className="text-danger">
                                        La contraseña debe cumplir con los siguientes criterios:
                                        <ul>
                                            <li style={{ color: userData.password.length < 8 ? 'red' : 'initial' }}>
                                                Tener al menos 8 caracteres de longitud
                                            </li>
                                            <li style={{ color: !/[a-z]/.test(userData.password) ? 'red' : 'initial' }}>
                                                Tener al menos una letra minúscula
                                            </li>
                                            <li style={{ color: !/[A-Z]/.test(userData.password) ? 'red' : 'initial' }}>
                                                Tener al menos una letra mayúscula
                                            </li>
                                            <li style={{ color: !/\d/.test(userData.password) ? 'red' : 'initial' }}>
                                                Tener al menos un número
                                            </li>
                                            <li style={{ color: !/[.!?@]/.test(userData.password) ? 'red' : 'initial' }}>
                                                Tener al menos uno de los siguientes caracteres especiales: . ! ? @
                                            </li>
                                        </ul>
                                    </small>)}
                            </div>
                            {/* <div className="form-group form-check mb-3">
                                <input className="form-check-input" id="tos" name="tos" required="" type="checkbox" />
                                <label htmlFor="tos">
                                    Acepto la <a className="inline-link">Política de privacidad</a> y estoy de acuerdo con los <a className="inline-link">Términos de servicio</a>, incluidos los requisitos de edad mínima.                                </label>
                            </div> */}
                            <div className="d-grid gap-2 mt-4">
                                <button type="submit" className="btn btn-success btn-block">Crear cuenta</button>
                            </div>
                            <p className="text-center mt-3">
                                ¿Ya tienes una cuenta?
                                <Link to="/login" className="ms-2">Inicia sesión</Link>
                            </p>
                        </form>
                        {isRegistered && (
                            <div className="alert alert-success mt-3">
                                ¡Registro exitoso! Ahora puedes iniciar sesión.
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>


    );
};
