import { useNavigate } from 'react-router-dom'
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spinner,
  Button,
} from '@chakra-ui/react'
import TableDataPets from './TablePets'
import TableDataUsers from './TableUsers'
import { AddIcon } from '@chakra-ui/icons'
import StatisticsPets from './StatisticsPetsGraph'

export default function DashboardTabs({
  users,
  pets,
  areListsLoading,
  setTab,
}) {
  let navigate = useNavigate()
  return (
    <>
      <Tabs isFitted colorScheme="blue" w="100%">
        <TabList>
          <Tab fontWeight="500" onClick={() => setTab('pets')}>
            Pets
          </Tab>
          <Tab fontWeight="500" onClick={() => setTab('users')}>
            Users
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel display="flex" flexFlow="column nowrap" alignItems="center">
            {!areListsLoading ? (
              <>
                <StatisticsPets pets={pets} />
                <Button
                  leftIcon={<AddIcon />}
                  colorScheme="blue"
                  variant="solid"
                  className="small-caps"
                  alignItems="center"
                  alignSelf="end"
                  onClick={() => navigate('/admin/new')}
                >
                  Add New Pet
                </Button>
                <TableDataPets pets={pets} />
              </>
            ) : (
              <Spinner size="xl" mt={12} />
            )}
          </TabPanel>
          <TabPanel>
            {!areListsLoading ? (
              <TableDataUsers users={users} />
            ) : (
              <Spinner size="xl" mt={12} />
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}
