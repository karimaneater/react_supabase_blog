import React from 'react'
import BlogsList from './blogs/BlogsList'
import DarkModeToggle from '../components/DarkModeToggle'

export default function HomePage() {
    
  return (
    <>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <DarkModeToggle />
        <div className="p-4 container mx-auto">
          HomePage
          <div>
            <BlogsList />
          </div>
        </div>
      </div>
    </>
  )
}
