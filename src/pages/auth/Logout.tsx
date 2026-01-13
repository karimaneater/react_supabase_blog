import React from 'react'
import supabase from '../../config/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    
    const navigate = useNavigate();
    
    const handleLogout = async () => {
        
        const { error } = await supabase.auth.signOut();
        
        if (error) {
            console.error('Error during logout:', error.message);
        }

        navigate('/');
      
    }


  return (
    <>
        <div className="">
            <button
                onClick={handleLogout}
                className="h-12 w-12 rounded-lg p-2 "
            >
                Logout
            </button>
        </div>
    </>
  )
}
