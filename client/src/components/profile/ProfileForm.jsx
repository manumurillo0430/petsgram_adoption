import React, { useState } from 'react'
import FormTextAreaField from '../form/FormTextAreaField'
import {
  Box,
  Flex,
  Switch,
  Text,
  useColorModeValue,
  useToast,
  Spinner,
} from '@chakra-ui/react'
import {
  noProfilePictureDark,
  noProfilePictureLight,
  requiredField,
  bioeExcdedText,
  telRegExp,
} from '../../utils/globals'
import * as yup from 'yup'
import { Formik } from 'formik'
import { Divider } from 'antd'
import { useAuthContext } from '../../context/AuthContext'
import FormInputField from '../form/FormInputField'
import FormFileField from '../form/FormFileField'
import FormSubmitButtom from '../form/FormSubmitButtom'
import { PutReq } from '../../utils/api'

export default function ProfileForm() {
  const theme = useColorModeValue('dark', 'light')
  const { currentUser, getCurrentUser } = useAuthContext()
  const [picture, setPicture] = useState(
    currentUser?.picture === '' ? noProfilePictureDark : currentUser?.picture,
  )
  const [serverMessage, setServerMessage] = useState()
  const [updatingUserData, setUpdatingUserData] = useState(false)
  const [publicProfile, setPublicProfile] = useState(currentUser?.is_private)
  const [isChecked, setIsChecked] = useState(0)

  const toggleAccount = (e) => {
    if (e.target.checked === false) {
      setIsChecked(0)
    }
    if (e.target.checked === true) {
      setIsChecked(1)
    }
    setPublicProfile(e.target.checked)
  }

  const toast = useToast({
    title: 'Profile updated.',
    description: "We've updated your profile.",
    status: 'success',
    duration: 6000,
    isClosable: true,
    position: 'top',
  })

  const updateUserSchema = yup.object().shape({
    firstname: yup
      .string()
      .required(requiredField)
      .min(3, 'Name must be at least 3 characters.'),
    lastname: yup.string().min(3, 'Last Name must be at least 3 characters.'),
    email: yup.string().email('Invalid e-mail.'),
    phonenumber: yup.string().matches(telRegExp, 'Invalid phone number.'),
    bio: yup.string().max(250, bioeExcdedText),
    is_private: yup.bool(),
  })

  return (
    <Formik
      key={currentUser.user_id}
      initialValues={{
        firstname: currentUser.firstname,
        lastname: currentUser.lastname,
        email: currentUser.email,
        phonenumber: currentUser.phonenumber,
        bio: currentUser.bio || '',
        is_private: currentUser.is_private,
      }}
      validationSchema={updateUserSchema}
      onSubmit={async (user) => {
        if (typeof picture === 'object') {
          try {
            const updatedUserData = new FormData()
            for (let key in user) {
              updatedUserData.append(`${key}`, `${user[key]}`)
            }
            if (publicProfile !== isChecked) {
              updatedUserData.set('is_private', isChecked)
            }
            updatedUserData.append('picture', picture)

            setUpdatingUserData(true)
            const res = await PutReq(
              `/user/picture/${currentUser.user_id}`,
              updatedUserData,
            )
            if (res) {
              setUpdatingUserData(false)
              toast()
              await getCurrentUser(currentUser.user_id)
            }
          } catch (error) {
            setServerMessage(error.response)
          }
        } else if (typeof picture !== 'object') {
          try {
            const updatedUserData = {
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
              phonenumber: user.phonenumber,
              bio: user.bio,
              picture: picture,
              is_private: isChecked,
            }
            setUpdatingUserData(true)
            const res = await PutReq(
              `/user/${currentUser.user_id}`,
              updatedUserData,
            )
            if (res) {
              setUpdatingUserData(false)
              toast()
              getCurrentUser(currentUser.user_id)
            }
          } catch (error) {
            setServerMessage(error.response.data.error)
          }
        }
      }}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit} flexDirection="row">
          <Flex flexDirection="row" justifyContent="center">
            <Box mr={6}>
              <Divider style={{ border: 'none' }} />
              <Divider style={{ border: 'none' }} />
              <FormFileField
                fieldLabel={
                  picture === ''
                    ? 'Profile Picture'
                    : 'Add Your Profile Picture'
                }
                noPicture={
                  theme === 'dark'
                    ? noProfilePictureDark
                    : noProfilePictureLight
                }
                req={false}
                setPicture={setPicture}
                picture={picture}
              />
            </Box>
            <Box w="50%" ml={6}>
              <Divider style={{ border: 'none' }} />
              <FormInputField
                fieldLabel="First Name"
                fieldName="firstname"
                req={true}
              />
              <FormInputField
                fieldLabel="Last Name"
                fieldName="lastname"
                req={false}
              />
              <FormInputField
                fieldLabel="E-mail"
                fieldName="email"
                req={true}
              />
              <FormInputField
                fieldLabel="Phone"
                fieldName="phonenumber"
                req={false}
              />
              <FormTextAreaField fieldLabel="Bio" fieldName="bio" req={false} />
              <Text mt={4} mb={3} fontWeight="500">
                Public Account &nbsp;&nbsp;
                <Switch
                  size="md"
                  color="blue"
                  isChecked={publicProfile}
                  onChange={(e) => toggleAccount(e)}
                />
                &nbsp;&nbsp;Private Account
              </Text>
              {publicProfile ? (
                <Text fontSize="0.72rem">
                  We would like to inform you that your account is currently set
                  to private, which means that your information remains
                  confidential and other users cannot see your full profile.
                  However, your avatar and first name will still be visible to
                  them. While this setting provides added privacy and security,
                  it may limit your ability to interact with certain users on
                  the platform.
                  <br />
                  As a private user, you'll still have access to many valuable
                  features. However, making your profile public will enable you
                  to fully engage with the Petsgram community.
                </Text>
              ) : (
                <Text fontSize="0.72rem">
                  We would like to inform you that your account is public, which
                  means that your avatar, email, and name will be visible to
                  other users, that helps us to interact with other users as
                  well. This is to ensure transparency and promote a safe and
                  welcoming community. If you have any concerns or questions,
                  please don't hesitate to contact us.
                </Text>
              )}
              <Divider style={{ border: 'none' }} />
              <FormSubmitButtom
                buttonLabel={!updatingUserData ? 'Update' : <Spinner />}
              />
            </Box>
          </Flex>
          <Text>{serverMessage}</Text>
        </form>
      )}
    </Formik>
  )
}
