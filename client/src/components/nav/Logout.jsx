import { Button, Flex } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { Post, PostReq } from '../../utils/api'
import { useAuthContext } from '../../context/AuthContext'

export default function Logout() {
    const { clearCurrentUser } = useAuthContext()
    let navigate = useNavigate()

    const handleLogout = async () => {
        try {
            console.log('here')
            const res = await PostReq('/logout', {})

            if (res.ok) {
                clearCurrentUser()
                navigate('/')
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Flex placeContent="end">
            <Button mr={3} mt={2} size="sm" colorScheme="blue" onClick={handleLogout}>
                Log Out
            </Button>
        </Flex>
    )
}
