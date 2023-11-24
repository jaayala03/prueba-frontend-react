import React from 'react';
import logo from '../assets/images/logo.png';
import '../assets/styles/home.scss';
// import CreateProducts from "../components/home/CreateProducts";
import { ProductsProvider } from "../context/ProductsContext";
import ListProducts from 'components/home/ListProducts';
import CreateProducts from 'components/home/CreateProducts';

const Home = () => {
    return (<div className="home">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <a className="navbar-brand" href={'/'}>
                    <img src={logo} alt="PRUEBA FRONT END" className="logo"/>
                </a>
            </div>
        </nav>
        <div className="container mt-5">
            <ProductsProvider>
                <CreateProducts/>
                <ListProducts/>
            </ProductsProvider>
        </div>
    </div>);
}

export default Home;