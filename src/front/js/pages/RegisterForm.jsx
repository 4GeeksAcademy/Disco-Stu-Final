import React, { useState } from "react";



export const RegisterForm = () => {
    const [passwordValid, setPasswordValid] = useState(true);
    const [showPassword, setShowPassword] = useState(false); // State for password visibility

    // Function to show password
    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    // Password validation function
    const validatePassword = (password) => {

        const regex = /^(?=.*\S)(?=.*[A-Z])(?=.*\d)(?=.*[.!?@]).+$/;
        const minLength = 8;

        const isValid = regex.test(password) && password.length >= minLength;

        setPasswordValid(isValid);
        return isValid;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const password = event.target.password.value;

        const isValidPassword = validatePassword(password);


        if (isValidPassword) {
            // Your form submission logic here...
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
                                <input aria-invalid="false" autoFocus="" className="form-control mt-2" id="username" name="username" required type="text" />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="email">Email</label>
                                <input aria-invalid="false" className="form-control mt-2" id="email" name="email" required type="text" />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="password">Contraseña</label>
                                <div className="input-group mt-2" id="password_group_wrapper">
                                    <input aria-invalid="false" className="form-control" id="password" maxLength="4096" minLength="8" name="password" required="" type={showPassword ? "text" : "password"} />
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
                                            <li>Tener al menos un carácter que no sea un espacio</li>
                                            <li>Tener al menos una letra mayúscula</li>
                                            <li>Tener al menos un número</li>
                                            <li>Tener al menos uno de los siguientes caracteres especiales: . ! ? @</li>
                                            <li>Tener al menos 8 caracteres de longitud</li>
                                        </ul>
                                    </small>)}
                            </div>
                            <div className="form-group form-check mb-3">
                                <input className="form-check-input" id="tos" name="tos" required="" type="checkbox" />
                                <label htmlFor="tos">
                                    Acepto la <a className="inline-link">Política de privacidad</a> y estoy de acuerdo con los <a className="inline-link">Términos de servicio</a>, incluidos los requisitos de edad mínima.                                </label>
                            </div>
                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-success btn-block">Crear cuenta</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>


    );
};
