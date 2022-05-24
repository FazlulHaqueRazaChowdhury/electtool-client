import { signOut } from "firebase/auth";
import axiosPrivate from "../api/axiosPrivate";
import auth from "../firebase.init";


const { useState, useEffect } = require("react")

const useProducts = (limit) => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        axiosPrivate.get(`http://localhost:5000/products?limit=${limit}`)
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    localStorage.removeItem('accessToken');
                    return signOut(auth);
                }
                setProducts(res.data);
                setLoading(false);
            });
    }, [limit])
    return [products, loading];
}
export default useProducts;