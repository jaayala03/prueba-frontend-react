import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductsContext from "../../context/ProductsContext";
import banner from '../../assets/images/banner.png';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { numberFormat } from '../../utils/Utils';
import '../../assets/styles/detail.scss';
import UndoIcon from '@mui/icons-material/Undo';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


export const Detail = () => {

    const navigate = useNavigate ();  

    const handleGoTo = (route) => {

        navigate(`${route}`);
    };

    const { id } = useParams();

    const {
        productItem,
        setProductItem,
        getListCartFromLocalStorage,
    } = useContext(ProductsContext);

    const findProduct = () => {
        const list = getListCartFromLocalStorage();

        const product = list.find(obj => obj.id === +id);

        setProductItem(product);
    }

    useEffect(() => {
        findProduct();
      }, [id]);

    return (
        <div>
            <div className="banner">
                <img className="banner-img" src={banner} alt="banner"></img>
            </div>

            <div className='content-detail'>
                <div className='content-images'>
                {
                    productItem?.images?.length > 0 ? (
                        <>
                        <ImageList className='images-list' sx={{ width: '100%'}} cols={3}>
                            {productItem.images.map((item) => (
                            <ImageListItem key={item}>
                                <img
                                srcSet={`${item}`}
                                src={`${item.img}`}
                                alt={productItem.title}
                                loading="lazy"
                                />
                            </ImageListItem>
                            ))}
                        </ImageList>
                        </>
                    ) : null
                }
                </div>

                <div className='content-items'>
                    <h1>{productItem.title}</h1>

                    <span>ID: {productItem.id}</span>

                    <p>{productItem.description}</p>

                    <div className='card-foot'>
                        <span><b>{numberFormat(productItem.total)}</b></span>
                        

                        <Button className='btn-return' variant="contained" color="primary" onClick={() => handleGoTo('/shopping-cart')}>
                            <UndoIcon></UndoIcon> Return to shopping Cart
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail;