import { createSlice } from "@reduxjs/toolkit"

const chatSlice = createSlice({
    name : "chatList",
    initialState : [],
    reducers : {
        addChat : (state,action) => {
            return action.payload
        },

        // resetUser : (state) => {
        //     return null;
        // }
    }
})

export const {addChat} = chatSlice.actions
export default chatSlice.reducer