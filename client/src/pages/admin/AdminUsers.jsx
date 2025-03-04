import React, { useEffect, useState } from 'react'
import Header from '../../component/header'
import Adminsidebar from '../../component/Adminsidebar'
import { useAuth } from '../../context/AuthContext'

const AdminUsers = () => {
  const [auth, setAuth] = useAuth();
  const [users, setUsers] = useState([]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [contact, setContact] = useState('');
  const [image, setImage] = useState('');

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
                {users.map((val, index) => {
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
              {users.map((val, index) => {
                return (
                  <div className="col-md-6" key={++index}>
                    <div className="card">
                      <div className="d-flex align-items-center">
                        <div className="image"> <img src={val?.image} className="rounded object-fit-cover" width={155} height={155} /> </div>
                        <div className="ml-3 w-100 ps-3">
                          <h4 className="mb-0 mt-0">{val?.name}</h4> <span>{val?.role}</span>
                          <div className="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                            <div className="d-flex flex-column"> <span className="articles">Articles</span> <span className="number1">38</span> </div>
                            <div className="d-flex flex-column"> <span className="followers">Followers</span> <span className="number2">980</span> </div>
                            <div className="d-flex flex-column"> <span className="rating">Rating</span> <span className="number3">8.9</span> </div>
                          </div>
                          <div className="button mt-2 d-flex flex-row align-items-center"> <button className="btn btn-sm btn-outline-primary w-100">Chat</button> <button className="btn btn-sm btn-primary w-100 ms-2" data-bs-target={`#profile-${index}`} data-bs-toggle="modal">Know More</button> </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="modal fade" id={`profile-${index}`} aria-hidden="true" aria-labelledby={`profileLabel-${index}`} tabIndex={-1}>
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1 className="modal-title fs-5" id={`profileLabel-${index}`}>User Profile</h1>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                              <div className="card" style={{ width: '100%' }}>
                                <img src={val?.image} className="rounded object-fit-cover mx-auto" alt={val?.image} style={{ width: '250px', height: '250px' }} />
                                <div className="card-body">
                                  <h2>{val?.name}</h2>
                                  <p className="card-text fs-5 mb-0">{val?.email}</p>
                                  <p className="card-text fs-5 mb-0">{val?.gender}</p>
                                  <p className="card-text fs-5 mb-0">{val?.city}</p>
                                  <p className="card-text fs-5 mb-0">{val?.contact}</p>
                                </div>
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button className="btn btn-primary" data-bs-target={`#editProfile-${index}`} data-bs-toggle="modal">Edit Profile</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="modal fade" id={`editProfile-${index}`} aria-hidden="true" aria-labelledby={`editProfileLabel-${index}`} tabIndex={-1}>
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1 className="modal-title fs-5" id={`editProfileLabel-${index}`}>Edit User Profile</h1>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                              <form>
                                <div className="mb-3">
                                  <label htmlFor="image" className="form-label">Image</label>
                                  <div className="d-flex">
                                    <input type="file" onChange={(e) => setName(e.target.files)} className="form-control" />
                                    <img src={val?.image} className="rounded object-fit-cover mx-auto" alt={val?.image} style={{ width: '250px', height: '250px' }} />
                                  </div>
                                </div>
                                <div className="mb-3">
                                  <label htmlFor="name" className="form-label">Name</label>
                                  <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="form-control" placeholder='Enter Your Name' />
                                </div>
                                <div className="mb-3">
                                  <label htmlFor="email" className="form-label">Email</label>
                                  <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" placeholder='Enter Your Email' />
                                </div>
                                <div className="mb-3">
                                  <label htmlFor="password" className="form-label">Password</label>
                                  <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" placeholder='Enter Your Password' />
                                </div>
                                <div className="mb-3">
                                  <label htmlFor="gender" className="form-label">Gender</label><br />
                                  <input type="radio" onChange={(e) => setGender(e.target.value)} value={'male'} /> Male &nbsp;&nbsp;
                                  <input type="radio" onChange={(e) => setGender(e.target.value)} value={'female'} /> Female
                                </div>
                                <div className="mb-3">
                                  <label htmlFor="city" className="form-label">City</label>
                                  <input type="text" onChange={(e) => setCity(e.target.value)} value={city} className="form-control" placeholder='Enter Your City' />
                                </div>
                                <div className="mb-3">
                                  <label htmlFor="contact" className="form-label">contact</label>
                                  <input type="text" onChange={(e) => setContact(e.target.value)} value={contact} className="form-control" placeholder='Enter Your contact' />
                                </div>
                                {/* <div className="mb-3">
                                  <label htmlFor="image" className="form-label">Image</label>
                                  <input type="file" onChange={(e) => setImage(e.target.files[0])} className="form-control" />
                                </div> */}
                                <button type="submit" className="btn btn-primary">Register</button>
                              </form>
                            </div>
                            <div className="modal-footer">
                              <button className="btn btn-primary" data-bs-target={`#profile-${index}`} data-bs-toggle="modal">Save</button>
                            </div>
                          </div>
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

export default AdminUsers
