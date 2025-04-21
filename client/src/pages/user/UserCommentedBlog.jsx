import React, { useEffect, useState } from 'react'
import Header from '../../component/header';
import Usersidebar from '../../component/Usersidebar';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const UserCommentedBlog = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [allBlogs, setAllBlogs] = useState([]);
  const [otherBlogs, setOtherBlogs] = useState([]);
  const [myBlogs, setMyBlogs] = useState([]);
  const [viewComments, setViewComments] = useState(null);
  // blog 
  const userViewBlogs = async () => {
    try {
      let res = await fetch(`http://localhost:8080/user/commented_blog`, ({
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
  // comment 
  const deleteComment = async (e, commentid) => {
    e.preventDefault();
    let res = await fetch(`http://localhost:8080/user/deleteblogcomment?id=${commentid}`, ({
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth?.token?.token}`
      }
    }));
    let data = await res.json();
    if (data.success) {
      toast.success(data?.message);
      userViewBlogs();
    } else {
      toast.error(data?.message);
      userViewBlogs();
    }
  }
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
                                <div className="heading d-flex justify-content-between align-items-center mb-2">
                                  <p onClick={(e) => handleCategoryWiseBlogs(e, blog?.category)} className="category card-text mb-0 text-uppercase fw-bold text-secondary">#{blog?.category?.name}</p>
                                  <span>{timeAgo(blog?.createdAt)}</span>
                                  {blog?.comments.length >= 1 && (
                                    <span onClick={() => setViewComments(`show-${blog?._id}`)} className='text-black border-bottom border-black pb-0' style={{ transition: 'all .3s', cursor: 'pointer' }}>{`${blog?.comments.length} ${blog?.comments.length > 1 ? 'Comments' : 'Comment'}`}</span>
                                  )}
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
                              {viewComments == `show-${blog?._id}` && (
                                <div className="comments position-absolute bottom-0 p-4" style={{ backgroundColor: '#f5f5f5', boxShadow: '0 1px 3px rgba(0, 0, 0, .15)', overflowY: 'auto', height: '100%', scrollbarWidth: 'thin', width: 'calc(100% - 24px)', left: '12px' }}>
                                  <button onClick={() => setViewComments(null)} className="btn btn-dark position-absolute top-0 end-0 rounded-0 p-0" style={{ cursor: 'pointer', width: '25px', height: '25px' }}><i className='fas fa-close'></i></button>
                                  <div className='h-100 overflow-y-auto' style={{ scrollbarWidth: 'none' }}>
                                    {blog?.comments.map((comment, i) => {
                                      return (
                                        <div key={++i} className='mb-3'>
                                          <div className="d-flex align-items-center">
                                            <img src={comment?.user?.image} alt={comment?.user?.image} width={30} height={30} className='object-fit-cover rounded-circle' />
                                            <p className="card-text fw-bold mb-0 ps-2">{comment?.user?.name}</p>
                                            {blog?.author?._id == comment?.user?._id && <span className='ms-2 px-2 bg-black text-white rounded' style={{ fontSize: '13px' }}>Author</span>}
                                            {auth?.token?.user?.role == 'admin' ? (
                                              (comment?.user?.role == 'admin' && comment?.user?._id != auth?.token?.user?._id) ? '' : (
                                                <div className="dropdown ms-auto">
                                                  <button className="btn p-0 border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" width={20} height={20} fill="currentColor">
                                                      <path d="M64 48c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48S90.5 48 64 48zm0 160c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48zm0 160c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48z" />
                                                    </svg>
                                                  </button>
                                                  <ul className="dropdown-menu">
                                                    <li className="dropdown-item" style={{ cursor: 'pointer' }} >Edit Comment</li>
                                                    <li className="dropdown-item text-danger" style={{ cursor: 'pointer' }} onClick={(e) => deleteComment(e, comment?._id)}>Delete Comment</li>
                                                  </ul>
                                                </div>
                                              )
                                            ) : auth?.token?.user?.role == 'user' && (
                                              comment?.user?._id == auth?.token?.user?._id && (
                                                <div className="dropdown ms-auto">
                                                  <button className="btn p-0 border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" width={20} height={20} fill="currentColor">
                                                      <path d="M64 48c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48S90.5 48 64 48zm0 160c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48zm0 160c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48z" />
                                                    </svg>
                                                  </button>
                                                  <ul className="dropdown-menu">
                                                    <li className="dropdown-item" style={{ cursor: 'pointer' }} >Edit Comment</li>
                                                    <li className="dropdown-item text-danger" style={{ cursor: 'pointer' }} onClick={(e) => deleteComment(e, comment?._id)}>Delete Comment</li>
                                                  </ul>
                                                </div>
                                              )
                                            )}
                                          </div>
                                          <p className="card-text ps-4">{comment?.text}</p>
                                        </div>
                                      )
                                    })}
                                  </div>
                                </div>
                              )}
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
                                <div className="heading d-flex justify-content-between align-items-center mb-2">
                                  <p onClick={(e) => handleCategoryWiseBlogs(e, blog?.category)} className="category card-text mb-0 text-uppercase fw-bold text-secondary">#{blog?.category?.name}</p>
                                  <span>{timeAgo(blog?.createdAt)}</span>
                                  {blog?.comments.length >= 1 && (
                                    <span onClick={() => setViewComments(`show-${blog?._id}`)} className='text-black border-bottom border-black pb-0' style={{ transition: 'all .3s', cursor: 'pointer' }}>{`${blog?.comments.length} ${blog?.comments.length > 1 ? 'Comments' : 'Comment'}`}</span>
                                  )}
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
                              {viewComments == `show-${blog?._id}` && (
                                <div className="comments position-absolute bottom-0 p-4" style={{ backgroundColor: '#f5f5f5', boxShadow: '0 1px 3px rgba(0, 0, 0, .15)', overflowY: 'auto', height: '100%', scrollbarWidth: 'thin', width: 'calc(100% - 24px)', left: '12px' }}>
                                  <button onClick={() => setViewComments(null)} className="btn btn-dark position-absolute top-0 end-0 rounded-0 p-0" style={{ cursor: 'pointer', width: '25px', height: '25px' }}><i className='fas fa-close'></i></button>
                                  <div className='h-100 overflow-y-auto' style={{ scrollbarWidth: 'none' }}>
                                    {blog?.comments.map((comment, i) => {
                                      return (
                                        <div key={++i} className='mb-3'>
                                          <div className="d-flex align-items-center">
                                            <img src={comment?.user?.image} alt={comment?.user?.image} width={30} height={30} className='object-fit-cover rounded-circle' />
                                            <p className="card-text fw-bold mb-0 ps-2">{comment?.user?.name}</p>
                                            {blog?.author?._id == comment?.user?._id && <span className='ms-2 px-2 bg-black text-white rounded' style={{ fontSize: '13px' }}>Author</span>}
                                            {auth?.token?.user?.role == 'admin' ? (
                                              (comment?.user?.role == 'admin' && comment?.user?._id != auth?.token?.user?._id) ? '' : (
                                                <div className="dropdown ms-auto">
                                                  <button className="btn p-0 border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" width={20} height={20} fill="currentColor">
                                                      <path d="M64 48c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48S90.5 48 64 48zm0 160c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48zm0 160c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48z" />
                                                    </svg>
                                                  </button>
                                                  <ul className="dropdown-menu">
                                                    <li className="dropdown-item" style={{ cursor: 'pointer' }} >Edit Comment</li>
                                                    <li className="dropdown-item text-danger" style={{ cursor: 'pointer' }} onClick={(e) => deleteComment(e, comment?._id)}>Delete Comment</li>
                                                  </ul>
                                                </div>
                                              )
                                            ) : auth?.token?.user?.role == 'user' && (
                                              comment?.user?._id == auth?.token?.user?._id && (
                                                <div className="dropdown ms-auto">
                                                  <button className="btn p-0 border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" width={20} height={20} fill="currentColor">
                                                      <path d="M64 48c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48S90.5 48 64 48zm0 160c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48zm0 160c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48z" />
                                                    </svg>
                                                  </button>
                                                  <ul className="dropdown-menu">
                                                    <li className="dropdown-item" style={{ cursor: 'pointer' }} >Edit Comment</li>
                                                    <li className="dropdown-item text-danger" style={{ cursor: 'pointer' }} onClick={(e) => deleteComment(e, comment?._id)}>Delete Comment</li>
                                                  </ul>
                                                </div>
                                              )
                                            )}
                                          </div>
                                          <p className="card-text ps-4">{comment?.text}</p>
                                        </div>
                                      )
                                    })}
                                  </div>
                                </div>
                              )}
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
                                <div className="heading d-flex justify-content-between align-items-center mb-2">
                                  <p onClick={(e) => handleCategoryWiseBlogs(e, blog?.category)} className="category card-text mb-0 text-uppercase fw-bold text-secondary">#{blog?.category?.name}</p>
                                  <span>{timeAgo(blog?.createdAt)}</span>
                                  {blog?.comments.length >= 1 && (
                                    <span onClick={() => setViewComments(`show-${blog?._id}`)} className='text-black border-bottom border-black pb-0' style={{ transition: 'all .3s', cursor: 'pointer' }}>{`${blog?.comments.length} ${blog?.comments.length > 1 ? 'Comments' : 'Comment'}`}</span>
                                  )}
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
                              {viewComments == `show-${blog?._id}` && (
                                <div className="comments position-absolute bottom-0 p-4" style={{ backgroundColor: '#f5f5f5', boxShadow: '0 1px 3px rgba(0, 0, 0, .15)', overflowY: 'auto', height: '100%', scrollbarWidth: 'thin', width: 'calc(100% - 24px)', left: '12px' }}>
                                  <button onClick={() => setViewComments(null)} className="btn btn-dark position-absolute top-0 end-0 rounded-0 p-0" style={{ cursor: 'pointer', width: '25px', height: '25px' }}><i className='fas fa-close'></i></button>
                                  <div className='h-100 overflow-y-auto' style={{ scrollbarWidth: 'none' }}>
                                    {blog?.comments.map((comment, i) => {
                                      return (
                                        <div key={++i} className='mb-3'>
                                          <div className="d-flex align-items-center">
                                            <img src={comment?.user?.image} alt={comment?.user?.image} width={30} height={30} className='object-fit-cover rounded-circle' />
                                            <p className="card-text fw-bold mb-0 ps-2">{comment?.user?.name}</p>
                                            {blog?.author?._id == comment?.user?._id && <span className='ms-2 px-2 bg-black text-white rounded' style={{ fontSize: '13px' }}>Author</span>}
                                            {auth?.token?.user?.role == 'admin' ? (
                                              (comment?.user?.role == 'admin' && comment?.user?._id != auth?.token?.user?._id) ? '' : (
                                                <div className="dropdown ms-auto">
                                                  <button className="btn p-0 border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" width={20} height={20} fill="currentColor">
                                                      <path d="M64 48c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48S90.5 48 64 48zm0 160c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48zm0 160c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48z" />
                                                    </svg>
                                                  </button>
                                                  <ul className="dropdown-menu">
                                                    <li className="dropdown-item" style={{ cursor: 'pointer' }} >Edit Comment</li>
                                                    <li className="dropdown-item text-danger" style={{ cursor: 'pointer' }} onClick={(e) => deleteComment(e, comment?._id)}>Delete Comment</li>
                                                  </ul>
                                                </div>
                                              )
                                            ) : auth?.token?.user?.role == 'user' && (
                                              comment?.user?._id == auth?.token?.user?._id && (
                                                <div className="dropdown ms-auto">
                                                  <button className="btn p-0 border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" width={20} height={20} fill="currentColor">
                                                      <path d="M64 48c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48S90.5 48 64 48zm0 160c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48zm0 160c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48z" />
                                                    </svg>
                                                  </button>
                                                  <ul className="dropdown-menu">
                                                    <li className="dropdown-item" style={{ cursor: 'pointer' }} >Edit Comment</li>
                                                    <li className="dropdown-item text-danger" style={{ cursor: 'pointer' }} onClick={(e) => deleteComment(e, comment?._id)}>Delete Comment</li>
                                                  </ul>
                                                </div>
                                              )
                                            )}
                                          </div>
                                          <p className="card-text ps-4">{comment?.text}</p>
                                        </div>
                                      )
                                    })}
                                  </div>
                                </div>
                              )}
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

export default UserCommentedBlog
