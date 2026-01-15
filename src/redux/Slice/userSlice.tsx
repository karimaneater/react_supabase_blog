import React from 'react'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../config/supabaseClient";
import { User } from "../../Types";



export const userLogin = createAsyncThunk<string, User>(
    'user/userLogin',
    async (user, { rejectWithValue }) => {
        const { error } = await supabase
            .auth
            .signInWithPassword({
                email: user.email,
                password: user.password,
            });
        if (error) {
            console.error('Error logging in user:', error.message);
            return rejectWithValue(error.message);
        }
        return "success";
    }
);

export const addUser = createAsyncThunk<string, User>(
    'user/addUser',
    async (user , { rejectWithValue } ) => {

        const {error} = await supabase
            .auth
            .signUp({
                email: user.email,
                password: user.password,
            });
           

        if (error) {
            console.error('Error adding user:', error?.message);
            return rejectWithValue(error.message);
        }
        return "success";
    }
);



const userSlice = createSlice({
    name: 'user',
    initialState:{
        user: null as User | null,
        status: 'idle' as 'idle' | 'loading' | 'success' | 'failed',
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // addUser 
            .addCase(addUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.status = 'success';
            })
            .addCase(addUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            // userLogin 
            .addCase(userLogin.pending, (state) => {
                state.status = "loading";
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.status = 'success';
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    }
});

export default userSlice.reducer;

