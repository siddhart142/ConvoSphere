import { Box, Center } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import ActiveChat from './ActiveChat'

const ChatBox = () => {
  const activeChat = useSelector((store)=>store.activeChat)
  console.log("ac",activeChat)
  return (
    <Box display={{base : activeChat? "flex" : "none", md:"flex"}}
    alignItems="center"
    flexDir="column"
    p={3}
    bg="white"
    w={{base : "100%" , md: "68%"}}
    h="1000px"
    borderRadius="lg"
    borderWidth="1px">
      <ActiveChat />
    </Box>
  )
}

export default ChatBox
