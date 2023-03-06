import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Flex, Link } from '@chakra-ui/react'
import LoginImage from './LoginImage'
import Resgistration from './Resgistration'
import { useDisclosure } from '@chakra-ui/react'
export default function RegistrationModal({ isOpen, toggleModal }) {
    return (
        <>
            <Modal isOpen={isOpen} onClose={() => toggleModal()} style={{ padding: 0, margin: 0 }}>
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
