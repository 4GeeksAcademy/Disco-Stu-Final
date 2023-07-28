import React, { useContext, useState } from 'react'
import { Context } from '../store/appContext'
import { useNavigate } from 'react-router-dom';


const User_deleted_messages = () => {

    const navigate = useNavigate()
    const { store, actions } = useContext(Context)
    const [ messageTo, setMessageTo ] = useState()
    const [ subject, setSubject ] = useState('')
    const [ message, setMessage ] = useState('')

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

    const sendMessage = () => {
        const fecha = new Date()
        const message_data = {
            'receptor': messageTo, // Faltaria convertir esto en algun momento a receptor_id
            'asunto': subject,
            'mensaje': message,
            'fecha': fecha
        }
        actions.sendMessage(message_data)
    }


    return (
        <div style={{ display: 'flex', margin: '30px 100px 30px 100px' }}>
            <div id='messages_control' style={{ width: '200px' }}>
                <div style={{ marginTop: '10px' }}>
                    <div>
                        <button onClick={() => handleNavigateInbox()} style={{ width: '100%', textAlign: 'left', padding: '6px' }} type="button" className="btn btn-outline">Bandeja de entrada</button>
                        <button onClick={() => handleNavigateSent()} style={{ width: '100%', textAlign: 'left', padding: '6px' }} type="button" className="btn btn-outline">Enviados</button>
                        <button onClick={() => handleNavigateTrash()} style={{ width: '100%', textAlign: 'left', padding: '6px' }} type="button" className="btn btn-outline">Papelera</button>
                    </div>
                </div>
            </div>
            <div id='messages_center' style={{ width: '100%', paddingLeft: '30px', display: 'flex', flexDirection: 'column' }}>
                <form style={{ border: '2px solid #dfdfdf' }}>
                    <fieldset>
                        <legend style={{ fontSize: '17px', backgroundColor: '#eeeeee', padding: '3px 0px 3px 20px' }}><strong>Crear un nuevo mensaje</strong></legend>
                        <div style={{ padding: '14px' }}>
                            <div class="form-field" style={{ display: 'flex', flexDirection: 'column', width: '40%' }}>
                                <label for="to">Enviar mensaje a</label>
                                <input onChange={(e) => handleMessageTo(e.target.value)} id="to" name="to" required="" size="50" type="text" value={messageTo} />
                            </div>
                            <div class="form-field" style={{ display: 'flex', flexDirection: 'column', width: '40%', marginTop: '30px' }}>
                                <label for="subject">Asunto</label>
                                <div style={{ display: 'flex' }}>
                                    <input onChange={(e) => handleSubject(e.target.value)} id="subject" maxlength="80" name="subject" required="true" size="50" type="text" value={subject} />
                                    <span id="input_counter_subject" className="input_counter" style={{ margin: '5px 5px' }}>{subject.length}/80</span>
                                </div>
                            </div>
                            <div class="form-field" style={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: '30px' }}>
                                <label for="message">Mensaje</label>
                                <textarea onChange={(e) => handleMessage(e.target.value)} style={{height: '150px'}} class="monospace_font countable" id="message" maxlength="1600" name="message"></textarea>
                                <span id="input_counter_message" class="input_counter" style={{ margin: '5px 5px' }}>{message.length}/1600</span>
                            </div>
                            <button onClick={() => sendMessage()} type="button" className="btn btn-dark">Enviar</button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}

export default User_deleted_messages