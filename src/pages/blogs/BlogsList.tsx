import React from 'react'
import { useEffect , useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchBlogs , deleteBlogs } from '../../redux/blogSlice';
import { Blog } from '../../Types';
import { AppDispatch, RootState } from '../../redux/store';
import toast, { Toaster } from 'react-hot-toast';
import ReactPaginate from "react-paginate";
import { Link } from 'react-router-dom';
// import { FaCirclePlus , FaTrashCan } from "react-icons/fa6";
// import { FaRegEdit } from "react-icons/fa";

export default function BlogsList() {
    
    const dispatch = useDispatch<AppDispatch>();
    const blogs = useSelector((state: RootState) => state.blogs.blogs);
    const [currentPage, setCurrentPage] = useState(1);
    const [modalId, setModalId] = useState<number | null>(null);

    const handleConfirmDelete = async (id: number) => {
        try {
            await dispatch(deleteBlogs(id)).unwrap();
            await dispatch(fetchBlogs()).unwrap();
            toast.success("Blog deleted successfully!");
        } catch (error) {
            console.error("Error deleting blog:", error);
            toast.error("Failed to delete blog.");
        } finally {
            setModalId(null);
        }
    };

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
                    <div className="">
                        <Link to="/home/blogs/add">
                            <div className="border-b border-gray-300 py-4 flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-md">
                                <div>
                                    <h2 className="text-xl font-bold">Add New Blog</h2>
                                </div>
                                {/* <div>
                                    <FaCirclePlus size={24} className="text-indigo-600" />
                                </div> */}
                            </div>
                        </Link>
                        
                        {currentBlogs.map((blog: Blog) => (
                            <div key={blog.id} className="border-b border-gray-300 py-4 flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-bold">{blog.title}</h2>
                                    <p>{blog.content}</p>
                                </div>
                                <div className="flex items-center mr-4">
                                    <Link to={`/home/blogs/edit/${blog.id}`} className="bg-indigo-600 text-white px-3 py-1 rounded">
                                        Edit
                                    </Link>  
                                    <button onClick={() => setModalId(blog.id as number)}  className="ml-4 bg-red-600 text-white px-3 py-1 rounded">
                                        Delete
                                    </button>
                                    {modalId === blog.id && (
                                    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-10">
                                        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow max-w-sm w-full">
                                            <h2 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">Confirm Delete</h2>
                                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                                Are you sure you want to delete "{blog.title}"?
                                            </p>
                                        <div className="mt-4 flex justify-end gap-2">
                                            <button className='px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700' 
                                                onClick={() => setModalId(null)}>Cancel</button>
                                            <button className="bg-red-600 text-white px-3 py-1 rounded"
                                                onClick={() => handleConfirmDelete(blog.id as number)} >Delete</button>
                                        </div>
                                        </div>
                                    </div>
                                    )}
                                </div>
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
            </div>
        </>   
    )
}
