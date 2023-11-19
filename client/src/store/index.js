import {configureStore} from '@reduxjs/toolkit'
import contentReducer from "./slice/contentSlice.redux"
import accountReducer from './slice/accountSlice.redux'

const store = configureStore({
    reducer:{
        contentStore: contentReducer,
        accountStore: accountReducer
    }
})

export default store