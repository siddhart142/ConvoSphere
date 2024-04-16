import { Box, Text, IconButton, Spinner, FormControl, Input, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { setActive } from '../../utlis/activeChatSlice';
import ProfileModel from './profileModel';
import UpdateGroupModel from './UpdateGroupModel';
import axios from 'axios';
import ScrollableChat from './ScrollableChat';
import io from "socket.io-client"
import Lottie from "react-lottie"
import animationData from "../animations/typing.json"
import { addNotification } from '../../utlis/notificationSlice';
const ENDPOINT = "http://localhost:8000";
var socket, selectedChatCompare
const ActiveChat = () => {
    const user = useSelector((store)=>store.user)
    const activeChat = useSelector((store)=>store.activeChat)
    const toast = useToast()
    // console.log("ac",activeChat)
    const dispatch = useDispatch()

    const [message,setMessage] = useState(null)
    const [loading,setLoading] = useState(false)
    const [newMessage, setNewMessage] = useState()
    const [socketConnected,setSocketConnected] = useState(false)

    const [typing, setTyping] = useState(false)
    const [isTyping , setIsTyping] = useState(false)

    const notification = useSelector((store)=>store.notification)

    console.log("------",notification)

    const defaultOptions = {
      loop: true,
      autoplay : true,
      animationData : animationData,
      rendererSettings : {
        preserveAspectRatio : "xMidYMid slice"
      }
    }
    
    
    const getSenderName = (loggedUser,users)=>{
        // console.log("get",users)
        return users[0]?._id=== loggedUser?._id ? users[1]?.name : users[0]?.name
      }
      const getSender = (loggedUser,users)=>{
        // console.log("get",users)
        return users[0]?._id=== loggedUser?._id ? users[1] : users[0]
      }

      const sendMessage= async(e)=>{
        // console.log("k",e.key)
        // console.log(newMessage)
        if(e.key==="Enter" && newMessage)
        try {
            setNewMessage("")
            const response = await axios.post("http://localhost:8000/api/v1/messages",{
                content : newMessage,
                chatId : activeChat._id
            },{
                withCredentials : true
            })

            socket.emit("new message",response?.data?.data)
            
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
        
        setNewMessage(e.target.value)
       
        if(!socketConnected) return;

        if(!typing){
          setTyping(true)
          console.log("sending typing event")
          socket.emit("typing",activeChat._id)
        }

        var lastTypingTime = new Date().getTime()
        var timeLength = 1000
        setTimeout(()=>{
          var timeNow = new Date().getTime()
          var timeDiff = timeNow - lastTypingTime;

          if(timeDiff >= timeLength && typing){
            console.log("Sending stop typing event");
            socket.emit("stop typing",activeChat._id)
            setTyping(false)
          }
        },timeLength)
      }

      const fetchMessages = async()=>{
        console.log("fetch called")
        if(!activeChat) return
        try {
            setLoading(true)
            const response = await axios.get(`http://localhost:8000/api/v1/messages/${activeChat._id}`,{
                withCredentials: true
            })
            console.log("message",response)
            
            setMessage(response.data.data)
            setLoading(false)

            socket.emit('join chat',activeChat._id)
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

      useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit('setup', user);
    
        socket.on('connected', () => {
          setSocketConnected(true);
        });

        socket.on("typing", () => {
          console.log("Received typing event");
          setIsTyping(true);
        });
        socket.on("stop typing", () => {
          console.log("Received stop typing event");
          setIsTyping(false);
        })

        console.log("istyping",isTyping)
    
        return () => {
            socket.disconnect();
        };
    },[]);
    
    useEffect(() => {
        console.log(socketConnected,activeChat)
        if (socketConnected && activeChat) {
            fetchMessages();
            selectedChatCompare = activeChat;
        }
    }, [activeChat]);
    
    useEffect(() => {
        if (socketConnected) {
            socket.on('message received', (newMessageReceived) => {
              console.log("client",selectedChatCompare,newMessageReceived)
                if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived?.chat._id) {
                   if(!notification.includes(newMessageReceived)){
                      dispatch(addNotification([newMessageReceived,...notification]))
                      // update chatList
                   }
                } else {
                  // console.log("active chat",activeChat)
                  setMessage([...message,newMessageReceived])
                }
            });
        }
    }, );
    
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
                <div className=''>

                  <ScrollableChat messages={message}/>
                </div>
            )}
            <FormControl 
  onKeyDown={sendMessage}
    id="first-name"
    isRequired
    mt={3}>
   {isTyping && <div><Lottie
  options={defaultOptions}
  width={70}
  style={{ marginBottom: 15, marginLeft: 0 }}
/></div>}

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
