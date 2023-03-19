import React, { useState, useEffect } from 'react'
import FormTextAreaField from '../form/FormTextAreaField'
import { Box, Center, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import FormInputField from '../form/FormInputField'
import FormSubmitButtom from '../form/FormSubmitButtom'
import FormFileField from '../form/FormFileField'
import FormSelectField from '../form/FormSelectField'
import * as yup from 'yup'
import { Formik } from 'formik'
import { Divider } from 'antd'
import { useAuthContext } from '../../context/AuthContext'
import { PostReq } from '../../utils/api'
import { useToast } from '@chakra-ui/react'
import { requiredField } from '../../utils/globals'
import { Spinner } from '@chakra-ui/react'
import { petTypes } from '../../utils/globals'
import { petStatus } from '../../utils/globals'
import FormCheckbox from '../form/FormCheckbox'
import { noProfilePetDark } from '../../utils/globals'
import { noProfilePetLight } from '../../utils/globals'
import FormNumberField from '../form/FormNumberField'
import { GetReq } from '../../utils/api'

export default function PetForm() {
  const location = window.location.pathname.split('/')
  const userLocation = location[location.length - 1]
  console.log(userLocation)
  const [pet, setPet] = useState(false)
  useEffect(() => {
    const getPetById = async () => {
      try {
        if (userLocation !== 'new') {
          const res = await GetReq(`/pet/${userLocation}`)
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
  console.log(pet, 'jhere', pet.type, pet.name)

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
    bio: yup.string(),
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
            console.log(values.hypoallergenic)
            values.hypoallergenic = 1
          }
          const updatedPetData = new FormData()
          for (let key in values) {
            updatedPetData.append(`${key}`, `${values[key]}`)
          }
          updatedPetData.append('picture', picture)
          for (let key in values) {
            console.log(`${key}`, `${values[key]}`)
          }
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
