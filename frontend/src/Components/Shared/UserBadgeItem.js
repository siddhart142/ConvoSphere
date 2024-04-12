import { Box } from '@chakra-ui/react'
import CloseIcon from '@mui/icons-material/Close';
import React from 'react'

const UserBadgeItem = ({user,handleFunction}) => {
  return (
    <Box px={2} my={1} bg="purple" m={1} color="white" borderRadius={"lg"} varient="solid" cursor="pointer" onClick={handleFunction}>
        {user.name} 
        <CloseIcon ml={1}/>
    </Box>
  )
}

export default UserBadgeItem
