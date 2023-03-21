import { useMemo } from 'react'
import DashboardTable from './DashboardTable'
import { NavLink } from 'react-router-dom'
import { Link, Avatar } from '@chakra-ui/react'
import { LinkIcon } from '@chakra-ui/icons'
import { userRoleColor } from '../../utils/globals'

export default function TableDataUsers({ users }) {
  const data = useMemo(
    () =>
      users.map((user) => {
        return {
          picture: user.picture,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          role: user.role,
          account: user.is_private,
          date: user.created_at,
          id: user.user_id,
        }
      }),
    [],
  )

  const columns = useMemo(
    () => [
      {
        Header: 'User',
        accessor: 'picture',
        Cell: (e) => <Avatar src={e.value} />,
      },
      {
        Header: 'Name',
        accessor: (row) => `${row.firstname} ${row.lastname}`,
        Cell: (e) => (
          <Link as={NavLink} to={`/profile/${e.row.original.id}`}>
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
        Header: 'Account',
        accessor: 'account',
        Cell: (e) => {
          if (e.value === 1) {
            return <span className="small-caps">Private</span>
          } else return <span className="small-caps">Public</span>
        },
      },
      {
        Header: 'Created',
        accessor: 'date',
        Cell: (e) => <span>{new Date(e.value).toLocaleDateString()}</span>,
      },
    ],
    [],
  )

  return <DashboardTable data={data} columns={columns} />
}
