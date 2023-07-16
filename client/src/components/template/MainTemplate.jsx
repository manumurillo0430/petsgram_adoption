import React, { useEffect, useState } from 'react'
import { Grid, GridItem, Link, useColorModeValue } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { Menu } from 'antd'
import { HomeFilled, SettingFilled, UserOutlined } from '@ant-design/icons'
import { useAuthContext } from '../../context/AuthContext'
import { NavLink } from 'react-router-dom'
import Header from './Header'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AddReactionIcon from '@mui/icons-material/AddReaction'
import PublishIcon from '@mui/icons-material/Publish'
import PetsIcon from '@mui/icons-material/Pets'
import { useLocation } from 'react-router-dom'
import './MainTemplate.css'
import { backgroundDay, backgroundNight } from '../../utils/globals'

export default function MainTemplate({ children }) {
  const { isActiveSession, currentUser } = useAuthContext()
  const [collapsed, setCollapsed] = useState(true)
  const location = useLocation()
  const [selectedKeys, setSelectedKeys] = useState(['1'])
  const theme = useColorModeValue('dark', 'light')
  const getItem = (label, key, icon, children, type, currentUser) => {
    return {
      key,
      icon,
      children,
      label,
      currentUser,
      type,
    }
  }

  const items = [
    getItem(
      'Home',
      '1',
      <Link as={NavLink} to="/">
        <HomeFilled />
      </Link>,
    ),

    getItem(
      'Search',
      '2',
      <Link as={NavLink} to="/search">
        <SearchIcon />
      </Link>,
    ),
    { type: 'divider' },
    getItem(
      `My Profile`,
      '3',
      <Link as={NavLink} to={`/myprofile/${currentUser.user_id}`}>
        <UserOutlined />
      </Link>,
    ),
    getItem(
      `My Pets`,
      '4',
      <Link as={NavLink} to="/myprofile/mypets">
        <PetsIcon style={{ fontSize: '1.1rem' }} />
      </Link>,
    ),
    getItem(
      `Profile Settings`,
      '5',
      <Link as={NavLink} to="/myprofile/settings">
        <SettingFilled />
      </Link>,
    ),
    getItem(
      `Save a life`,
      '6',
      <Link as={NavLink} to="myprofile/savealife">
        <AddReactionIcon style={{ fontSize: '1.1rem' }} />
      </Link>,
    ),
    { type: 'divider' },
    getItem(
      `Pet Submissions`,
      '7',
      <Link as={NavLink} to="admin/dashboard">
        <PublishIcon style={{ fontSize: '1.1rem' }} />
      </Link>,
    ),
    getItem(
      `Add New Pet`,
      '8',
      <Link as={NavLink} to="/admin/new">
        <AddReactionIcon style={{ fontSize: '1.1rem' }} />
      </Link>,
    ),
    getItem(
      `Dashboard`,
      '9',
      <Link as={NavLink} to="admin/dashboard">
        <DashboardIcon style={{ fontSize: '1.1rem' }} />
      </Link>,
    ),
  ]
  const filteredItems = items.filter((item) => {
    if (item.key === '7' || item.key === '8' || item.key === '9') {
      return currentUser.role
    }
    return true
  })
  useEffect(() => {
    if (location.pathname === '/') {
      setSelectedKeys(['1'])
    } else if (location.pathname === '/search') {
      setSelectedKeys(['2'])
    } else if (location.pathname === `/myprofile/${currentUser.user_id}`) {
      setSelectedKeys(['3'])
    } else if (location.pathname === '/myprofile/mypets') {
      setSelectedKeys(['4'])
    } else if (location.pathname === '/myprofile/settings') {
      setSelectedKeys(['5'])
    } else if (location.pathname === '/myprofile/savealife') {
      setSelectedKeys(['6'])
    } else if (location.pathname === '/admin/submissions') {
      setSelectedKeys(['7'])
    } else if (location.pathname === '/admin/new') {
      setSelectedKeys(['8'])
    } else if (location.pathname === '/admin/dashboard') {
      setSelectedKeys(['9'])
    }
  }, [location.pathname])
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Grid
      templateAreas={
        isActiveSession
          ? `"header header"
                  "nav main"
                  "nav footer"`
          : `"header header"
          "main main"
          ". footer"`
      }
      gridTemplateRows={'5rem  1fr'}
      gridTemplateColumns={collapsed ? '12rem 1fr' : '5rem 1fr'}
      transition="grid-template-columns 0.2s"
      flex-direction="column"
      overflow="hidden"
      height="100vh"
    >
      <GridItem area={'header'}>
        <Header
          collapsed={collapsed}
          toggleCollapsed={toggleCollapsed}
          theme={useColorModeValue('dark', 'light')}
        />
      </GridItem>

      <GridItem
        area={isActiveSession ? 'nav' : ''}
        css={{ display: 'flex', overflow: 'hidden' }}
      >
        {isActiveSession ? (
          <Menu
            defaultSelectedKeys={['2']}
            selectedKeys={selectedKeys}
            defaultOpenKeys={['sub1']}
            theme={theme === 'dark' ? 'light' : 'dark'}
            mode="inline"
            inlineCollapsed={!collapsed ? 'none' : ''}
            items={filteredItems}
          />
        ) : null}
      </GridItem>

      <GridItem
        area={'main'}
        overflowY="auto"
        display="flex"
        flex={1}
        justifyContent="center"
        position="relative"
      >
        {children}
      </GridItem>
    </Grid>
  )
}
