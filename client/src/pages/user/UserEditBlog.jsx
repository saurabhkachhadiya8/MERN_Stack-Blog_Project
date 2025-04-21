import React, { useEffect, useState } from 'react'
import Header from '../../component/header'
import Usersidebar from '../../component/Usersidebar';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

const UserEditBlog = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [blogId, setBlogId] = useState('');
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [active_BlogCategory, setActive_BlogCategory] = useState([]);
  const fetchBlogCategory = async () => {
    let res = await fetch(`http://localhost:8080/user/viewblogcategory`, ({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth?.token?.token}`
      }
    }));
    let data = await res.json();
    if (data.success) {
      setActive_BlogCategory(data?.active_BlogCategory.sort((a, b) => a?.name.localeCompare(b?.name)));
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData;
    formdata.append("id", blogId);
    formdata.append("category", category);
    formdata.append("title", title);
    formdata.append("content", content);
    formdata.append("thumbnail", thumbnail);
    let res = await fetch(`http://localhost:8080/user/updateblog`, ({
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${auth?.token?.token}`
      },
      body: formdata
    }));
    let blog = await res.json();
    if (blog?.success) {
      toast.success(blog?.message);
      setTimeout(() => {
        navigate('/user/viewblogs');
      }, 2000);
    } else {
      toast.error(blog?.message);
    }
  }
  useEffect(() => {
    fetchBlogCategory();
    setBlogId(location?.state?._id);
    setCategory(location?.state?.category?._id);
    setTitle(location?.state?.title);
    setContent(location?.state?.content);
    setThumbnail(location?.state?.thumbnail?.image);
  }, [auth && location?.state]);

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="row">
          <h1 className='mb-4'>Welcome {auth?.token?.user?.name}</h1>
          <div className="col-md-3">
            <Usersidebar />
          </div>
          <div className="col-md-9">
            <div className="card">
              <div className="card-header">
                <h4>Edit Blog</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Category</label>
                    <select className="form-control" onChange={(e) => setCategory(e.target.value)} value={category}>
                      <option value="" disabled>---- Select Category ----</option>
                      {active_BlogCategory.map((blogcat, i) => {
                        return <option key={++i} value={blogcat?._id}>{blogcat?.name.toUpperCase()}</option>
                      })}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" placeholder='Enter blog title' onChange={(e) => setTitle(e.target.value)} value={title} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="content" className="form-label">Content</label>
                    <textarea className="form-control" rows="5" placeholder='Enter blog content' onChange={(e) => setContent(e.target.value)} value={content}></textarea>
                  </div>
                  <div className="mb-3 d-flex justify-content-between">
                    <div style={{ width: '49%' }}>
                      <label htmlFor="thumbnail" className="form-label">Change Thumbnail</label>
                      <input type="file" className="form-control" onChange={(e) => { setThumbnail(e.target.files[0]) }} style={{ height: '150px' }} />
                    </div>
                    <div style={{ width: '49%' }}>
                      <label htmlFor="thumbnail" className="form-label">{location?.state?.thumbnail?.image == thumbnail ? 'Old Thumbnail' : 'New Thumbnail'}</label>
                      {thumbnail && <img src={location?.state?.thumbnail?.image == thumbnail ? thumbnail : URL.createObjectURL(thumbnail)} alt={thumbnail} width={'100%'} style={{ height: '150px', objectFit: 'cover' }} className='rounded' />}
                    </div>
                  </div>
                  <button type="submit" className="btn btn-dark">Update</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position='top-center'
        autoClose={2000}
      />
    </div>
  )
}

export default UserEditBlog
