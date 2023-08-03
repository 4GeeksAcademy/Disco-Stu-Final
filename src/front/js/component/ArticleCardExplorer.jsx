import React from 'react'


const ArticleCard = ({ title, artist, url_imagen }) => {

    return (
        <div>
            <div className="card" style={{ width: '180px', border: 'none', marginRight: '35px', height: '230px' }}>
                <img style={{ width: '180px', height: '180px', objectFit: 'cover' }} src={url_imagen} className="card-img-top" alt="..." />
                <div className="card-body" style={{ padding: 0 }}>
                    <p style={{
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        width: '95%',
                        fontSize: '0.9rem',
                        margin: 0,
                    }}
                    >
                        <strong>{title}</strong>
                    </p>
                    <p className="card-text" style={{
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        width: '95%',
                        fontSize: '0.9rem',
                        margin: 0,
                    }} >{artist}</p>
                </div>
            </div>
        </div >
    )
}

export default ArticleCard
