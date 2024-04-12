import React, { Children, useState } from 'react'
import { useDisclosure } from '@chakra-ui/hooks'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useToast,
    Center,
    FormControl,
    Input,
    Box
  } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import UserListItem from '../layout/UserListItem'
import UserBadgeItem from './UserBadgeItem'
import { addChat } from '../../utlis/chatLIstSlice'
const GroupChatModal = ({children}) => {

    const {isOpen, onOpen, onClose} = useDisclosure()
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers,setSelectedUsers] = useState([])
    const [search,setSearch] = useState("")
    const [searchResult,setSearchResult]= useState([])
    const [loading, setLoading]= useState(false)

    const toast = useToast()

    const user = useSelector((store)=>store.user)
    const chatList = useSelector((store)=>store.chatList)
    const dispatch = useDispatch()

    const handleSearch = async (e)=>{
        const query = e.target.value
        setSearch(query)
        if(!query) return
        try {

            setLoading(true);
            const response = await axios.get(`http://localhost:8000/api/v1/users?search=${search}`,{
                withCredentials : true
            })
            
            setLoading(false)
            setSearchResult(response?.data.data)
        } catch (error) {
            toast({
                title : "eror occured",
                status : "error",
                duration : 5000,
                isClosable : true,
                position : "bottom-left",

            })
            return;
        }

    }

    const handleGroup = (user)=>{
        if(selectedUsers.includes(user)){
            toast({
                title : "user already added",
                status : "warning",
                duration : 5000,
                isClosable : true,
                position : "top",

            })
            return;
        }

        setSelectedUsers([...selectedUsers, user])
    }

    const handleDelete = (user)=>{
        setSelectedUsers(selectedUsers.filter(sel=> sel._id!==user._id))
    }

    const handleSubmit = async() => {
        if(!groupChatName || !selectedUsers){
            toast({
                title : "Please Enter all the fields",
                status : "warning",
                duration : 5000,
                isClosable : true,
                position : "top",

            })
            return;
        }
        try {

            const response = await axios.post(`http://localhost:8000/api/v1/chats/group`,{name: groupChatName, users : selectedUsers},{
                withCredentials : true
            })
            console.log(response)
            dispatch(addChat([response.data.data,...chatList]))
            onClose()
            toast({
                title : "New Group Created",
                status : "Success",
                duration : 5000,
                isClosable : true,
                position : "top",

            })
        } catch (error) {
            toast({
                title : "Couldnt create group chat",
                status : "error",
                duration : 5000,
                isClosable : true,
                position : "top",

            })
            return;
        }
        
    }
  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display={'flex'} justifyContent={'center'} fontSize={"40px"} fontFamily={'Work sans'}>Create Group Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} flexDir={'column'} alignItems={"center"}>
            <FormControl>
                <Input placeholder='Chat Name' m={2} p={2} value={groupChatName} onChange={(e)=> setGroupChatName(e.target.value)} />
            </FormControl>
            <FormControl>
                <Input placeholder='Add users eg: sid nikhil' m={2} p={2}  onChange={handleSearch} />
            </FormControl>
            <Box display={"flex"} flexDir="row" flexWrap={"wrap"} justifyContent={"space-between"}>
            {selectedUsers.map((user)=>(
                <UserBadgeItem key={user._id} user={user} handleFunction={()=>handleDelete(user)} />
            ))}
            </Box>
            {loading ? <div>Loading..</div> : (
                searchResult?.slice(0,4).map((user)=>
                <UserListItem key={user._id} user={user} handleFunction={()=> handleGroup(user)} />)
                
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' onClick={handleSubmit}>
              Create Chat
            </Button>
           
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default GroupChatModal
