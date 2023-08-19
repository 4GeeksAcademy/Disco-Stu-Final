import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../store/appContext'
import { useNavigate } from 'react-router-dom';
import PaymentComponent from '../component/PayPalPayment.jsx'
import Swal from 'sweetalert2';

export const UserOrders = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [ordersList, setOrdersList] = useState([]);
    const [refreshOrders, setRefreshOrders] = useState(false);
    const [valoracionPositiva, setValoracionPositiva] = useState(false)
    const [valoracionNegativa, setValoracionNegativa] = useState(false)

    const paidOrders = ordersList.filter(order => order.pagado);
    const pendingOrders = ordersList.filter(order => !order.pagado);

    const sortedOrdersList = [...pendingOrders, ...paidOrders];

    useEffect(() => {
        const handleGetOrders = async () => {
            const user_id = localStorage.getItem('userID');
            const ordersData = await actions.getOrderPlaced(user_id);
            console.log("esta es la data de orders", ordersData)

            setOrdersList(ordersData);

            // Restablecer la actualización de pedidos
            setRefreshOrders(false);
        };

        handleGetOrders();
    }, [refreshOrders]);

    const updatePageData = async () => {
        try {
            const user_id = localStorage.getItem('userID');
            const ordersData = await actions.getOrderPlaced(user_id);
            setOrdersList(ordersData);
        } catch (error) {
            console.error('Error updating page data:', error);
        }
    };

    const handlerDeleteOrder = async (order_id) => {
        const user_id = localStorage.getItem('userID');

        try {
            await actions.deleteOrderbyOrderId({
                user_id,
                order_id
            });

            // Alerta de éxito
            Swal.fire({
                icon: 'success',
                title: 'Pedido eliminado exitosamente',
                showConfirmButton: false,
                timer: 1500
            });


            setOrdersList(prevOrders => prevOrders.filter(order => order.id !== order_id));
        } catch (error) {

            Swal.fire({
                icon: 'error',
                title: 'Error al eliminar el pedido',
                text: 'Hubo un problema al eliminar el pedido. Por favor, inténtalo de nuevo más tarde.',
                confirmButtonText: 'Cerrar'
            });
        }
    };

    const formatDate = date => {
        if (!date) return '';

        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('es-ES', options);
    };

    const handleNavigateSent = () => {
        navigate('/messages/sent')
    }

    const handleNavigateOrders = () => {
        navigate('/user-orders')
    }

    const handleNavigateInbox = () => {
        navigate('/messages')
    }
    const handleNavigateTrash = () => {
        navigate('/messages/trash')
    }

    const handleNavigateWriteMessage = () => {
        navigate('/messages/compose')
    }

    const handleEnviarValoracion = async (vendedor_id) => {
        if (valoracionPositiva) {
            const object = {
                'vendedor_id': vendedor_id,
                'positivo_o_negativo': 'POSITIVO'
            }
            console.log('llegamos1')
            const response = await actions.sendRating(object)
            if (response == 'COMPLETED') {
                console.log('llegamos2')
                window.location.reload();
            }
        } else if (valoracionNegativa) {
            const object = {
                'vendedor_id': vendedor_id,
                'positivo_o_negativo': 'NEGATIVO'
            }
            const response = await actions.sendRating(object)
            if (response == 'COMPLETED') {
                window.location.reload();
            }
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="card bg-black rounded-0 border-0">
                <div className="text-white d-flex flex-row w-100 border-0">
                    <div className="ms-4 mt-5 d-flex flex-column" style={{ width: "150px" }}></div>
                    <div className="ms-3" style={{ marginTop: "130px" }}></div>
                </div>
                <div className="p-4 text-black" style={{ backgroundColor: "#f8f9fa" }}>
                    <h3 className="text-center">Mensajes</h3>
                    <div className="d-flex justify-content-end text-center py-1"></div>
                </div>
            </div>
            <div>
                <div className="container-fluid" style={{ margin: '30px' }}>
                    <div className="row me-3">
                        <div className="col-md-3">
                            <div style={{ marginTop: '10px' }}>
                                <div>
                                    <button onClick={() => handleNavigateOrders()} style={{ width: '100%', textAlign: 'left', padding: '6px' }} type="button" className="btn btn-outline"><strong>Pedidos</strong></button>
                                    <button onClick={() => handleNavigateInbox()} style={{ width: '100%', textAlign: 'left', padding: '6px' }} type="button" className="btn btn-outline">Bandeja de entrada</button>
                                    <button onClick={() => handleNavigateSent()} style={{ width: '100%', textAlign: 'left', padding: '6px' }} type="button" className="btn btn-outline">Enviados</button>
                                    <button onClick={() => handleNavigateTrash()} style={{ width: '100%', textAlign: 'left', padding: '6px' }} type="button" className="btn btn-outline">Papelera</button>
                                </div>
                            </div>
                        </div>
                        <div id="messages_center" className="col-md-9">
                            {sortedOrdersList.map(order => (
                                <div>
                                    <div className="table-responsive">
                                        <table className="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Pedido</th>
                                                    <th>Fecha de Creación</th>
                                                    <th>Estado</th>
                                                    <th>ID</th>
                                                    <th>Artículo</th>
                                                    <th>Total</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr key={order.id}>
                                                    <td>{order.id}</td>
                                                    <td>{formatDate(new Date())}</td>
                                                    <td>{order.pagado ? "Pagado" : "Pendiente"}</td>
                                                    <td>{order.articulos.map(articulo => articulo.id).join(', ')}</td>
                                                    <td>{order.articulos.map(articulo => articulo.titulo).join(', ')}</td>
                                                    <td>${order.impuesto + order.precio_total + 10}</td>
                                                    <td>
                                                        {!order.pagado && (
                                                            <button className="btn btn-outline-dark w-100 mb-2" onClick={() => handlerDeleteOrder(order.id)}>Cancelar pedido</button>
                                                        )}
                                                        {!order.pagado && (
                                                            <PaymentComponent orderID={order.id} cost={order.precio_total + 10} updatePageData={updatePageData} seller_id={order.vendedor_id} />
                                                        )}
                                                    </td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                    {order.pagado &&
                                        <div className='d-flex mt-0 align-items-center' style={{borderLeft: '1px solid #eeeeee', borderBottom: '1px solid #eeeeee', paddingLeft: '10px'}}>
                                            <p><strong>Enviar valoracion al vendedor:</strong></p>
                                            <div className='d-flex align-items-center' style={{marginLeft: '30px'}}>
                                                <input type="checkbox"
                                                    checked={valoracionPositiva}
                                                    onChange={() => {
                                                        setValoracionPositiva(true);
                                                        setValoracionNegativa(false);
                                                    }} 
                                                    style={{marginRight: '5px'}}
                                                />
                                                <i className="fa-solid fa-circle-check" style={{ color: '#239a4d' }}></i>
                                                <p><strong>Positivo</strong></p>
                                            </div>
                                            <div className='d-flex align-items-center' style={{marginLeft: '30px'}}>
                                                <input
                                                    type="checkbox"
                                                    checked={valoracionNegativa}
                                                    onChange={() => {
                                                        setValoracionPositiva(false);
                                                        setValoracionNegativa(true);
                                                    }}
                                                    style={{marginRight: '5px'}}
                                                />
                                                <i className="fa-solid fa-xmark" style={{ color: '#cf0707' }}></i>
                                                <p><strong>Negativo</strong></p>
                                            </div>
                                            <button style={{marginLeft: 'auto', marginRight: '5px'}} onClick={() => handleEnviarValoracion(order.vendedor_id)} type='button' className='btn btn-dark'>Enviar</button>
                                        </div>
                                    }
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}
