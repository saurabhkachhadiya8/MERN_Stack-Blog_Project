import React from 'react'
import Header from '../../component/header';
import Usersidebar from '../../component/Usersidebar';
import { useAuth } from '../../context/AuthContext';

const UserDashboard = () => {
  const [auth, setAuth] = useAuth();
  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="row">
          <h1 className='mb-4'>Welcome {auth?.token?.user?.name}</h1>
          <div className="col-md-3">
            <Usersidebar />
          </div>
          <div className="col-md-9">
            <div className="row">

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard