import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './store';

export const BlogsLogger = () => {
  const blogs = useSelector((state: RootState) => state.blogs.blogs);

  useEffect(() => {
    // console.log("🔹 Blogs array updated:", blogs);
  }, [blogs]); // runs every time blogs array changes

  return null; // this component does not render anything
};
export default BlogsLogger;