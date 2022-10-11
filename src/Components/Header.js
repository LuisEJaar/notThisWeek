import React from "react";
import { NavLink} from "react-router-dom";


export default function Header({page}) {
  return (
    <>
      <header className="bg-dark ps-2 pe-3 shadow">
        <nav className="navbar navbar-dark bg-dark">
          {(page === "home" || page === "signup" || page === "login") &&
          <NavLink className="navbar-brand" to="/">
            <img src="/imgs/d20.png" width="30" height="30" className="d-inline-block align-top" alt="dice"/>
            Not This Week
          </NavLink>
          }
          {page === "other" && 
          <NavLink className="navbar-brand" to="/userProfile/own">
            <img src="/imgs/d20.png" width="30" height="30" className="d-inline-block align-top" alt="dice"/>
            Not This Week
          </NavLink>
          }
          
          {page === "home" &&
            <>
              <NavLink to="/login" className="btn btn-outline-light ms-auto"> Login</NavLink>
              <NavLink to="/signup" className="btn btn-outline-info ms-2"> Signup</NavLink>
            </>
          }
          {page === "signup" &&
            <>
              <NavLink to="/login" className="btn btn-outline-light ms-auto"> Login</NavLink>
            </>
          }
          {page === "login" &&
            <>
              <NavLink to="/signup" className="btn btn-outline-info ms-2"> Signup</NavLink>
            </>
          }
          {page === "else" &&
            <>
              <NavLink to="/characterFeed" className="btn btn-outline-primary ms-auto " >See all characters</NavLink>
              <NavLink to="/feed" className="btn btn-outline-primary ms-1 " >See all games</NavLink>
              <NavLink to="/logout" className="btn btn-outline-light ms-3">Logout</NavLink>
            </>
          }
        </nav>
      </header>
    </>
  )
}

