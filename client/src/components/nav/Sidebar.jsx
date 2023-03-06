import { useColorModeValue } from '@chakra-ui/react'
import { Menu } from 'antd'
import { SearchIcon } from '@chakra-ui/icons'
import { NavLink } from 'react-router-dom'
import { Link } from '@chakra-ui/react'
import styled from 'styled-components'
import Header from './Header'
import { HomeFilled, SettingFilled } from '@ant-design/icons'
import { useAuthContext } from '../../context/AuthContext'
import { useState } from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PetsIcon from '@mui/icons-material/Pets'
import AddReactionIcon from '@mui/icons-material/AddReaction'
import { useSearchContext } from '../../context/SearchContext'
import './Sidebar.css'

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    }
}
const items = [
    getItem(
        'Home',
        '1',
        <Link as={NavLink} to="/">
            <HomeFilled />
        </Link>
    ),

    getItem(
        'Search',
        '2',
        <Link as={NavLink} to="/search">
            <SearchIcon />
        </Link>
    ),
    getItem(
        `My Pets`,
        '3',
        <Link as={NavLink} to="/profile/mypets/">
            <PetsIcon style={{ fontSize: '1.1rem' }} />
        </Link>
    ),
    getItem(
        `Profile Settings`,
        '4',
        <Link as={NavLink} to="/profile">
            <SettingFilled />
        </Link>
    ),
    getItem(
        `Add New Pet`,
        '5',
        <Link as={NavLink} to="/admin/new">
            <AddReactionIcon style={{ fontSize: '1.1rem' }} />
        </Link>
    ),
    getItem(
        `Dashboard`,
        '6',
        <Link as={NavLink} to="admin/dashboard">
            <DashboardIcon style={{ fontSize: '1.1rem' }} />
        </Link>
    ),
]

const FirstContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
`

const ParentContainer = styled.div`
    display: flex;
    height: 100vh;
    overflow: hidden;
`
const MainContent = styled.main`
    flex: 1;
    overflow: scroll;
`

const Sidebar = ({ children }) => {
    const { isActiveSession } = useAuthContext()
    const toggleCollapsed = () => {
        setCollapsed(!collapsed)
    }
    const [collapsed, setCollapsed] = useState(false)
    const theme = useColorModeValue('dark', 'light')
    return (
        <FirstContainer>
            <Header
                collapsed={collapsed}
                toggleCollapsed={toggleCollapsed}
                theme={useColorModeValue('dark', 'light')}
            />
            <ParentContainer>
                {isActiveSession && (
                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        theme={theme === 'dark' ? 'light' : 'dark'}
                        mode="inline"
                        inlineCollapsed={!collapsed}
                        items={items}
                    />
                )}
                <MainContent>{children}</MainContent>
            </ParentContainer>
        </FirstContainer>
    )
}

export default Sidebar
