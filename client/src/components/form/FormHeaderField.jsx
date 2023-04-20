import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Heading,
} from '@chakra-ui/react'
import { useFormikContext, Field } from 'formik'

export default function FormHeaderField({ fieldName, fieldLabel, req }) {
  const { values, errors, touched, handleChange } = useFormikContext()

  return (
    <FormControl
      display="flex"
      alignItems="center"
      mb={12}
      isRequired={req}
      isInvalid={errors[fieldName] !== undefined && touched[fieldName]}
    >
      <FormLabel display="flex">
        <Heading size="lg">{fieldLabel}</Heading>
      </FormLabel>
      <Field
        as={Input}
        name={fieldName}
        px={2}
        mr={2}
        variant="flushed"
        fontWeight="bold"
        fontSize="2xl"
        value={values[fieldName]}
        onChange={handleChange}
      />
      <FormErrorMessage>{errors[fieldName]}</FormErrorMessage>
    </FormControl>
  )
}
