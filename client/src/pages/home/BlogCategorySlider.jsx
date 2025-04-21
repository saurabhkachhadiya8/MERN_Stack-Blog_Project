import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const BlogCategorySlider = ({ blogCategory_Props }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [blogCategory, setBlogCategory] = useState([]);
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
  }, [blogCategory_Props]);

  return (
    <>
      {(!blogCategory.length || !blogCategory) ? '' : (
        <section className='blogCategory mt-5'>
          <div className="container pb-4 border-bottom">
            <div className="row position-relative">
              <div className="blogCategoryBtn position-absolute z-2 rounded p-0">
                <button className="swiper-button-prev custom-prev"></button>
                <button className="swiper-button-next custom-next"></button>
              </div>
              <Swiper
                className='blogCategorySlider rounded overflow-hidden text-center fw-medium text-capitalize'
                slidesPerView={10}
                navigation={{
                  nextEl: '.custom-next',
                  prevEl: '.custom-prev',
                }}
                modules={[Navigation]}
              >
                {blogCategory.map((blogcat, index) => {
                  return <SwiperSlide key={++index} className='blogCategorySlide'>
                    <span onClick={(e) => handleCategoryWiseBlogs(e, blogcat)} style={{ cursor: "pointer" }}>#{blogcat?.name}</span>
                  </SwiperSlide>
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

export default BlogCategorySlider
