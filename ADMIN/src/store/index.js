import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./slice/account"
import contentReducer from "./slice/contents";


const store = configureStore({
  reducer: {
    account: accountReducer,
    content: contentReducer
  }
})


export default store