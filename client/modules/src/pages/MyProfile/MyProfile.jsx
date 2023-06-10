import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getMe, logout, updateAccount } from '../../redux/features/AuthSlice';
import { checkAuth } from '../../redux/features/AuthSlice';
import "./MyProfile.css";
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey, faRepeat } from "@fortawesome/free-solid-svg-icons";

const MyProfile = () => {
    const isAuth = useSelector(checkAuth);
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getMe());
    }, []);
    
    const [image, setImage] = React.useState();
    const [username, setUsername] = React.useState(user.username);
    const [password, setPassword] = React.useState("");
    const [repeatPass, setRepeatPass] = React.useState("");


    const logoutUser = () => {
        dispatch(logout());

        window.localStorage.removeItem("token");
    };

    console.log(image);

    const updateAccountHandler = () => {
        const data = new FormData();

        data.append("image", image);
        data.append("username", username);
        data.append("password", password);
        data.append("repeatPass", repeatPass);

        dispatch(updateAccount(data));

        window.location = "/";
    };

    React.useEffect(() => {
        if (!window.localStorage.getItem("token")) navigate("/");
    }, [isAuth, navigate]);

    return (
        <main> 
            <div className="my-profile">
                <div className="my-profile-header">
                    <h1>Мій профіль</h1>
                </div>

                <form className="profile" method="post" onSubmit={e => e.preventDefault()}>
                    <div className="avatar-title">
                        <h3>Аватар профілю</h3>
                    </div>

                    <div className="avatar">
                        {image ? (
                            <img src={URL.createObjectURL(image)} alt="error" id="objectImg" />
                        ) : (
                            <UserAvatar user={user} />
                        )}

                        <div className="update-avatar">
                            <label htmlFor="avatar" className="attach-image-btn">Додати Аватар</label>
                            <input type="file" name="avatar" id="avatar" hidden accept="image/*,image/jpeg" onChange={e => setImage(e.target.files[0])} />
                        </div>
                    </div>

                    <div className="username-title">
                        <h3>Ваше ім'я</h3>
                    </div>

                    <div className="username">
                        <label htmlFor="username">
                            Оновити ваше ім'я <FontAwesomeIcon icon={faUser} />
                        </label>

                        <br />

                        <input
                            type="text"
                            name="username"
                            id="username"
                            className="form-input"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="update-password-title">
                        <h1>Оновити пароль</h1>
                    </div>

                    <div className="update-password">
                        <div className="password-title">
                            <h3>Ваш пароль</h3>
                        </div>

                        <div className="password">
                            <label htmlFor="password">
                                Оновити ваш пароль <FontAwesomeIcon icon={faKey} />
                            </label>

                            <br />

                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="form-input"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="repeat-password-title">
                            <h3>Повторіть пароль</h3>
                        </div>

                        <div className="repeat-password">
                            <label htmlFor="repeat-password">
                            Повторіть пароль <FontAwesomeIcon icon={faRepeat} />

                            <br />

                            </label>
                            <input
                                type="password"
                                name="repeat-password"
                                id="repeat-password"
                                className="form-input"
                                value={repeatPass}
                                onChange={(e) => setRepeatPass(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="submit-btn">
                        <button className="regular-btn" onClick={updateAccountHandler}>Готово</button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default MyProfile;