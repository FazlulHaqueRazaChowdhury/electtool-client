import { signOut } from "firebase/auth";
import axiosPrivate from "../api/axiosPrivate";
import auth from "../firebase.init";


const { useState, useEffect } = require("react")

const useProducts = (limit) => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        fetch(`https://arcane-reaches-97312.herokuapp.com/products?limit=${parseInt(limit)}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    localStorage.removeItem('accessToken');
                    return signOut(auth);
                }
                return res.json()
            })
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
    }, [limit])
    return [products, loading];
}
export default useProducts;