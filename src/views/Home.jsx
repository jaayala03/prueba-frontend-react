import React from 'react';

import '../assets/styles/home.scss';
// import CreateProducts from "../components/home/CreateProducts";
import { ProductsProvider } from "../context/ProductsContext";
import ListProducts from 'components/home/ListProducts';
import CreateProducts from 'components/home/CreateProducts';
import DetailProducts from 'components/home/DetailProducts';

const Home = () => {
    return (<div className="home">
        <div className="container mt-5">
            <ProductsProvider>
                <CreateProducts/>
                <DetailProducts/>
                <ListProducts/>
            </ProductsProvider>
        </div>
    </div>);
}

export default Home;