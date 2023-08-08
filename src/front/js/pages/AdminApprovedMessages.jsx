import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../store/appContext'
import { useNavigate } from 'react-router-dom';


export const AdminApprovedMessages = () => {

    const navigate = useNavigate()
    const { store, actions } = useContext(Context)
    const [selectedItems, setSelectedItems] = useState([]);
    const userId = localStorage.getItem('userID');
    const [data, setData] = useState({ sent_messages: [] });
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchSentMessages = await actions.getAllMessages(userId)
                setData(fetchSentMessages);
            } catch (error) {
                console.log('Error fetching data: ', error);
            }
        };
        fetchData();
    }, [actions, userId]);

    const handleNavigateInbox = () => {
        navigate('/messages')
    }

    const handleNavigateTrash = () => {
        navigate('/messages/trash')
    }

    const handleNavigateWriteMessage = () => {
        navigate('/messages/compose')
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

    const handleDeleteMessage = () => {
        const selectedItemsCopy = [...selectedItems];
        setSelectedItems([]);
        selectedItemsCopy.forEach((messageId) => {
            const message_data = {
                'message_id': messageId
            };
            actions.deleteSentMessage(message_data);
        });
    };

    return (
        <div style={{ display: 'flex', margin: '30px 100px 30px 100px' }}>
            <div className="container-fluid" style={{ width: '30px' }}>
                <div className="row" style={{ margin: '30px 100px' }}>
                    <div className="col-md-3">
                        <div>
                            <button onClick={() => handleNavigateWriteMessage()} type="button" className="btn btn-dark mb-3 w-100">Escribir</button>
                        </div>
                        <div style={{ marginTop: '10px' }}>
                            <div>
                                <button onClick={() => handleNavigateInbox()} style={{ width: '100%', textAlign: 'left', padding: '6px' }} type="button" className="btn btn-outline">Bandeja de entrada</button>
                                <button style={{ width: '100%', textAlign: 'left', padding: '6px' }} type="button" className="btn btn-outline"><strong>Enviados</strong></button>
                                <button onClick={() => handleNavigateTrash()} style={{ width: '100%', textAlign: 'left', padding: '6px' }} type="button" className="btn btn-outline">Papelera</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="messages_center" className="col-md-9">
                    <h1 className="mb-3">Mensajes enviados: </h1>
                    <div className="mb-3">
                        <button onClick={() => handleDeleteMessage()} className="btn btn-light">Eliminar</button>
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
                                {data.sent_messages.length > 0 ? (
                                    data.sent_messages.map((element, index) => {
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
                                        <td colSpan="4"></td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
