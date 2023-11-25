import { createContext, useState, useEffect } from "react";
import { listProducts } from "../apis/products";


const ProductsContext = createContext({});

const ProductsProvider = ({ children }) => {

    const [products, setProducts] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const [statusModal, setStatusModal] = useState(false);
    const [productItem, setProductItem] = useState({});
    let isCancelled = false;

    useEffect(() => {
        getProducts();
    }, []);

    const saveListToLocalStorage = (list) => {
        localStorage.setItem('products', JSON.stringify(list));
    };

    const getListFromLocalStorage = () => {
        const listString = localStorage.getItem('products');
        return JSON.parse(listString) || [];
    };

    const modifyElementInList = (id, updatedElement) => {
        const list = getListFromLocalStorage();
        const modifiedList = list.map((element) => {
            if (element.id === id) {
                return { ...element, ...updatedElement };
            }
            return element;
        });
        saveListToLocalStorage(modifiedList);
    }

    const [list, setList] = useState(getListFromLocalStorage());

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

    const saveProduct = async (payload) => {
        console.log('🚀 ----------------------------------------------------------------------🚀');
        console.log('🚀 ~ file: ProductsContext.js:38 ~ saveProduct ~ payload:', payload);
        console.log('🚀 ----------------------------------------------------------------------🚀');

        const obj = {
            ...payload,
            price: 1,
            images: [
                "https://picsum.photos/640/480?random=1"
            ],
            categoryId: 1
        }

        const newList = [...list, obj];
        setList(newList);
        saveListToLocalStorage(newList);

        // // for edit element into list
        // modifyElementInList(id, updatedElement);
        // setList(getListFromLocalStorage());
    }

    const data = {
        products,
        user,
        statusModal,
        productItem,
        getProducts,
        saveProduct,
        setStatusModal,
        setProductItem
    };
    return <ProductsContext.Provider value={data}>{children}</ProductsContext.Provider>;
}

export { ProductsProvider };
export default ProductsContext;