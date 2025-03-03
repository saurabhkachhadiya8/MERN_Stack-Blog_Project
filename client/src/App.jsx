import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './App.css'
import Login from './pages/login'
import Register from './pages/register'
import PrivateRoute from './Private/PrivateRoute'
import Admin from './pages/Admin'
import Manager from './pages/Manager'
import User from './pages/User'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/admin' element={<PrivateRoute allowedRoles={['admin']} />} >
          <Route path='dashboard' element={<Admin />} />
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
