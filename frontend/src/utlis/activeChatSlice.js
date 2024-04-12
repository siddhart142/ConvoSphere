import { createSlice } from "@reduxjs/toolkit"

const activeChatSlice = createSlice({
    name : "activeChat",
    initialState : null,
    reducers : {
        setActive : (state,action) => {
            return action.payload
        },

        // resetUser : (state) => {
        //     return null;
        // }
    }
})

export const {setActive} = activeChatSlice.actions
export default activeChatSlice.reducer