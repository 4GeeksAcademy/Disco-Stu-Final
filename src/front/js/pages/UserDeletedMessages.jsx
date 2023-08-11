import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../store/appContext'
import { useNavigate } from 'react-router-dom';


export const UserDeletedMessages = () => {

    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [selectedItems, setSelectedItems] = useState([]);
    const userId = localStorage.getItem('userID');
    const [data, setData] = useState({ deleted_messages: [] });
    const [users, setUsers] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchDeletedMessages = await actions.getAllMessages(userId)
                setData(fetchDeletedMessages);

                const usersData = await actions.getAllUsersInfo();
                setUsers(usersData);
            } catch (error) {
                console.log('Error fetching data: ', error);
            }
        };
        fetchData();
    }, [actions, userId]);


    const handleNavigateTrash = () => {
        navigate('/messages/trash')
    }
    const handleNavigateInbox = () => {
        navigate('/messages')
    }
    const handleNavigateSent = () => {
        navigate('/messages/sent')
    }

    const handleNavigateWriteMessage = () => {
        navigate('/messages/compose')
    }

    const handleNavigateOrders = () => {
        navigate('/user-orders')
    }

    const toggleSelectMessage = (messageId) => {
        setSelectedItems((prevSelectedItems) => {
            if (prevSelectedItems.includes(messageId)) {
                return prevSelectedItems.filter((selected) => selected !== messageId);
            } else {
                return [...prevSelectedItems, messageId];
            }
        });
    };

    const handleRecoverMessage = async () => {
        try {
            await Promise.all(selectedItems.map(async (messageId) => {
                const response = await actions.recoverDeletedMessage(messageId); // Cambia esto a la acción real para recuperar mensajes
                console.log('Message recovered successfully', response);
            }));
            setSelectedItems([]);
            // Actualiza la lista de mensajes eliminados después de la recuperación
            await actions.getDeletedMessages(userId); // Cambia esto a la acción real para obtener los mensajes eliminados
        } catch (error) {
            console.log('Error recovering messages:', error);
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="card bg-black rounded-0 border-0">
                <div
                    className="text-white d-flex flex-row w-100 border-0"
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
                    <h3 className="text-center">Mensajes</h3>
                    <div className="d-flex justify-content-end text-center py-1">
                    </div>
                </div>
            </div>
            <div>
                <div className="container-fluid" style={{ margin: '30px' }}>
                    <div className="row me-3" >
                        <div className="col-md-3">
                            <div>
                                <button onClick={() => handleNavigateWriteMessage()} className="btn btn-dark mb-3 w-100">Escribir</button>
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                <div>
                                    <button onClick={() => handleNavigateOrders()} style={{ width: '100%', textAlign: 'left', padding: '6px' }} type="button" className="btn btn-outline">Pedidos</button>
                                    <button onClick={() => handleNavigateInbox()} style={{ width: '100%', textAlign: 'left', padding: '6px' }} type="button" className="btn btn-outline">Bandeja de entrada</button>
                                    <button onClick={() => handleNavigateSent()} style={{ width: '100%', textAlign: 'left', padding: '6px' }} type="button" className="btn btn-outline">Enviados</button>
                                    <button onClick={() => handleNavigateTrash()} style={{ width: '100%', textAlign: 'left', padding: '6px' }} type="button" className="btn btn-outline"><strong>Papelera</strong></button>
                                </div>
                            </div>
                        </div>
                        <div id="messages_center" className="col-md-9">
                            <div className="mb-3 d-flex justify-content-end">
                                <button onClick={() => handleDeleteMessage()} className="btn btn-outline-dark">Eliminar</button>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead className="bg-light">
                                        <tr>
                                            <th className="col"><input type="checkbox" /></th>
                                            <th className="col">Para</th>
                                            <th className="col">Asunto</th>
                                            <th className="col">Enviado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.deleted_messages.length > 0 ? (
                                            data.deleted_messages.map((element, index) => {
                                                const emisor = users.find((user) => user.id === element.emisor_id);
                                                // Si se encuentra el emisor, muestra el nombre, de lo contrario, muestra "Emisor desconocido"
                                                const emisorName = emisor ? emisor.username : 'Emisor desconocido';

                                                return (
                                                    <tr key={element.id}>
                                                        <td style={{ width: '30px', padding: '2px 0px 0px 5px' }}><input onChange={() => toggleSelectMessage(element.id)} type="checkbox" /></td>
                                                        <td style={{ width: '25%' }}>{emisorName}</td>
                                                        <td style={{ width: '54%' }}>{element.asunto}</td>
                                                        <td style={{ width: '18%' }}>{element.fecha}</td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td className="col">No hay mensajes en la bandeja de enviados.</td>
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

