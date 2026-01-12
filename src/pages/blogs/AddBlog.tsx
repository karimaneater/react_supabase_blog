import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { NewBlog } from '../../Types';
import { addBlogs } from '../../redux/blogSlice';
import { AppDispatch } from '../../redux/store';


export default function AddBlog() {
    const inputClasses =
  "block w-full rounded-md px-3 py-1.5 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500 outline outline-1 -outline-offset-1 outline-gray-200 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6";
    const dispatch = useDispatch<AppDispatch>();

    const [addNewBlog, setAddNewBlog] = useState<NewBlog>({
        title: '',
        content: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAddNewBlog((prev) => ({ 
        ...prev, [name]: value 
        }));
    };

    const handleAddBlog = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(addNewBlog);
        dispatch(addBlogs(addNewBlog));
        setAddNewBlog({ title: '', content: '' });
    }

  return (
    <>
        <div>
            <form onSubmit={handleAddBlog}>
                <input className={inputClasses} type="text" name="title" placeholder="Title" value={addNewBlog.title} onChange={handleChange} />
                <textarea className={inputClasses} name="content" placeholder="Content" value={addNewBlog.content} onChange={handleChange}></textarea>
                <button 
                    className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"'
                    type="submit">Add Blog</button>
            </form>
        </div>
    </>
  )
}