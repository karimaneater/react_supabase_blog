import React from 'react';
import './App.css';
import { BrowserRouter , Link , Route, Routes } from 'react-router-dom';
import LoginForm from './auth/LoginForm';
import RegisterForm from './auth/RegisterForm';
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <nav>
          <h1>React Blog</h1>
          <Link to="/">Home</Link>
          <Link to="/create">Add Blog</Link>
        </nav> */}
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
