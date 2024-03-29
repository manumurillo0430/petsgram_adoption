import React, { useState } from 'react'
import {
  petTypes,
  petStatus,
  bioeExcdedText,
  requiredField,
  noProfilePetDark,
  noProfilePetLight,
} from '../../utils/globals'
import {
  Box,
  Center,
  useToast,
  Text,
  useColorModeValue,
  Spinner,
} from '@chakra-ui/react'

import FormTextAreaField from '../form/FormTextAreaField'
import FormInputField from '../form/FormInputField'
import FormSubmitButtom from '../form/FormSubmitButtom'
import FormFileField from '../form/FormFileField'
import FormSelectField from '../form/FormSelectField'
import FormCheckbox from '../form/FormCheckbox'
import FormNumberField from '../form/FormNumberField'
import * as yup from 'yup'
import { Formik } from 'formik'
import { Divider } from 'antd'
import { PostReq } from '../../utils/api'
import { useAuthContext } from '../../context/AuthContext'

export default function PetForm({ pet, location }) {
  const { currentUser, petsRequested, setPetsRequested } = useAuthContext()
  const theme = useColorModeValue('dark', 'light')
  const [picture, setPicture] = useState('')
  const [serverMessage, setServerMessage] = useState('')
  const [updatingPetData, setUpdatingPetData] = useState(false)

  const toast = useToast({
    title: 'Pet saved.',
    description: "We've saved a pet",
    status: 'success',
    duration: 6000,
    isClosable: true,
    position: 'top',
  })

  const petSchema = yup.object().shape({
    type: yup.string(),
    name: yup.string().required(requiredField),
    adoptionStatus: yup.string(),
    height: yup.number().required(requiredField),
    weight: yup.number().required(requiredField),
    color: yup.string().required(requiredField),
    hypoallergenic: yup.bool(),
    dietary: yup.string(),
    breed: yup.string().required(requiredField),
    bio: yup.string().max(250, bioeExcdedText),
  })
  return (
    <Formik
      initialValues={{
        name: pet?.name,
        type: pet?.type,
        adoptionStatus: pet?.adoptionStatus,
        height: pet?.height,
        weight: pet?.weight,
        color: pet?.color,
        hypoallergenic:
          pet?.hypoallergenic === 1 || pet?.hypoallergenic === true,
        dietary: pet?.dietary,
        breed: pet?.breed,
        bio: pet?.bio,
      }}
      validationSchema={petSchema}
      onSubmit={async (values, { resetForm }) => {
        if (location === 'new' || location === 'savealife') {
          try {
            console.log(values, picture)
            console.log('Picture:', picture)
            if (values.hypoallergenic === false) {
              values.hypoallergenic = 0
            }
            if (values.hypoallergenic === true) {
              values.hypoallergenic = 1
            }
            const updatedPetData = new FormData()
            for (let key in values) {
              updatedPetData.append(`${key}`, `${values[key]}`)
            }
            console.log(updatedPetData, "here")
            updatedPetData.append('picture', picture)

            setUpdatingPetData(true)

            let res = false
            
            if (location === 'new') {
              res = await PostReq('/pet', updatedPetData)
            } else if (location === 'savealife') {
              updatedPetData.append('user_id', currentUser.user_id)
              res = await PostReq('/pet/save_a_life', updatedPetData)
              resetForm()
              setPetsRequested({ ...petsRequested, res })
            }
            if (res !== undefined) {
              setPicture('')
              setServerMessage('')
              setUpdatingPetData(false)
              toast()
            }
          } catch (error) {
            setUpdatingPetData(false)
            setServerMessage(error.response.data.error)
          }
        }
      }}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit} flexDirection="row">
          <Center w="100%" flexDirection="row" justifyContent="center">
            <Box mr={6}>
              <FormFileField
                noPicture={
                  theme === 'dark' ? noProfilePetDark : noProfilePetLight
                }
                fieldLabel={!picture === '' ? 'Pet Picture' : 'Add Pet Picture'}
                req={true}
                setPicture={setPicture}
                picture={picture}
                noImageAttached={serverMessage !== '' ? 'Image require' : ''}
              />
            </Box>
            <Center ml={6} w="50%" flexDirection="column">
              <Divider style={{ border: 'none' }} />
              <FormInputField fieldName="name" fieldLabel="Name" req={true} />
              <FormSelectField
                fieldName="adoptionStatus"
                fieldLabel="Adoption Status"
                fieldArray={petStatus}
              />
              <FormInputField fieldName="color" fieldLabel="Color" req={true} />
              <FormSelectField
                fieldName="type"
                fieldLabel="Pet Type"
                fieldArray={petTypes}
              />
              <FormInputField
                fieldName="dietary"
                fieldLabel="Dietary Restrictions (separated by comma)"
                req={false}
              />
              <FormInputField fieldName="breed" fieldLabel="Breed" req={true} />
              <FormNumberField
                fieldName="height"
                fieldLabel="Height"
                value="height"
                fieldUnit="cm"
                fieldSize="95%"
                req={true}
              />
              <FormNumberField
                fieldName="weight"
                fieldLabel="Weight"
                value="weight"
                fieldUnit="kg"
                fieldSize="95%"
                req={true}
              />
              <FormCheckbox
                fieldLabel="Hypoallergenic"
                fieldName="hypoallergenic"
                isChecked={false}
              />
              <FormTextAreaField fieldName="bio" fieldLabel="Bio" req={false} />
              {serverMessage ? (
                <Text color="red" mt={4} textAlign="center">
                  Server Error:
                </Text>
              ) : null}
              <Divider style={{ border: 'none', margin: '0.5rem' }} />

              <FormSubmitButtom
                mt={2}
                buttonLabel={!updatingPetData ? 'Upload' : <Spinner />}
              />
            </Center>
          </Center>
          <Divider style={{ border: 'none', margin: '0.5rem' }} />
          <Text>{serverMessage}</Text>
        </form>
      )}
    </Formik>
  )
}
