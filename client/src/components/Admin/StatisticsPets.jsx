import { Flex, Center } from '@chakra-ui/react'
import {
  petStatus,
  petTypes,
  colorScaleChart,
  bgColorChart,
  borderColorChart,
} from '../../utils/globals'
import PieChart from './PieChart'
import BarChart from './BarChart'
import './Graphs.css'

export default function StatisticsPets({ pets }) {
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

  const petTypesWithoutAny = petTypes.slice(1)
  const petTypesLength = petTypesWithoutAny?.map(
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
                colorScale={colorScaleChart}
                labels={petStatus}
                endAngle={360}
              />
              <BarChart
                axeX={petTypesWithoutAny}
                axeY={petTypesLength}
                nameChart="Types Of Pets"
                backgroundColor={bgColorChart}
                borderColor={borderColorChart}
              />
            </Flex>
          </Center>
        </Flex>
      </Flex>
    </>
  )
}
