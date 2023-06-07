import React from 'react';
import "./Main.css";
import { register } from '../../redux/features/AuthSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { checkAuth } from '../../redux/features/AuthSlice';

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
        if (isAuth) navigate(`/me/${user._id}`)
    }, [isAuth, navigate]);

    console.log(isAuth)
    
    return (
        <main>
            <div className="auth">
                <div className="auth-title">
                    <h2>
                        Ви не в системі
                    </h2>
                </div>
                <div className="register">
                    <div className="register-title">
                        <span>Зареєструйтесь</span>
                    </div>
                    <form method="post" onSubmit={(e) => e.preventDefault()}>
                        <div className="username">
                            <input type="text"
                              id="username" name="username" placeholder="USERNAME"
                              className="form-input" value={username}
                              onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="password">
                            <input type="password"
                             id="password" name="password" placeholder="PASSWORD"
                              className="form-input" value={password}
                              onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <span style={{color: "red"}}>{message}</span><br />
                        <button className="form-button" type="submit" onClick={handlerSubmit}>Зареєструватися</button>
                    </form>
                </div>
                <div className="or">
                    АБО
                </div>
                <div className="login">
                    <div className="login-title">
                        <span>Увійдіть</span>
                    </div>
                    <form method="post">
                        <div className="username">
                            <input type="text"
                             id="username-login" name="username-login"
                             placeholder="USERNAME" className="form-input" />
                        </div>
                        <div className="password">
                            <input type="password"
                             id="password-login" name="password-login"
                             placeholder="PASSWORD" className="form-input" />
                        </div>
                        <button type="submit" className="form-button">Увійти</button>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Main;