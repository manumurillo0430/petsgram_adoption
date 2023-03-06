import React from 'react'
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import {
    Text,
    NumberInput,
    NumberInputField,
  } from '@chakra-ui/react';
import { useFormikContext } from 'formik';

export default function FormNumberField({ fieldName, fieldLabel, fieldUnit, fieldSize, req, mrfl, mlfu, mrfu, mr}) {
  const { values, errors, touched, setFieldTouched, handleChange } = useFormikContext();
  const handleBlur = () => {
    setFieldTouched(fieldName, true);
  };
  return (
    <FormControl
    display="flex"
    flexFlow="row nowrap"
    paddingLeft="0" 
    alignItems="center"
    marginBottom="3"
    isRequired={req}
    isInvalid={errors[fieldName] !== undefined && touched[fieldName]}

  >
    <FormLabel mr={mrfl}  w={fieldSize ? "8rem" : "100%"}>{fieldLabel}</FormLabel>
    <NumberInput
    
    >
      <NumberInputField  w={fieldSize ? fieldSize : "100%"}
        value={values[fieldName]}
        onChange={handleChange}
        onBlur={handleBlur}
        name={fieldName}
        mr={mr}
        
      />
    </NumberInput>
    <Text fontSize="md" mr={mrfu} ml={mlfu}>{fieldUnit}</Text>
    <FormErrorMessage marginLeft="0" padding="0">{errors[fieldName]}</FormErrorMessage>
  </FormControl>
  )
}
