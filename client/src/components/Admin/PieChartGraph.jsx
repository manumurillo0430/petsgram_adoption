import { useEffect, useState } from 'react'
import { Flex, useColorModeValue, Box, Tag, TagLabel } from '@chakra-ui/react'
import { VictoryPie } from 'victory'
import './Graphs.css'

export default function PieChart({ data, colorScale, labels }) {
  const theme = useColorModeValue('dark', 'light')
  const [endAngle, setEndAngle] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setEndAngle((prevAngle) => prevAngle + 10)
    }, 30)
    return () => clearInterval(interval)
  }, [])
  return (
    <>
      <Box
        w="100%"
        mr={2}
        border={theme === 'light' ? 'solid 1px #474a54' : 'solid 1px #e2e8f0'}
        borderRadius="6px"
      >
        <Flex>
          <Box mr={0}>
            <VictoryPie
              data={data}
              colorScale={colorScale}
              innerRadius={125}
              endAngle={endAngle}
              labels={() => null}
            />
          </Box>
          <Flex
            mr={3}
            p={4}
            ml={0}
            w="70%"
            alignSelf="center"
            flexDirection="column"
          >
            {data?.map((dataToAdd, i) => (
              <Tag
                key={i}
                flexDirection="row"
                mb={2}
                wrap="row nowrap"
                size="md"
                variant="ghost"
              >
                <TagLabel color={colorScale[i]}>
                  &nbsp;{labels[i]}: {dataToAdd}%
                </TagLabel>
              </Tag>
            ))}
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
