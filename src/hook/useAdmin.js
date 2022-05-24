import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../firebase.init';

const useAdmin = (email) => {
    const [admin, setAdmin] = useState(false);
    const [admingLoading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/admin/${email}`, {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => {
                    if (res.status === 403 || res.status === 401 || res.status === 404) {

                        return navigate('/');
                    }
                    return res.json();
                })
                .then(data => {
                    setAdmin(data.admin)
                    setLoading(false);
                });

        }
    }, [email])
    return [admin, admingLoading]
};

export default useAdmin;