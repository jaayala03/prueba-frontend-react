import React, { useContext, useEffect, useState } from 'react';
import ProductsContext from "../../context/ProductsContext";
import useForm from '../../hooks/useForm';
import { Grid, Button, TextField } from '@material-ui/core';

export const CreateProducts = () => {

    const {
        saveProduct
    } = useContext(ProductsContext);

    const initialValues = {
        title: '',
        description: '',
    };

    const validations = {
        title: (value) => (!value ? 'This field is required' : ''),
        description: (value) => (!value ? 'This field is required' : ''),
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
                        Save
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default CreateProducts;