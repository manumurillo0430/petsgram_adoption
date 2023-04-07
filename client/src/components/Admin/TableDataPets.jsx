import { useMemo } from 'react'
import { Link, Avatar } from '@chakra-ui/react'
import { LinkIcon } from '@chakra-ui/icons'
import { NavLink } from 'react-router-dom'
import DashboardTable from './DashboardTable'
import { petStatusColor } from '../../utils/globals'

export default function TableDataPets({ pets }) {
  const data = useMemo(() => {
    return (pets || []).map((pet) => {
      return {
        picture: pet.picture,
        name: pet.name,
        type: pet.type,
        status: pet.adoptionStatus,
        date: pet.created_at,
        id: pet.pet_id,
      }
    })
  }, [pets])

  const columns = useMemo(
    () => [
      {
        Header: 'Pet',
        accessor: 'picture',
        Cell: (e) => <Avatar src={e.value} />,
      },
      {
        Header: 'Name',
        accessor: 'name',
        Cell: (e) => (
          <Link as={NavLink} to={`/pet/${e.row.original.id}`}>
            <LinkIcon mr={2} />
            {e.value}
          </Link>
        ),
      },
      { Header: 'Type', accessor: 'type' },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: (e) => (
          <span style={petStatusColor(e.value)} className="small-caps">
            {e.value}
          </span>
        ),
      },
      {
        Header: 'Created',
        accessor: 'date',
        Cell: (e) => (
          <span>{new Date(e.value).toLocaleString().slice(0, 9)}</span>
        ),
      },
    ],
    [],
  )

  return <DashboardTable data={data} columns={columns} />
}
