import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    categories: []
}
const contentSlice = createSlice({
    name: "content",
    initialState,
    reducers: {
        populateProducts: (state, action) => {
            state.products = action.payload
        },
        populateCategories: (state, action) => {
            state.categories = action.payload
        }
    }
})

export const { populateCategories, populateProducts } = contentSlice.actions
export default contentSlice.reducer