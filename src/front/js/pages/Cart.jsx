import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../store/appContext';
import CartComponent from '../component/CartComponent.jsx'
import PayPalPayment from '../component/PayPalPayment.jsx'


const Cart = () => {

    const { store, actions } = useContext(Context)
    const numOffers = store.cart.reduce((totalOffers, element) => totalOffers + element.offers.length, 0);

    useEffect(() => {
        actions.getCart();
    }, []);

    return (
        <div className='container'>

            <div className='row'>
                <div className='col-md-12 mt-4' style={{ marginLeft: '30px' }}>
                    <h5 style={{ margin: 0 }}><strong>Tienes {numOffers} aticulos de {store.cart.length} vendedores</strong></h5>
                </div>
                <div style={{width: '200px'}}>
                    <PayPalPayment />
                </div>
                {
                    store.cart.length > 0 &&
                    store.cart.map((element, index) => (
                        <div key={element.id} className='col-md-12 d-flex justify-content-center align-items-center'>
                            <CartComponent
                                data={element}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}



export default Cart