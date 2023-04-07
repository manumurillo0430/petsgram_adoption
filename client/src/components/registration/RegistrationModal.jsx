import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Flex,
} from '@chakra-ui/react'
import LoginImage from './LoginImage'
import Resgistration from './Resgistration'

export default function RegistrationModal({ isOpen, toggleModal }) {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => toggleModal()}
        style={{ padding: 0, margin: 0 }}
      >
        <ModalOverlay />
        <ModalContent maxW="45rem">
          <ModalCloseButton />
          <ModalBody style={{ padding: 0, margin: 0 }}>
            <Flex m={0} p={0}>
              <LoginImage />
              <Resgistration toggleModal={toggleModal} />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
