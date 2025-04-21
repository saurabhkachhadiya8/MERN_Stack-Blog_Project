import React, { useEffect, useRef, useState } from 'react'
import Header from '../../component/header'
import Usersidebar from '../../component/Usersidebar';
import { toast, ToastContainer } from 'react-toastify'
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const [auth, setAuth] = useAuth();
  const [profile, setProfile] = useState();
  const [blogs, setBlogs] = useState([]);
  const [commentedBlogs, setCommentedBlogs] = useState([]);
  const [likedBlogs, setLikedBlogs] = useState([]);
  // form data 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [contact, setContact] = useState('');
  const [image, setImage] = useState('');
  const newImage = useRef();
  // edit profile 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData;
    formdata.append('userid', auth?.token?.user?._id);
    formdata.append('name', name);
    formdata.append('email', email);
    formdata.append('password', password);
    formdata.append('gender', gender);
    formdata.append('city', city);
    formdata.append('contact', contact);
    formdata.append('userimage', image);
    let res = await fetch(`http://localhost:8080/user/updateprofile`, ({
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${auth?.token?.token}`
      },
      body: formdata
    }));
    let data = await res.json();
    if (data.success) {
      toast.success(data?.message);
      newImage.current.value = '';
      setAuth({
        token: {
          ...auth.token,
          user: data?.data
        }
      });
    } else {
      toast.error(data?.message);
    }
  }
  // blog 
  const userViewBlogs = async () => {
    let res = await fetch(`http://localhost:8080/user/viewblog`, ({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth?.token?.token}`
      }
    }));
    let data = await res.json();
    if (data.success) {
      setBlogs(data?.userBlogs);
    }
  }
  // commented blog
  const userCommentedBlogs = async () => {
    let res = await fetch(`http://localhost:8080/user/commented_blog`, ({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth?.token?.token}`
      }
    }));
    let data = await res.json();
    if (data.success) {
      setCommentedBlogs(data?.allBlogs);
    }
  }
  // liked blog
  const userLikedBlogs = async () => {
    let res = await fetch(`http://localhost:8080/user/liked_blog`, ({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth?.token?.token}`
      }
    }));
    let data = await res.json();
    if (data.success) {
      setLikedBlogs(data?.allBlogs);
    }
  }
  useEffect(() => {
    userViewBlogs();
    userCommentedBlogs();
    userLikedBlogs();
    setProfile(auth?.token?.user);
    setName(auth?.token?.user?.name);
    setEmail(auth?.token?.user?.email);
    setPassword(auth?.token?.user?.password);
    setGender(auth?.token?.user?.gender);
    setCity(auth?.token?.user?.city);
    setContact(auth?.token?.user?.contact);
    setImage(auth?.token?.user?.image);
  }, [auth?.token?.user]);

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
            <div className="container">
              <div className="row">
                <div className="col-md-5">
                  <div className="card text-center">
                    <img src={profile?.image} className="card-img-top mx-auto mt-4 rounded-circle" alt={profile?.image} style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
                    <div className="card-body">
                      <h2 className="card-title">{profile?.name}</h2>
                      <p className="card-text fs-5">{profile?.role}</p>
                      <div className="d-flex justify-content-evenly">
                        <Link to={'/user/viewblogs'} className="btn btn-success">
                          <h5 className="card-title">Blogs</h5>
                          <p className="card-text">{blogs.length}</p>
                        </Link>
                        <Link to={'/user/commented_blog'} className="btn btn-primary">
                          <h5 className="card-title">Commented</h5>
                          <p className="card-text">{commentedBlogs.length}</p>
                        </Link>
                        <Link to={'/user/liked_blog'} className="btn btn-danger">
                          <h5 className="card-title">Liked</h5>
                          <p className="card-text">{likedBlogs.length}</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-7">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="form-control" placeholder='Enter Your Name' />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" placeholder='Enter Your Email' />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" placeholder='Enter Your Password' />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="gender" className="form-label">Gender</label>
                      <select className="form-control" onChange={(e) => setGender(e.target.value)} value={gender}>
                        <option value="" disabled selected>---- Select Gender ----</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="city" className="form-label">City</label>
                      <input type="text" onChange={(e) => setCity(e.target.value)} value={city} className="form-control" placeholder='Enter Your City' />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="contact" className="form-label">contact</label>
                      <input type="text" onChange={(e) => setContact(e.target.value)} value={contact} className="form-control" placeholder='Enter Your contact' />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="image" className="form-label">Change Profile Image</label>
                      <div className="d-flex justify-content-between">
                        <input type="file" className="form-control" onChange={(e) => { setImage(e.target.files[0]); }} ref={newImage} style={{ height: image != profile?.image && '150px', width: image != profile?.image && '49%' }} />
                        {(image && image != profile?.image) && <img src={URL.createObjectURL(image)} alt={image} width={'100%'} style={{ height: '150px', objectFit: 'cover', width: '49%' }} className='rounded' />}
                      </div>
                    </div>
                    {(profile?.name != name || profile?.email != email || profile?.password != password || profile?.gender != gender || profile?.city != city || profile?.contact != contact || profile?.image != image) && <button type="submit" className="btn btn-dark">Save</button>}
                  </form>
                </div>
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

export default UserProfile
