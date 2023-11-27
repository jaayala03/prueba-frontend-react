import React, { useContext, useEffect, useState } from 'react';
import ProductsContext from "../../context/ProductsContext";
import useForm from '../../hooks/useForm';
import { Grid, Button, TextField } from '@material-ui/core';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export const CreateProducts = () => {

    const navigate = useNavigate ();  

    const handleGoTo = (route) => {

        navigate(`${route}`);
    };

    const {
        saveProduct
    } = useContext(ProductsContext);

    const initialValues = {
        title: '',
        description: '',
        price: '',
    };

    const validations = {
        title: (value) => (!value ? 'This field is required' : ''),
        description: (value) => (!value ? 'This field is required' : ''),
        price: (value) => (!value ? 'This field is required' : ''),
    };

    const { values, errors, handleChange, handleSubmit, handleReset } = useForm(initialValues, validations);

    const handleSave = async (e) => {
        e.preventDefault();
        let valid = handleSubmit(e);
        if (valid) {

            await saveProduct(valid);

            handleReset();
        }
    }

    return (
        <div>
            <h2 className="mb-5">Add Product</h2>
            
            <form onSubmit={handleSave}>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <TextField
                            label="Name"
                            name="title"
                            value={values.title}
                            onChange={handleChange}
                            error={!!errors.title}
                            helperText={errors.title}
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            label="Price"
                            name="price"
                            type="number"
                            inputProps={{ min: 1 }}
                            value={values.price}
                            onChange={handleChange}
                            error={!!errors.price}
                            helperText={errors.price}
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            label="Description"
                            name="description"
                            value={values.description}
                            onChange={handleChange}
                            error={!!errors.description}
                            helperText={errors.description}
                        />
                    </Grid>

                    <Grid item>
                        <Button type="submit" variant="contained" color="primary">
                            <SaveIcon></SaveIcon> Save
                        </Button>
                    </Grid>

                    <Grid item>
                    <Button className="btn-default" variant="contained" color="primary" onClick={() => handleGoTo('/product/shopping')}>
                        <AddShoppingCartIcon></AddShoppingCartIcon> Buy Products
                    </Button>
                    </Grid>
                </Grid>
            </form>
        </div>

    );
}

export default CreateProducts;