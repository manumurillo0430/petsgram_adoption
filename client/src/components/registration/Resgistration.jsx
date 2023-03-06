import React from 'react'
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import LoginForm from './LoginForm'
import Singup from './Singup'

export default function Resgistration({ toggleModal }) {
    console.log('Toggle modal in Registration', toggleModal)
    return (
        <Box w="100%" p={0} m={0}>
            <Tabs isFitted>
                <TabList>
                    <Tab>Log&nbsp;In</Tab>
                    <Tab>Sign&nbsp;Up</Tab>
                </TabList>
                <TabPanels mt={2}>
                    <TabPanel>
                        <LoginForm toggleModal={toggleModal} />
                    </TabPanel>
                    <TabPanel>
                        <Singup toggleModal={toggleModal} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}
