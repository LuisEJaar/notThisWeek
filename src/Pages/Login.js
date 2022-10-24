import React from "react";
import Header from "../Components/Header"
import { Form, Field, useFormik } from 'formik'
import {Navigate} from 'react-router-dom';

function Login() {
  const url = "https://notthisweek.herokuapp.com/login"
  const [redir, setRedir] = React.useState("")
  const [authenticated, setAuthenticated] = React.useState(false)

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
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setAuthenticated(true)
          setRedir(data.url)
        }  
      })
      .catch((err) => {
        console.log(err)
      })
    }
  })
  
  return (
    <>
      
    { authenticated &&  <Navigate to={redir} replace={true} />}
      <Header page="login" />
      <p>{ redir }</p>
      <p>{authenticated}</p>
      <p>Test</p>
    <main className="vh-100 container d-flex align-items-center justify-content-center">
      <section className="">
        <h1>Sign this</h1>
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