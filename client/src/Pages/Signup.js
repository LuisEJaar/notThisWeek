import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { React, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import YupPassword from 'yup-password';
YupPassword(Yup);


const SignupSchema = Yup.object().shape({
  userName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(
      8,
      'password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special'
    )
    .minLowercase(1, 'password must contain at least 1 lower case letter')
    .minUppercase(1, 'password must contain at least 1 upper case letter')
    .minNumbers(1, 'password must contain at least 1 number')
    .minSymbols(1, 'password must contain at least 1 special character')
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], "Passwords don't match!")
    .required('Required')
});

export default function Signup() {
  const [errorsServer, setErrorsServer] = useState(null)
  const navigate = useNavigate();

  const actionUrl = 'https://notthisweek.herokuapp.com/api/signup'

  return (
    <>
      <div className="vh-100 d-flex flex-column justify-content-between">
        <Header page="signup"/>
        <main className="mt-auto container">
          <div className="row justify-content-center">
            <section className="col-6 mt-5">
              <h1>Signup</h1>
              <Formik
                initialValues={{
                  userName: '',
                  email: '',
                  type: '',
                  password: '',
                  confirmPassword: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                  let formData = new FormData();
                  formData.append("userName", values.userName);
                  formData.append("email", values.email);
                  formData.append("password", values.password);
                  formData.append("confirmPassword", values.confirmPassword);
                  formData.append("type", values.type);

                  fetch(actionUrl, {
                    // headers: { "Content-Type": "application/json" },
                    method: 'post',
                    withCredentials: true,
                    body: JSON.stringify(values, null, 2),
                  })
                  .then((res) => res.json())
                  .then((data) => {
                    if (!data.errors) {
                      navigate(data.url)
                    } else {
                      setErrorsServer(data.errors)
                    }
                  })
                  .catch((err) => {
                    console.log(err)
                  })
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="form-group mb-3">
                      <label className="mt-2" htmlFor="userName">Name:</label>
                      <Field name="userName" id="userName" className="form-control" label="Name:" />
                      {errors.userName && touched.userName ? (<div className="mt-3 alert alert-warning">{errors.userName}</div>) : null}
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="email">Email:</label>
                      <Field className="form-control" id="email" name="email" type="email" />
                      {errors.email && touched.email ? <div className="mt-3 alert alert-warning">{errors.email}</div> : null}
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="password">Password:</label>
                      <Field className="form-control" id="password" name="password" type="password" />
                      {errors.password && touched.password ? <div className="mt-3 alert alert-warning">{errors.password}</div> : null}
                    </div>
                    <div className="form-group mb-3">
                      <label htmlFor="confirmPassword">Confirm Password:</label>
                      <Field className="form-control" id="confirmPassword" name="confirmPassword" type="password" />
                      {errors.confirmPassword && touched.confirmPassword ? <div className="mt-3 alert alert-warning">{errors.confirmPassword}</div> : null}
                    </div>
                    <h2 className="mb-3">User type:</h2>
                    <div className="form-check mb-3 mt-3">
                      <Field className="form-check-input" type="radio" value="dm" name="type" id="userTypeDM"/>
                      <label className="form-check-label" htmlFor="userTypeDM">
                        Dungeon Master
                      </label>
                    </div>
                    <div className="form-check mb-3">
                      <Field className="form-check-input" type="radio" name="type" value="player" id="userTypePlayer" checked/>
                      <label className="form-check-label" htmlFor="userTypePlayer">
                        Player
                      </label>
                    </div>
                    <button className="btn btn-success" type="submit">Submit</button>
                  </Form>
                )}
              </Formik>
              {errorsServer &&
                <div className="mt-3 alert alert-danger">{errorsServer}</div>
              }
              </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}