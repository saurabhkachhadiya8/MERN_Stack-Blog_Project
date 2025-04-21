import React, { useEffect, useState } from 'react'
import Header from '../../component/header'
import Usersidebar from '../../component/Usersidebar';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserAddBlog = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
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
    formdata.append("category", category);
    formdata.append("title", title);
    formdata.append("content", content);
    formdata.append("thumbnail", thumbnail);
    let res = await fetch(`http://localhost:8080/user/addblog`, ({
      method: 'POST',
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
  }, [auth?.token]);

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
                <h4>Add Blog</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Category</label>
                    <select className="form-control" onChange={(e) => setCategory(e.target.value)} >
                      <option value="" selected disabled>---- Select Category ----</option>
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
                  <div className="mb-3">
                    <label htmlFor="thumbnail" className="form-label">Thumbnail</label>
                    <div className="d-flex justify-content-between">
                      <input type="file" className="form-control" onChange={(e) => { setThumbnail(e.target.files[0]); }} style={{ height: thumbnail && '150px', width: thumbnail && '49%' }} />
                      {thumbnail && <img src={URL.createObjectURL(thumbnail)} alt={thumbnail} width={'100%'} style={{ height: '150px', objectFit: 'cover', width: '49%' }} className='rounded' />}
                    </div>
                  </div>
                  <button type="submit" className="btn btn-dark">Create</button>
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

export default UserAddBlog
