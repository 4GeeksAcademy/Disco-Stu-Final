import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../store/appContext';
import '../../styles/CartComponent.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const CartComponent = ({ data, key }) => {

  const { store, actions } = useContext(Context)
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalTax, setTotalTax] = useState(0)

  useEffect(() => {
    let newTotalPrice = 0;
    data.offers.forEach(element => {
      newTotalPrice += element.precio;
    });
    
    const formattedTotalPrice = newTotalPrice.toFixed(2);
    const formattedTotalTax = (newTotalPrice * 0.05).toFixed(2);
    
    setTotalPrice(formattedTotalPrice);
    setTotalTax(formattedTotalTax);
  }, [store.cart]);

  const handlerDeleteItem = (element) => {
    const user_id = localStorage.getItem('userID');
    const object_dict = {
      'user_id': user_id,
      'vendedor_id': element.vendedor_id,
      'oferta_id': element.oferta_id,
    }
    actions.deleteCartItem(object_dict)
  }

  const handlerDeleteAllItems = () => {
    const user_id = localStorage.getItem('userID');
    const object_dict = {
      'user_id': user_id,
      'vendedor_id': data.seller.id,
    }
    actions.deleteCartItemsBySeller(object_dict)
  }

  return (
    <div className="container mt-4">
      <div key={key} className="card" >
        <div className="card-body" style={{ padding: 0 }}>
          <div id='seller_info' className="d-flex justify-content-between align-items-center">
            <p className="mb-0">Realizar pedido de <span style={{ color: '#033BDB' }}>{data.seller.nombre}</span> <span style={{ fontSize: '0.8rem' }}>90%, 15 valoraciones (trucha)</span></p>
            <i onClick={() => handlerDeleteAllItems()} className="fa-solid fa-trash-can" style={{ color: '#636363',cursor: 'pointer' }}></i>
          </div>
          <div className='d-flex space-between' style={{ padding: '15px' }}>
            <div id='articles' className="col-md-8 d-flex flex-column">
              {
                data.offers.map((element, index) => {
                  return (
                    <div key={index} className="d-flex align-items-center mb-3 bg-light">
                      <div className="mr-3">
                        <img style={{ width: '50px' }} src={element.url_imagen} alt="" />
                      </div>
                      <div>
                        <p><strong>{element.titulo}</strong></p>
                        <p style={{ color: '#6e6e6e' }}>Soporte: {element.condicion_soporte}/ Funda: {element.condicion_funda}</p>
                      </div>
                      <div style={{marginLeft: 'auto', display: 'flex', marginRight: '30px', alignItems: 'center'}}>
                        <div className="ml-auto">
                          <p style={{ color: '#CD2906' }}><strong>${element.precio}</strong></p>
                        </div>
                        <i onClick={() => handlerDeleteItem(element)} className={`fa-solid fa-trash-can ml-3`} style={{ color: '#636363', marginLeft: '20px', cursor: 'pointer' }}></i>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div id='costs' className="col-md-4 d-flex flex-column">
              <p style={{ marginTop: 0, padding: '7px', backgroundColor: '#eeeeee' }}><strong>Envío y pago</strong></p>
              <div className='d-flex justify-content-between'>
                <p>Subtotal:</p>
                <p>${totalPrice} USD</p>
              </div>
              <div className='d-flex justify-content-between'>
                <p>Envío:</p>
                <p>A determinar por el vendedor</p>
              </div>
              <div className='d-flex justify-content-between'>
                <p>Impuesto:</p>
                <p>${totalTax} USD</p>
              </div>
              <div className='d-flex justify-content-between'>
                <p><strong>TOTAL:</strong></p>
                <p><strong>PRECIO</strong></p>
              </div>
              <button id='btn' type="button" className={`btn btn-success`}>Realizar pedido y pagar ahora</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CartComponent;
