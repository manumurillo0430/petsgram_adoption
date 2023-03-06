import { useNavigate } from 'react-router-dom'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Spinner, Button } from '@chakra-ui/react'
import TableDataPets from './TableDataPets'
import TableDataUsers from './TableDataUsers'
import { AddIcon } from '@chakra-ui/icons'

export default function DashboardTabs({ users, pets, areListsLoading, setTab }) {
    let navigate = useNavigate()
    return (
        <>
            <Tabs isFitted colorScheme="blue" w="85vw" m="auto">
                <TabList>
                    <Tab onClick={() => setTab('pets')}>Pets</Tab>
                    <Tab onClick={() => setTab('users')}>Users</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel display="flex" flexFlow="column nowrap" alignItems="center">
                        {!areListsLoading ? <TableDataPets pets={pets} /> : <Spinner size="xl" mt={12} />}
                        <Button
                            leftIcon={<AddIcon />}
                            colorScheme="blue"
                            variant="solid"
                            className="small-caps"
                            alignItems="center"
                            alignSelf="end"
                            onClick={() => navigate('pet/new')}
                        >
                            Add New Pet
                        </Button>
                    </TabPanel>
                    <TabPanel>
                        {!areListsLoading ? <TableDataUsers users={users} /> : <Spinner size="xl" mt={12} />}
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )
}
