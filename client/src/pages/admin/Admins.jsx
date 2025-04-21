import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import Header from '../../component/header';
import Adminsidebar from '../../component/Adminsidebar';
import { toast, ToastContainer } from 'react-toastify'

const Admins = () => {
  const [auth, setAuth] = useAuth();
  const [admins, setAdmins] = useState([]);

  const [allBlogs, setAllBlogs] = useState([]);

  const fetchAdmin = async () => {
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
    fetchAdmin();
    fetchBlogs();
  }, [admins]);

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
              {admins.map((val, index) => {
                return (
                  <div className="col-md-6 mb-4" key={++index}>
                    <div className="card border-0">
                      <div className="d-flex align-items-center">
                        <div className='me-4'>{++index}.</div>
                        <div className="image"> <img src={val?.image} className="rounded object-fit-cover" width={155} height={155} /> </div>
                        <div className="ml-3 w-100 ps-3">
                          <div className="d-flex justify-content-between">
                            <h4 className="mb-0 mt-0">{val?.name}</h4>
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
                              <h1 className="modal-title fs-5" id={`profileLabel-${index}`}>Admin Profile</h1>
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
      <ToastContainer
        position='top-center'
        autoClose={2000}
      />
    </div>
  )
}

export default Admins
