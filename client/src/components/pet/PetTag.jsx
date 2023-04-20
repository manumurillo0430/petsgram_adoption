import { Tag, TagLabel } from '@chakra-ui/react'

export default function PetTag({ label }) {
  return (
    <Tag mb={3} mr={2} size="md" colorScheme="blue">
      <TagLabel>{label}</TagLabel>
    </Tag>
  )
}
