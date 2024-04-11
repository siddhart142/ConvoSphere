import React, { useEffect } from 'react';
import axios from 'axios';

import {Box} from "@chakra-ui/layout"
import SideDrawer from '../Components/Shared/SideDrawer';
import MyChats from '../Components/Shared/MyChats';
import ChatBox from '../Components/Shared/ChatBox';
import {useSelector} from "react-redux"

const Home = () => {

const user = useSelector((store)=>store.user)
  


  return (
    <div className='w-full'>
      {user && <SideDrawer/>}
      <Box className='flex flex-row justify-between w-full h-96'>
      {user && <MyChats/>} 
       {user && <ChatBox/>}

      </Box>
    </div>
  );
};
export default Home;


// AppLayout is invoked as a function (AppLayout()).
// This invocation returns another function (HOC).
// The returned function is then immediately invoked with Home as an argument (AppLayout()(Home)), resulting in the Home component being wrapped by the HOC returned by AppLayout.