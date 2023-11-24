import React, { useContext, useEffect, useState } from 'react';
import ProductsContext from "../../context/ProductsContext";
import ModalProducts from "./ModalProduct";
import { DataGrid, GridColumn } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

export const CreateProducts = () => {

    const {
        products,
        statusModal,
        productItem,
        getProducts,
        setStatusModal,
        setProductItem
    } = useContext(ProductsContext);

    return (
        <div className="create-product mt-3">
            <h1>create products</h1>
        </div>
    );
}

export default CreateProducts;