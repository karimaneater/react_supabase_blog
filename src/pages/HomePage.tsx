import React from 'react'
import supabase from '../config/supabaseClient'
import { useEffect, useState } from 'react'
import { Blog } from '../Types'
import BlogsList from '../components/blogs/BlogsList'

export default function HomePage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  useEffect(() => {
    console.log('Fetching blogs from Supabase...')
    const fetchBlogs = async () => {
        const { data, error } = await supabase
            .from('blogs')
            .select('*')  

            console.log('Supabase response:', { data, error })
            if (error) {
                setBlogs([])
                console.error('Error fetching blogs:', error)
            } 
            if (data) {
                console.log('Fetched blogs:', data)
                setBlogs(data || [])
            } 
    }
    fetchBlogs()
  }, [])
    
  return (
    <>
      <div className="container mx-auto p-4">
        HomePage
        <div>
          {blogs.map((blog) => (
            <div key={blog.id} className="border-b border-gray-300 py-4">
              <h2 className="text-xl font-bold">{blog.title}</h2>
              <p className="text-gray-700">{blog.content}</p>
            </div>
          ))}
          <BlogsList />
        </div>
      </div>
    </>
  )
}
