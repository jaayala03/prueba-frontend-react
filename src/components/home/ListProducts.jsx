import React, { useContext, useEffect, useState } from 'react';
import ProductsContext from "../../context/ProductsContext";
import ModalProducts from "./ModalProduct";
import { DataGrid, GridColumn } from '@mui/x-data-grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { numberFormat } from '../../utils/Utils';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { publish, subscribe, unsubscribe } from "../../events/events";


export const ListProducts = () => {
    
    const navigate = useNavigate ();    

    const {
        products,
        statusModal,
        productItem,
        getProducts,
        setStatusModal,
        setProductItem,
        getListCartFromLocalStorage,
        setListCart,
        saveListCartToLocalStorage,
        
    } = useContext(ProductsContext);

    const reloadProducts = () => {
        getProducts();
    }

    const handleReadMore = (row) => {
        setProductItem(row);
        navigate(`/product/detail/${row.id}`);
        // setStatusModal(true);
    };

    const handleRemoveItem = (id) => {
        const updatedCart = getListCartFromLocalStorage().filter((product) => product.id !== id);

        setListCart(updatedCart);
        saveListCartToLocalStorage(updatedCart);

        publish('updateCart', { status: true });
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'title', headerName: 'Name', width: 300 },
        { field: 'description', headerName: 'Description', width: 150 },
        { field: 'quantity', headerName: 'Quantity', width: 150},
        { field: 'price', headerName: 'Unit. Price', width: 100,
            renderCell: (params) => (
                <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                    <span>{numberFormat(params.row.price)}</span>
                </div>
            ),     
        },
        { field: 'total', headerName: 'Total', width: 100,
            renderCell: (params) => (
                <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                    <span>{numberFormat(params.row.total)}</span>
                </div>
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 220,
            renderCell: (params) => (
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', width: '100%' }}>
                    <Button variant="contained" color="primary" onClick={() => handleReadMore(params.row)}>
                        <VisibilityIcon></VisibilityIcon> Read More
                    </Button>
                    <Button variant="contained" color="error" onClick={() => handleRemoveItem(params.row.id)}>
                        <DeleteIcon></DeleteIcon>
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <h2 className="mb-5">Products</h2>

            <DataGrid
                rows={getListCartFromLocalStorage()}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[5, 10, 50, 100]}
            />

            <ModalProducts status={statusModal} data={productItem} reloadProducts={reloadProducts} />
        </div>
    );
}

export default ListProducts;