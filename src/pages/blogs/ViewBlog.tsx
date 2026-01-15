import React , { useEffect } from 'react'
import DarkModeToggle from '../../components/DarkModeToggle'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { useParams } from 'react-router-dom'
import { viewBlogs } from '../../redux/Slice/blogSlice';

export default function ViewBlog() {

    const id = useParams<{id: string}>();
    const dispatch = useDispatch<AppDispatch>();
    const {singleBlog, status} = useSelector((state: RootState) => state.blogs);

    useEffect(() =>{             
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
                                <div className='mt-4'>
                                    <p>
                                        {singleBlog?.content}
                                    </p>
                                </div>
                            </div> 
                        }
                    
                </div>
            </div> 
        </div>
    </>
  )
}
