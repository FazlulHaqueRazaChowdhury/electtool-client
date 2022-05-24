import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import useAdmin from '../../../hook/useAdmin';
import Loading from '../../Shared/Loading/Loading';

const RequireAdmin = () => {
    const [user, loading, error] = useAuthState(auth);
    const [admin, admingloading] = useAdmin(user?.email);
    const navigate = useNavigate();
    if (!admin) {

        return navigate('/');
    }

    if (loading || admingloading) {
        return <Loading />
    }
};

export default RequireAdmin;