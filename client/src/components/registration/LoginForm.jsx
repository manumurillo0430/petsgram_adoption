import React from 'react'
import * as yup from 'yup'
import FormSubmitButtom from '../form/FormSubmitButtom'
import FormInputField from '../form/FormInputField'
import FormPasswordField from '../form/FormPasswordField'
import {
  requiredField,
  userNameTooShort,
  passwordTooShort,
} from '../../utils/globals'
import { Formik } from 'formik'
import { PostReq } from '../../utils/api'
import { useState } from 'react'
import { useAuthContext } from '../../context/AuthContext'
import { Text, Spinner, useToast } from '@chakra-ui/react'
import { useSearchContext } from '../../context/SearchContext'

export default function LoginForm({ toggleModal }) {
  const {
    getCurrentUser,
    setIsActiveSession,
    setIsLoading,
    isLoading,
  } = useAuthContext()
  const { getUserLikes } = useSearchContext()
  const [serverError, setServerError] = useState(false)
  const loginSchema = yup.object().shape({
    email: yup.string().required(requiredField).min(6, userNameTooShort),
    password: yup.string().required(requiredField).min(6, passwordTooShort),
  })

  const toast = useToast({
    title: 'Welcome back!',
    description: 'Enjoy our furry friends.',
    status: 'success',
    duration: 5000,
    isClosable: true,
    position: 'top',
  })

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={loginSchema}
      validateOnChange={false}
      onSubmit={async (user) => {
        try {
          setIsLoading(true)
          const res = await PostReq('/user/login/', user)
          console.log(res)
          if (res) {
            setIsActiveSession(true)
            setIsLoading(false)
            toggleModal()
            toast()
            localStorage.setItem(
              'userAuth',
              JSON.stringify({ user_id: res.user_id }),
            )
            await getCurrentUser(res.user_id)
            await getUserLikes(res.user_likes)
          }
        } catch (error) {
          setIsLoading(false)
          setIsActiveSession(false)
          if (error.response) {
            setServerError(error.response.data)
          } else {
            setServerError('An error occurred. Please try again later.')
          }
        }
      }}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <FormInputField req={true} fieldName="email" fieldLabel="Email" />
          <FormPasswordField
            req={true}
            fieldName="password"
            fieldLabel="Password"
          />
          <FormSubmitButtom
            mt={3}
            buttonLabel={isLoading ? <Spinner /> : 'Log In'}
          />

          {serverError ? (
            <Text fontWeight="500" color="#ef6e6e" mt={4} textAlign="center">
              {serverError}
            </Text>
          ) : (
            ''
          )}
        </form>
      )}
    </Formik>
  )
}
