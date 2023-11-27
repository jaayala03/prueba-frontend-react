import React from 'react';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import '../assets/styles/home.scss';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate ();  

    const handleGoTo = (route) => {

        navigate(`${route}`);
    };


    return (<div className="home">
        <div className="container mt-5">
            <div className="home-menu">
                <Button className="btn-home" variant="contained" color="primary" onClick={() => handleGoTo('/product/add')}>
                    <AddCircleOutlineIcon></AddCircleOutlineIcon> Create Products
                </Button>
                <Button className="btn-home" variant="contained" color="primary" onClick={() => handleGoTo('/product/shopping')}>
                    <AddShoppingCartIcon></AddShoppingCartIcon> Add Products to cart
                </Button>
                <Button className="btn-home" variant="contained" color="primary" onClick={() => handleGoTo('/shopping-cart')}>
                    <ShoppingCartIcon></ShoppingCartIcon> Shopping Cart
                </Button>
            </div>
        </div>
    </div>);
}

export default Home;