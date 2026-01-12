import React, { useEffect, useState } from 'react'
import DarkModeToggle from '../../components/DarkModeToggle';
import { toast, Toaster } from 'react-hot-toast';
import { editBlogs } from '../../redux/blogSlice';
import { useNavigate , useParams } from 'react-router-dom';
import { useDispatch , useSelector} from 'react-redux';
import { Blog } from '../../Types';
import { AppDispatch , RootState} from '../../redux/store';
import supabase from '../../config/supabaseClient';


export default function EditBlog() {

     const inputClasses =
  "block w-full rounded-md px-3 py-1.5 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500 outline outline-1 -outline-offset-1 outline-gray-200 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6";
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const blogs = useSelector((state: RootState) => state.blogs.blogs);
   
   
    const [editBlog, setEditBlog] = useState<Blog>({
        title:'',
        content: ''
    });

    useEffect(() => {
     
        const blogToEdit = blogs.find((blog) => blog.id === Number(id));
        if (blogToEdit) {
            setEditBlog({ 
               ...blogToEdit
            });
        } else {
            const fetchSingleBlog = async () => {
            const { data, error } = await supabase
                .from('blogs')
                .select()
                .eq('id', Number(id))
                .single();

            if (error) {
                toast.error('Failed to load blog');
                return;
            }
                setEditBlog({ ...data });
            };

            fetchSingleBlog();
        }
        
    }, [id, blogs]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditBlog((prev) => ({ 
        ...prev, [name]: value 
        }));
    };

    const handleEditBlog = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await dispatch(editBlogs({ 
                id: Number(id), 
                title: editBlog.title, 
                content: editBlog.content 
            })).unwrap();
            toast.success("Edit successfully!");
            navigate('/home/blogs');
        } catch (error) {
            console.error("Error adding blog:", error);
            toast.error("Failed to save.");
        }
    };
    
  return (
    <>
        <Toaster position="top-right" />
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
            <DarkModeToggle />
            <div className='container mx-auto max-w-lg'>
                <div className='mt-4'>
                    <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
                </div>
                <form onSubmit={handleEditBlog}>
                    <div className='mt-4'>
                        <input className={inputClasses} type="text" value={editBlog.title} name="title" placeholder="Title" onChange={handleChange} />
                    </div>
                    <div className='mt-4'>
                        <textarea className={inputClasses} value={editBlog.content} name="content" placeholder="Content" onChange={handleChange}></textarea>
                    </div>
                    <button 
                        className='mt-4 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"'
                        type="submit">Save</button>
                </form>
            </div>
            
        </div>
    </>
  )
}
