import React, {lazy} from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Protected from './Components/auth/Protected'
import { useSelector } from 'react-redux';

// import Home from './pages/Home'

const Home = lazy(()=> import("./pages/Home"))
const Login = lazy(()=> import("./pages/Login"))
const Chat = lazy(()=> import("./pages/Chat"))
const Groups = lazy(()=> import("./pages/Groups"))
const NotFound = lazy(()=> import("./pages/NotFound") )



const App = () => {
  const user = useSelector((store) => store.user)
  console.log("app",user)
  return (
        <BrowserRouter>
      <Routes>
      <Route element={<Protected user={user} />}>
       {/* outlet */}
        <Route path="/" element={<Home />}></Route>
        <Route path = "/chat/:chatId" element={<Chat/>}></Route>
        <Route path = "/groups" element={<Groups/>}></Route>
      </Route>
      
      {/* <Route element={<Protected user={!user} redirect="/" />}>
        <Route path="/login" element={<Login/>}></Route>
      </Route> */}
      <Route path="/login" element={
        <Protected user={!user} redirect="/">
        {/* childern */}
          <Login/>
        </Protected>
      }/>

      <Route path="*" element={<NotFound/>}></Route>
      </Routes>
    </BrowserRouter>
   
  )
}

export default App
