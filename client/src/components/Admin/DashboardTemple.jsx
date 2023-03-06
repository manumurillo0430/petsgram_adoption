import React from 'react'
import { Box, Flex, Center } from '@chakra-ui/react'
import DashboardTabs from './DashboardTabs'
import { useState, useEffect } from 'react'
import { GetReq } from '../../utils/api'
import { petStatus, petTypes } from '../../utils/globals'
import PieChart from './PieChart'
import BarChart from './BarChart'
import Statistics from './Statistics'
import { Divider } from 'antd'

export default function DashboardTemple({ data, labels }) {
    const [pets, setPets] = useState([])
    const [users, setUsers] = useState()
    const [areListsLoading, setAreListsLoading] = useState(true)
    const [tab, setTab] = useState('pets')
    const adoptedPercentage = Math.round(
        (pets.filter((pet) => pet.adoptionStatus === 'Adopted').length / pets.length) * 100
    )
    const fosteredPercentage = Math.round(
        (pets.filter((pet) => pet.adoptionStatus === 'Fostered').length / pets.length) * 100
    )
    const availablePercentage = Math.round(
        (pets.filter((pet) => pet.adoptionStatus === 'Available').length / pets.length) * 100
    )
    const colorScale = ['rgb(218 112 214 / 80%)', 'rgb(22 150 255 / 80%)', 'rgb(80 200 121 / 80%)']
    const bgColor = [
        'rgba(153, 102, 255, 0.5)',
        'rgb(196,241,249, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(54, 162, 235, 0.5)',
    ]
    const borderColor = ['rgb(153, 102, 255)', 'rgb(196,241,249)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)']

    const petTypesWithoutAny = petTypes.slice(1)
    const petTypesLength = petTypesWithoutAny.map((type) => pets.filter((pet) => pet.type === type).length)

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
        <Box>
            <Divider style={{ border: 'none', margin: '0.4rem' }} />
            <Flex flexDir="column" h="100% ">
                <Flex w="100%" h="10%">
                    <Center placeContent="center" w="100%">
                        <Flex flexDir="row" w="80%">
                            <PieChart
                                data={[adoptedPercentage, fosteredPercentage, availablePercentage]}
                                colorScale={colorScale}
                                labels={petStatus}
                                endAngle={360}
                            />
                            <BarChart
                                axeX={petTypesWithoutAny}
                                axeY={petTypesLength}
                                nameChart="Types Of Pets"
                                backgroundColor={bgColor}
                                borderColor={borderColor}
                            />
                            {/* <Statistics total /> */}
                        </Flex>
                    </Center>
                </Flex>
                <Flex w="100%" h="90%">
                    <Flex w="100%">
                        <DashboardTabs
                            users={users}
                            pets={pets}
                            areListsLoading={areListsLoading}
                            tab={tab}
                            setTab={setTab}
                        />
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    )
}
