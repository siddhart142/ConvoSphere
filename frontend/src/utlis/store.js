import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import chatLIstSlice from "./chatLIstSlice"
import activeChatSlice from "./activeChatSlice"
import notificationSlice from "./notificationSlice"

const store = configureStore({
    reducer : {
        user : userSlice,
        chatList : chatLIstSlice,
        activeChat : activeChatSlice,
        notification : notificationSlice
    }
})

export default store