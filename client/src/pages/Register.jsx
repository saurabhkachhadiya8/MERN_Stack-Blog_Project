import React, { useState } from 'react'
import Header from '../component/header'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [contact, setContact] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword || !gender || !city || !contact || !image) {
      toast.error('All Fields Are Required');
      return false;
    }
    if (password != confirmPassword) {
      toast.error('Passwords Are Not Match');
      return false;
    }
    const formdata = new FormData;
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("gender", gender);
    formdata.append("city", city);
    formdata.append("contact", contact);
    formdata.append("userimage", image);
    try {
      let res = await fetch(`http://localhost:8080/register`, {
        method: 'POST',
        body: formdata
      });
      let user = await res.json();
      if (user.success) {
        toast.success(user?.message);
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setGender('');
        setCity('');
        setContact('');
        setImage('');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        toast.error(user?.message);
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="row">
          <div className="card col-6">
            <div className="card-header bg-white">
              <h4>User Register</h4>
            </div>
            <div className="card-body">
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
                  <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
                  <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} className="form-control" placeholder='Confirm Your Password' />
                </div>
                <div className="mb-3">
                  <label htmlFor="gender" className="form-label">Gender</label><br />
                  <input type="radio" onChange={(e) => setGender(e.target.value)} value={'male'} /> Male &nbsp;&nbsp;
                  <input type="radio" onChange={(e) => setGender(e.target.value)} value={'female'} /> Female
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
                  <label htmlFor="image" className="form-label">Image</label>
                  <input type="file" onChange={(e) => setImage(e.target.files[0])} className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position='top-center'
        autoClose={2000}
      />
    </>
  )
}

export default Register
