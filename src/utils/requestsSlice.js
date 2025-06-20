import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name:'requests',
    initialState:[],
    reducers: {
        addRequest: (state, action) => {
            return action.payload
        },
        removeRequest: (state, action) => {
            const newState = state.filter( r => r._id !== action.payload)
            return newState
        }
    }
}) 

export const { addRequest, removeRequest } = requestSlice.actions
export default requestSlice.reducer