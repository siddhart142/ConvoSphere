import React, { useState } from 'react'
import {Box} from "@chakra-ui/layout"
import {Tooltip, Text} from "@chakra-ui/react"
import {Button} from "@chakra-ui/react"
import SearchIcon from '@mui/icons-material/Search';
import {useDisclosure} from '@chakra-ui/hooks'
import { useToast } from '@chakra-ui/react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider
   
  } from '@chakra-ui/react'
  import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import ProfileModel from './profileModel';
import { resetUser } from '../../utlis/userSlice';
import { Input } from '@chakra-ui/react'
import axios from "axios"
import ChatLoading from '../layout/ChatLoading';
import UserListItem from '../layout/UserListItem';
import { addChat } from '../../utlis/chatLIstSlice';
const SideDrawer = () => {

    
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [search,setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState(false)
    const [selectedChat,setSelectedChat] = useState({})
    const chatList = useSelector((store)=>store.chatList)

    const toast = useToast()
    const user = useSelector((store) => store.user)
    const dispatch = useDispatch()


    const handleLogOut = ()=>{
        dispatch(resetUser())
    }

    const handleSearch = async ()=>{
        if(!search){
            toast({
                title : "Please Enter something in search",
                status : "warning",
                duration : 5000,
                isClosable : true,
                position : "top-left",

            })
            return;
        }

        try{
            setLoading(true)
            console.log("allF",search)
            const data = await axios.get(`http://localhost:8000/api/v1/users?search=${search}`,{
                withCredentials : true
            })

            setSearchResult(data?.data?.data)
            console.log(data?.data?.data)
        }catch(error){
            toast({
                title : "Please Enter something in search",
                status : "error",
                duration : 5000,
                isClosable : true,
                position : "bottom-left",

            })
            return;

        }
        setLoading(false)
    }

    const accessChat = async(user_id) =>{
        // console.log(user_id)
        setLoadingChat(true)
        try {
            const response = await axios.post("http://localhost:8000/api/v1/chats", {"userId": user_id}, {
                withCredentials: true
              });
              console.log("c",response.data)
              setSelectedChat(response.data)
              setLoadingChat(false)
              if(!chatList.find((c)=> c._id==response.data.data._id)) dispatch(addChat([response.data,...chatList]))

        } catch (error) {
            toast({
                title : "Error Fetching the Chat",
                status : "error",
                description : error.message,
                duration : 5000,
                isClosable : true,
                position : "bottom-left",

            })
            
        }
        

        // console.log(response)

    }
  return (
    <div>
        <Box display="flex" justifyContent="space-between" alignItems="center" bg='white' w='100%' p='5px 10px 5px 10px' borderWidth={"5px"}>
            <Tooltip label="Search Users to Chat" hasArrow placement='bottom-end'>
                <Button bg='white' onClick={onOpen}>
                    <SearchIcon/>
                    <Text display={ { base: "none", md: "flex"}} px="4">
                        Search user
                    </Text>
                </Button>
            </Tooltip>

            <Text fontSize='2xl' fontFamily='Work sans'>
                ConvoSphere
            </Text>
            <div>
            <Menu>
                <MenuButton p='1'>
                    <NotificationsIcon className='text-2xl m-1' />
                </MenuButton>
                <MenuList>
                    
                </MenuList>
            </Menu>
            <Menu>
                <MenuButton as={Button} rightIcon={<ArrowDropDownIcon/>}>
                    <Avatar size='sm' cursor='pointer' name={user.name} src=""/>
                </MenuButton>
                <MenuList>
                <ProfileModel>
                    <MenuItem>My Profile</MenuItem>
                    <MenuDivider/>
                    <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
                </ProfileModel>
                </MenuList>
            </Menu>
            </div>

        </Box>
        <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader borderBottomWidth='1px'>
                    Search User
                </DrawerHeader>
                <DrawerBody>
                <Box display={'flex'} pb={2}>
                    <Input placeholder='Search by name or email' mr={2} value={search} onChange={(e)=> setSearch(e.target.value)}/>
                    <Button 
                    onClick={handleSearch}
                    >
                        Go
                    </Button>
                </Box>
                  {loading ? <ChatLoading/> : (
                    searchResult?.map(user=> (

                         <UserListItem key={user._id} user={user} handleFunction={()=>accessChat(user._id)}/> 
                        
                    ))
                ) }
              
            </DrawerBody>
            </DrawerContent>
            
        </Drawer>

    </div>
  )
}

export default SideDrawer
