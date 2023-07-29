import React from 'react'


const ArticleCard = ({ title, artist }) => {

    return (
        <div>
            <div className="card" style={{width: '230px', border: 'none', marginRight: '35px', height: '240px'}}>
                <img src="https://anccom.sociales.uba.ar/wp-content/uploads/sites/19/2022/01/Vinilos_CamilaMeconi_0018__MG_3137.jpeg" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{artist}</p>
                    </div>
            </div>
        </div>
    )
}

export default ArticleCard
