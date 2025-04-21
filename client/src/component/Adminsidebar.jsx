import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Adminsidebar = () => {

  const location = useLocation();

  return (
    <>
      <div className="list-group">
        <Link to={`/admin/dashboard`} className={`list-group-item list-group-item-action ${location?.pathname == '/admin/dashboard' && 'active bg-secondary border-secondary'}`}>Dashboard</Link>
        <Link to={`/admin/admins`} className={`list-group-item list-group-item-action ${location?.pathname == '/admin/admins' && 'active bg-secondary border-secondary'}`}>Admin</Link>
        <Link to={`/admin/users`} className={`list-group-item list-group-item-action ${location?.pathname == '/admin/users' && 'active bg-secondary border-secondary'}`}>User</Link>
        <Link to={`/admin/viewblogcategory`} className={`list-group-item list-group-item-action ${location?.pathname == '/admin/viewblogcategory' && 'active bg-secondary border-secondary'}`}>Blog Category</Link>
        <Link to={`/admin/viewblogs`} className={`list-group-item list-group-item-action ${location?.pathname == '/admin/viewblogs' && 'active bg-secondary border-secondary'}`}>Blogs</Link>
        <Link to={`/admin/commented_blog`} className={`list-group-item list-group-item-action ${location?.pathname == '/admin/commented_blog' && 'active bg-secondary border-secondary'}`}>Commented</Link>
        <Link to={`/admin/liked_blog`} className={`list-group-item list-group-item-action ${location?.pathname == '/admin/liked_blog' && 'active bg-secondary border-secondary'}`}>Liked</Link>
        <Link to={`/admin/profile`} className={`list-group-item list-group-item-action ${location?.pathname == '/admin/profile' && 'active bg-secondary border-secondary'}`}>Profile</Link>
      </div>
    </>
  )
}

export default Adminsidebar
