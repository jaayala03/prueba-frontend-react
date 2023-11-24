import { createContext, useState, useEffect } from "react";
import {listProducts} from "../apis/products";


const ProductsContext = createContext({});

const ProductsProvider = ({children}) => {

    const [products, setProducts] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const [statusModal, setStatusModal] = useState(false);
    const [productItem, setProductItem] = useState({});
    let isCancelled = false;
        
    useEffect(() => {
        getProducts();
    }, []);
    
    const getProducts = async () => {
        try {
            const r = await listProducts();
           
            if (!isCancelled) {
                const data = r;
                setProducts(data);
            }
        } catch (err) {
            if (!isCancelled) {
                console.log(err);
            }
        }
        return () => {
            isCancelled = true;
        };
    };

    const data = {
        products,
        user,
        statusModal,
        productItem,
        getProducts,
        setStatusModal,
        setProductItem
        };
    return <ProductsContext.Provider value={data}>{children}</ProductsContext.Provider>;
}

export { ProductsProvider };
export default ProductsContext;