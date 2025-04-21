import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const BlogSlider = ({ blogs_Props }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [blogs, setBlogs] = useState([]);
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
  }, [blogs_Props]);
  return (
    <>
      <section className="blogSlider mt-5 pt-4">
        <div className="container-fluid bg-black py-5">
          <div className="row text-uppercase text-secondary fw-bold" style={{ fontSize: '100px', userSelect: 'none' }}>
            <marquee behavior="scroll" direction="left" scrollamount='10'>
              <span className="pe-4">
                {Array(100).fill('Featured').map((val, index) => val).join(' # ')} {/* Array(100) :- create a empty array of 100 length , .fill('Featured') :- fill value in empty array */}
              </span>
            </marquee>
          </div>
          <div className="row pt-3">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              slidesPerView={1.4}
              autoplay={{ delay: 3000 }}
              centeredSlides={true}
            >
              {blogs.map((blog, index) => {
                return (
                  <SwiperSlide key={++index}>
                    <div className="card mb-3 bg-black text-white">
                      <div className="row g-0 align-items-center">
                        <div className="col-md-6">
                          <img onClick={(e) => {
                            e.preventDefault();
                            if (!auth?.token) {
                              toast.error('Login to Open Blog Details');
                              return setTimeout(() => {
                                navigate('/login');
                              }, 2000);
                            }
                            navigate('/blog', { state: blog });
                          }} src={blog?.thumbnail?.image} className="img-fluid rounded object-fit-cover" alt={blog?.thumbnail?.image} style={{ height: '450px', width: '100%', cursor: 'pointer' }} />
                        </div>
                        <div className="col-md-6">
                          <div className="card-body px-5">
                            <div className='d-flex mb-2'>
                              <span onClick={(e) => handleCategoryWiseBlogs(e, blog?.category)} className="category card-text text-uppercase fw-bold  me-4">#{blog?.category?.name}</span>
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
                            <p className='mb-0 text-secondary fs-5'>{blog?.content.length > 100 ? blog?.content.slice(0, 100) + '...' : blog?.content}</p>
                            <p onClick={(e) => handleAuthorWiseBlogs(e, blog?.author)} className='author mb-0 fst-italic ms-auto'>-- {blog?.author?.name}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          </div>
        </div>
        <ToastContainer
          position='top-center'
          autoClose={2000}
        />
      </section>
    </>
  );
};

export default BlogSlider;
