import React,{useEffect} from 'react'
import {useSelector, useDispatch} from "react-redux"
import { addChat } from '../../utlis/chatLIstSlice'
import axios from "axios"
import { useToast } from '@chakra-ui/react'
import { Button } from "@chakra-ui/react";
import { Box, Stack, Text } from "@chakra-ui/layout";
import ChatLoading from '../layout/ChatLoading'
import { setActive } from '../../utlis/activeChatSlice'
import AddIcon from '@mui/icons-material/Add';
import GroupChatModal from '../Shared/GroupChatModal'

const MyChats = () => {


  const toast = useToast()

  const chatList = useSelector((store)=>store.chatList)
  const selectedChat = useSelector((store)=>store.activeChat)
  // console.log("sele",selectedChat)
  const user = useSelector((store)=>store.user)
  console.log("chatListM",chatList)
  const dispatch = useDispatch()

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      

      const { data } = await axios.get("http://localhost:8000/api/v1/chats", {
          withCredentials: true
      });

      console.log("chats",data)
      dispatch(addChat(data))
    } catch (error) {
      console.log(error)
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    // setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  },[]);

  const getSender = (loggedUser,users)=>{
    console.log("get",users)
    return users[0]?._id=== loggedUser?._id ? users[1]?.name : users[0]?.name
  }
  return (
    <Box
    display={{ base: selectedChat ? "none" : "flex", md: "flex"}}
    flexDir="column"
    alignItems = "center"
    p={3}
    bg="white"
    w={{base : "100%", md: "31%"}}
    h="1000px"
    borderRadius="lg"
    borderWidth="1px"
    >
    <Box
      pb={3}
      px={3}
      fontSize={{ base: "28px", md: "30px" }}
      fontFamily="Work sans"
      display="flex"
      w="100%"
      justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
          <Button
              d="flex"
              fontSize={{ base: "17px", md: "10px", lg: "17px" }}
              rightIcon={<AddIcon />}
            >
              New Group Chat
            </Button>
        </GroupChatModal>
        </Box>
          <Box
          d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        // h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chatList ? (
          <Stack overflowY="scroll">
            {chatList.map((chat) => (
          <Box
                onClick={() => dispatch(setActive(chat))}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(user, chat.users)
                    : chat.chatName}
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>

        ):(
          <ChatLoading />
        )}
          </Box>

    </Box>


  )
}

export default MyChats
