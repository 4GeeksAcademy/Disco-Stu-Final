import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../store/appContext'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Formik, Form, Field, ErrorMessage } from 'formik';

export const UserComposeMessage = () => {
    const navigate = useNavigate()
    const { actions } = useContext(Context)
    const [messageTo, setMessageTo] = useState()
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await actions.getAllUsersInfo();
                setUsers(usersData);
            } catch (error) {
                console.error('Error fetching users:', error.message);
            }
        };
        fetchUsers();
    }, [actions]);


    const handleNavigateInbox = () => {
        navigate('/messages')
    }
    const handleNavigateSent = () => {
        navigate('/messages/sent')
    }
    const handleNavigateTrash = () => {
        navigate('/messages/trash')
    }

    const handleMessageTo = (value) => {
        setMessageTo(value)
    }

    const handleSubject = (value) => {
        setSubject(value)
    }

    const handleMessage = (value) => {
        setMessage(value)
    }

    const sendMessage = async () => {
        try {
            const fechaActual = new Date();
            const dia = fechaActual.getDate().toString().padStart(2, '0');
            const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
            const fecha = `${dia}/${mes}/${fechaActual.getFullYear()}`;
            const senderID = localStorage.getItem('userID'); 

            let message_data = {};

            const receptor = users.find((user) => user.username === messageTo);
            if (receptor) {
                message_data = {
                    receptor_id: receptor.id,
                    asunto: subject,
                    mensaje: message,
                    fecha: fecha,
                };
            }

            Swal.fire({
                title: '¿Enviar mensaje?',
                text: '¿Estás seguro de que deseas enviar este mensaje?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Enviar',
                cancelButtonText: 'Cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    // Lógica para enviar el mensaje
                    await actions.sendMessage(senderID, message_data);

                    Swal.fire({
                        title: '¡Mensaje enviado!',
                        text: 'El mensaje se ha enviado correctamente.',
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    }).then(() => {
                        // Redirigir a la página de mensajes
                        navigate('/messages');
                    });
                }
            });

        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div style={{ display: 'flex', margin: '30px 100px 30px 100px' }}>
            <div className="container-fluid" style={{ margin: '30px' }}>
                <div className="row">
                    <div className="col-md-3">
                        <div>
                            <button onClick={() => handleNavigateInbox()} style={{ width: '100%', textAlign: 'left', padding: '6px' }} type="button" className="btn btn-outline">Bandeja de entrada</button>
                            <button onClick={() => handleNavigateSent()} style={{ width: '100%', textAlign: 'left', padding: '6px' }} type="button" className="btn btn-outline"><strong>Enviados</strong></button>
                            <button onClick={() => handleNavigateTrash()} style={{ width: '100%', textAlign: 'left', padding: '6px' }} type="button" className="btn btn-outline">Papelera</button>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div id='messages_center'>
                            <Formik
                                initialValues={{ subject: '', message: '' }}
                                validate={values => {
                                    const errors = {};
                                    if (!values.subject) {
                                        errors.subject = 'Campo requerido';
                                    }
                                    if (!values.message) {
                                        errors.message = 'Campo requerido';
                                    }
                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    sendMessage(values);
                                    setSubmitting(false);
                                }}
                            >
                                {({ isSubmitting }) => (
                                    <Form className="border rounded p-3">
                                        <fieldset>
                                            <legend className="bg-light p-2"><strong>Crear un nuevo mensaje</strong></legend>
                                            <div className="p-3">
                                                <div className="mb-3">
                                                    <label htmlFor="to">Enviar mensaje a</label>
                                                    <input
                                                        onChange={(e) => handleMessageTo(e.target.value)}
                                                        id="to"
                                                        name="to"
                                                        className="form-control"
                                                        required={true}
                                                        size="50"
                                                        type="text"
                                                        value={messageTo}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="subject">Asunto</label>
                                                    <div className="d-flex">
                                                        <Field
                                                            id="subject"
                                                            maxLength="80"
                                                            name="subject"
                                                            className="form-control"
                                                            required={true}
                                                            size="50"
                                                        />
                                                        <span id="input_counter_subject" className="input_counter ml-2 my-auto">
                                                            <ErrorMessage name="subject" component="span" className="error-message" />
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="message">Mensaje</label>
                                                    <Field
                                                        as="textarea"
                                                        // onChange={(e) => handleMessage(e.target.value)}
                                                        style={{ height: '150px' }}
                                                        className="form-control"
                                                        id="message"
                                                        maxLength="1600"
                                                        name="message"
                                                    />
                                                    <span id="input_counter_message" className="input_counter ml-2 my-auto">
                                                        <ErrorMessage name="message" component="span" className="error-message" />
                                                    </span>
                                                </div>
                                                <button type="submit" className="btn btn-dark" disabled={isSubmitting}>
                                                    Enviar
                                                </button>
                                            </div>
                                        </fieldset>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

