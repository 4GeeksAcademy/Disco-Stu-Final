import React from 'react';
import styles from '../../styles/CartComponent.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const CartComponent = (data) => {
  const offer_example = [
    {
      'vendedor': 'Fer Ferchito',
      'articulo': 'Younger Than Me - 90s Wax One',
      'funda': 'Near Mint (NM)',
      'soporte': 'Very Good Plus (VG+)',
      'pais_vendeor': 'United Kingdom',
      'valoracion': '98%, 145 valoraciones',
      'precio': '€19.00',
      'comentario': 'Funda con esquina torcida. Pegatina en la galleta del disco',
      'url_imagen': 'https://i.discogs.com/BLXOkeKHYuLrZATYJ1a61EP4m308Sv6PlEskMqGhywc/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTExMDU4/ODk3LTE1MTY2NTEx/NDctOTQ3OS5qcGVn.jpeg'
    },
    {
      'vendedor': 'Fer Ferchito',
      'articulo': 'Younger Than Me - 90s Wax One',
      'funda': 'Near Mint (NM)',
      'soporte': 'Very Good Plus (VG+)',
      'pais_vendeor': 'United Kingdom',
      'valoracion': '98%, 145 valoraciones',
      'precio': '€19.00',
      'comentario': 'Funda con esquina torcida. Pegatina en la galleta del disco',
      'url_imagen': 'https://i.discogs.com/BLXOkeKHYuLrZATYJ1a61EP4m308Sv6PlEskMqGhywc/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTExMDU4/ODk3LTE1MTY2NTEx/NDctOTQ3OS5qcGVn.jpeg'
    },
  ];

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <p className="mb-0">Realizar pedido de <span style={{ color: '#033BDB' }}>{offer_example[0].vendedor}</span> <span style={{ fontSize: '0.8rem' }}>{offer_example[0].valoracion}</span></p>
            <i className="fa-solid fa-trash-can" style={{ color: '#636363' }}></i>
          </div>
          <div className="d-flex flex-column">
            {
              offer_example.map((element, index) => (
                <div key={index} className="d-flex align-items-center mb-3">
                  <div className="mr-3">
                    <img style={{ width: '50px' }} src={element.url_imagen} alt="" />
                  </div>
                  <div>
                    <span>{element.articulo}</span>
                    <p>Soporte: {element.soporte}/ Funda: {element.funda}</p>
                  </div>
                  <div className="ml-auto">
                    <p style={{ color: '#CD2906' }}><strong>{element.precio}</strong></p>
                  </div>
                  <i className={`fa-solid fa-trash-can ml-3`} style={{ color: '#636363' }}></i>
                </div>
              ))
            }
          </div>
          <div className="mt-3">
            <p className="bg-light p-2"><strong>Envío</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartComponent;
