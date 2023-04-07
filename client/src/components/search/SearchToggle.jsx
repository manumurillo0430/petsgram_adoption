import { Center, FormControl, FormLabel, Switch } from '@chakra-ui/react'

export default function SearchToggle({ advancedSearch, toggleAdvancedSearch }) {
  return (
    <Center p={0} placeContent="end" mr={0}>
      <FormControl
        display="flex"
        justifyContent="end"
        alignItems="center"
        mt={3}
        w="60%"
      >
        <Switch
          id="advanced-search"
          colorScheme="blue"
          isChecked={advancedSearch}
          onChange={() => toggleAdvancedSearch()}
        />
        <FormLabel htmlFor="advanced-search" mb={0} mr={0} ml={2}>
          Advanced&nbsp;Search
        </FormLabel>
      </FormControl>
    </Center>
  )
}
