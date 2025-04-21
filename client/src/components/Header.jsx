import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link to={'/'} className="navbar-brand">
            <span className='bg-primary text-white px-2 py-1 rounded'>Saurabh's</span>Blog
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <i class="fa-solid fa-magnifying-glass"></i>
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={'/'} className="nav-link active" aria-current="page">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link">Profile</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
