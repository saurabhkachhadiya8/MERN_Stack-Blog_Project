import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const BlogCategorySliderWithDetail = ({ blogCategory_Props, blogs_Props }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [blogCategory, setBlogCategory] = useState([]);
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
  useEffect(() => {
    setBlogCategory(blogCategory_Props);
    setBlogs(blogs_Props);
  }, [blogCategory_Props && blogs_Props]);

  return (
    <>
      {blogCategory.length && (
        <section className='blogCategoryWithDetail mt-5 pt-4'>
          <div className="container px-5">
            <div className="row px-5">
              <Swiper
                className='blogCategorySlider rounded overflow-hidden text-center fw-medium text-capitalize'
                slidesPerView={6}
              >
                {blogCategory.map((blogcat, index) => {
                  return (
                    <SwiperSlide key={++index} className='blogCategorySlide'>
                      <img onClick={(e) => handleCategoryWiseBlogs(e, blogcat)} src={blogcat?.image?.image} alt={blogcat?.image?.image} width={'150px'} height={'150px'} className='rounded-circle object-fit-cover' style={{ cursor: 'pointer' }} />
                      <h5 onClick={(e) => handleCategoryWiseBlogs(e, blogcat)} className='name text-uppercase fw-semibold mt-3 mb-0 mx-auto'>{blogcat?.name}</h5>
                      <span className='text-secondary'>{blogs.filter((blog) => blog?.category?._id == blogcat?._id).length} Blogs</span>
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
      )}
    </>
  )
}

export default BlogCategorySliderWithDetail
