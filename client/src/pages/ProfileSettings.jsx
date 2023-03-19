import React from 'react'
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Link,
  Box,
} from '@chakra-ui/react'
import ProfileForm from '../components/profile/ProfileForm'
import ChangePasswordForm from '../components/profile/ChangePasswordForm'
import { Divider } from 'antd'

export default function ProfileSettings() {
  return (
    <>
      <Box width="100%">
        <Divider style={{ border: 'none', margin: '0.5rem' }} />
        <Tabs isFitted>
          <TabList>
            <Tab fontWeight="semibold">UPDATE PROFILE</Tab>
            <Tab fontWeight="semibold">CHANGE PASSWORD</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ProfileForm />
            </TabPanel>
            <TabPanel>
              <ChangePasswordForm />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  )
}
