import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../config/supabaseClient";
import { Blog, NewBlog } from "../../Types";


 
export const fetchBlogs = createAsyncThunk<Blog[]>(
  'blogs/fetchBlogs',
  async (_, { rejectWithValue }) => {
      const { data: { user } } = await supabase.auth.getUser();

      console.log("fetchBlogs user reducer", user?.id);
      
      if (!user) {
          return rejectWithValue("User not authenticated");
      }
      const { data, error } = await supabase
          .from('blogs')
          .select()
          .eq('user_id', user?.id)
          .order("id", { ascending: true });
      if (error) {
        console.error('Error fetching blogs:', error);
        return rejectWithValue(error.message);
      }
      console.log("fetched blogs reducer data", data);
      return data as Blog[];
  },
);

export const addBlogs = createAsyncThunk<string, NewBlog>(
  'blogs/addBlogs',
  async (blog, { rejectWithValue }) => {
    const { data: { user } } = await supabase.auth.getUser();
     if (!user) {
          return rejectWithValue("User not authenticated");
      }
    const { error } = await supabase
      .from('blogs')
      .insert([{ ...blog, user_id: user?.id }])
      .select()
      .single();

    if (error) {
      console.error('Error adding blog:', error);
      return rejectWithValue(error.message);
    }

    return "Blog added successfully";
  }
);

export const editBlogs = createAsyncThunk<Blog, Blog>(
  'blogs/editBlogs',
  async (blog, { rejectWithValue}) => {
    const { data: { user } } = await supabase.auth.getUser();
     if (!user) {
          return rejectWithValue("User not authenticated");
      }

    const { data, error } = await supabase
      .from('blogs')
      .update({ 
        ...blog, updated_at: new Date().toISOString() , user_id: user?.id
      })
      .eq('id', blog.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating blog:', error);
      return rejectWithValue(error.message);
    }
    return data as Blog;
  }
);

export const deleteBlogs = createAsyncThunk<string, number>(
  'blogs/deleteBlogs',
  async (id, { rejectWithValue }) => {
    const { data: { user } } = await supabase.auth.getUser();
     if (!user) {
          return rejectWithValue("User not authenticated");
      }
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);
    if (error) {
      console.error('Error deleting blog:', error);
      return rejectWithValue(error.message);
    }
    return "Blog deleted successfully";
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [] as Blog[],
    status: 'idle' as 'idle' | 'loading' | 'success' | 'failed',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.fulfilled, (state, action) => {
          state.blogs = action.payload;
      })
      .addCase(addBlogs.fulfilled, (state) => {
          state.status = "success";
      })
      .addCase(editBlogs.fulfilled, (state, action) => {
          state.status = "success";
      })
      .addCase(deleteBlogs.rejected, (state, action) => {
          state.blogs = state.blogs.filter(blog => blog.id !== action.payload);
      });
  },
});

export default blogSlice.reducer;