import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchBlogs } from '../../redux/blogSlice';
import { Blog } from '../../Types';
import { AppDispatch, RootState } from '../../redux/store';


export default function BlogsList() {
    
    const dispatch = useDispatch<AppDispatch>();
    const blogs = useSelector((state: RootState) => state.blogs.blogs);
    
    useEffect(() => {
        dispatch(fetchBlogs());
    }, [dispatch]);

    return (
        <>
            <div className='container mx-auto'>
                <div>
                    <h1 className="text-2xl font-bold mb-4">Blogs</h1>
                </div>
                
                 <div className='mt-4'>
                    <a href="/home/blogs/add">
                        <div className="border-b border-gray-300 py-4">
                            <h2 className="text-xl font-bold">Add New Blog</h2>
                            <p>Click here</p>
                        </div>
                    </a>
                        
                    {blogs.map((blog: Blog) => (
                        <div key={blog.id} className="border-b border-gray-300 py-4">
                            <h2 className="text-xl font-bold">{blog.title}</h2>
                            <p>{blog.content}</p>
                        </div>
                    ))}
                 </div>
            </div>
        </>   
    )
}
