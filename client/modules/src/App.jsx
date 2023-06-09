import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import MyProfile from './pages/MyProfile/MyProfile';
import Main from './pages/Main/Main';
import { useDispatch } from 'react-redux';
import { getMe } from './redux/features/AuthSlice';
import { useSelector } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(state => state.auth);

  React.useEffect(() => {
    dispatch(getMe());
  }, [isAuth]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="myProfile" element={<MyProfile />} />
      </Routes>
    </div>
  );
};

export default App;