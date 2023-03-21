import React from 'react'
import { Box, Button } from '@chakra-ui/react'

export default function FormSubmitButtom({
  buttonLabel,
  mt,
  borderLeftRadius,
}) {
  return (
    <Box p={0} m={0} w="30%" placeSelf="end" textAlign="right">
      <Button
        mt={mt}
        w="100%"
        ml={0}
        borderLeftRadius={borderLeftRadius}
        colorScheme="blue"
        type="submit"
      >
        {buttonLabel}
      </Button>
    </Box>
  )
}
