import React from 'react'
import './Product.css'

const Product = props => {
    const {
        link,
        name,
        price,
        typeProduct
    } = props;

    const goToWebSite = (link) => {
        window.open(link,'_blank');
    }
    return (
        <div className="box">
            <div> {typeProduct==1 ?  <img src='/1.png' /> : <img src='/2.png' /> } </div> 
            <div className='name' onClick={() => goToWebSite(link)}> {name} </div>
            <div className='price'> {price} Fcfa </div>
        </div>
    );
}

export default Product;