import {
  Flex,
  Text,
  useColorModeValue,
  Card,
  Box,
  Tag,
  TagLabel,
  Center,
} from '@chakra-ui/react'
import { petStatus, petTypes } from '../../utils/globals'
import PieChart from './PieChart'
import BarChart from './BarChart'
import { Divider } from 'antd'
import './Graphs.css'

export default function StatisticsPets({ data, labels, pets }) {
  const theme = useColorModeValue('dark', 'light')
  const adoptedPercentage = Math.round(
    (pets.filter((pet) => pet.adoptionStatus === 'Adopted').length /
      pets.length) *
      100,
  )
  const fosteredPercentage = Math.round(
    (pets.filter((pet) => pet.adoptionStatus === 'Fostered').length /
      pets.length) *
      100,
  )
  const availablePercentage = Math.round(
    (pets.filter((pet) => pet.adoptionStatus === 'Available').length /
      pets.length) *
      100,
  )
  const colorScale = [
    'rgb(218 112 214 / 80%)',
    'rgb(22 150 255 / 80%)',
    'rgb(80 200 121 / 80%)',
  ]
  const bgColor = [
    'rgba(153, 102, 255, 0.5)',
    'rgb(196,241,249, 0.5)',
    'rgba(75, 192, 192, 0.5)',
    'rgba(54, 162, 235, 0.5)',
  ]
  const borderColor = [
    'rgb(153, 102, 255)',
    'rgb(196,241,249)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
  ]

  const petTypesWithoutAny = petTypes.slice(1)
  const petTypesLength = petTypesWithoutAny.map(
    (type) => pets.filter((pet) => pet.type === type).length,
  )
  return (
    <>
      <Flex flexDir="column" h="100% ">
        <Flex w="100%" h="20%">
          <Center placeContent="center" w="100%">
            <Flex flexDir="row" w="100%">
              <PieChart
                data={[
                  adoptedPercentage,
                  fosteredPercentage,
                  availablePercentage,
                ]}
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
      </Flex>
    </>
  )
}
