import React, { useEffect , useState }  from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchBlogs , deleteBlogs } from '../../redux/Slice/blogSlice';
import { Blog } from '../../Types';
import { AppDispatch, RootState } from '../../redux/store';
import toast, { Toaster } from 'react-hot-toast';
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from 'react-router-dom';
// import { FaCirclePlus , FaTrashCan } from "react-icons/fa6";
// import { FaRegEdit } from "react-icons/fa";

export default function BlogsList( { session }: { session: string | null } ) {
    const navigate = useNavigate();
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
        if (!session) {
           navigate("/");
           return;
        }
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
                            <div className="border-b border-gray-300 py-4 flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-800 p-2">
                                <div>
                                    <h2 className="text-xl font-bold">Add New Blog...</h2>
                                </div>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 bg-indigo-600 rounded-full text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </span>
                            </div>
                        </Link>
                        {currentBlogs.map((blog: Blog) => (
                            
                            <div key={blog.id} className="border-b border-gray-300 py-4 flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-800 p-2">
                                <Link to={`/home/blogs/view/${blog.id}`} >
                                    <div>
                                        <h2 className="text-xl font-bold">{blog.title}</h2>
                                        <p className=''>{blog.content}</p>
                                    </div>
                                </Link>
                                <div className="flex items-center mr-4">
                                        <Link to={`/home/blogs/edit/${blog?.id}`} className="bg-indigo-600 text-white px-3 py-1 rounded">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>
                                    </Link>  
                                    <button onClick={() => setModalId(blog.id as number)}  className="ml-4 bg-red-600 text-white px-3 py-1 rounded">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
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
