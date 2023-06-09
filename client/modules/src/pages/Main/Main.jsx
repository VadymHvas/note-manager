import React from 'react';
import "./Main.css";
import { register } from '../../redux/features/AuthSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { checkAuth } from '../../redux/features/AuthSlice';
import NotAuth from '../../components/NotAuth/NotAuth';
import { logout } from '../../redux/features/AuthSlice';

const Main = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuth = useSelector(checkAuth);

    const { user } = useSelector(state => state.auth);

    const logoutHandler = () => {
        dispatch(logout());

        window.localStorage.removeItem("token");
    }

    return (
        <main>
            {window.localStorage.getItem("token") ? (
                <>
                    <button onClick={() => logoutHandler()}>logout</button>
                    <h1>Hello, {user.username}</h1>
                </>
            ) : (
                <NotAuth />
            )}

        </main>
    );
};

export default Main;