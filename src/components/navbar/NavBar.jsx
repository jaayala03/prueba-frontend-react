import React from 'react';
import { createContext, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import '../../assets/styles/navbar.scss';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { numberFormat } from '../../utils/Utils';
import { publish, subscribe, unsubscribe } from "../../events/events";

const Navbar = () => {

    const [totalCart, setTotalCart] = useState(0);

    const getListCartFromLocalStorage = () => {
        const listString = localStorage.getItem('cart');
        return JSON.parse(listString) || [];
    };

    const calculateTotal = () => {
        const totalSum = getListCartFromLocalStorage().reduce((accumulator, product) => accumulator + product.total, 0);
        setTotalCart(totalSum);
    };

    useEffect(() => {
        calculateTotal();
    }, [getListCartFromLocalStorage()]);

    useEffect(() => {
        subscribe("updateCart", calculateTotal);

        return () => {
            unsubscribe("updateCart", calculateTotal);
        }
    }, []);

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="nav-container">
                <div className="nav-logo">
                    <a className="navbar-brand" href={'/'}>
                        <img src={logo} alt="PRUEBA FRONT END" className="logo" />
                    </a>
                </div>
                <div className="nav-items">
                    <ul>
                        <li>
                            <Link to="/">Recommended</Link>
                        </li>
                        <li>
                            <Link to="/">Sign up</Link>
                        </li>
                        <li>
                            <Link to="/">Sign in</Link>
                        </li>
                        <li>
                            <Link to="/">Total <b>{numberFormat(totalCart)}</b></Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="nav-subnav">
                <ul>
                    <li>Medellín, Colombia</li>
                    <li><b>Enter your address</b> <LocationOnIcon fontSize="small" /></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;