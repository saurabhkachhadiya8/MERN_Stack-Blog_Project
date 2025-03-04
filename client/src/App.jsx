import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './App.css'
import Login from './pages/login'
import Register from './pages/register'
import PrivateRoute from './Private/PrivateRoute'

import AdminDashboard from './pages/admin/AdminDashboard'
import Admins from './pages/admin/Admins'
import AdminManagers from './pages/admin/AdminManagers'
import AdminUsers from './pages/admin/AdminUsers'
import AdminViewBlogs from './pages/admin/AdminViewBlogs'
import AdminProfile from './pages/admin/AdminProfile'

import Manager from './pages/Manager'
import User from './pages/User'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/admin' element={<PrivateRoute allowedRoles={['admin']} />} >
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='admins' element={<Admins />} />
          <Route path='managers' element={<AdminManagers />} />
          <Route path='users' element={<AdminUsers />} />
          <Route path='viewblogs' element={<AdminViewBlogs />} />
          <Route path='profile' element={<AdminProfile />} />
        </Route>
        <Route path='/manager' element={<PrivateRoute allowedRoles={['manager']} />} >
          <Route path='dashboard' element={<Manager />} />
        </Route>
        <Route path='/user' element={<PrivateRoute allowedRoles={['user']} />} >
          <Route path='dashboard' element={<User />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
