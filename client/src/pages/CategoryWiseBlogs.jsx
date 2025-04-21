import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '../component/header';
import Footer from './home/Footer';
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const CategoryWiseBlogs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [blogs, setBlogs] = useState([]);
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
    setBlogs(location?.state);
  }, [location?.state]);

  return (
    <>
      <Header />
      <section className="categoryWiseBlogs mt-5 pt-4">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <img src={blogs[0]?.category?.image?.image} alt={blogs[0]?.category?.image?.image} className='rounded-circle px-0 object-fit-cover mb-2' style={{ width: '200px', height: '200px' }} />
            <h1 className="text-center text-uppercase fw-bold">#{blogs[0]?.category?.name}</h1>
            <p className='col-8' style={{ textAlign: 'justify' }}>{blogs[0]?.category?.description}</p>
          </div>
          <div className="row justify-content-center">
            {blogs.map((blog, index) => {
              return (
                <div key={++index} className="col-lg-3 card border-0 mb-3">
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
                    <span className='mb-2'>{timeAgo(blog?.createdAt)}</span>
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
            })}
          </div>
        </div>
        <ToastContainer
          position='top-center'
          autoClose={2000}
        />
      </section>
      <Footer />
    </>
  )
}

export default CategoryWiseBlogs
