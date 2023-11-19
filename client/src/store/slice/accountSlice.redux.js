import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: localStorage.getItem('LOGGING_USER') ? JSON.parse(localStorage.getItem('LOGGING_USER')) : null,
    token: localStorage.getItem('LOGGING_USER_TOKEN')
}
const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        populateUser: (state, action) => {
            // Save to local =Storage
            localStorage.setItem("LOGGED_USER", JSON.stringify(action.payload))
            state.user = action.payload;
        },
        populateToken: (state, action) => {
            // Save to local =Storage
            localStorage.setItem("LOGGED_USER_TOKEN", action.payload)
            state.user = action.payload;
        }
    }
})

export const { populateToken, populateUser } = accountSlice.actions
export default accountSlice.reducer