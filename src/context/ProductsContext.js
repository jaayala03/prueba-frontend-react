import { createContext, useState, useEffect } from "react";
import { listProducts } from "../apis/products";
import swal from 'sweetalert';


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
    const saveListCartToLocalStorage = (list) => {
        localStorage.setItem('cart', JSON.stringify(list));
    };

    const getListFromLocalStorage = () => {
        const listString = localStorage.getItem('products');
        return JSON.parse(listString) || [];
    };

    const getListCartFromLocalStorage = () => {
        const listString = localStorage.getItem('cart');
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
    const [listCart, setListCart] = useState(getListCartFromLocalStorage());

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
        const obj = {
            ...payload,
            id: getListFromLocalStorage().length + 1,
            images: [
                "https://picsum.photos/176/176?random=1",
                "https://picsum.photos/176/176?random=2",
                "https://picsum.photos/176/176?random=3",
            ],
            categoryId: 1
        }

        const newList = [...list, obj];
        setList(newList);
        saveListToLocalStorage(newList);

        // // for edit element into list
        // modifyElementInList(id, updatedElement);
        // setList(getListFromLocalStorage());
    };

    const addToCart = async (payload) => {
        const firstTen = products.slice(0, 10);
        const totalProds =  getListFromLocalStorage().concat(firstTen);

        const cartList = getListCartFromLocalStorage();

        const exist = cartList.find(object => object.id === payload.id);

        if(exist) {
            swal('Warning!', 'This product already exists in your shopping cart!', 'warning');
            return
        }

        const { quantity } = payload;

        const product = totalProds.find(obj => obj.id === payload.id);
        
        const { price } = product;

        const ivaValue = 1.19;

        const total = (price * quantity) * ivaValue;
        
        const elementCart = {
            ...product,
            ...payload,
            total
        }

        const newList = [...listCart, elementCart];
        setListCart(newList);
        saveListCartToLocalStorage(newList);
    };

    const data = {
        products,
        user,
        statusModal,
        productItem,
        getProducts,
        saveProduct,
        setStatusModal,
        setProductItem,
        getListFromLocalStorage,
        getListCartFromLocalStorage,
        addToCart,
        setListCart,
        saveListCartToLocalStorage,
    };
    return <ProductsContext.Provider value={data}>{children}</ProductsContext.Provider>;
}

export { ProductsProvider };
export default ProductsContext;