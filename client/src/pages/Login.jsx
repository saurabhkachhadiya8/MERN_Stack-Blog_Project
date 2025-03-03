import React, { useEffect, useState } from 'react'
import Header from '../component/header'
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let userRole = auth?.token?.user?.role;
    if (userRole == 'admin') {
      navigate('/admin/dashboard')
    } else if (userRole == 'manager') {
      navigate('/manager/dashboard')
    } else if (userRole == 'user') {
      navigate('/user/dashboard')
    }
  }, [auth?.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        toast.error('All Fields Are Required');
        return false;
      }
      let res = await fetch(`http://localhost:8080/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
      let user = await res.json();
      if (user.success) {
        let userlogin = {
          token: user?.token,
          user: user?.user
        }
        localStorage.setItem('token', JSON.stringify(userlogin));
        setAuth({
          ...auth,
          token: userlogin
        });
        toast.success(user?.message);
        let userrole = user?.user?.role;
        if (userrole == 'admin') {
          setTimeout(() => {
            navigate('admin/dashboard')
          }, 2000);
        } else if (userrole == 'manager') {
          setTimeout(() => {
            navigate('manager/dashboard')
          }, 2000);
        } else if (userrole == 'user') {
          setTimeout(() => {
            navigate('user/dashboard')
          }, 2000);
        }
        setEmail('');
        setPassword('');
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
              <h4>User Login</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" placeholder='Enter Your Email' />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" placeholder='Enter Your Password' />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
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

export default Login
