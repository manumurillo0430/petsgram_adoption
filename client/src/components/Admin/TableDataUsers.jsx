import { useMemo } from 'react'
import { Link } from '@chakra-ui/react'
import { LinkIcon } from '@chakra-ui/icons'
import { NavLink } from 'react-router-dom'
import DashboardTable from './DashboardTable'
import { userRoleColor } from '../../utils/globals'
import { Avatar } from '@chakra-ui/react'

export default function TableDataUsers({ users }) {
    const data = useMemo(
        () =>
            users.map((user) => {
                return {
                    user: <Avatar src={user.picture} />,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    date: user.created_at,
                    id: user._id,
                }
            }),
        []
    )

    const columns = useMemo(
        () => [
            {
                Header: 'User',
                accessor: 'user',
                Cell: (e) => (
                    <Link as={NavLink} to={`user/${e.row.original.id}`}>
                        {e.value}
                    </Link>
                ),
            },
            {
                Header: 'Name',
                accessor: 'name',
                Cell: (e) => (
                    <Link as={NavLink} to={`user/${e.row.original.id}`}>
                        <LinkIcon mr={2} />
                        {e.value}
                    </Link>
                ),
            },
            {
                Header: 'E-Mail',
                accessor: 'email',
                Cell: (e) => <Link href={`mailto:${e.value}`}>{e.value}</Link>,
            },
            {
                Header: 'Role',
                accessor: 'role',
                Cell: (e) => {
                    if (e.value === 1) {
                        return (
                            <span style={userRoleColor(e.value)} className="small-caps">
                                Admin
                            </span>
                        )
                    } else
                        return (
                            <span style={userRoleColor(e.value)} className="small-caps">
                                User
                            </span>
                        )
                },
            },
            {
                Header: 'Created',
                accessor: 'date',
                Cell: (e) => <span>{new Date(e.value).getFullYear}</span>,
            },
        ],
        []
    )

    return <DashboardTable data={data} columns={columns} />
}
