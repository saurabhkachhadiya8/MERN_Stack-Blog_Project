import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ToastContainer, toast } from 'react-toastify';

const Header = () => {

  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const logoutUser = () => {
    setAuth({
      ...auth,
      token: null
    });
    localStorage.removeItem('token');
    toast.success('User Logout Successfully');
    setTimeout(() => {
      navigate('/');
    }, 2000);
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand">Navbar</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              {!auth?.token ? (
                <>
                  <li className="nav-item">
                    <Link to={'/'} className="nav-link active" aria-current="page">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={'/register'} className="nav-link active" aria-current="page">Register</Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <button className="nav-link active" onClick={logoutUser}>Logout</button>
                </li>
              )}
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
      <ToastContainer
        position='top-center'
        autoClose={2000}
      />
    </>
  )
}

export default Header
