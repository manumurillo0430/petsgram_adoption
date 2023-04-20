import React from 'react'
import { useState } from 'react'
import {
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  FormErrorMessage,
  useColorModeValue,
} from '@chakra-ui/react'
import { Field, useFormikContext } from 'formik'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

export default function FormPasswordField({ fieldName, fieldLabel, req }) {
  const { values, errors, touched, handleChange } = useFormikContext()
  const [seePassword, setSeePassword] = useState(false)
  const handleClick = () => setSeePassword(!seePassword)
  const theme = useColorModeValue('dark', 'light')

  return (
    <FormControl
      m={0}
      marginLeft="0"
      marginBottom="2"
      justifyContent="center"
      flexFlow="row wrap"
      isRequired={req}
      isInvalid={errors[fieldName] !== undefined && touched[fieldName]}
    >
      <FormLabel>{fieldLabel}</FormLabel>
      <InputGroup>
        <Field
          backgroundColor={theme === 'light' ? '#1c1f2bc7' : '#fefefecc'}
          as={Input}
          type={seePassword ? 'text' : 'password'}
          name={fieldName}
          value={values[fieldName]}
          onChange={handleChange}
        />
        <InputRightElement>
          <Button size="sm" bgColor="transparent" onClick={handleClick}>
            {seePassword ? (
              <VisibilityOffIcon fontSize="small" />
            ) : (
              <RemoveRedEyeIcon fontSize="small" />
            )}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{errors[fieldName]}</FormErrorMessage>
    </FormControl>
  )
}
