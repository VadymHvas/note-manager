import React from 'react';
import "./Main.css";
import { register } from '../../redux/features/AuthSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { checkAuth } from '../../redux/features/AuthSlice';
import NotAuth from '../../components/NotAuth/NotAuth';

const Main = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const message = useSelector(state => state.auth.message);
    const isAuth = useSelector(checkAuth);
    const { user } = useSelector(state => state.auth);
    
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handlerSubmit = () => {
        dispatch(
            register({username, password})
        );
    };

    React.useEffect(() => {
        if (isAuth) navigate(`/me/${user._id}`);
    }, [isAuth, navigate]);

    console.log(isAuth);
    
    return (
        <main>
            {isAuth ? (
                <>Hello!</>
            ) : (
                <NotAuth />
            )}
        </main>
    );
};

export default Main;