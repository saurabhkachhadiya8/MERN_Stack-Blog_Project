import React, { useEffect, useState } from 'react'
import Header from '../../component/header'
import Adminsidebar from '../../component/Adminsidebar'
import { useAuth } from '../../context/AuthContext'
import { toast, ToastContainer } from 'react-toastify'

const AdminUsers = () => {
  const [auth, setAuth] = useAuth();
  const [users, setUsers] = useState([]);
  // form data 
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [contact, setContact] = useState('');
  const [userImage, setUserImage] = useState('');

  const [allBlogs, setAllBlogs] = useState([]);

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
  const editUser = (e, val) => {
    e.preventDefault();
    setUserId(val?._id);
    setName(val?.name);
    setEmail(val?.email);
    setPassword(val?.password);
    setGender(val?.gender);
    setCity(val?.city);
    setContact(val?.contact);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData;
    formdata.append('userid', userId);
    formdata.append('name', name);
    formdata.append('email', email);
    formdata.append('password', password);
    formdata.append('gender', gender);
    formdata.append('city', city);
    formdata.append('contact', contact);
    formdata.append('userimage', userImage);
    let res = await fetch(`http://localhost:8080/admin/updateuser`, ({
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${auth?.token?.token}`
      },
      body: formdata
    }));
    let data = await res.json();
    if (data.success) {
      toast.success(data?.message);
    } else {
      toast.error(data?.message);
    }
  }
  const deleteUser = async (e, userid) => {
    e.preventDefault();
    let res = await fetch(`http://localhost:8080/admin/deleteuser?userid=${userid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth?.token?.token}`
      }
    });
    let data = await res.json();
    if (data.success) {
      toast.success(data?.message);
    } else {
      toast.error(data?.message);
    }
  }
  // blog 
  const fetchBlogs = async () => {
    let res = await fetch(`http://localhost:8080/home/fetchdata`, ({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth?.token?.token}`
      }
    }));
    let data = await res.json();
    if (data.success) {
      setAllBlogs(data?.allBlogs);
    }
  }
  useEffect(() => {
    fetchUser();
    fetchBlogs();
  }, [users]);

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="row">
          <h1 className='mb-4'>Welcome {auth?.token?.user?.name}</h1>
          <div className="col-md-3">
            <Adminsidebar />
          </div>
          <div className="col-md-9">
            <div className="row">
              {users.map((val, index) => {
                return (
                  <div className="col-md-6 mb-4" key={++index}>
                    <div className="card border-0">
                      <div className="d-flex align-items-center">
                        <div className='me-4'>{++index}.</div>
                        <div className="image"> <img src={val?.image} className="rounded object-fit-cover" width={155} height={155} /> </div>
                        <div className="ml-3 w-100 ps-3">
                          <div className="d-flex justify-content-between">
                            <h4 className="mb-0 mt-0">{val?.name}</h4>
                            <div className="dropdown">
                              <button className="btn p-0 border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" width={16} height={16} fill="currentColor">
                                  <path d="M64 48c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48S90.5 48 64 48zm0 160c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48zm0 160c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48z" />
                                </svg>
                              </button>
                              <ul className="dropdown-menu">
                                <li className="dropdown-item" style={{ cursor: 'pointer' }} onClick={(e) => editUser(e, val)} data-bs-target={`#editProfile-${index}`} data-bs-toggle="modal">Edit User</li>
                                <li className="dropdown-item text-danger" style={{ cursor: 'pointer' }} onClick={(e) => deleteUser(e, val?._id)}>Delete User</li>
                              </ul>
                            </div>
                          </div>
                          <span>{val?.role}</span>
                          <div className="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                            <div className="d-flex flex-column text-center"> <span className="articles">Blogs</span> <span className="number1">{allBlogs.filter((blog) => blog?.author?._id == val?._id).length}</span> </div>
                            <div className="d-flex flex-column text-center"> <span className="followers">Commented</span> <span className="number2">{allBlogs.filter((blog) => blog?.comments.find((comment) => comment?.user?._id == val?._id)).length}</span> </div>
                            <div className="d-flex flex-column text-center"> <span className="rating">Liked</span> <span className="number3">{allBlogs.filter((blog) => blog?.likes.find((like) => like?._id == val?._id)).length}</span> </div>
                          </div>
                          <button className="btn btn-sm btn-dark w-100 mt-2" data-bs-target={`#profile-${index}`} data-bs-toggle="modal">Know More</button>
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
                                <img src={val?.image} className="rounded-circle object-fit-cover mx-auto my-3" alt={val?.image} style={{ width: '200px', height: '200px' }} />
                                <div className="card-body">
                                  <h2 className="border-bottom mb-3 pb-2">Name :- {val?.name}</h2>
                                  <p className="card-text fs-5 mb-0 border-bottom mb-3 pb-2"><b>Email :-</b> {val?.email}</p>
                                  <p className="card-text fs-5 mb-0 border-bottom mb-3 pb-2"><b>Gender :-</b> {val?.gender}</p>
                                  <p className="card-text fs-5 mb-0 border-bottom mb-3 pb-2"><b>City :-</b> {val?.city}</p>
                                  <p className="card-text fs-5 mb-0 border-bottom mb-3 pb-2"><b>Contact :-</b> {val?.contact}</p>
                                </div>
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button className="btn btn-primary" onClick={(e) => editUser(e, val)} data-bs-target={`#editProfile-${index}`} data-bs-toggle="modal">Edit User</button>
                              <button className="btn btn-danger" onClick={(e) => deleteUser(e, val?._id)}>Delete User</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <form onSubmit={handleSubmit}>
                        <div className="modal fade" id={`editProfile-${index}`} data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true" aria-labelledby={`editProfileLabel-${index}`} tabIndex={-1}>
                          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h1 className="modal-title fs-5" id={`editProfileLabel-${index}`}>Edit User Profile</h1>
                              </div>
                              <div className="modal-body">
                                <div className="mb-3">
                                  <label htmlFor="image" className="form-label">Image</label>
                                  <div className="d-flex">
                                    <input type="file" onChange={(e) => setUserImage(e.target.files[0])} className="form-control" />
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
                                  <select className="form-control" onChange={(e) => setGender(e.target.value)} value={gender}>
                                    <option value="" disabled>---- Select Gender ----</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                  </select>
                                </div>
                                <div className="mb-3">
                                  <label htmlFor="city" className="form-label">City</label>
                                  <input type="text" onChange={(e) => setCity(e.target.value)} value={city} className="form-control" placeholder='Enter Your City' />
                                </div>
                                <div className="mb-3">
                                  <label htmlFor="contact" className="form-label">contact</label>
                                  <input type="text" onChange={(e) => setContact(e.target.value)} value={contact} className="form-control" placeholder='Enter Your contact' />
                                </div>
                              </div>
                              <div className="modal-footer">
                                <button type='button' className="btn btn-secondary" data-bs-target={`#profile-${index}`} data-bs-toggle="modal">Cancel</button>
                                <button type='submit' className="btn btn-primary" data-bs-target={`#profile-${index}`} data-bs-toggle="modal">Save</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position='top-center'
        autoClose={2000}
      />
    </div>
  )
}

export default AdminUsers
