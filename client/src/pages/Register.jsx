import React, { useState } from 'react'
import Header from '../component/header'
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

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

  const [showPassword, setShowPassword] = useState(null);
  const [showConPassword, setShowConPassword] = useState(null);

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
        setTimeout(() => {
          navigate('/login');
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
      <div className="register">
        <div className="container" style={{ marginTop: '5vh' }}>
          <div className="row">
            <div className="card col-5 border-0 mx-auto">
              <div className="card-header bg-white border-0">
                <h3>Register</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="form-control border-0 border-bottom border-black rounded-0 pb-2 px-0 bg-transparent" placeholder='abc' />
                  </div>
                  <div className="mb-3">
                    <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="form-control border-0 border-bottom border-black rounded-0 pb-2 px-0 bg-transparent" placeholder='abc@gmail.com' />
                  </div>
                  <div className="mb-3 position-relative">
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
                  <div className="mb-3 position-relative">
                    {showConPassword == 'show' ? (
                      <>
                        <input type="text" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} className="form-control border-0 border-bottom border-black rounded-0 pb-2 px-0 bg-transparent" placeholder='Confirm Password' />
                        <i onClick={() => setShowConPassword(null)} className='fa-solid fa-eye position-absolute top-50' style={{ cursor: 'pointer', right: '10px', transform: 'translateY(-50%)' }}></i>
                      </>
                    ) : (
                      <>
                        <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} className="form-control border-0 border-bottom border-black rounded-0 pb-2 px-0 bg-transparent" placeholder='Confirm Password' />
                        <i onClick={() => setShowConPassword('show')} className='fa-solid fa-eye-slash position-absolute top-50' style={{ cursor: 'pointer', right: '10px', transform: 'translateY(-50%)' }}></i>
                      </>
                    )}
                  </div>
                  <div className="mb-3">
                    <select className="form-control border-0 border-bottom border-black rounded-0 pb-2 px-0 bg-transparent" onChange={(e) => setGender(e.target.value)} value={gender}>
                      <option value="" disabled selected>---- Select Gender ----</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <input type="text" onChange={(e) => setCity(e.target.value)} value={city} className="form-control border-0 border-bottom border-black rounded-0 pb-2 px-0 bg-transparent" placeholder='City' />
                  </div>
                  <div className="mb-3">
                    <input type="text" onChange={(e) => setContact(e.target.value)} value={contact} className="form-control border-0 border-bottom border-black rounded-0 pb-2 px-0 bg-transparent" placeholder='Contact' />
                  </div>
                  <div className="mb-4">
                    <div className="d-flex justify-content-between">
                      <input type="file" className="form-control border-0 border-bottom border-black rounded-0 pb-2 px-0 bg-transparent" onChange={(e) => { setImage(e.target.files[0]); }} style={{ height: image && '150px', width: image && '49%' }} />
                      {image && <img src={URL.createObjectURL(image)} alt={image} width={'100%'} style={{ height: '150px', objectFit: 'cover', width: '49%' }} className='rounded' />}
                    </div>
                  </div>
                  <button type="submit" className="btn btn-dark mb-3 mt-1">Register</button>
                  <div>Have an account? <Link to={'/login'} className='login border-bottom border-secondary text-secondary' style={{ transition: 'all .3s' }}>Login</Link></div>
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
    </>
  )
}

export default Register
