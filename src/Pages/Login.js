import React from "react";
import Header from "../Components/Header"
import { Form, Field, useFormik } from 'formik'
import {Navigate, useNavigate} from 'react-router-dom'

function Login() {
  const url = "https://notthisweek.herokuapp.com/login"
  
  //Formik items
  const formik = useFormik({
    initialValues: {
      email: "", 
      password: "", 
    }, 
    onSubmit: async values => {
      await fetch(url, {
        withCredentials: true,
        body: JSON.stringify(values),
        method: 'post',
        // headers: {
        //   'Content-Type': 'application/json'
        // }
      })
      .catch((err) => {
        console.log(err)
      })
    }
  })
  
  //need to send with credentials
  return (
  <>
    <Header page="login"/>
    <main className="vh-100 container d-flex align-items-center justify-content-center">
      <section className="">
        <h1>Sign in</h1>
          <Form
            onSubmit={formik.handleSubmit}
          >
          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label"
              >Email address
            </label>
            <Field
              onChange={formik.handleChange}
              value={formik.values.email}
              type="email"
              className="form-control"
              id="inputEmail"
              aria-describedby="emailHelp"
              name="email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword" className="form-label">Password</label>
            <Field
              type="password"
              className="form-control"
              id="inputPassword"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </div>
          <button type="submit" className="btn btn-primary">Sign in</button>
        </Form>
      </section>
    </main>
  </>
  )
}

export default Login