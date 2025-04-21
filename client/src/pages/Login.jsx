import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom';
import Header from '../component/header';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useAuth();

  const [showPassword, setShowPassword] = useState(null);

  useEffect(() => {
    let userRole = auth?.token?.user?.role;
    if (userRole == 'admin') {
      navigate('/admin/dashboard')
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
            navigate('/admin/dashboard')
          }, 2000);
        } else if (userrole == 'user') {
          setTimeout(() => {
            navigate('/user/dashboard')
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
      <section className='login'>
        <div className="container" style={{ marginTop: '20vh' }}>
          <div className="row">
            <div className="card col-5 border-0 mx-auto">
              <div className="card-header bg-white border-0">
                <h3>Login</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="form-control border-0 border-bottom border-black rounded-0 pb-2 px-0 bg-transparent" placeholder='abc@gmail.com' />
                  </div>
                  <div className="mb-4 position-relative">
                    {showPassword == 'show' ? (
                      <>
                        <input type="text" onChange={(e) => setPassword(e.target.value)} value={password} className="form-control border-0 border-bottom border-black rounded-0 pb-2 ps-0 pe-5 bg-transparent" placeholder='Password' />
                        <i onClick={() => setShowPassword(null)} className='fa-solid fa-eye position-absolute top-50' style={{ cursor: 'pointer', right: '10px', transform: 'translateY(-50%)' }}></i>
                      </>
                    ) : (
                      <>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="form-control border-0 border-bottom border-black rounded-0 pb-2 ps-0 pe-5 bg-transparent" placeholder='Password' />
                        <i onClick={() => setShowPassword('show')} className='fa-solid fa-eye-slash position-absolute top-50' style={{ cursor: 'pointer', right: '10px', transform: 'translateY(-50%)' }}></i>
                      </>
                    )}
                  </div>
                  <button type="submit" className="btn btn-dark mb-3 mt-1">Login</button>
                  <div>Not a member? <Link to={'/register'} className='register border-bottom border-secondary text-secondary' style={{ transition: 'all .3s' }}>Register</Link></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer
        position='top-center'
        autoClose={2000}
      />
    </>
  )
}

export default Login
