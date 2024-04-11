import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name : "user",
    initialState : null,
    reducers : {
        addUser : (state,action) => {
            return {...state,...action.payload}
        },

        resetUser : (state) => {
            return null;
        }
    }
})

export const {addUser,resetUser} = userSlice.actions
export default userSlice.reducer