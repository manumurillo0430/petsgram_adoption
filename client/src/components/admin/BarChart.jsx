import { useColorModeValue, Box } from '@chakra-ui/react'
import { Bar } from 'react-chartjs-2'
import Chart, { RadialLinearScale } from 'chart.js/auto'
import './Graphs.css'

Chart.register(RadialLinearScale)

export default function BarChart({
  axeX,
  axeY,
  nameChart,
  backgroundColor,
  borderColor,
}) {
  const labels = axeX
  const data = {
    labels: labels,
    datasets: [
      {
        label: nameChart,
        data: axeY,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 2,
      },
    ],
  }
  const options = {
    legend: {
      display: false,
    },
    plugins: {
      tooltip: {
        display: false,
        events: ['click'],
      },
    },
  }

  const theme = useColorModeValue('dark', 'light')

  return (
    <>
      <Box
        w="100%"
        mr={2}
        p={5}
        border={theme === 'light' ? 'solid 1px #474a54' : 'solid 1px #e2e8f0'}
        borderRadius="6px"
      >
        <Bar data={data} options={options} />
      </Box>
    </>
  )
}
