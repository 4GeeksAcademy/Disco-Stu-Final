import React from 'react'
import fondo from '../../img/DISCOSTUVENDEDORES.png'
import PayPalDonation from '../component/PayPalDonation.jsx'



const InitializeAsSeller = () => {



    return (
        <div>
            <div id="presentation" style={{ width: '100%', backgroundColor: 'black', paddingTop: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <img style={{ width: '600px' }} src={fondo} alt="" />
                <p style={{ width: '80%', color: 'white', textAlign: 'center', paddingTop: '25px', paddingBottom: '25px' }}>
                    DiscoStu Store ofrece su mercado de venta online para aquellos usuarios avocados al comercio musical. El costo de usuario vendedor tiene como fines únicos el mantenimiento de la página y el crecimiento de esta comunidad. 
                </p>
                <div id='paypal_buttons'>
                    <PayPalDonation />
                </div>
            </div>
        </div>
    )
}


export default InitializeAsSeller