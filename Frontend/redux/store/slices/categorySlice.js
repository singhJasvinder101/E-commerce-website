import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCategories = createAsyncThunk(
    'categories/getCategories',
    async (payload, thunkAPI) => {
        try {
            const { data } = await axios.get("/api/categories")
            const state = thunkAPI.getState()
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.categories = action.payload
        })
    }
})

export default categorySlice.reducer