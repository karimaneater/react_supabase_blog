import { configureStore } from "@reduxjs/toolkit"
import blogReducer from "./Slice/blogSlice"
import userReducer from "./Slice/userSlice"

export const store = configureStore({
  reducer: {
    blogs: blogReducer,
    users: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;