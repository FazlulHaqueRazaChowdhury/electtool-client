const { default: axios } = require("axios");
const { useState, useEffect } = require("react")

const useProducts = (limit) => {
    console.log(limit);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5000/products?limit=${limit}`)
            .then(res => {
                setProducts(res.data);
                setLoading(false);
            });
    }, [limit])
    return [products, loading];
}
export default useProducts;