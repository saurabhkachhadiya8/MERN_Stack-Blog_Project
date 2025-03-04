import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import Header from '../../component/header';
import Adminsidebar from '../../component/Adminsidebar';

const Admins = () => {
  const [auth, setAuth] = useAuth();
  const [admins, setAdmins] = useState([]);

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
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Password</th>
                  <th scope="col">Gender</th>
                  <th scope="col">City</th>
                  <th scope="col">Contact</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((val, index) => {
                  return (
                    <tr key={++index}>
                      <td>{++index}</td>
                      <td><img src={val?.image} alt={val?.image} style={{ width: '100px', height: '100px', objectFit: 'cover' }} /></td>
                      <td>{val?.name}</td>
                      <td>{val?.email}</td>
                      <td>{val?.password}</td>
                      <td>{val?.gender}</td>
                      <td>{val?.city}</td>
                      <td>{val?.contact}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className="row">
              {admins.map((val, index) => {
                return (
                  <div className="col-md-6" key={++index}>
                    <div className="card">
                      <div className="d-flex align-items-center">
                        <div className="image"> <img src={val?.image} className="rounded" width={155} height={155} style={{objectFit:'cover'}} /> </div>
                        <div className="ml-3 w-100 ps-3">
                          <h4 className="mb-0 mt-0">{val?.name}</h4> <span>{val?.role}</span>
                          <div className="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                            <div className="d-flex flex-column"> <span className="articles">Articles</span> <span className="number1">38</span> </div>
                            <div className="d-flex flex-column"> <span className="followers">Followers</span> <span className="number2">980</span> </div>
                            <div className="d-flex flex-column"> <span className="rating">Rating</span> <span className="number3">8.9</span> </div>
                          </div>
                          <div className="button mt-2 d-flex flex-row align-items-center"> <button className="btn btn-sm btn-outline-primary w-100">Chat</button> <button className="btn btn-sm btn-primary w-100 ms-2">Know More</button> </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admins
