import React, { useEffect, useState } from 'react'
import Header from '../../component/header';
import Usersidebar from '../../component/Usersidebar';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const UserLikedBlog = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [allBlogs, setAllBlogs] = useState([]);
  const [otherBlogs, setOtherBlogs] = useState([]);
  const [myBlogs, setMyBlogs] = useState([]);
  // blog 
  const userViewBlogs = async () => {
    try {
      let res = await fetch(`http://localhost:8080/user/liked_blog`, ({
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth?.token?.token}`
        }
      }));
      let data = await res.json();
      if (data.success) {
        setAllBlogs(data?.allBlogs);
        setOtherBlogs(data?.otherBlogs);
        setMyBlogs(data?.myBlogs);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }
  const userDeleteBlog = async (e, blogid) => {
    e.preventDefault();
    let res = await fetch(`http://localhost:8080/user/deleteblog?id=${blogid}`, ({
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth?.token?.token}`
      }
    }));
    let data = await res.json();
    if (data.success) {
      setBlogs(data?.userBlogs);
      toast.success(data?.message);
      userViewBlogs();
    } else {
      toast.error(data?.message);
      userViewBlogs();
    }
  }
  // category wise blog 
  const handleCategoryWiseBlogs = async (e, blogcat) => {
    e.preventDefault();
    if (!auth?.token) {
      toast.error('Login to Open Category Details');
      return setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
    let res = await fetch(`http://localhost:8080/category_wise_blog/fetchdata?id=${blogcat?._id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    let data = await res.json();
    if (data.success) {
      (!data?.categoryWiseBlogs || !data?.categoryWiseBlogs.length) ? toast.error(`No Blog Available of "${blogcat?.name.toUpperCase()}"`) : navigate('/category_wise_blogs', { state: data?.categoryWiseBlogs });
    }
  };
  const timeAgo = (timestamp) => {
    const diffMs = Date.now() - new Date(timestamp).getTime();
    const diffSec = Math.floor(diffMs / 1000);
    if (diffSec < 60) return `${diffSec} seconds ago`;

    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin} minutes ago`;

    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr} hours ago`;

    const diffDay = Math.floor(diffHr / 24);
    if (diffDay < 30) return `${diffDay} days ago`;

    const diffMonth = Math.floor(diffDay / 30);
    if (diffMonth < 12) return `${diffMonth} months ago`;

    const diffYear = Math.floor(diffMonth / 12);
    return `${diffYear} years ago`;
  };
  useEffect(() => {
    userViewBlogs();
  }, []);

  return (
    <div>
      <Header />
      <section className='user'>
        <div className="container mt-5">
          <div className="row">
            <h1 className='mb-4 d-flex justify-content-between align-items-center'>
              Welcome {auth?.token?.user?.name}
              <Link to={`/user/addblog`} className="btn btn-dark">Add Blog</Link>
            </h1>
            <div className="col-md-3">
              <Usersidebar />
            </div>
            <div className="col-md-9">
              <div>
                <nav>
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button className="nav-link active" id="nav-all-tab" data-bs-toggle="tab" data-bs-target="#nav-all" type="button" role="tab" aria-controls="nav-all" aria-selected="true">All</button>
                    <button className="nav-link" id="nav-other-tab" data-bs-toggle="tab" data-bs-target="#nav-other" type="button" role="tab" aria-controls="nav-other" aria-selected="false">Other</button>
                    <button className="nav-link" id="nav-my-tab" data-bs-toggle="tab" data-bs-target="#nav-my" type="button" role="tab" aria-controls="nav-my" aria-selected="false">My</button>
                  </div>
                </nav>
                <div className="tab-content py-4" id="nav-tabContent">
                  <div className="tab-pane fade show active" id="nav-all" role="tabpanel" aria-labelledby="nav-all-tab" tabIndex={0}>
                    <div className="row">
                      {(!allBlogs || !allBlogs.length) ? (
                        <div className="col-md-12 text-center">
                          <h2>No blogs found</h2>
                        </div>
                      ) : (
                        allBlogs.map((blog, index) => {
                          return (
                            <div key={++index} className="col-lg-4 card border-0 mb-2">
                              <img onClick={(e) => {
                                e.preventDefault();
                                if (!auth?.token) {
                                  toast.error('Login to Open Blog Details');
                                  return setTimeout(() => {
                                    navigate('/login');
                                  }, 2000);
                                }
                                navigate('/blog', { state: blog });
                              }} src={blog?.thumbnail?.image} className="card-img-top rounded object-fit-cover" alt={blog?.thumbnail?.image} height={'200px'} style={{ cursor: 'pointer' }} />
                              <div className="btns d-flex justify-content-between position-absolute" style={{ width: 'calc(100% - 24px)', top: '160px', opacity: '0', visibility: 'hidden', transform: 'rotateX(90deg)', transition: 'all .3s' }}>
                                <button type='button' onClick={() => navigate('/user/editblog', { state: blog })} className='btn btn-dark rounded-end-0' style={{ width: '50%' }}>Edit</button>
                                <button type='button' onClick={(e) => userDeleteBlog(e, blog?._id)} className='btn btn-dark rounded-start-0' style={{ width: '50%' }}>Delete</button>
                              </div>
                              <div className="card-body px-0 py-2">
                                <div className='d-flex mb-2'>
                                  <span onClick={(e) => handleCategoryWiseBlogs(e, blog?.category)} className="category card-text text-uppercase fw-bold text-secondary me-4">#{blog?.category?.name}</span>
                                  <span>{timeAgo(blog?.createdAt)}</span>
                                </div>
                                <h4 onClick={(e) => {
                                  e.preventDefault();
                                  if (!auth?.token) {
                                    toast.error('Login to Open Blog Details');
                                    return setTimeout(() => {
                                      navigate('/login');
                                    }, 2000);
                                  }
                                  navigate('/blog', { state: blog });
                                }} className="title card-title mb-0">{blog?.title}</h4>
                              </div>
                            </div>
                          )
                        })
                      )}
                    </div>
                  </div>
                  <div className="tab-pane fade" id="nav-other" role="tabpanel" aria-labelledby="nav-other-tab" tabIndex={0}>
                    <div className="row">
                      {(!otherBlogs || !otherBlogs.length) ? (
                        <div className="col-md-12 text-center">
                          <h2>No blogs found</h2>
                        </div>
                      ) : (
                        otherBlogs.map((blog, index) => {
                          return (
                            <div key={++index} className="col-lg-4 card border-0 mb-2">
                              <img onClick={(e) => {
                                e.preventDefault();
                                if (!auth?.token) {
                                  toast.error('Login to Open Blog Details');
                                  return setTimeout(() => {
                                    navigate('/login');
                                  }, 2000);
                                }
                                navigate('/blog', { state: blog });
                              }} src={blog?.thumbnail?.image} className="card-img-top rounded object-fit-cover" alt={blog?.thumbnail?.image} height={'200px'} style={{ cursor: 'pointer' }} />
                              <div className="btns d-flex justify-content-between position-absolute" style={{ width: 'calc(100% - 24px)', top: '160px', opacity: '0', visibility: 'hidden', transform: 'rotateX(90deg)', transition: 'all .3s' }}>
                                <button type='button' onClick={() => navigate('/user/editblog', { state: blog })} className='btn btn-dark rounded-end-0' style={{ width: '50%' }}>Edit</button>
                                <button type='button' onClick={(e) => userDeleteBlog(e, blog?._id)} className='btn btn-dark rounded-start-0' style={{ width: '50%' }}>Delete</button>
                              </div>
                              <div className="card-body px-0 py-2">
                                <div className='d-flex mb-2'>
                                  <span onClick={(e) => handleCategoryWiseBlogs(e, blog?.category)} className="category card-text text-uppercase fw-bold text-secondary me-4">#{blog?.category?.name}</span>
                                  <span>{timeAgo(blog?.createdAt)}</span>
                                </div>
                                <h4 onClick={(e) => {
                                  e.preventDefault();
                                  if (!auth?.token) {
                                    toast.error('Login to Open Blog Details');
                                    return setTimeout(() => {
                                      navigate('/login');
                                    }, 2000);
                                  }
                                  navigate('/blog', { state: blog });
                                }} className="title card-title mb-0">{blog?.title}</h4>
                              </div>
                            </div>
                          )
                        })
                      )}
                    </div>
                  </div>
                  <div className="tab-pane fade" id="nav-my" role="tabpanel" aria-labelledby="nav-my-tab" tabIndex={0}>
                    <div className="row">
                      {(!myBlogs || !myBlogs.length) ? (
                        <div className="col-md-12 text-center">
                          <h2>No blogs found</h2>
                        </div>
                      ) : (
                        myBlogs.map((blog, index) => {
                          return (
                            <div key={++index} className="col-lg-4 card border-0 mb-2">
                              <img onClick={(e) => {
                                e.preventDefault();
                                if (!auth?.token) {
                                  toast.error('Login to Open Blog Details');
                                  return setTimeout(() => {
                                    navigate('/login');
                                  }, 2000);
                                }
                                navigate('/blog', { state: blog });
                              }} src={blog?.thumbnail?.image} className="card-img-top rounded object-fit-cover" alt={blog?.thumbnail?.image} height={'200px'} style={{ cursor: 'pointer' }} />
                              <div className="btns d-flex justify-content-between position-absolute" style={{ width: 'calc(100% - 24px)', top: '160px', opacity: '0', visibility: 'hidden', transform: 'rotateX(90deg)', transition: 'all .3s' }}>
                                <button type='button' onClick={() => navigate('/user/editblog', { state: blog })} className='btn btn-dark rounded-end-0' style={{ width: '50%' }}>Edit</button>
                                <button type='button' onClick={(e) => userDeleteBlog(e, blog?._id)} className='btn btn-dark rounded-start-0' style={{ width: '50%' }}>Delete</button>
                              </div>
                              <div className="card-body px-0 py-2">
                                <div className='d-flex mb-2'>
                                  <span onClick={(e) => handleCategoryWiseBlogs(e, blog?.category)} className="category card-text text-uppercase fw-bold text-secondary me-4">#{blog?.category?.name}</span>
                                  <span>{timeAgo(blog?.createdAt)}</span>
                                </div>
                                <h4 onClick={(e) => {
                                  e.preventDefault();
                                  if (!auth?.token) {
                                    toast.error('Login to Open Blog Details');
                                    return setTimeout(() => {
                                      navigate('/login');
                                    }, 2000);
                                  }
                                  navigate('/blog', { state: blog });
                                }} className="title card-title mb-0">{blog?.title}</h4>
                              </div>
                            </div>
                          )
                        })
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer
        position='top-center'
        autoClose={2000}
      />
    </div>
  )
}

export default UserLikedBlog
