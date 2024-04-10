import { createContext, useContext, useEffect, useState } from "react";

const chatContext = createContext()

const ChatProvider = ({children}) =>{

    const [user, setUser] = useState(true) 

    useEffect(()=>{
        // const userInfo = get info
        //to do => set user with user info/cookie
    },[])

    return (
        <chatContext.Provider value={{user,setUser}}>
            {children}
        </chatContext.Provider>
    )
}
export const ChatState = () => {
    return useContext(chatContext)
}

export default ChatProvider