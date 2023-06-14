import React from 'react';
import "./Main.css";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { checkAuth } from '../../redux/features/AuthSlice';
import NotAuth from '../../components/NotAuth/NotAuth';
import { getMe } from '../../redux/features/AuthSlice';
import { getMyNotes } from "../../redux/features/NoteSlice";

const Main = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuth = useSelector(checkAuth);

    const { user } = useSelector(state => state.auth);

    React.useEffect(() => {
        dispatch(getMe());
        dispatch(getMyNotes());
    }, []);

    return (
        <main>
            {window.localStorage.getItem("token") ? (
                <div className="main">
                    <div className="main-header">
                        <h1>Мої нотатки</h1>
                    </div>
                </div>
            ) : (
                <NotAuth />
            )}
        </main>
    );
};

export default Main;