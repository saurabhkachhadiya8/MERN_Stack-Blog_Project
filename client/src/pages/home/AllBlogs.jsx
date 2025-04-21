import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { VerticalAdvertisement } from './Advertisement';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const AllBlogs = ({ blogs_Props, blogCategory_Props, allBlogs_Props }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [randomAllBlogs, setRandomAllBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfShowBlog, setNumberOfShowBlog] = useState(10);
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
    setBlogs(blogs_Props);
    setRandomAllBlogs([...allBlogs_Props].sort(() => Math.random() - 0.5));
  }, [blogs_Props && blogCategory_Props && allBlogs_Props]);

  return (
    <section className='allBlogs mt-5 pt-4'>
      <div className="container">
        <div className="row">
          <div className="top-headlines col-lg-3 position-sticky h-100" style={{ top: '-100%' }}>
            <h4 className='heading position-relative mb-4' style={{ width: 'fit-content' }}>Top headlines</h4>
            {blogs.slice(4, 10).map((blog, index) => {
              return (
                <div key={++index} className="card border-0 mb-2 position-relative">
                  <img onClick={(e) => {
                    e.preventDefault();
                    if (!auth?.token) {
                      toast.error('Login to Open Blog Details');
                      return setTimeout(() => {
                        navigate('/login');
                      }, 2000);
                    }
                    navigate('/blog', { state: blog });
                  }} src={blog?.thumbnail?.image} className="card-img-top rounded object-fit-cover" alt={blog?.thumbnail?.image} height={'100px'} style={{ cursor: 'pointer', width: '50%' }} />
                  <div className="position-absolute rounded-circle bg-black start-50 text-white text-center" style={{ width: '30px', height: '30px', top: '10px', transform: 'translateX(-50%)', lineHeight: '30px', fontSize: '13px' }}>0{++index}</div>
                  <div className="card-body px-0 py-2">
                    <div className='d-flex mb-2' style={{ fontSize: '14px' }}>
                      <span onClick={(e) => handleCategoryWiseBlogs(e, blog?.category)} className="category card-text text-uppercase fw-bold text-secondary  me-4">#{blog?.category?.name}</span>
                      <span>{timeAgo(blog?.createdAt)}</span>
                    </div>
                    <h5 onClick={(e) => {
                      e.preventDefault();
                      if (!auth?.token) {
                        toast.error('Login to Open Blog Details');
                        return setTimeout(() => {
                          navigate('/login');
                        }, 2000);
                      }
                      navigate('/blog', { state: blog });
                    }} className="title card-title mb-0">{blog?.title}</h5>
                    <p onClick={(e) => handleAuthorWiseBlogs(e, blog?.author)} className='author mb-0 fst-italic ms-auto' style={{ fontSize: '14px' }}>-- {blog?.author?.name}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="col-lg-6 position-sticky h-100" style={{ top: '-100%' }}>
            {randomAllBlogs.slice((currentPage * numberOfShowBlog - numberOfShowBlog), (currentPage * numberOfShowBlog)).map((blog, index) => {
              return (
                <div key={++index} className="card mb-4 border-0 border-bottom rounded-0">
                  <img onClick={(e) => {
                    e.preventDefault();
                    if (!auth?.token) {
                      toast.error('Login to Open Blog Details');
                      return setTimeout(() => {
                        navigate('/login');
                      }, 2000);
                    }
                    navigate('/blog', { state: blog });
                  }} src={blog?.thumbnail?.image} className="card-img object-fit-cover" alt={blog?.thumbnail?.image} style={{ cursor: 'pointer' }} />
                  <div className="card-body px-0">
                    <div className='d-flex mb-2'>
                      <span onClick={(e) => handleCategoryWiseBlogs(e, blog?.category)} className="category card-text text-uppercase fw-bold text-secondary  me-4">#{blog?.category?.name}</span>
                      <span>{timeAgo(blog?.createdAt)}</span>
                    </div>
                    <h2 onClick={(e) => {
                      e.preventDefault();
                      if (!auth?.token) {
                        toast.error('Login to Open Blog Details');
                        return setTimeout(() => {
                          navigate('/login');
                        }, 2000);
                      }
                      navigate('/blog', { state: blog });
                    }} className="title card-title">{blog?.title}</h2>
                    <p className='mb-0 text-secondary fs-5'>{blog?.content.length > 180 ? blog?.content.slice(0, 180) + '...' : blog?.content}</p>
                    <p onClick={(e) => handleAuthorWiseBlogs(e, blog?.author)} className='author mb-0 fst-italic ms-auto'>-- {blog?.author?.name}</p>
                  </div>
                </div>
              )
            })}
            <div className="position-relative py-2">
              <Swiper
                slidesPerView={13}
                loop={(randomAllBlogs.length / numberOfShowBlog) > 13}
              >
                {[...Array(Math.ceil(randomAllBlogs.length / numberOfShowBlog))].map((val, index) => {
                  {/* [...Array()] :- create a array of value : 'undefined' */ }
                  return (
                    <SwiperSlide key={++index}>
                      <button onClick={(e) => setCurrentPage(parseInt(e.target.value))} value={++index} className={`btn mx-1 ${currentPage == index ? 'btn-dark' : 'btn-outline-dark'} px-0`} style={{ width: '40px' }}>{index}</button>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            </div>
          </div>
          <div className="col-lg-3 position-sticky h-100" style={{ top: '-100%' }}>
            <PopRecBlog_Categories_Ad blogs_Props={blogs_Props} blogCategory_Props={blogCategory_Props} />
          </div>
        </div>
      </div>
      <ToastContainer
        position='top-center'
        autoClose={2000}
      />
    </section>
  )
}
const PopRecBlog_Categories_Ad = ({ blogs_Props, blogCategory_Props }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [blogCategory, setBlogCategory] = useState([]);
  const [popularOrRecent, setPopularOrRecent] = useState('popular');
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
    setBlogs(blogs_Props);
    setBlogCategory([...blogCategory_Props].sort(() => Math.random() - 0.5));
  }, [blogs_Props && blogCategory_Props]);
  return (
    <>
      <div className="popular-recent-blog mb-5">
        <div className="popular-recent d-flex justify-content-between mb-4">
          <button onClick={() => setPopularOrRecent('popular')} className={`btn rounded-5 text-uppercase fw-semibold ${popularOrRecent == 'popular' ? 'btn-dark' : 'btn-outline-dark'}`} style={{ width: '48%' }}>Popular</button>
          <button onClick={() => setPopularOrRecent('recent')} className={`btn rounded-5 text-uppercase fw-semibold ${popularOrRecent == 'recent' ? 'btn-dark' : 'btn-outline-dark'}`} style={{ width: '48%' }}>Recent</button>
        </div>
        {popularOrRecent == 'popular' ? (
          blogs.slice(0, 12).map((blog, index) => {
            return (
              <div key={++index} className="card mb-3 border-0">
                <div className="row g-0">
                  <div className="col-md-4 pe-2">
                    <img onClick={(e) => {
                      e.preventDefault();
                      if (!auth?.token) {
                        toast.error('Login to Open Blog Details');
                        return setTimeout(() => {
                          navigate('/login');
                        }, 2000);
                      }
                      navigate('/blog', { state: blog });
                    }} src={blog?.thumbnail?.image} className="img-fluid rounded h-100 object-fit-cover" alt={blog?.thumbnail?.image} style={{ cursor: 'pointer' }} />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body p-0">
                      <div className='d-flex mb-2' style={{ fontSize: '13px' }}>
                        <span onClick={(e) => handleCategoryWiseBlogs(e, blog?.category)} className="category card-text text-uppercase fw-bold text-secondary  me-4">#{blog?.category?.name}</span>
                        <span>{timeAgo(blog?.createdAt)}</span>
                      </div>
                      <h5 onClick={(e) => {
                        e.preventDefault();
                        if (!auth?.token) {
                          toast.error('Login to Open Blog Details');
                          return setTimeout(() => {
                            navigate('/login');
                          }, 2000);
                        }
                        navigate('/blog', { state: blog });
                      }} className="title card-title mb-0 fs-6">{blog?.title}</h5>
                      <p onClick={(e) => handleAuthorWiseBlogs(e, blog?.author)} className='author mb-0 fst-italic ms-auto' style={{ fontSize: '13px' }}>-- {blog?.author?.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        ) : popularOrRecent == 'recent' && (
          blogs.slice((blogs.length - 12), blogs.length).map((blog, index) => {
            return (
              <div key={++index} className="card mb-3 border-0">
                <div className="row g-0">
                  <div className="col-md-4 pe-2">
                    <img onClick={(e) => {
                      e.preventDefault();
                      if (!auth?.token) {
                        toast.error('Login to Open Blog Details');
                        return setTimeout(() => {
                          navigate('/login');
                        }, 2000);
                      }
                      navigate('/blog', { state: blog });
                    }} src={blog?.thumbnail?.image} className="img-fluid rounded h-100 object-fit-cover" alt={blog?.thumbnail?.image} style={{ cursor: 'pointer' }} />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body p-0">
                      <div className='d-flex mb-2' style={{ fontSize: '13px' }}>
                        <span onClick={(e) => handleCategoryWiseBlogs(e, blog?.category)} className="category card-text text-uppercase fw-bold text-secondary  me-4">#{blog?.category?.name}</span>
                        <span>{timeAgo(blog?.createdAt)}</span>
                      </div>
                      <h5 onClick={(e) => {
                        e.preventDefault();
                        if (!auth?.token) {
                          toast.error('Login to Open Blog Details');
                          return setTimeout(() => {
                            navigate('/login');
                          }, 2000);
                        }
                        navigate('/blog', { state: blog });
                      }} className="title card-title mb-0 fs-6">{blog?.title}</h5>
                      <p onClick={(e) => handleAuthorWiseBlogs(e, blog?.author)} className='author mb-0 fst-italic ms-auto' style={{ fontSize: '13px' }}>-- {blog?.author?.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
      <div className="categories mb-5">
        <h4 className='heading position-relative mb-4' style={{ width: 'fit-content' }}>Categories</h4>
        <div style={{ maxHeight: '640px', overflowY: 'auto', scrollbarWidth: 'thin' }}>
          {blogCategory.map((blogcat, index) => {
            return (
              <div key={++index} className="col-lg-12 card text-white mb-2" style={{ background: `url(${blogcat?.image?.image}) no-repeat center`, backgroundSize: 'cover', height: '100px', backgroundColor: 'rgba(0,0,0,0.6)', backgroundBlendMode: 'darken' }}>
                <div onClick={(e) => handleCategoryWiseBlogs(e, blogcat)} className="card-img-overlay d-flex justify-content-between align-items-center p-4" style={{ cursor: 'pointer' }}>
                  <p className="card-text mb-0 text-uppercase fw-semibold">{blogcat?.name}</p>
                  <p className='mb-0 rounded-circle text-center' style={{ width: '35px', height: '35px', lineHeight: '35px', backgroundColor: 'rgba(255,255,255,0.4)' }}>{blogs.filter((blog) => blog?.category?._id == blogcat?._id).length}</p>
                </div>
              </div>
            )
          })}
        </div>
        <ToastContainer
          position='top-center'
          autoClose={2000}
        />
      </div>
      <VerticalAdvertisement />
    </>
  )
}

export { AllBlogs, PopRecBlog_Categories_Ad }
