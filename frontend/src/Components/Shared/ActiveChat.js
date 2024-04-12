import { Box, Text, IconButton, Spinner, FormControl, Input, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { setActive } from '../../utlis/activeChatSlice';
import ProfileModel from './profileModel';
import UpdateGroupModel from './UpdateGroupModel';
import axios from 'axios';

const ActiveChat = () => {
    const user = useSelector((store)=>store.user)
    const activeChat = useSelector((store)=>store.activeChat)
    const toast = useToast()
    // console.log("ac",activeChat)
    const dispatch = useDispatch()

    const [message,setMessage] = useState([])
    const [loading,setLoading] = useState(false)
    const [newMessage, setNewMessage] = useState()
    const getSenderName = (loggedUser,users)=>{
        // console.log("get",users)
        return users[0]?._id=== loggedUser?._id ? users[1]?.name : users[0]?.name
      }
      const getSender = (loggedUser,users)=>{
        // console.log("get",users)
        return users[0]?._id=== loggedUser?._id ? users[1] : users[0]
      }

      const sendMessage= async(e)=>{
        console.log("k",e.key)
        console.log(newMessage)
        if(e.key==="Enter" && newMessage)
        try {
            setNewMessage("")
            const response = await axios.post("http://localhost:8000/api/v1/messages",{
                content : newMessage,
                chatId : activeChat._id
            },{
                withCredentials : true
            })

     
            
            setMessage([...message,response.data.data])
            
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to send the Message",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
        }
      }
      const typingHandler= (e)=>{
        // console.log("type")
        setNewMessage(e.target.value)
      }

      const fetchMessages = async()=>{
        console.log("fetch called")
        if(!activeChat) return
        try {
            setLoading(true)
            const response = await axios.get(`http://localhost:8000/api/v1/messages/${activeChat._id}`,{
                withCredentials: true
            })
            // console.log("message",response)
            
            setMessage(response.data.data)
            setLoading(false)
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to send the Message",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
        }
      }

      useEffect(()=>{
        fetchMessages()
      },[activeChat])
  return (
    <>
   
      {activeChat ? (<>
        <Text fontSize={{base: "28px", md: "30px"}} pb={3} px={2} w="100%" fontFamily="Work sans" display="flex" justifyContent={{base: 'space-between'}} alignItems="center">
            <IconButton display={{base: "flex", md: "none"}}
            icon={<ArrowBackIcon/>}
            onClick={()=> dispatch(setActive(null))}
            />
            {activeChat.isGroupChat ? <> { activeChat.chatName.toUpperCase()} 
                <UpdateGroupModel/>
            </> : ( <> {getSenderName(user,activeChat.users)}
                <ProfileModel user={getSender(user,activeChat.users)}/></>)
            }
            
        </Text>
        <Box display="flex" flexDir="column" justifyContent="flex-end" p={3} bg="#E8E8E8" w="100%" h="100%" borderRadius="lg" overflowY="hidden">
            { loading? <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
            /> : (
                <div>


                </div>
            )}
            <FormControl 
            onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}>
              <Input variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}></Input>

            </FormControl>
        </Box>
      </>) : (
        <Box display="flex" alignItems="center" alignContent="center" justifyContent="center" h="100%">
            <Text fontSize="3xl" pb={3} fontFamily="Work sans" >
                Click on a user to start your conversation
            </Text>
        </Box>
      )
      }
    </>
  )
}

export default ActiveChat
