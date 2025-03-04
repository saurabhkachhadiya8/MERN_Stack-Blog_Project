import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import Header from '../../component/header';
import Adminsidebar from '../../component/Adminsidebar';
import './admin.css'

const AdminDashboard = () => {

  const [auth, setAuth] = useAuth();
  const [admins, setAdmins] = useState([]);
  const [managers, setManagers] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchUser = async () => {
    try {
      let res = await fetch(`http://localhost:8080/admin/alluser`, ({
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth?.token?.token}`
        }
      }));
      let data = await res.json();
      if (data.success) {
        setAdmins(data?.admins);
        setManagers(data?.managers);
        setUsers(data?.users);
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="row">
          <h1 className='mb-4'>Welcome Admin</h1>
          <div className="col-md-3">
            <Adminsidebar />
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-3">
                <div className="card">
                  <div className="card-header">
                    Admin
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{admins.length}</h5>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card">
                  <div className="card-header">
                    Manager
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{managers.length}</h5>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card">
                  <div className="card-header">
                    User
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{users.length}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
