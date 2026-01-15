import React , { useEffect , useState } from 'react'
import DarkModeToggle from '../../components/DarkModeToggle'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { useParams, Link, useNavigate } from 'react-router-dom'
import { viewBlogs, deleteBlogs } from '../../redux/Slice/blogSlice';
import supabase from '../../config/supabaseClient';
import DeleteBlogModal from '../../components/DeleteBlogModal';
import toast from 'react-hot-toast'; 

export default function ViewBlog() {

    const id = useParams<{id: string}>();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const {singleBlog, status} = useSelector((state: RootState) => state.blogs);
    const [userId, setUserId] = useState<string | null>(null);
    const [modalId, setModalId] = useState<number | null>(null);

    const getUser = async () => {
        const { data, error } = await supabase.auth.getUser();

        if (error) {
        console.error("Error fetching user:", error.message);
        return;
        }
        
        return data.user?.id ?? null;
        
    };

    

    const handleConfirmDelete = async (id: number) => {
       try {
            const res = await dispatch(deleteBlogs(id)).unwrap();
            toast.success(res);
            navigate("/home/blogs");
        } catch (error) {
            toast.error("Failed to delete blog.");
        } finally {
            setModalId(null);
        }
    };

    useEffect(() =>{  
    const fetchData = async () => {
       const uid = await getUser();
        if (!uid){
            return;
        }
        setUserId(uid);
    }
    fetchData();
        dispatch(viewBlogs(Number(id.id)));
    },[id,dispatch]);

  return (
    <>
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
            <DarkModeToggle />
            <div className='container mx-auto max-w-lg'>
                <div className='mt-4'>
                    <h1 className="text-2xl font-bold mb-4">View Blog</h1>
                   
                        {status === "loading" ? 
                            <div>Loading...</div>
                        :
                            <div className='mt-4'>
                                <div className='mt-4'>
                                    <h2 className="text-xl font-bold">
                                        {singleBlog?.title}
                                    </h2>
                                </div>
                                <div className='mt-2'>
                                    <p>
                                        {singleBlog?.content}
                                    </p>
                                </div>
                                <div >
                                    {singleBlog?.user_id === userId ? 

                                    <div className="flex items-center mt-4">
                                        <Link to={`/home/blogs/edit/${singleBlog?.id}`} className="bg-indigo-600 text-white px-3 py-1 rounded ">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                </svg>
                                        </Link>  
                                          <button
                                            onClick={() => singleBlog?.id && setModalId(Number(singleBlog.id))}
                                            className="ml-4 bg-red-600 text-white px-3 py-1 rounded"
                                            >
                                            Delete
                                        </button>
                                            <DeleteBlogModal
                                                title={singleBlog?.title}
                                                isOpen={modalId === singleBlog?.id}
                                                onCancel={() => setModalId(null)}
                                                onConfirm={() => singleBlog?.id && handleConfirmDelete(Number(singleBlog.id))}
                                            />
                                        </div>
                                    :
                                        <div></div>
                                    }
                                   
                                </div>
                            </div> 
                        }
                    
                </div>
            </div> 
        </div>
    </>
  )
}
