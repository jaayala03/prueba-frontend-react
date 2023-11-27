import axios from 'axios';

const { REACT_APP_URL_API } = process.env;


export async function listProducts() {
    try {
        const r = await axios.get(`${REACT_APP_URL_API}/products`);
        return r.data;
    } catch (error) {
        console.error(error);
    }
}
export async function getProduct(id) {
    try {
        const r = await axios.get(`${REACT_APP_URL_API}/products/${id}`);
        return r.data;
    } catch (error) {
        console.error(error);
    }
}

export async function createProducts(user, payload) {
    try {
        const r = await axios.post(`${REACT_APP_URL_API}/products`, payload);
        return r.data;
    } catch (error) {
        console.error(error);
    }
}