import React, { useState, useRef } from 'react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Flex,
  Box,
  useColorModeValue,
  Text,
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
  noImageAttached,
}) {
  const { errors, setFieldValue } = useFormikContext()
  const [pictureView, setPictureView] = useState(
    picture === '' ? noPicture : picture,
  )
  const theme = useColorModeValue('dark', 'light')
  const fileInputRef = useRef()

  const handlePicture = (e) => {
    setPictureView(URL.createObjectURL(e.target.files[0]))
    setPicture(e.target.files[0])
  }

  const handleDeletePicture = () => {
    setPicture('')
    setPictureView(noPicture)
    setFieldValue(fieldName, null)
    if (fileInputRef.current) {
      fileInputRef.current.value = null
    }
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
      <div
        className={theme === 'light' ? 'picturePreview' : 'picturePreview dark'}
      >
        {theme === 'dark' ? (
          <img src={picture === '' ? noPicture : pictureView} alt="Preview" />
        ) : (
          <img src={picture === '' ? noPicture : pictureView} alt="Preview" />
        )}
      </div>
      <Flex justifyContent="space-between">
        {picture !== '' && (
          <Box marginRight="1">
            <Button colorScheme="blue" onClick={handleDeletePicture}>
              Delete
            </Button>
          </Box>
        )}
        {typeof picture !== 'string' ? (
          <Flex justifyContent="space-between">
            <Box marginRight="1">
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
            </Box>
            <input
              type="file"
              id="file-input"
              onChange={handlePicture}
              ref={fileInputRef}
            />
          </Flex>
        ) : (
          <>
            <Box>
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
            </Box>
            <input
              type="file"
              id="file-input"
              onChange={handlePicture}
              ref={fileInputRef}
            />
          </>
        )}
      </Flex>
      <Divider style={{ border: 'none', margin: '0.5rem' }} />
      <Text fontWeight="500" textAlign="center" color="#f76f6f">
        {noImageAttached}
      </Text>
      <Divider style={{ border: 'none' }} />
      <FormErrorMessage>{errors[fieldName]}</FormErrorMessage>
    </FormControl>
  )
}
