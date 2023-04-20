import React from 'react'
import DashboardTabs from './DashboardLayout'
import { useState, useEffect } from 'react'
import { GetReq } from '../../utils/api'

export default function DashboardTemple() {
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
      if (data.ok) {
        setUsers(data.users)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getPets = async () => {
    try {
      const data = await GetReq('/pet')
      if (data.ok) {
        setPets(data.pets)
      }
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
