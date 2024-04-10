import React, { useState } from 'react'
import {Box} from "@chakra-ui/layout"
import {Tooltip, Text} from "@chakra-ui/react"
import {Button} from "@chakra-ui/react"
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider
   
  } from '@chakra-ui/react'
  import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import ProfileModel from './profileModel';
const SideDrawer = () => {
    const [search,setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState(false)
  return (
    <div>
        <Box display="flex" justifyContent="space-between" alignItems="center" bg='white' w='100%' p='5px 10px 5px 10px' borderWidth={"5px"}>
            <Tooltip label="Search Users to Chat" hasArrow placement='bottom-end'>
                <Button bg='white'>
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
                    <Avatar size='sm' cursor='pointer' name={'temp'} src=""/>
                </MenuButton>
                <MenuList>
                <ProfileModel>
                    <MenuItem>My Profile</MenuItem>
                    <MenuDivider/>
                    <MenuItem>Log Out</MenuItem>
                </ProfileModel>
                </MenuList>
            </Menu>
            </div>

        </Box>
    </div>
  )
}

export default SideDrawer
