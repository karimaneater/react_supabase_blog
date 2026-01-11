import React from 'react'
import { useState, useEffect } from 'react';

export default function DarkModeToggle() {
    const [darkMode, setDarkMode] = useState(false);

    // Optional: remember mode in localStorage
    useEffect(() => {
        if (darkMode) {
        document.documentElement.classList.add('dark');
        } else {
        document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);
  return (
    <div className="fixed top-4 right-4 z-50">
        <button
        onClick={() => setDarkMode(!darkMode)}
        className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
        {darkMode ? "Light" : "Dark"} Mode
        </button>
    </div>
  )
}
