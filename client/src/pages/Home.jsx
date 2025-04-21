import React, { useEffect, useState } from 'react';
import Header from '../component/header';
import BlogCategorySlider from './home/BlogCategorySlider';
import Blog from './home/blog';
import BlogCategorySliderWithDetail from './home/BlogCategorySliderWithDetail';
import { HorizontalAdvertisement } from './home/Advertisement';
import BlogSlider from './home/BlogSlider';
import { AllBlogs } from './home/AllBlogs';
import Footer from './home/Footer';
import Email from './home/Email';

const Home = () => {
  // blog category 
  const [blogCategory, setBlogCategory] = useState([]);
  // blog 
  const [blogs, setBlogs] = useState([]);
  // all blogs 
  const [allBlogs, setAllBlogs] = useState([]);

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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <BlogCategorySlider blogCategory_Props={blogCategory} />
      <Blog blogs_Props={blogs} />
      <BlogCategorySliderWithDetail blogCategory_Props={blogCategory} blogs_Props={blogs} />
      <HorizontalAdvertisement />
      <BlogSlider blogs_Props={[...blogs].sort(() => Math.random() - 0.5).slice(0, 6)} /> {/* [...blogs] create new copy of array so not change main array :- blogs */}
      <Email />
      <AllBlogs blogs_Props={blogs} blogCategory_Props={blogCategory} allBlogs_Props={allBlogs} />
      <Footer />
    </>
  )
};

export default Home;
