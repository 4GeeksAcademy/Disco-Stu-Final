import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../store/appContext'
import { useNavigate } from 'react-router-dom';


export const AdminInbox = () => {

    const navigate = useNavigate()
    const { actions } = useContext(Context)
    const [selectedItems, setSelectedItems] = useState([]);
    const userId = localStorage.getItem('userID');
    const [data, setData] = useState({ inbox: [] });

    const handleNavigateSent = () => {
        navigate('/messages/sent')
    }

    const handleNavigateInbox = () => {
        navigate('/messages/');
    };

    const handleNavigateTrash = () => {
        navigate('/messages/trash')
    }

    const handleNavigateWriteMessage = () => {
        navigate('/messages/compose')
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await actions.getAllMessages(userId);
                setData(fetchedData);
            } catch (error) {
                console.log('Error fetching messages: ', error);
            }
        };
        fetchData();
    }, []);

    const toggleSelectMessage = (index) => {
        // Verificar si el índice ya está seleccionado para añadirlo o removerlo de la lista
        setSelectedItems((prevSelectedItems) => {
            if (prevSelectedItems.includes(index)) {
                return prevSelectedItems.filter((selected) => selected !== index);
            } else {
                return [...prevSelectedItems, index];
            }
        });
    };

    const handleDeleteMessage = () => {
        const selectedItemsCopy = [...selectedItems]
        setSelectedItems([])
        selectedItemsCopy.map(element => {
            const message_data = {
                'message_id': element
            }
            actions.deleteMessage(message_data)
        })
    }

    return (
        <div className="container-flui">
            {/* Encabezado */}
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

            <div style={{ display: 'flex', margin: '30px 100px 30px 100px' }}>
                <div className="container-fluid" style={{ margin: '30px' }}>
                    <div className="row" style={{ margin: '30px 100px' }}>
                        <div className="col-md-3">
                            <div>
                                <button onClick={() => handleNavigateWriteMessage()} className="btn btn-dark mb-3 w-100">Escribir</button>
                            </div>
                            <div className="mt-3">
                                <div>
                                    <button onClick={() => handleNavigateInbox()} style={{ width: '100%', textAlign: 'left', padding: '6px' }} type="button" className="btn btn-outline">Bandeja de entrada</button>
                                    <button style={{ width: '100%', textAlign: 'left', padding: '6px' }} type="button" className="btn btn-outline"><strong>Enviados</strong></button>
                                    <button onClick={() => handleNavigateTrash()} style={{ width: '100%', textAlign: 'left', padding: '6px' }} type="button" className="btn btn-outline">Papelera</button>
                                </div>
                            </div>
                        </div>
                        <div id="messages_center" className="col-md-9">
                            <h1 className="mb-3">Buzón de entrada</h1>
                            <div className="mb-3">
                                <button onClick={() => handleDeleteMessage()} className="btn btn-light">Eliminar</button>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead className="bg-light">
                                        <tr>
                                            <th className="col"><input type="checkbox" /></th>
                                            <th className="col">De</th>
                                            <th className="col">Asunto</th>
                                            <th className="col">Enviado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.inbox.length > 0 ? (
                                            data.inbox.map((element, index) => (
                                                <tr key={element.id}>
                                                    <td style={{ width: '30px', padding: '0.5rem' }}>
                                                        <input type="checkbox" onChange={() => toggleSelectMessage(element.id)} />
                                                    </td>
                                                    <td style={{ width: '25%' }}>{element.emisor_id}</td>
                                                    <td style={{ width: '54%' }}>{element.asunto}</td>
                                                    <td style={{ width: '18%' }}>{element.fecha}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4">No hay mensajes en la bandeja de entrada.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
