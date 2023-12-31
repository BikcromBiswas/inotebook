
import { React } from 'react'
import { Link, useLocation } from 'react-router-dom'
export default function Navbar() {
  const location = useLocation()
  //console.log(location)
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid ">
          <Link className="navbar-brand " to='/'>Navbar</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse mx-5" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={` nav-link mx-3 ${location.pathname === "/Home" ? "active" : ""} `} aria-current="page" to="/Home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={` nav-link mx-3 ${location.pathname === "/About" ? "active" : ""} `} to="/About">About</Link>
              </li>
            </ul>
          </div>
        </div>
        <form className="d-flex">
        <Link className='btn btn-primary mx-2' to="/login" role='button'>Login</Link>
        <Link className='btn btn-primary mx-2' to="/signup" role='button'>Signup</Link>'
        </form>
      </nav>
    </>
  )
}
