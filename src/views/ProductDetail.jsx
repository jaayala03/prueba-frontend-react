import React from 'react';
import '../assets/styles/home.scss';
import { ProductsProvider } from "../context/ProductsContext";
import Detail from 'components/products/Detail';

const ProductDetail = () => {
    return (<div className="home">
        <div className="container mt-5">
            <ProductsProvider>
                <Detail/>
            </ProductsProvider>
        </div>
    </div>);
}

export default ProductDetail;