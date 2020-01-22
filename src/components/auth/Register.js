import React from 'react'
import { connect } from 'react-redux'
import { withFormik, Form, Field } from 'formik'
import { useMutation } from '@apollo/react-hooks'
import * as Yup from 'yup'

import { CREATE_USER } from '../../graphql/tags/user'

import { createUserAction } from '../../redux/actions'

const Register = ({ values, errors, touched, isSubmitting, createUserAction }) => {
    
    const [ createUser, { data, loading, error }] = useMutation(CREATE_USER)

    return (
        <Form
            onSubmit={ async e => {
                e.preventDefault()

                const { name, email, password, password2 } = values
                const createdUserData = await createUser({ variables: { newUserData: { name, email, password, password2 } } })

                // change to redux action to save user
                if(!loading) {
                    createUserAction(createdUserData.data.createUser)
                }
            }}
        >
            <div>
                { touched.name && errors.name && <p>{ errors.name }</p> }
                <Field email="name" name="name" placeholder="Name" />
            </div>
            <div>
                { touched.email && errors.email && <p>{ errors.email }</p> }
                <Field email="email" name="email" placeholder="Email" />
            </div>
            <div>
                { touched.password && errors.password && <p>{ errors.password }</p> }
                <Field email="password" name="password" placeholder="Password" />
            </div>
            <div>
                { touched.password2 && errors.password2 && <p>{ errors.password2 }</p> }
                <Field email="password2" name="password2" placeholder="Confirm Password" />
            </div>
            <button disabled={ isSubmitting } type="submit" >Submit</button>
        </Form>
    )
}

const FormkEnhancer = withFormik({
    mapPropsToValues: (props) => {
        return {
            name: '',
            email: '',
            password: '',
            password2: ''
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name is Required'),
        email: Yup.string().email('Email is not valid').required('Email is required'),
        password: Yup.string().min(6, 'Password must be 6 characters or longer').required('Password is required')
    })
})(Register)

export default connect(null, { createUserAction })(FormkEnhancer)