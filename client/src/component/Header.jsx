import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ToastContainer, toast } from 'react-toastify';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  // blog category 
  const [blogCategory, setBlogCategory] = useState([]);
  // blog 
  const [blogs, setBlogs] = useState([]);
  // all blogs 
  const [allBlogs, setAllBlogs] = useState([]);

  const logoutUser = () => {
    setAuth({
      ...auth,
      token: null
    });
    localStorage.removeItem('token');
    toast.success('User Logout Successfully');
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  }
  const fetchData = async () => {
    let res = await fetch(`http://localhost:8080/home/fetchdata`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    let data = await res.json();
    if (data.success) {
      setBlogCategory(data?.blogCategory);
      setBlogs(data?.blogs);
      setAllBlogs(data?.allBlogs);
    }
  };
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
    fetchData();
  }, []);

  return (
    <>
      <nav className='header'>
        <div className="container">
          <div className="row align-items-center">
            <div className="logo col-xl-3 col-lg-2 col-md-6">
              <Link to={'/'}>
                <span className='text-white py-1 px-2 rounded-3'>Saurabh's</span>Blog
              </Link>
            </div>
            <div className="mobile_btn col-6 text-end">
              <i className="fas fa-bars" />
            </div>
            <div className="main_menu col-xl-9 col-lg-10">
              <ul className='m-0 d-flex justify-content-end align-items-center'>
                <li><Link to={'/'}>Home</Link></li>
                <li className="has_dropdown"><Link >Categories <i className="fas fa-angle-down" /></Link>
                  <ul className="sub_menu" style={{ maxHeight: '300px', overflowY: 'auto', scrollbarWidth: 'thin' }}>
                    {blogCategory.map((blogcat, index) => {
                      return (
                        <li onClick={(e) => handleCategoryWiseBlogs(e, blogcat)} key={++index}><Link>{blogcat?.name.toUpperCase()}</Link></li>
                      )
                    })}
                  </ul>
                </li>
                <li className="mega_menu_dropdown has_dropdown">
                  <Link >Recent Blog <i className="fas fa-angle-down" /></Link>
                  <div className="mega_menu sub_menu p-4" style={{ height: '300px' }}>
                    <Swiper
                      spaceBetween={20}
                      slidesPerView={4}
                    >
                      {blogs.slice(blogs.length - 12, blogs.length).map((blog, index) => {
                        return (
                          <SwiperSlide key={++index} className='h-100'>
                            <div onClick={(e) => {
                              e.preventDefault();
                              if (!auth?.token) {
                                toast.error('Login to Open Blog Details');
                                return setTimeout(() => {
                                  navigate('/login');
                                }, 2000);
                              }
                              navigate('/blog', { state: blog });
                            }} className="card text-white h-100" style={{ background: `url(${blog?.thumbnail?.image}) no-repeat center`, backgroundSize: 'cover', cursor: 'pointer' }}>
                              <div className='position-absolute w-100 h-100 top-0 start-0' style={{ boxShadow: 'rgb(0 0 0 / 40%) 0px -170px 45px 100px inset' }}></div>
                              <div className="card-img-overlay d-flex flex-column justify-content-end p-4">
                                <div className='d-flex mb-2'>
                                  <span onClick={(e) => handleCategoryWiseBlogs(e, blog?.category)} className="category card-text text-uppercase fw-bold me-4">#{blog?.category?.name}</span>
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
                          </SwiperSlide>
                        )
                      })}
                    </Swiper>
                  </div>
                </li>
                {!auth?.token ? (
                  <>
                    <li><Link to={'/login'}>Login</Link></li>
                    <li><Link to={'/register'}>Register</Link></li>
                  </>
                ) : (
                  <li className="has_dropdown"><Link ><img src="/public/profile robot.jpg" alt="./profile robot.jpg" width={'50px'} height={'50px'} className='rounded-circle object-fit-cover' /></Link>
                    <ul className="sub_menu">
                      <li><Link to={auth?.token?.user?.role == 'admin' ? '/admin/profile' : auth?.token?.user?.role == 'user' && '/user/profile'} >Profile</Link></li>
                      <li><Link to={auth?.token?.user?.role == 'admin' ? '/admin/dashboard' : auth?.token?.user?.role == 'user' && '/user/dashboard'} >Dashboard</Link></li>
                      <li><Link onClick={logoutUser}>Logout</Link></li>
                    </ul>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <ToastContainer
        position='top-center'
        autoClose={2000}
      />
    </>
  )
}

export default Header
