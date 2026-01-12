import React from 'react'
import { useEffect , useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchBlogs } from '../../redux/blogSlice';
import { Blog } from '../../Types';
import { AppDispatch, RootState } from '../../redux/store';
import { Toaster } from 'react-hot-toast';
import ReactPaginate from "react-paginate";
import { Link } from 'react-router-dom';

export default function BlogsList() {
    
    const dispatch = useDispatch<AppDispatch>();
    const blogs = useSelector((state: RootState) => state.blogs.blogs);
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 5;
    const totalPages = Math.ceil(blogs.length / blogsPerPage);

    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

    useEffect(() => {
        dispatch(fetchBlogs());
    }, [dispatch]);

    return (
        <>
            <Toaster position="top-right" />
            <div className='container mx-auto'>
                <div>
                    <h1 className="text-2xl font-bold mb-4">Blogs</h1>
                </div>
                
                 <div className='mt-4'>
                    <Link to="/home/blogs/add">
                        <div className="border-b border-gray-300 py-4">
                            <h2 className="text-xl font-bold">Add New Blog</h2>
                            <p>Click here</p>
                        </div>
                    </Link>
                        
                    {currentBlogs.map((blog: Blog) => (
                        <div key={blog.id} className="border-b border-gray-300 py-4">
                            <h2 className="text-xl font-bold">{blog.title}</h2>
                            <p>{blog.content}</p>
                        </div>
                    ))}
                    <div className='mt-4'>
                         <ReactPaginate
                            pageCount={totalPages}
                            onPageChange={({ selected }) => setCurrentPage(selected + 1)}
                            previousLabel={"Prev"}
                            nextLabel={"Next"}
                            containerClassName="flex space-x-2"
                            activeClassName="font-bold"
                        />
                    </div>
                 </div>
            </div>
        </>   
    )
}
