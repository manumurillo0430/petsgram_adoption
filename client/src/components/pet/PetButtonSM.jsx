import { IconButton, Tooltip } from '@chakra-ui/react'

export default function PetButtonSM({ action, color, icon, label }) {
    return (
        <Tooltip placement="top" label={label}>
            <IconButton
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
