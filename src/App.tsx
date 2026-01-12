import React from 'react';
import './App.css';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import LoginForm from './pages/auth/LoginForm';
import RegisterForm from './pages/auth/RegisterForm';
import HomePage from './pages/HomePage';
import AddBlog from './pages/blogs/AddBlog';
import EditBlog from './pages/blogs/EditBlog';
import { BlogsLogger } from './redux/BlogsLogger';

function App() {
  return (
    <>
      <BlogsLogger />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/home/blogs" element={<HomePage />} />
          <Route path="/home/blogs/add" element={<AddBlog />} />
           <Route path="/home/blogs/edit/:id" element={<EditBlog />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
