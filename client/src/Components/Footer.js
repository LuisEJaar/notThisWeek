import React from 'react'

export default function Footer() {
  return (
    <footer className="mt-auto navbar d-flex flex-wrap justify-content-between align-items-center py-3 border-top">
    <div className="col-md-4 d-flex align-items-center">
      <span className="ms-3 mb-3 mb-md-0 text-muted">&copy; 2022 Luis Jaar</span>
    </div>
  
    <ul className="nav me-3 col-md-4 justify-content-end list-unstyled d-flex">
        <li className="ms-3">
          <a className="text-dark" target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/luisjaarcoding/">
            <i className="bi-linkedin"></i>
          </a>
        </li>
        <li className="ms-3">
          <a className="text-dark" target="_blank" rel="noreferrer" href="https://twitter.com/LuisEJaar">
            <i className="bi-twitter"></i>
          </a>
        </li>
        <li className="ms-3">
          <a className="text-dark" target="_blank" rel="noreferrer" href="https://github.com/LuisEJaar">
            <i className="bi-github"></i>
          </a>
        </li>
    </ul>
  </footer>
  )
}