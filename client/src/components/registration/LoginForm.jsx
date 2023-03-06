import React from 'react'
import * as yup from 'yup'
import FormSubmitButtom from '../form/FormSubmitButtom'
import FormInputField from '../form/FormInputField'
import FormPasswordField from '../form/FormPasswordField'
import { requiredField, userNameTooShort, passwordTooShort } from '../../utils/globals'
import { Formik } from 'formik'
import { PostReq } from '../../utils/api'
import { useState } from 'react'
import { useAuthContext } from '../../context/AuthContext'
import { Text } from '@chakra-ui/react'
import { useSearchContext } from '../../context/SearchContext'

export default function LoginForm({ toggleModal }) {
    console.log(toggleModal)
    const { getCurrentUser } = useAuthContext()
    const { getUserLikes } = useSearchContext
    const [serverError, setServerError] = useState(false)
    const loginSchema = yup.object().shape({
        email: yup.string().required(requiredField).min(6, userNameTooShort),
        password: yup.string().required(requiredField).min(6, passwordTooShort),
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
                    setServerError('')
                    const res = await PostReq('/user/login/', user)
                    console.log(res.token, 'userid:', res.user_id, res.user_likes)
                    if (res) {
                        toggleModal()
                        await getCurrentUser(res.user_id)
                        await getUserLikes(res.user_likes)
                    }
                } catch (error) {
                    if (error.response && error.response.data && error.response.data.error) {
                        setServerError(error.response.data.error)
                    } else {
                        setServerError('An error occurred. Please try again later.')
                    }
                }
            }}
        >
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <FormInputField req={true} fieldName="email" fieldLabel="Email" />
                    <FormPasswordField req={true} fieldName="password" fieldLabel="Password" />
                    <FormSubmitButtom buttonLabel="Log In" />
                    {serverError ? <Text>{serverError}</Text> : ''}
                </form>
            )}
        </Formik>
    )
}
