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
    };

    React.useEffect(() => {
        if (!isAuth) navigate("/");
    }, [isAuth, navigate]);

    console.log(isAuth);

    console.log(user);
    return (
        <div>
            <button onClick={logoutUser}>Logout</button>
        </div>
    );
};

export default MyProfile;