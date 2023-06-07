import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import MyProfile from './pages/MyProfile/MyProfile';
import Main from './pages/Main/Main';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="me/:id" element={<MyProfile />} />
      </Routes>
    </div>
  );
};

export default App;