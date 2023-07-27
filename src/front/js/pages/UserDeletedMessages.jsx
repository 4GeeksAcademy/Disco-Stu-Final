import React, { useContext } from 'react'
import { Context } from '../store/appContext'
import { useNavigate } from 'react-router-dom';


const User_deleted_messages = () => {

    const navigate = useNavigate()
    const { store, actions } = useContext(Context)

    const handleNavigateInbox = () => {
        navigate('/messages')
    }
    const handleNavigateSent = () => {
        navigate('/messages/sent')
    }

    return (
        <div style={{ display: 'flex', margin: '30px 100px 30px 100px' }}>
            <div id='messages_control' style={{ width: '200px' }}>
                <div>
                    <button style={{ width: '100%' }} type="button" className="btn btn-dark">Escribir</button>
                </div>
                <div style={{ marginTop: '10px' }}>
                    <div>
                        <button onClick={() => handleNavigateInbox()} style={{ width: '100%', textAlign: 'left', padding: '6px' }} type="button" className="btn btn-outline">Bandeja de entrada</button>
                        <button onClick={() => handleNavigateSent()} style={{ width: '100%', textAlign: 'left', padding: '6px' }} type="button" className="btn btn-outline">Enviados</button>
                        <button style={{ width: '100%', textAlign: 'left', padding: '6px' }} type="button" className="btn btn-outline"><strong>Papelera</strong></button>
                    </div>
                </div>
            </div>
            <div id='messages_center' style={{ width: '100%', paddingLeft: '30px', display: 'flex', flexDirection: 'column' }}>
                <h1 style={{ width: '100%', fontSize: '20px' }}>Papelera</h1>
                <div style={{ border: '1px solid #dfdfdf', padding: '8px 8px 8px 15px' }}>
                    <button style={{backgroundColor: '#f2f2f2'}} type="button" className="btn">Volver a la bandeja de entrada</button>
                </div>
                <table style={{ fontSize: '14px', marginTop: '10px' }}>
                    <thead style={{ backgroundColor: '#eeeeee', height: '30px' }}>
                        <tr>
                            <th style={{ width: '30px', padding: '2px 0px 0px 5px' }}><input type="checkbox" /></th>
                            <th style={{ width: '25%' }}>De</th>
                            <th style={{ width: '54%' }}>Asunto</th>
                            <th style={{ width: '18%' }}>Recibido</th>
                        </tr>
                    </thead>
                    <tbody>
                        {store.deleted_messages > 0 ? (
                            store.deleted_messages.map((element, index) => {
                                const emisor = store.users.find((user) => element.emisor_id === user.id);
                                return (
                                    <tr key={index}>
                                        <td style={{ width: '30px', padding: '2px 0px 0px 5px' }}><input type="checkbox" /></td>
                                        <td style={{ width: '25%' }}>{emisor.username}</td>
                                        <td style={{ width: '54%' }}>{element.asunto}</td>
                                        <td style={{ width: '18%' }}>{element.fecha}</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="4">Alo</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default User_deleted_messages