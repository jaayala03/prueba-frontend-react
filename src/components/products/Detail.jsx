import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductsContext from "../../context/ProductsContext";
import banner from '../../assets/images/banner.png';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { numberFormat } from '../../utils/Utils';
import '../../assets/styles/detail.scss';


export const Detail = () => {

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

                    <div>
                        <span><b>{numberFormat(productItem.total)}</b></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail;