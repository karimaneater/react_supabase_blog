import React from 'react'
import BlogsList from './blogs/BlogsList'
import DarkModeToggle from '../components/DarkModeToggle'
import Logout from './auth/Logout'

export default function HomePage( { session }: { session: string | null } ) {
    
  return (
    <>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className=' flex space-x-4'>
          {session &&
             < Logout />
          }
         
          <DarkModeToggle />
        </div>
      
        <div className="p-4 container mx-auto">
          <BlogsList session={session} />
        </div>
      </div>
    </>
  )
}
