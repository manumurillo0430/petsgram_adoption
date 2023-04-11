import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Heading,
  Flex,
} from '@chakra-ui/react'
import { Divider } from 'antd'
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
        <ModalContent
          maxW="45rem"
          justifyContent="center"
          alignContent="baseline"
        >
          <ModalCloseButton />

          <ModalBody>
            <Heading size="md">Liked by</Heading>
            <Divider style={{ border: 'none', margin: '0.6rem' }} />
            <LikesInfo
              toggleModal={toggleModal}
              userInfoLikes={userInfoLikes}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
