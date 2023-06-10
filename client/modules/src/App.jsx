import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import MyProfile from './pages/MyProfile/MyProfile';
import Main from './pages/Main/Main';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from 'react-redux';
import { getMe } from './redux/features/AuthSlice';
import { useSelector } from 'react-redux';
import Header from './components/Header/Header';

const App = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(state => state.auth);

  React.useEffect(() => {
    dispatch(getMe());  
  }, [isAuth]);

  return (
    <div>
      {window.localStorage.getItem("token") ? (
        <Header />
      ) : (
        false
      )}

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="myprofile" element={<MyProfile />} />
      </Routes>
    </div>
  );
};

export default App;