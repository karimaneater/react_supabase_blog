import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../config/supabaseClient";
import { Blog, NewBlog } from "../Types";

export const fetchBlogs = createAsyncThunk<Blog[]>(
  'blogs/fetchBlogs',
  async (_, { rejectWithValue }) => {
   
      const { data, error } = await supabase.from('blogs').select();
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
    const { error } = await supabase.from('blogs').insert([blog]);

    if (error) {
      console.error('Error adding blog:', error);
      return rejectWithValue(error.message);
    }

    return "Blog added successfully";
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
    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload;
    });
    builder.addCase(addBlogs.fulfilled, (state) => {
        state.status = "success";
    });
  },
});

export default blogSlice.reducer;