import React, { useEffect, useState } from 'react'
import Header from '../../component/header';
import Adminsidebar from '../../component/Adminsidebar';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const AdminViewBlogs = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [allBlog, setAllBlog] = useState([]);
  const [adminBlog, setAdminBlog] = useState([]);
  const [managerBlog, setManagerBlog] = useState([]);
  const [userBlog, setUserBlog] = useState([]);
  const [myBlog, setMyBlog] = useState([]);
  // blog 
  const adminViewBlogs = async () => {
    let res = await fetch(`http://localhost:8080/admin/viewblog`, ({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth?.token?.token}`
      }
    }));
    let data = await res.json();
    if (data.success) {
      setAllBlog(data?.allBlog);
      setAdminBlog(data?.adminBlog);
      setManagerBlog(data?.managerBlog);
      setUserBlog(data?.userBlog);
      setMyBlog(data?.myBlog);
    }
  }
  const adminDeleteBlog = async (e, blogid) => {
    e.preventDefault();
    let res = await fetch(`http://localhost:8080/admin/deleteblog?id=${blogid}`, ({
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth?.token?.token}`
      }
    }));
    let data = await res.json();
    if (data.success) {
      toast.success(data?.message);
      adminViewBlogs();
    } else {
      toast.error(data?.message);
      adminViewBlogs();
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
  // author wise blog 
  const handleAuthorWiseBlogs = async (e, blogauthor) => {
    e.preventDefault();
    if (!auth?.token) {
      toast.error('Login to Open Author Details');
      return setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
    let res = await fetch(`http://localhost:8080/author_wise_blog/fetchdata?id=${blogauthor?._id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    let data = await res.json();
    if (data.success) {
      (!data?.authorWiseBlogs || !data?.authorWiseBlogs.length) ? toast.error(`No Blog Available of "${blogauthor?.name}"`) : navigate('/author_wise_blogs', { state: data?.authorWiseBlogs });
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
    adminViewBlogs();
  }, [auth?.token?.user]);

  return (
    <div>
      <Header />
      <section className='admin'>
        <div className="container mt-5">
          <div className="row">
            <h1 className='mb-4 d-flex justify-content-between align-items-center'>
              Welcome {auth?.token?.user?.name}
              <Link to={`/admin/addblog`} className="btn btn-dark">Add Blog</Link>
            </h1>
            <div className="col-md-3">
              <Adminsidebar />
            </div>
            <div className="col-md-9">
              <div>
                <nav>
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button className="nav-link active" id="nav-all-tab" data-bs-toggle="tab" data-bs-target="#nav-all" type="button" role="tab" aria-controls="nav-all" aria-selected="true">All</button>
                    <button className="nav-link" id="nav-admin-tab" data-bs-toggle="tab" data-bs-target="#nav-admin" type="button" role="tab" aria-controls="nav-admin" aria-selected="false">Admin</button>
                    <button className="nav-link" id="nav-manager-tab" data-bs-toggle="tab" data-bs-target="#nav-manager" type="button" role="tab" aria-controls="nav-manager" aria-selected="false">Manager</button>
                    <button className="nav-link" id="nav-user-tab" data-bs-toggle="tab" data-bs-target="#nav-user" type="button" role="tab" aria-controls="nav-user" aria-selected="false">User</button>
                    <button className="nav-link" id="nav-my-tab" data-bs-toggle="tab" data-bs-target="#nav-my" type="button" role="tab" aria-controls="nav-my" aria-selected="false">My</button>
                  </div>
                </nav>
                <div className="tab-content py-4" id="nav-tabContent">
                  <div className="tab-pane fade show active" id="nav-all" role="tabpanel" aria-labelledby="nav-all-tab" tabIndex={0}>
                    <div className="row">
                      {(!allBlog || !allBlog.length) ? (
                        <h1 style={{ textAlign: 'center' }}>Blog Not Available</h1>
                      ) : (
                        allBlog.map((blog, index) => {
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
                                <button type='button' onClick={() => navigate('/admin/editblog', { state: blog })} className='btn btn-dark rounded-end-0' style={{ width: '50%' }}>Edit</button>
                                <button type='button' onClick={(e) => adminDeleteBlog(e, blog?._id)} className='btn btn-dark rounded-start-0' style={{ width: '50%' }}>Delete</button>
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
                                <p onClick={(e) => handleAuthorWiseBlogs(e, blog?.author)} className='author mb-0 fst-italic ms-auto'>-- {blog?.author?.name}</p>
                              </div>
                            </div>
                          )
                        })
                      )}
                    </div>
                  </div>
                  <div className="tab-pane fade" id="nav-admin" role="tabpanel" aria-labelledby="nav-admin-tab" tabIndex={0}>
                    <div className="row">
                      {(!adminBlog || !adminBlog.length) ? (
                        <h1 style={{ textAlign: 'center' }}>Blog Not Available</h1>
                      ) : (
                        adminBlog.map((blog, index) => {
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
                                <button type='button' onClick={() => navigate('/admin/editblog', { state: blog })} className='btn btn-dark rounded-end-0' style={{ width: '50%' }}>Edit</button>
                                <button type='button' onClick={(e) => adminDeleteBlog(e, blog?._id)} className='btn btn-dark rounded-start-0' style={{ width: '50%' }}>Delete</button>
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
                                <p onClick={(e) => handleAuthorWiseBlogs(e, blog?.author)} className='author mb-0 fst-italic ms-auto'>-- {blog?.author?.name}</p>
                              </div>
                            </div>
                          )
                        })
                      )}
                    </div>
                  </div>
                  <div className="tab-pane fade" id="nav-manager" role="tabpanel" aria-labelledby="nav-manager-tab" tabIndex={0}>
                    <div className="row">
                      {(!managerBlog || !managerBlog.length) ? (
                        <h1 style={{ textAlign: 'center' }}>Blog Not Available</h1>
                      ) : (
                        managerBlog.map((blog, index) => {
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
                                <button type='button' onClick={() => navigate('/admin/editblog', { state: blog })} className='btn btn-dark rounded-end-0' style={{ width: '50%' }}>Edit</button>
                                <button type='button' onClick={(e) => adminDeleteBlog(e, blog?._id)} className='btn btn-dark rounded-start-0' style={{ width: '50%' }}>Delete</button>
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
                                <p onClick={(e) => handleAuthorWiseBlogs(e, blog?.author)} className='author mb-0 fst-italic ms-auto'>-- {blog?.author?.name}</p>
                              </div>
                            </div>
                          )
                        })
                      )}
                    </div>
                  </div>
                  <div className="tab-pane fade" id="nav-user" role="tabpanel" aria-labelledby="nav-user-tab" tabIndex={0}>
                    <div className="row">
                      {(!userBlog || !userBlog.length) ? (
                        <h1 style={{ textAlign: 'center' }}>Blog Not Available</h1>
                      ) : (
                        userBlog.map((blog, index) => {
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
                                <button type='button' onClick={() => navigate('/admin/editblog', { state: blog })} className='btn btn-dark rounded-end-0' style={{ width: '50%' }}>Edit</button>
                                <button type='button' onClick={(e) => adminDeleteBlog(e, blog?._id)} className='btn btn-dark rounded-start-0' style={{ width: '50%' }}>Delete</button>
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
                                <p onClick={(e) => handleAuthorWiseBlogs(e, blog?.author)} className='author mb-0 fst-italic ms-auto'>-- {blog?.author?.name}</p>
                              </div>
                            </div>
                          )
                        })
                      )}
                    </div>
                  </div>
                  <div className="tab-pane fade" id="nav-my" role="tabpanel" aria-labelledby="nav-my-tab" tabIndex={0}>
                    <div className="row">
                      {(!myBlog || !myBlog.length) ? (
                        <h1 style={{ textAlign: 'center' }}>Blog Not Available</h1>
                      ) : (
                        myBlog.map((blog, index) => {
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
                                <button type='button' onClick={() => navigate('/admin/editblog', { state: blog })} className='btn btn-dark rounded-end-0' style={{ width: '50%' }}>Edit</button>
                                <button type='button' onClick={(e) => adminDeleteBlog(e, blog?._id)} className='btn btn-dark rounded-start-0' style={{ width: '50%' }}>Delete</button>
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

export default AdminViewBlogs
