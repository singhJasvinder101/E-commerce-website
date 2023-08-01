import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCategories = createAsyncThunk(
    'categories/getCategories',
    async (payload, thunkAPI) => {
        try {
            const { data } = await axios.get("/api/categories")
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)
export const saveAttributeToCategoryDoc = createAsyncThunk(
    'categories/newAttribute',
    async (payload, thunkAPI) => {
        const { newAttrKey, newAttrValue, categoryChoosen } = payload;
        const key = newAttrKey
        const val = newAttrValue
        const { data } = await axios.post("/api/categories/attr", {
            key, val, categoryChoosen
        })
        const state = thunkAPI.getState()
        return data.categoriesUpdated
    }
)
export const insertCategory = createAsyncThunk(
    'categories/insertCategory',
    async (payload, thunkAPI) => {
        const category  = payload
        console.log(category)
        const cat = thunkAPI.getState().allCategories.categories
        const { data } = await axios.post('/api/categories', category )
        if (data.categoryCreated) {
            return [
                ...cat, data.categoryCreated
            ]
        }
    }
)

export const deleteCategory = createAsyncThunk(
    'categories/deleteCategory',
    async (payload, thunkAPI) => {
        const { category } = payload
        // console.log(obj)
        const cat = thunkAPI.getState().allCategories.categories
        // const categories = cat.filter(c => c.name !== obj['category'])
        const categories = cat.filter(c => c.name !== category)
        const { data } = await axios.delete('/api/categories/' + encodeURIComponent(category))
        if (data.categoryDeleted) {
            // bcoz names were same both categories so direcly destrucutred array is passed
            return [...categories]
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
            // state.categories = [...state.categories, action.payload]
            state.categories = action.payload
        })
        builder.addCase(saveAttributeToCategoryDoc.fulfilled, (state, action) => {
            state.categories = [...state.categories, ...action.payload]
        })
        builder.addCase(insertCategory.fulfilled, (state, action) => {
            state.categories = action.payload
        })
        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            state.categories = action.payload
        })
    }
})

export default categorySlice.reducer