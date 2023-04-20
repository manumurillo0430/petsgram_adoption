import React from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { Field, useFormikContext } from 'formik'

export default function FormInputField({
  br,
  fieldName,
  fieldLabel,
  fieldUnit,
  fieldSize,
  req,
  placeholder,
  mt,
}) {
  const {
    values,
    errors,
    touched,
    setFieldTouched,
    handleChange,
  } = useFormikContext()
  const handleBlur = () => {
    setFieldTouched(fieldName, true)
  }
  const theme = useColorModeValue('dark', 'light')
  return (
    <FormControl
      display="flex"
      flexFlow="row  wrap"
      paddingLeft="0"
      alignItems="center"
      marginBottom="3"
      isRequired={req}
      isInvalid={errors[fieldName] !== undefined && touched[fieldName]}
    >
      <FormLabel marginLeft="0" w={fieldSize ? '8rem' : '100%'}>
        {fieldLabel}
      </FormLabel>
      <Field
        backgroundColor={theme === 'light' ? '#1c1f2bc7' : '#fefefecc'}
        as={Input}
        name={fieldName}
        w={fieldSize ? fieldSize : '100%'}
        value={values[fieldName]}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder={placeholder}
        borderRadius={br}
        mt={mt}
      />
      <Text fontSize="md" mx={0}>
        {fieldUnit}
      </Text>
      <FormErrorMessage marginLeft="0" padding="0">
        {errors[fieldName]}
      </FormErrorMessage>
    </FormControl>
  )
}
