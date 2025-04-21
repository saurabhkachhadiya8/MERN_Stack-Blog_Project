import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Adminsidebar = () => {

  const location = useLocation();

  return (
    <>
      <div className="list-group">
        <Link to={`/user/dashboard`} className={`list-group-item list-group-item-action ${location?.pathname == '/user/dashboard' && 'active bg-secondary border-secondary'}`}>Dashboard</Link>
        <Link to={`/user/viewblogs`} className={`list-group-item list-group-item-action ${location?.pathname == '/user/viewblogs' && 'active bg-secondary border-secondary'}`}>My Blog</Link>
        <Link to={`/user/commented_blog`} className={`list-group-item list-group-item-action ${location?.pathname == '/user/commented_blog' && 'active bg-secondary border-secondary'}`}>Commented</Link>
        <Link to={`/user/liked_blog`} className={`list-group-item list-group-item-action ${location?.pathname == '/user/liked_blog' && 'active bg-secondary border-secondary'}`}>Liked</Link>
        <Link to={`/user/profile`} className={`list-group-item list-group-item-action ${location?.pathname == '/user/profile' && 'active bg-secondary border-secondary'}`}>Profile</Link>
      </div>
    </>
  )
}

export default Adminsidebar
