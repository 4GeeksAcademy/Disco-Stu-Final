import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../store/appContext';
import CartComponent from '../component/CartComponent.jsx'


const Cart = () => {

    const { store, actions } = useContext(Context)
    const [ numOffers, setNumOffers] = useState(0)

    useEffect(() => {
        actions.getCart();
        let newNumOffers = 0;
        store.cart.forEach(element => {
            newNumOffers += element.offers.length;
        });
        setNumOffers(newNumOffers);
        console.log(numOffers)
    }, [store.cart]);

    return (
        <div className='container'>

            <div className='row'>
                <div className='col-md-12 mt-4' style={{marginLeft: '30px'}}>
                    <h5 style={{margin: 0}}><strong>Tienes {numOffers} aticulos de {store.cart.length} vendedores</strong></h5>
                </div>
                {
                    store.cart.length > 0 &&
                    store.cart.map((element, index) => (
                        <div className='col-md-12 d-flex justify-content-center align-items-center'>
                            <CartComponent
                                key={index}
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