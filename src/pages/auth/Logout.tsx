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
                className="h-12 w-12 rounded-lg p-2 fixed top-4 right-11 z-50"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                </svg>

            </button>
        </div>
    </>
  )
}
