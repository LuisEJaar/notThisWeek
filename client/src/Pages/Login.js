import React from "react";
import Header from "../Components/Header"
import { Form, useFormik, Field } from 'formik'

function Login() {
  const targetUrl = "https://notthisweek.herokuapp.com/login"
  
  //Formik items
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      body: values,
    },
    onSubmit: () => {
      fetch(targetUrl, {
        method: 'post',
        withCredentials: true
      })
        // .then((res) => res.json())
        // .then((data) => setRounds(data.rounds))
        // .then(sendMessage("rounds"))
        .catch((err) => {
          console.log(err)
        })
    }
  })

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
              type="email"
              className="form-control"
              id="inputEmail"
              aria-describedby="emailHelp"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword" className="form-label">Password</label>
            <Field
              type="password"
              className="form-control"
              id="inputPassword"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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