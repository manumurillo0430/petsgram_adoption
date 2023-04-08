import React, { useState, useEffect } from 'react'
import {
  petTypes,
  petStatus,
  bioeExcdedText,
  requiredField,
  noProfilePetDark,
  noProfilePetLight,
  userLocation,
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
import { GetReq } from '../../utils/api'

export default function PetForm() {
  const [pet, setPet] = useState(false)
  useEffect(() => {
    const getPetById = async () => {
      try {
        if (userLocation(window.location.pathname) !== 'new') {
          const res = await GetReq(
            `/pet/${userLocation(window.location.pathname)}`,
          )
          if (res) {
            setPet(res)
          }
        } else return
      } catch (error) {
        console.log(error)
      }
    }
    getPetById()
  }, [])

  const theme = useColorModeValue('dark', 'light')
  const [serverError, setServerError] = useState('')
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
        name: pet.name || '',
        type: pet.type || '',
        adoptionStatus: pet.adoptionStatus || '',
        height: '',
        weight: '',
        color: '',
        hypoallergenic: '',
        dietary: '',
        breed: '',
        bio: '',
      }}
      validationSchema={petSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
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
          updatedPetData.append('picture', picture)

          setUpdatingPetData(true)
          const res = await PostReq('/pet', updatedPetData)
          if (res) {
            setPicture('')
            setUpdatingPetData(false)
            toast()
            resetForm()
          }
        } catch (error) {
          console.log(error.response.data)
          setServerMessage(error.response.data.error)
        }
        //   if(typeof picture === 'string'){
        //     try {
        //       const updatedUserData = {
        //         firstname: user.firstname,
        //         lastname: user.lastname,
        //         email: user.email,
        //         phonenumber: user.phonenumber,
        //         bio: user.bio,
        //         profilepicture: picture
        //       }
        //       console.log(updatedUserData)
        //       setUpdatingUserData(true)
        //       const res = await PutReq(`/user/${userId}`, updatedUserData)
        //       if(res){
        //         setUpdatingUserData(false)
        //         toast()
        //         await getCurrentUser(userId)
        //       }
        //   } catch (error) {
        //     console.log(error.response.data.error)
        //     setServerMessage(error.response.data.error)
        //   }
        // }
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
                req={false}
                setPicture={setPicture}
                picture={picture}
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
              {serverError ? (
                <Text color="red" mt={4} textAlign="center">
                  Server Error:
                </Text>
              ) : null}
              <FormSubmitButtom
                mt={2}
                buttonLabel={!updatingPetData ? 'Update' : <Spinner />}
              />
            </Center>
          </Center>
          <Text>{serverMessage}</Text>
        </form>
      )}
    </Formik>
  )
}