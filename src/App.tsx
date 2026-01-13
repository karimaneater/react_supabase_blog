import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import LoginForm from './pages/auth/LoginForm';
import RegisterForm from './pages/auth/RegisterForm';
import HomePage from './pages/HomePage';
import AddBlog from './pages/blogs/AddBlog';
import EditBlog from './pages/blogs/EditBlog';
import { BlogsLogger } from './redux/BlogsLogger';
import ProtectedRoute from './components/ProtectedRoutes';
import supabase from './config/supabaseClient';

function App() {
    
  const [session, setSession] = React.useState<null | any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });

    return () => subscription.unsubscribe();
  }, []);


  return (
    <>
      <BlogsLogger />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm session={session} />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route element={<ProtectedRoute token={session} />}>
            <Route path="/home/blogs" element={<HomePage session={session}/>} />
            <Route path="/home/blogs/add" element={<AddBlog />} />
            <Route path="/home/blogs/edit/:id" element={<EditBlog />} />
         </Route> 
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
