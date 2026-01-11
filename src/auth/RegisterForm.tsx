import React from 'react'
import DarkModeToggle from '../components/ui/DarkModeToggle'

export default function RegisterForm() {
    const inputClasses =
  "block w-full rounded-md px-3 py-1.5 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500 outline outline-1 -outline-offset-1 outline-gray-200 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6";
  return (
    <>
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
                    <form action="#" method="POST" className="space-y-6">

                        <div>
                            <label htmlFor="name" className="block text-sm/6 font-medium">
                            Name
                            </label>
                            <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                autoComplete="name"
                                className={inputClasses}
                            />
                            </div>
                        </div>

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
                                />
                            </div>
                        </div>

                        <div>
                            <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                            Register
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
