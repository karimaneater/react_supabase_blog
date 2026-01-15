import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import supabase from "../../config/supabaseClient";
import { Blog, NewBlog } from "../../Types";


 
export const fetchBlogs = createAsyncThunk<Blog[]>(
  'blogs/fetchBlogs',
  async (_, { rejectWithValue }) => {
      const { data: { user } } = await supabase.auth.getUser();
      
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

    if (error) {
      console.error('Error adding blog:', error);
      return rejectWithValue(error.message);
    }

    return "Blog added successfully";
  }
);

export const viewBlogs = createAsyncThunk<Blog, number>(
    'blogs/viewBlogs',
    async (id, {rejectWithValue}) => {
      // const { data: { user } } = await supabase.auth.getUser();
      //   if (!user) {
      //     return rejectWithValue("User not authenticated");
      //   }

      const {data, error} = await supabase
        .from('blogs')
        .select()
        .eq('id', id)
        .limit(1)
        .single();

      if (error){
        console.error('Error retrieving blog:', error);
        return rejectWithValue(error.message);
      }

      return data as Blog;
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
    singleBlog: null as Blog | null,
    status: 'idle' as 'idle' | 'loading' | 'success' | 'failed',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchBlogs 
      .addCase(fetchBlogs.pending, (state) => {
            state.status = "loading";
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
          state.status = "success";
          state.blogs = action.payload;
      })
      // viewBlogs 
      .addCase(viewBlogs.pending, (state) => {
          state.status = "loading";
                })
      .addCase(viewBlogs.fulfilled, (state, action) => {
          state.status = "success";
          state.singleBlog = action.payload
      })
      // addBlogs 
      .addCase(addBlogs.pending, (state) => {
          state.status = "loading";
      })
      .addCase(addBlogs.fulfilled, (state) => {
          state.status = "success";
      })
      // editBlogs 
      .addCase(editBlogs.pending, (state, action) => {
          state.status = "loading";
      })
      .addCase(editBlogs.fulfilled, (state, action) => {
          state.status = "success";
      })
      // deleteBlogs
      .addCase(deleteBlogs.fulfilled, (state, action) => {
          // state.blogs = state.blogs.filter(blog => blog.id !== action.payload);
          state.status = "success";
      });
  },
});

export default blogSlice.reducer;