import React, { useState } from 'react'
import DarkModeToggle from '../../components/DarkModeToggle'
import { User } from '../../Types'
import { useDispatch, useSelector } from 'react-redux'      
import { addUser } from '../../redux/Slice/userSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';


export default function RegisterForm() {
    const inputClasses =
  "block w-full rounded-md px-3 py-1.5 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500 outline outline-1 -outline-offset-1 outline-gray-200 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6";

    const dispatch = useDispatch<AppDispatch>();
    const { status  } = useSelector((state: RootState) => state.users);
    const navigate = useNavigate();
    const [addNewUser, setNewUser] = useState<User>({
            email: '',
            password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({ 
            ...prev, [name]: value 
            }));
    };

     const handleAddUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
       
            const result = await dispatch(addUser(addNewUser));

            if (result.payload === "success"){
                setNewUser({ email: '', password: '' });
                navigate('/');
                toast.success("Saved successfully!");
            } else {
                toast.error(result.payload as string);
            }
    };
  return (
    <>
        <Toaster position="top-right" />
        <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            
            <DarkModeToggle />
            
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                    alt="Your Company"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                    className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">
                    Register a new account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleAddUser} action="#" method="POST" className="space-y-6">

                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium">
                                Email 
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
                                {status === "loading" ? "Registering..." : "Register"}
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 ">
                        Already have an account?{' '}
                        <a href="/" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Login here
                        </a>
                    </p>
                </div>
            </div>
        </div>    
    </>
  )
}
