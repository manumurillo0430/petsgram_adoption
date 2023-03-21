import { Button, Tooltip } from '@chakra-ui/react'

export default function PetButtonStatus({
  onClick,
  label,
  labelTooltip,
  mr,
  ml,
  isDisabled,
}) {
  return (
    <Tooltip placement="bottom" label={labelTooltip}>
      <Button
        flex="1"
        mt="0.5rem"
        mr={mr}
        ml={ml}
        variant="outline"
        colorScheme="blue"
        alignItems="center"
        onClick={onClick}
        isDisabled={isDisabled}
      >
        {label}
      </Button>
    </Tooltip>
  )
}
