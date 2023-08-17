import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../store/appContext'
import { useNavigate } from 'react-router-dom';
import PayPalPayment from '../component/PayPalPayment.jsx'
import Swal from 'sweetalert2';

export const UserOrders = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [ordersList, setOrdersList] = useState([]);

    useEffect(() => {
        const handleGetOrders = async () => {
            const user_id = localStorage.getItem('userID');
            const ordersData = await actions.getOrderPlaced(user_id);
            console.log("esta es la data de orders", ordersData)

            setOrdersList(ordersData);
        };
        handleGetOrders();
    }, []);

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

                            <div className="table-responsive">
                                {ordersList.map(order => (
                                    <div className="card mt-4">
                                        <div className="card-header bg-white d-flex justify-content-between">
                                            <div>
                                                <h5 className="card-title">Pedido n. °{order.id}</h5>
                                                <p className="card-text">Creado: {formatDate(new Date())}</p>
                                            </div>
                                            <div>
                                                <p className="card-text">Estado: PENDIENTE</p>
                                            </div>
                                            <div className="mb-3 me-3 d-flex justify-content-end">
                                                <button className="btn btn-outline-dark" onClick={() => handlerDeleteOrder(order.id)}>Eliminar</button>                                            </div>
                                        </div>
                                        <div className="card-body p-0 ">
                                            <div class="card-header">
                                                <div class="row">
                                                    <div class="col">
                                                        ID
                                                    </div>
                                                    <div class="col">
                                                        Artículo
                                                    </div>
                                                </div>
                                            </div>
                                            {order.articulos.map(articulo => (
                                                <div className="row mx-2" key={articulo.id}>
                                                    <div className="col-md-4">
                                                        <div className="mb-3">
                                                            {articulo.id}
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="mb-3">
                                                            {articulo.titulo}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="card flex-column align-items-end border-0 border-top">
                                                <div className="card-body" style={{ width: "200px" }}>
                                                    <p className="card-title"><strong>Total:</strong> {order.precio_total}</p>
                                                    <p className="card-title"><strong>Envío:</strong> $ 10</p>
                                                    <p className="card-title"><strong>Impuesto:</strong> $ {order.impuesto}</p>
                                                    <p className="card-title"><strong>Total:</strong> $ {order.impuesto + order.precio_total + 10}</p>
                                                </div>
                                            </div>
                                            <div className="card flex-column align-items-end border-0 border-top">
                                                <div className="card-body">
                                                    <PayPalPayment />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
