import React, { useState } from 'react'
import Header from '../component/header'
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name || !email || !password || !confirmPassword) {
        toast.error('All Fields Are Required');
        return false;
      }
      if (password != confirmPassword) {
        toast.error('Passwords Are Not Match');
        return false;
      }
      let res = await fetch(`http://localhost:8080/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password
        })
      });
      let user = await res.json();
      if (user.success) {
        toast.success(user?.message);
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
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
