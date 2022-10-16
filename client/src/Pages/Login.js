import React from "react";
import Header from "../Components/Header"

function Login() {
  return (
  <>
    <Header page="login"/>
    <main className="vh-100 container d-flex align-items-center justify-content-center">
      <section className="">
        <h1>Sign in</h1>
        {/* { locals.messages.errors && messages.errors.forEach( el => {
          <div className="alert alert-danger"> el.msg </div>
        })}
        { locals.messages.info && messages.info.forEach( el => {
          <div className="alert alert-info"> el.msg </div>
        })} */}
        <form action="/login" method="POST">
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label"
              >Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
            />
          </div>
          <button type="submit" className="btn btn-primary">Sign in</button>
        </form>
      </section>
    </main>
  </>
  )
}

export default Login