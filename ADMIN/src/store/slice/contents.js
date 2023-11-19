import { createSlice } from "@reduxjs/toolkit";

// GET DATA FROM STORAGE
const initialState = {
  categories: [],
  products: []
};

console.log("STATE:", initialState);

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.categories = action.payload;
    },
    addProduct: (state, action) => {
      state.products = action.payload;
    },

    
  },
});

export const {addCategory,addProduct} = contentSlice.actions;
export default contentSlice.reducer;
