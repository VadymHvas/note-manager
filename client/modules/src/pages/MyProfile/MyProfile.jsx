import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logout } from '../../redux/features/AuthSlice';
import { checkAuth } from '../../redux/features/AuthSlice';

const MyProfile = () => {
    const isAuth = useSelector(checkAuth);
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutUser = () => {
        dispatch(logout());

        window.localStorage.removeItem("token");
    };

    React.useEffect(() => {
        if (!window.localStorage.getItem("token")) navigate("/");
    }, [isAuth, navigate]);

    return (
        <main>
            
        </main>
    );
};

export default MyProfile;