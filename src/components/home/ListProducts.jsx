import React, { useContext, useEffect, useState } from 'react';
import ProductsContext from "../../context/ProductsContext";
import ModalProducts from "./ModalProduct";
import { DataGrid, GridColumn } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

export const ListProducts = () => {

    const {
        products,
        statusModal,
        productItem,
        getProducts,
        setStatusModal,
        setProductItem
    } = useContext(ProductsContext);

    const reloadProducts = () => {
        getProducts();
    }

    const handleReadMore = (row) => {
        setProductItem(row);
        setStatusModal(true);
      };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Name', width: 400 },
        { field: 'description', headerName: 'Description', width: 600 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <Button variant="contained" color="primary" onClick={() => handleReadMore(params.row)}>
                    Read More
                </Button>
            ),
        },
    ];

    return (<div className="list-products mt-3">
        <h2 className="mb-5">Products</h2>

        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={products}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[5, 10, 50, 100]}
            />
        </div>

        <ModalProducts status={statusModal} data={productItem} reloadProducts={reloadProducts} />
    </div>);
}

export default ListProducts;