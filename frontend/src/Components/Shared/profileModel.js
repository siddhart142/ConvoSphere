import React from 'react'
import {useDisclosure} from "@chakra-ui/hooks"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {IconButton} from "@chakra-ui/button"
import {Button, Image, Text} from "@chakra-ui/react"

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
const ProfileModel = ({user, children}) => {
  // console.log(user)
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <div>
      {children ? (<span onClick={onOpen}>{children}</span>) : ( <IconButton display='flex' icon={<RemoveRedEyeIcon/>} onClick={onOpen} /> )}
      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display={'flex'} justifyContent={'center'} fontSize={"40px"} fontFamily={'Work sans'}>{user?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody display={'flex'} flexDirection={'column'} justifyContent={'space-between'} alignItems={'center'}>
            <Image borderRadius={'full'} boxSize={"150px"} src='https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png'/>
            <Text fontSize={{base: "20px", md: "30px"}}>{user.email}</Text>
          </ModalBody>
           
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
           
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ProfileModel
 