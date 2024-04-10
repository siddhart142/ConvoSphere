import React, { useEffect } from 'react';
import axios from 'axios';
import { ChatState } from '../Context/ChatProvider';
import {Box} from "@chakra-ui/layout"

const Chat = () => {

  const {user} = ChatState();
  


  return (
    <div className='w-full'>
      <Box>

      </Box>
    </div>
  );
};
export default Chat;
