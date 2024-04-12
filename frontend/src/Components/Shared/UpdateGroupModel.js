import { IconButton, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
  } from '@chakra-ui/react'
  import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
const UpdateGroupModel = () => {

    const activeGroup = useSelector((store)=>store.activeChat)
    
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
    <IconButton display={{base: "flex"}} icon={<RemoveRedEyeIcon />} onClick={onOpen}/>
     

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UpdateGroupModel
