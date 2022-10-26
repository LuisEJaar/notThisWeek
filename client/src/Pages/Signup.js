import React from "react"
import Header from "../Components/Header"
import { Form } from 'formik'
import Footer from "../Components/Footer";

function Signup () {
  return (
    <>
      <div className="vh-100 d-flex flex-column justify-content-between">
        <Header page="signup"/>
        <main className="mt-auto container">
          <div className="row justify-content-center">
              <section className="col-6 mt-5">
                  {/* { locals.messages.errors && messages.errors.forEach( el => {
                  <div className="alert alert-danger"> el.msg </div>
                  })}
                  { locals.messages.info && messages.info.forEach( el => {
                  <div className="alert alert-info"> el.msg </div>
                  })} */}
                  <Form action="/signup" method="POST">
                      <div className="mb-3">
                          <label for="userName" className="form-label">User Name</label>
                          <input type="text" className="form-control" id="userName" name="userName"/>
                      </div>
                      <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                      </div>
                      <div className="mb-3">
                        <label for="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password"/>
                      </div>
                      <div className="mb-3">
                          <label for="confirmPassword" className="form-label">Confirm Password</label>
                          <input type="password" className="form-control" id="confirmPassword" name="confirmPassword"/>
                        </div>
                        <span className="mb-3">User type:</span>
                        <div className="form-check mb-3 mt-3">
                          <input className="form-check-input" type="radio" value="dm" name="type" id="userTypeDM"/>
                          <label className="form-check-label" for="userTypeDM">
                            Dungeon Master
                          </label>
                        </div>
                        <div className="form-check mb-3">
                          <input className="form-check-input" type="radio" name="type" value="player" id="userTypePlayer" checked/>
                          <label className="form-check-label" for="userTypePlayer">
                            Player
                          </label>
                        </div>
                      <button type="submit" className="btn btn-primary">Submit</button>
                    </Form>
              </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Signup