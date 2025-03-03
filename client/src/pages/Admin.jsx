import React from 'react'
import { useAuth } from '../context/AuthContext'
import Header from '../component/header';

const Admin = () => {

  const [auth, setAuth] = useAuth();
  console.log(auth);


  return (
    <div>
      <Header />
      <h1>Helo Admin</h1>
    </div>
  )
}

export default Admin
