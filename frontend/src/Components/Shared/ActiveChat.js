import { Box, Text, IconButton } from '@chakra-ui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { setActive } from '../../utlis/activeChatSlice';
import ProfileModel from './profileModel';
import UpdateGroupModel from './UpdateGroupModel';

const ActiveChat = () => {
    const user = useSelector((store)=>store.user)
    const activeChat = useSelector((store)=>store.activeChat)
    console.log("ac",activeChat)
    const dispatch = useDispatch()
    const getSenderName = (loggedUser,users)=>{
        // console.log("get",users)
        return users[0]?._id=== loggedUser?._id ? users[1]?.name : users[0]?.name
      }
      const getSender = (loggedUser,users)=>{
        // console.log("get",users)
        return users[0]?._id=== loggedUser?._id ? users[1] : users[0]
      }
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
