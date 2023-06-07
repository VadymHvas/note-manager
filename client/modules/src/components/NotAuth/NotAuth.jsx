import React from 'react';
import "./NotAuth.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey, faRepeat } from "@fortawesome/free-solid-svg-icons"

const NotAuth = () => {
    const [authForm, setAuthForm] = React.useState(true);
    const [isShowPass, setShowPass] = React.useState(true);

    return (
        <div className="not-auth">
            <div className="title">
                <h1>Ви не в системі</h1>
            </div>

            {authForm ? (
                <>
                    <div className="not-auth-title">
                        <h2>Реєстрація</h2>
                    </div>

                    <form onSubmit={e => e.preventDefault}>
                        <div className="username">
                            <label htmlFor="username">Ваше ім'я <FontAwesomeIcon icon={faUser} /></label><br />
                            <input type="text" name="username" id="username"
                            className="form-input" />
                        </div>
                        <div className="password">
                            <label htmlFor="password">Створіть пароль <FontAwesomeIcon icon={faKey} /></label>
                            <input type="password" name="password" id="password"
                             className="form-input" />
                        </div>
                        <div className="repeat-password">
                            <label htmlFor="repeat-password">Повторіть пароль <FontAwesomeIcon icon={faRepeat} /></label>
                            <input type="password" name="repeat-password" id="repeat-password"
                             className="form-input" />
                        </div>

                        <div className="login-signup">
                            <span onClick={() => setAuthForm(!authForm)}>Вже маєте акаунт?</span>
                        </div>

                        <div className="submit-button">
                            <button className="solid-btn" >Створити</button>
                        </div>
                    </form>
                </>
            ) : (
                <>
                    <div className="not-auth-ti">
                        <h2>Вхід</h2>
                    </div>

                    <form onSubmit={e => e.preventDefault()}>
                        <div className="username">
                            <label htmlFor="username">Ваше ім'я <FontAwesomeIcon icon={faUser} /></label><br />
                            <input type="text" name="username" id="username"
                            className="form-input" />
                        </div>
                        <div className="password">
                            <label htmlFor="password">Створіть пароль <FontAwesomeIcon icon={faKey} /></label>
                            <input type="password" name="password" id="password"
                             className="form-input" />
                        </div>

                        <div className="login-signup">
                            <span onClick={() => setAuthForm(!authForm)}>Немає акаунту?</span>
                        </div>

                        <div className="submit-button">
                            <button className="solid-btn">Увійти</button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
};

export default NotAuth;