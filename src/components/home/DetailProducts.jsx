import React, { useContext, useEffect, useState } from 'react';
import ProductsContext from "../../context/ProductsContext";
import useForm from '../../hooks/useForm';
import { Grid, Button, TextField } from '@material-ui/core';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { publish, subscribe, unsubscribe } from "../../events/events";

export const DetailProducts = () => {

    const {
        saveProduct,
        products,
        addToCart,
        getListFromLocalStorage,
    } = useContext(ProductsContext);

    const initialValues = {
        id: '',
        quantity: '',
    };

    const validations = {
        id: (value) => (!value ? 'This field is required' : ''),
        quantity: (value) => (!value ? 'This field is required' : ''),
    };

    const { values, errors, handleChange, handleSubmit, handleReset } = useForm(initialValues, validations);

    const handleSave = async (e) => {
        e.preventDefault();
        let valid = handleSubmit(e);
        if (valid) {
           
            await addToCart(valid);

            handleReset();

            publish('updateCart', { status: true });

        }
    }

    const getProds = () => {
        const firstTen = products.slice(0, 10);
        return getListFromLocalStorage().concat(firstTen);
    }

    return (
        <div>
            <h2 className="mb-5">Product Detail</h2>

            <form onSubmit={handleSave}>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel>Product</InputLabel>
                            <Select
                                label="Product"
                                name="id"
                                value={values.id}
                                onChange={handleChange}
                                error={!!errors.id}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {getProds().map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.title}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{errors.id}</FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item>
                        <TextField
                            label="Quantity"
                            type="number"
                            name="quantity"
                            value={values.quantity}
                            onChange={handleChange}
                            error={!!errors.quantity}
                            helperText={errors.quantity}
                            inputProps={{ min: 1 }}
                        />
                    </Grid>

                    <Grid item>
                        <Button type="submit" variant="contained" color="primary">
                            <AddShoppingCartIcon></AddShoppingCartIcon> Add to cart
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
}

export default DetailProducts;