import { React, useState } from 'react'
import * as yup from 'yup'
import { requiredField, telRegExp } from '../../utils/globals'
import FormInputField from '../form/FormInputField'
import FormSubmitButtom from '../form/FormSubmitButtom'
import FormPasswordField from '../form/FormPasswordField'
import { Formik } from 'formik'
import { PostReq } from '../../utils/api'
import { useToast } from '@chakra-ui/react'
import { useAuthContext } from '../../context/AuthContext'

export default function Singup({ toggleModal }) {
    const [serverError, setServerError] = useState('')

    const toast = useToast({
        title: 'Profile created!',
        description: 'You can already log in.',
        status: 'success',
        duration: 6000,
        isClosable: true,
        position: 'top',
    })

    const singupSchema = yup.object().shape({
        firstname: yup.string().required(requiredField).min(3, 'Name must be at least 3 characters.'),
        lastname: yup.string().min(3, 'Name must be at least 3 characters.'),
        email: yup.string().required(requiredField),
        password: yup.string().required(requiredField).min(8, 'Password must be at least 8 characters.'),
        repeatpassword: yup
            .string()
            .required(requiredField)
            .oneOf([yup.ref('password')], 'Passwords must match.'),
        phonenumber: yup.string().matches(telRegExp, 'Invalid phone number.'),
    })

    return (
        <Formik
            initialValues={{
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                repeatpassword: '',
                phonenumber: '',
            }}
            validationSchema={singupSchema}
            validateOnChange={false}
            onSubmit={async (newUser, { resetForm }) => {
                try {
                    setServerError('')
                    const res = await PostReq('/user/signup/', newUser)
                    if (res) {
                        toast()
                        resetForm()
                        toggleModal()
                    }

                    console.log(newUser)
                } catch (error) {}
            }}
        >
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <FormInputField req={true} fieldName="firstname" fieldLabel="First Name" />
                    <FormInputField req={false} fieldName="lastname" fieldLabel="Last Name" />
                    <FormInputField req={true} fieldName="email" fieldLabel="Email" />
                    <FormPasswordField req={true} fieldName="password" fieldLabel="Password" />
                    <FormPasswordField req={true} fieldName="repeatpassword" fieldLabel="Confirm Password" />
                    <FormInputField req={false} fieldName="phonenumber" fieldLabel="Phone Number" />
                    <FormSubmitButtom buttonLabel="Sing Up" />
                </form>
            )}
        </Formik>
    )
}
