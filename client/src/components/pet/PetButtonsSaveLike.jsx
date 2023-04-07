import { IconButton, Tooltip } from '@chakra-ui/react'

export default function PetButtonsSaveLike({
  action,
  color,
  icon,
  label,
  display,
}) {
  return (
    <Tooltip placement="top" label={label}>
      <IconButton
        display={display}
        placeContent="start"
        icon={icon}
        variant="ghost"
        alignItems="center"
        color={color}
        onClick={() => action()}
        _hover={{}}
        minWidth={0}
      />
    </Tooltip>
  )
}
