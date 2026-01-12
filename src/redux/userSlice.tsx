import React from 'react'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../config/supabaseClient";
import { User , NewUser } from "../Types";
import { stat } from 'fs';

const initialState = {
    user: null as User | null,
    status: 'idle' as 'idle' | 'loading' | 'success' | 'failed',
};

export const addUser = createAsyncThunk<string, NewUser>(
    'user/addUser',
    async (user, { rejectWithValue }) => {
        const { error } = await supabase
            .from('users')
            .insert([user])
            .select()
            .single();

        if (error) {
            console.error('Error adding user:', error);
            return rejectWithValue(error.message);
        }
        return "User added successfully";
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addUser.fulfilled, (state, action) => {
                state.status = 'success';
            })
            .addCase(addUser.rejected, (state, action) => {
                state.status = 'failed';
            });
    }
});

export default userSlice.reducer;

