import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import chatLIstSlice from "./chatLIstSlice"
import activeChatSlice from "./activeChatSlice"

const store = configureStore({
    reducer : {
        user : userSlice,
        chatList : chatLIstSlice,
        activeChat : activeChatSlice
    }
})

export default store