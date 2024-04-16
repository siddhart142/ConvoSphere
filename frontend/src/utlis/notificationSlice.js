import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name : "notification",
    initialState : [],
    reducers : {
        addNotification : (state,action) => {
            return action.payload
        },

        // resetUser : (state) => {
        //     return null;
        // }
    }
})

export const {addNotification} = notificationSlice.actions
export default notificationSlice.reducer