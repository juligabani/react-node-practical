import React, { Component } from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { API_PATH } from '../const';

export class Signup extends Component {
    submitFormData = (values, setSubmitting) => {
        let data = {
            name:values.name,
            email: values.email,
            password: values.password,
        }
        axios.post(API_PATH.signup, data).then((res) => {
            setSubmitting(false);
            if (res.data.success) {
                console.log('Success: ', res.data.message);
            } else {
                console.log('Error: ', res.data.message);
            }
        }).catch((err) => {
            setSubmitting(false);
            console.log('Something Went wrong!');
        })
    }
    render() {
        return (
            <Formik
                initialValues={{ name:'', email: '', password: '', confirmPassword: '' }}
                validationSchema={
                    Yup.object().shape({
                        name: Yup.string().required('Name is required'),
                        email: Yup.string().email('invalid Email').required('Email required'),
                        password: Yup.string().min(6, 'password must be 6 character long').required('Password required'),
                        confirmPassword: Yup.string().required('Confirm password required').oneOf([Yup.ref('password'), null], 'Passwords must match'),
                    })
                }
                onSubmit={(values, { setSubmitting }) => {
                    this.submitFormData(values, setSubmitting )
                }}
            >
                {(props) => {
                    const {
                        values,
                        touched,
                        errors,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                    } = props

                    return (
                        <main>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="name">Name</label>
                                    <input id="name" name="name"  type="text" className="form-control" placeholder="Enter your name" values={values.name} onChange={handleChange} onBlur={handleBlur}/>
                                    {touched.name && errors.name && (
                                        <div className='error'>{errors.name}</div>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input id="email" name="email"  type="text" className="form-control" placeholder="Enter your email" values={values.email} onChange={handleChange} onBlur={handleBlur}/>
                                    {touched.email && errors.email && (
                                        <div className='error'>{errors.email}</div>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="password">Password</label>
                                    <input id="password" name="password" type="password" className="form-control" placeholder="Enter your password" values={values.password} onChange={handleChange} onBlur={handleBlur}/>
                                    {touched.password && errors.password && (
                                        <div className='error'>{errors.password}</div>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input id="confirmPassword" name="confirmPassword" type="password" className="form-control" placeholder="Enter your confirm password" values={values.confirmPassword} onChange={handleChange} onBlur={handleBlur}/>
                                    {touched.confirmPassword && errors.confirmPassword && (
                                        <div className='error'>{errors.confirmPassword}</div>
                                    )}
                                </div>    
                                <div>
                                    <button type="submit" disabled={isSubmitting}>
                                        Signup
                                    </button>
                                </div>          
                            </form>
                        </main>
                    )
                }}
                
            </Formik>
        )
    }
}
export default Signup;