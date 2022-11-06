import React from "react";
import Header from "../Components/Header"
import { Form, useFormik, Field } from 'formik'
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";

function Login() {
  const targetUrl = `https://localhost:3001/api/login`

  const navigate = useNavigate();

  //Formik items
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      fetch(targetUrl, {
        headers: { "Content-Type": "application/json" },
        method: 'post',
        withCredentials: true,
        body: JSON.stringify(values, null, 2),
      })
      .then((res) => res.json())
      .then((data) => {
        navigate(data.url)
      })
      .catch((err) => {
        console.log(err)
      })
    }
  })

  return (
    <>
    <div className="vh-100 d-flex flex-column justify-content-between">
      <Header page="login"/>
      <main className="mt-auto container w-25">
        <section>
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
        <Footer /> 
    </div>
  </>
  )
}

export default Login