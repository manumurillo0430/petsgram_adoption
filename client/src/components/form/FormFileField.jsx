import React, { useState } from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react'
import { useFormikContext } from 'formik'
import { Divider } from 'antd'
import './FormFileField.css'

export default function FormFileField({
  fieldName,
  fieldLabel,
  req,
  setPicture,
  picture,
  noPicture,
}) {
  const { errors, setFieldValue } = useFormikContext()
  const [pictureView, setPictureView] = useState(
    picture === '' ? noPicture : picture,
  )
  const theme = useColorModeValue('dark', 'light')

  const handlePicture = (e) => {
    setPictureView(URL.createObjectURL(e.target.files[0]))
    setPicture(e.target.files[0])
  }

  const handleDeletePicture = () => {
    setPicture('')
    setPictureView(noPicture)
    setFieldValue(fieldName, null)
  }

  return (
    <FormControl
      p={0}
      marginLeft="0"
      marginBottom="2"
      justifyContent="center"
      flexFlow="row wrap"
      isRequired={req}
    >
      <FormLabel fontWeight="bold">{fieldLabel}</FormLabel>
      <Divider style={{ border: 'none' }} />
      <div className="picturePreview">
        {theme === 'dark' ? (
          <img src={picture === '' ? noPicture : pictureView} alt="Preview" />
        ) : (
          <img src={picture === '' ? noPicture : pictureView} alt="Preview" />
        )}
      </div>

      <Divider style={{ border: 'none' }} />
      {typeof picture !== 'string' ? (
        <Flex justifyContent="space-between">
          <Button colorScheme="blue" onClick={handleDeletePicture}>
            Delete
          </Button>

          <label
            class={
              theme === 'light'
                ? 'chakra-button css-r7xd4a'
                : 'chakra-button css-jut409'
            }
            for="file-input"
            style={{ cursor: 'pointer' }}
          >
            Change
          </label>
          <input type="file" id="file-input" onChange={handlePicture} />
        </Flex>
      ) : (
        <>
          <label
            class={
              theme === 'light'
                ? 'chakra-button css-r7xd4a'
                : 'chakra-button css-jut409'
            }
            for="file-input"
            style={{ cursor: 'pointer' }}
          >
            {picture !== '' ? 'Change Picture' : 'Add Picture'}
          </label>
          <input type="file" id="file-input" onChange={handlePicture} />
        </>
      )}
      <FormErrorMessage>{errors[fieldName]}</FormErrorMessage>
    </FormControl>
  )
}
