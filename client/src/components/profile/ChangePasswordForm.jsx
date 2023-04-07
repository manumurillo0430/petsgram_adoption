import { React, useState } from 'react'
import { useAuthContext } from '../../context/AuthContext'
import FormPasswordField from '../form/FormPasswordField'
import { requiredField } from '../../utils/globals'
import * as yup from 'yup'
import { Formik } from 'formik'
import { Avatar, Divider } from 'antd'
import { Text, Box, Center, Spinner, useToast } from '@chakra-ui/react'
import FormSubmitButtom from '../form/FormSubmitButtom'
import { PutReq } from '../../utils/api'

export default function ChangePasswordForm() {
  const [changingUserPassword, setCangingUserPassword] = useState(false)
  const [serverError, setServerError] = useState(false)
  const { currentUser } = useAuthContext()

  const toast = useToast({
    title: 'Password updated.',
    description: "We've updated your password.",
    status: 'success',
    duration: 6000,
    isClosable: true,
    position: 'top',
  })

  const updatePasswordSchema = yup.object().shape({
    currentpassword: yup.string().required(requiredField),
    password: yup
      .string()
      .required(requiredField)
      .min(8, 'Password must be at least 8 characters.'),
    repeatpassword: yup
      .string()
      .required(requiredField)
      .oneOf([yup.ref('password')], 'Passwords must match.'),
  })

  return (
    <Formik
      initialValues={{
        currentpassword: '',
        password: '',
        repeatpassword: '',
      }}
      validationSchema={updatePasswordSchema}
      validateOnChange={false}
      onSubmit={async (values, { resetForm }) => {
        setCangingUserPassword(true)
        try {
          const res = await PutReq(
            `/user/password/${currentUser.user_id}`,
            values,
          )
          if (res) {
            setServerError(false)
            setCangingUserPassword(false)
            toast()
            resetForm()
          }
        } catch (error) {
          setServerError(error.response.data)
          setCangingUserPassword(false)
        }
      }}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Divider style={{ border: 'none' }} />
          <Center
            alignContent="end"
            flexDirection="column"
            justifyContent="center"
          >
            <Avatar
              size={80}
              src={currentUser.picture}
              name={`${currentUser.firstname} ${currentUser.lastname}`}
            />
            <Text mt={3} fontWeight="bold">
              {currentUser.firstname} {currentUser.lastname}
            </Text>
          </Center>
          <Divider />
          <Center>
            <Box
              w="50%"
              display="flex"
              justifyContent="center"
              flexDirection="column"
            >
              <FormPasswordField
                fieldLabel="Current Password"
                fieldName="currentpassword"
                req={true}
              />
              <FormPasswordField
                fieldLabel="New Password"
                fieldName="password"
                req={true}
              />
              <FormPasswordField
                fieldLabel="Confirm New Password"
                fieldName="repeatpassword"
                req={true}
              />
              {serverError ? (
                <Text color="red" fontWeight="500" mt={4} textAlign="center">
                  {serverError}
                </Text>
              ) : null}
              <FormSubmitButtom
                buttonLabel={
                  !changingUserPassword ? 'Save Changes' : <Spinner />
                }
              />
            </Box>
          </Center>
        </form>
      )}
    </Formik>
  )
}
