import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { VerticalAdvertisement } from './Advertisement';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const Blog = ({ blogs_Props }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    setBlogs(blogs_Props);
  }, [blogs_Props]);

  return (
    <>
      {(!blogs.length || !blogs) ? '' : (
        <>
          <section className="blog mt-5">
            <div className="container">
              <div className="row" style={{ minHeight: '730px' }}>
                <div className="col-lg-3">
                  {[0, 1].map((val, index) => <BlogFirstDesign blog_Props={blogs[val]} key={++index} />)}
                </div>
                <div className="col-lg-6 position-relative">
                  <BlogSlider blog_Props={blogs.slice(2, 5)} />
                </div>
                <div className="col-lg-3 d-flex flex-column justify-content-between">
                  {[5, 6].map((val, index) => <BlogSecondDesign blog_Props={blogs[val]} key={++index} />)}
                </div>
              </div>
              <div className="row mt-4" style={{ minHeight: '650px' }}>
                <div className="col-lg-4">
                  <VerticalAdvertisement />
                </div>
                <div className="col-lg-5 d-flex flex-column justify-content-between">
                  <BlogThirdDesign blog_Props={blogs[7]} />
                  <div className="row" style={{ height: '30%' }}>
                    {[8, 9].map((val, index) => <BlogFourthDesign blog_Props={blogs[val]} key={++index} />)}
                  </div>
                </div>
                <div className="col-lg-3">
                  {[10, 11, 12, 13, 14].map((val, index) => <BlogFifthDesign blog_Props={blogs[val]} key={++index} />)}
                </div>
              </div>
            </div >
          </section >
        </>
      )}
    </>
  )
}
const BlogFirstDesign = ({ blog_Props }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [blog, setBlog] = useState();
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
    setBlog(blog_Props);
  }, [blog_Props]);
  return (
    <>
      {blog && (
        <div className="col-lg-12 card border-0 mb-2">
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
          <ToastContainer
            position='top-center'
            autoClose={2000}
          />
        </div>
      )}
    </>
  )
}
const BlogSlider = ({ blog_Props }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [progress, setProgress] = useState(0);
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
    setBlogs(blog_Props);
    let interval;
    if (blog_Props.length > 1) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress(prev => (prev < 100 ? prev + 10 : 0));
      }, 500);
    }
    return () => clearInterval(interval);
  }, [blog_Props]);

  return (
    <>
      {(blogs.length || blogs) && (
        <>
          <div className="progress-ring">
            <svg viewBox="0 0 36 36">
              <path
                className="progress-ring__circle"
                strokeDasharray="100, 100"
                strokeDashoffset={`${100 - progress}`}
                d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"
              />
            </svg>
          </div>
          <Swiper
            className='h-100'
            slidesPerView={1}
            modules={[EffectFade, Autoplay]}
            effect="fade"
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={blogs.length > 1}
            speed={500}
            onSlideChange={() => setProgress(0)}
          >
            {blogs.map((blog, index) => (
              <SwiperSlide key={index}>
                <div onClick={(e) => {
                  e.preventDefault();
                  if (!auth?.token) {
                    toast.error('Login to Open Blog Details');
                    return setTimeout(() => {
                      navigate('/login');
                    }, 2000);
                  }
                  navigate('/blog', { state: blog });
                }} className="card h-100 text-white" style={{ background: `url(${blog?.thumbnail?.image}) no-repeat center`, backgroundSize: 'cover', cursor: 'pointer' }}>
                  <div className='position-absolute w-100 h-100 top-0 start-0' style={{ boxShadow: 'rgb(0 0 0 / 40%) 0px -170px 45px 100px inset' }}></div>
                  <div className="card-img-overlay d-flex flex-column justify-content-end p-4">
                    <div className='d-flex mb-2'>
                      <span onClick={(e) => handleCategoryWiseBlogs(e, blog?.category)} className="category card-text text-uppercase fw-bold  me-4">#{blog?.category?.name}</span>
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
            ))}
            <ToastContainer
              position='top-center'
              autoClose={2000}
            />
          </Swiper>
        </>
      )}
    </>
  )
}
const BlogSecondDesign = ({ blog_Props }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [blog, setBlog] = useState();
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
    setBlog(blog_Props);
  }, [blog_Props]);
  return (
    <>
      {blog && (
        <div onClick={(e) => {
          e.preventDefault();
          if (!auth?.token) {
            toast.error('Login to Open Blog Details');
            return setTimeout(() => {
              navigate('/login');
            }, 2000);
          }
          navigate('/blog', { state: blog });
        }} className="col-lg-12 card text-white" style={{ background: `url(${blog?.thumbnail?.image}) no-repeat center`, backgroundSize: 'cover', height: '48%', cursor: 'pointer' }}>
          <div className='position-absolute w-100 h-100 top-0 start-0' style={{ boxShadow: 'rgb(0 0 0 / 40%) 0px -170px 45px 100px inset' }}></div>
          <div className="card-img-overlay d-flex flex-column justify-content-end p-4">
            <div className='d-flex mb-2'>
              <span onClick={(e) => handleCategoryWiseBlogs(e, blog?.category)} className="category card-text text-uppercase fw-bold  me-4">#{blog?.category?.name}</span>
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
          <ToastContainer
            position='top-center'
            autoClose={2000}
          />
        </div>
      )}
    </>
  )
}
const BlogThirdDesign = ({ blog_Props }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [blog, setBlog] = useState();
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
    setBlog(blog_Props);
  }, [blog_Props]);
  return (
    <>
      {blog && (
        <div onClick={(e) => {
          e.preventDefault();
          if (!auth?.token) {
            toast.error('Login to Open Blog Details');
            return setTimeout(() => {
              navigate('/login');
            }, 2000);
          }
          navigate('/blog', { state: blog });
        }} className="col-lg-12 card text-white" style={{ background: `url(${blog?.thumbnail?.image}) no-repeat center`, backgroundSize: 'cover', height: '65%', cursor: 'pointer' }}>
          <div className='position-absolute w-100 h-100 top-0 start-0' style={{ boxShadow: 'rgb(0 0 0 / 40%) 0px -170px 45px 100px inset' }}></div>
          <div className="card-img-overlay d-flex flex-column justify-content-end p-4">
            <div className='d-flex mb-2'>
              <span onClick={(e) => handleCategoryWiseBlogs(e, blog?.category)} className="category card-text text-uppercase fw-bold  me-4">#{blog?.category?.name}</span>
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
          <ToastContainer
            position='top-center'
            autoClose={2000}
          />
        </div>
      )}
    </>
  )
}
const BlogFourthDesign = ({ blog_Props }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [blog, setBlog] = useState();
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
    setBlog(blog_Props);
  }, [blog_Props]);
  return (
    <>
      {blog && (
        <div className='col-lg-6'>
          <div className="card h-100 pt-4 border-0 border-top rounded-0">
            <div className="card-body p-0">
              <div className='d-flex mb-2' style={{ fontSize: '15px' }}>
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
              <p onClick={(e) => handleAuthorWiseBlogs(e, blog?.author)} className='author mb-0 fst-italic ms-auto' style={{ fontSize: '15px' }}>-- {blog?.author?.name}</p>
            </div>
          </div>
          <ToastContainer
            position='top-center'
            autoClose={2000}
          />
        </div>
      )}
    </>
  )
}
const BlogFifthDesign = ({ blog_Props }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [blog, setBlog] = useState();
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
    setBlog(blog_Props);
  }, [blog_Props]);
  return (
    <>
      {blog && (
        <div className="card mb-3 border-0">
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
          <ToastContainer
            position='top-center'
            autoClose={2000}
          />
        </div>
      )}
    </>
  )
}

export default Blog
