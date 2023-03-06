import React from 'react'
import { FormControl,FormLabel, FormErrorMessage, Textarea } from "@chakra-ui/react";
import { Field, useFormikContext }  from "formik"

export default function FormTextAreaField({fieldLabel, fieldName, req}) {

  const { values, errors, touched, handleChange } = useFormikContext();

  return (
    <FormControl
    display="flex"
    flexFlow="row wrap"
    alignItems="center"
    isRequired={req}
    isInvalid={errors[fieldName] !== undefined && touched[fieldName]}
    
  >
    <FormLabel marginLeft="0">{fieldLabel}</FormLabel>
    <Field
      as={Textarea}
      name={fieldName}
      resize="vertical"
      value={values[fieldName]}
      onChange={handleChange}
    />
    <FormErrorMessage marginLeft="-4" padding="0">{errors[fieldName]}</FormErrorMessage>
  </FormControl>
  )
}
