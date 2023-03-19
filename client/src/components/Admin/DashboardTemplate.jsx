import React from 'react'
import { Box, Flex, Center } from '@chakra-ui/react'
import DashboardTabs from './DashboardTabs'
import { useState, useEffect } from 'react'
import { GetReq } from '../../utils/api'
import { petStatus, petTypes } from '../../utils/globals'
import PieChart from './PieChart'
import BarChart from './BarChart'
import Statistics from './StatisticsPets'
import { Divider } from 'antd'

export default function DashboardTemple({ data, labels }) {
  const [pets, setPets] = useState([])
  const [users, setUsers] = useState()
  const [areListsLoading, setAreListsLoading] = useState(true)
  const [tab, setTab] = useState('pets')

  useEffect(() => {
    const awaitGetUsers = async () => {
      await getUsers()
      await getPets()
      setAreListsLoading(false)
    }
    awaitGetUsers() // eslint-disable-next-line
  }, [])

  const getUsers = async () => {
    try {
      const data = await GetReq('/user')
      console.log(data)
      setUsers(data.users)
    } catch (err) {
      console.log(err)
    }
  }

  const getPets = async () => {
    try {
      const data = await GetReq('/pet')
      console.log(data)
      setPets(data)
      console.log(pets.length)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <DashboardTabs
      users={users}
      pets={pets}
      areListsLoading={areListsLoading}
      tab={tab}
      setTab={setTab}
    />
  )
}
