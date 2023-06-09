import React from "react";
import "./NotAuth.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey, faRepeat } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { register, login, getMe } from "../../redux/features/AuthSlice";
import Spinner from "../Loader/Spinner";

const NotAuth = () => {
  const dispatch = useDispatch();

  const { loading, message, token } = useSelector((state) => state.auth);

  const [authForm, setAuthForm] = React.useState(true);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repeatPass, setRepeatPass] = React.useState("");

  const registerHandler = () => {
    dispatch(register({ username, password, repeatPass }), getMe());
  };

  const loginHandler = () => {
    dispatch(login({ username, password, repeatPass }));
    dispatch(getMe());
  };

  return (
    <div className="not-auth-wrapper">
      <div className="not-auth">
        <div className="title">
          <h1>Ви не в системі</h1>
        </div>

        {authForm ? (
          <>
            <div className="not-auth-title">
              <h2>Реєстрація</h2>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="username">
                <label htmlFor="username">
                  Ваше ім'я <FontAwesomeIcon icon={faUser} />
                </label>
                <br />
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="form-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="password">
                <label htmlFor="password">
                  Створіть пароль <FontAwesomeIcon icon={faKey} />
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="repeat-password">
                <label htmlFor="repeat-password">
                  Повторіть пароль <FontAwesomeIcon icon={faRepeat} />
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

              <div className="errors">
                <span>{message}</span>
              </div>

              <div className="login-signup">
                <span onClick={() => setAuthForm(!authForm)}>
                  Вже маєте акаунт?
                </span>
              </div>

              {loading ? <Spinner /> : <></>}

              <div className="submit-button">
                <button className="solid-btn" onClick={() => registerHandler()}>
                  Створити
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="not-auth-ti">
              <h2>Вхід</h2>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="username">
                <label htmlFor="username">
                  Ваше ім'я <FontAwesomeIcon icon={faUser} />
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
              <div className="password">
                <label htmlFor="password">
                  Введіть пароль <FontAwesomeIcon icon={faKey} />
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-input"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>


              <div className="errors">
                <span>{message}</span>
              </div>

              <div className="login-signup">
                <span onClick={() => setAuthForm(!authForm)}>
                  Немає акаунту?
                </span>
              </div>
              
              {loading ? <Spinner /> : <></>}

              <div className="submit-button">
                <button className="solid-btn" onClick={() => loginHandler()}>Увійти</button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default NotAuth;
