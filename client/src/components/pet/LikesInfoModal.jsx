import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Flex,
} from '@chakra-ui/react'
import LikesInfo from './LikesInfo'

export default function LikesInfoModal({ isOpen, toggleModal, userInfoLikes }) {
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
              <LikesInfo
                toggleModal={toggleModal}
                userInfoLikes={userInfoLikes}
              />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
