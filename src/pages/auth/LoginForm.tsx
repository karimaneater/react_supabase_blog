import React, { useEffect, useState } from 'react'
import DarkModeToggle from '../../components/DarkModeToggle'
import { useNavigate } from 'react-router-dom';
import { User } from '../../Types';
import { useDispatch, useSelector } from 'react-redux'      
import { AppDispatch, RootState } from '../../redux/store'; 
import { userLogin } from '../../redux/Slice/userSlice';
import toast, { Toaster } from 'react-hot-toast';

export default function LoginForm({ session }: { session: any }) {
    const inputClasses =
  "block w-full rounded-md px-3 py-1.5 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500 outline outline-1 -outline-offset-1 outline-gray-200 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6";

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
   

    const { status  } = useSelector((state: RootState) => state.users);
    
    const [user, setUser] = useState<User>({
        email: '',
        password: ''
    });
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prev) => ({ 
            ...prev, [name]: value 
            }));
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await dispatch(userLogin(user));
        if (result.payload === "success") {
            navigate('/home/blogs');
        } else {
            toast.error(result.payload as string);
        }
   }

    useEffect(() => {
        if (session) {
            navigate('/home/blogs');
        }
        console.log("login session",session);
    }, [session, navigate]);

  return (
    <>
        <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Toaster position="top-right"/>
            <DarkModeToggle />
      
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                    alt="Your Company"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                    className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">
                    Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium">
                        Email address
                        </label>
                        <div className="mt-2">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            className={inputClasses}
                            onChange={handleChange}
                        />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium ">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                className={inputClasses}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <button 
                            type="submit"
                            disabled={status === "loading"}
                            className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold text-white
                                            ${status === "loading"
                                            ? "bg-indigo-400 cursor-not-allowed"
                                            : "bg-indigo-600 hover:bg-indigo-500"}
                                        `}
                            >
                            {status === "loading" ? <span>Loading...</span> : <span>Sign In</span>}
                        </button>
                    </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 ">
                        don't have an account?{' '}
                        <a href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Register here
                        </a>
                    </p>
                </div>
            </div>
        </div>    
    </>
  )
}
