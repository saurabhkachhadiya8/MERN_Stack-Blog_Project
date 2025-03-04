import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Adminsidebar = () => {

  const location = useLocation();

  return (
    <>
      <div className="list-group">
        <Link to={`/admin/dashboard`} className={`list-group-item list-group-item-action ${location?.pathname == '/admin/dashboard' && 'active'}`}>Dashboard</Link>
        <Link to={`/admin/admins`} className={`list-group-item list-group-item-action ${location?.pathname == '/admin/admins' && 'active'}`}>Admin</Link>
        <Link to={`/admin/managers`} className={`list-group-item list-group-item-action ${location?.pathname == '/admin/managers' && 'active'}`}>Manager</Link>
        <Link to={`/admin/users`} className={`list-group-item list-group-item-action ${location?.pathname == '/admin/users' && 'active'}`}>User</Link>
        <Link to={`/admin/viewblogs`} className={`list-group-item list-group-item-action ${location?.pathname == '/admin/viewblogs' && 'active'}`}>Blog</Link>
        <Link to={`/admin/profile`} className={`list-group-item list-group-item-action ${location?.pathname == '/admin/profile' && 'active'}`}>Profile</Link>
      </div>
    </>
  )
}

export default Adminsidebar
