import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './App.css'
import Home from './pages/Home'
import Login from './pages/login'
import Register from './pages/register'
import PrivateRoute from './Private/PrivateRoute'
// admin 
import AdminDashboard from './pages/admin/AdminDashboard'
import Admins from './pages/admin/Admins'
import AdminUsers from './pages/admin/AdminUsers'
import AdminAddBlogCategory from './pages/admin/AdminAddBlogCategory'
import AdminViewBlogCategory from './pages/admin/AdminViewBlogCategory'
import AdminEditBlogCategory from './pages/admin/AdminEditBlogCategory'
import AdminViewBlogs from './pages/admin/AdminViewBlogs'
import AdminAddBlog from './pages/admin/AdminAddBlog'
import AdminEditBlog from './pages/admin/AdminEditBlog'
import AdminProfile from './pages/admin/AdminProfile'
import AdminCommentedBlog from './pages/admin/AdminCommentedBlog'
import AdminLikedBlog from './pages/admin/AdminLikedBlog'
// user 
import UserDashboard from './pages/user/UserDashboard'
import UserViewBlogs from './pages/user/UserViewBlogs'
import UserAddBlog from './pages/user/UserAddBlog'
import UserEditBlog from './pages/user/UserEditBlog'
import UserProfile from './pages/user/UserProfile'
import UserCommentedBlog from './pages/user/UserCommentedBlog'
import UserLikedBlog from './pages/user/UserLikedBlog'
// single blog 
import SingleBlogDetail from './pages/SingleBlogDetail'
// category wise blogs 
import CategoryWiseBlogs from './pages/CategoryWiseBlogs'
// author wise blogs
import AuthorWiseBlogs from './pages/AuthorWiseBlogs'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/blog' element={<SingleBlogDetail />} />
        <Route path='/category_wise_blogs' element={<CategoryWiseBlogs />} />
        <Route path='/author_wise_blogs' element={<AuthorWiseBlogs />} />
        <Route path='/admin' element={<PrivateRoute allowedRoles={['admin']} />} >
          <Route path='dashboard' element={<AdminDashboard />} />
          <Route path='admins' element={<Admins />} />
          <Route path='users' element={<AdminUsers />} />
          <Route path='addblogcategory' element={<AdminAddBlogCategory />} />
          <Route path='viewblogcategory' element={<AdminViewBlogCategory />} />
          <Route path='editblogcategory' element={<AdminEditBlogCategory />} />
          <Route path='viewblogs' element={<AdminViewBlogs />} />
          <Route path='addblog' element={<AdminAddBlog />} />
          <Route path='editblog' element={<AdminEditBlog />} />
          <Route path='profile' element={<AdminProfile />} />
          <Route path='commented_blog' element={<AdminCommentedBlog />} />
          <Route path='liked_blog' element={<AdminLikedBlog />} />
        </Route>
        <Route path='/user' element={<PrivateRoute allowedRoles={['user']} />} >
          <Route path='dashboard' element={<UserDashboard />} />
          <Route path='viewblogs' element={<UserViewBlogs />} />
          <Route path='addblog' element={<UserAddBlog />} />
          <Route path='editblog' element={<UserEditBlog />} />
          <Route path='profile' element={<UserProfile />} />
          <Route path='commented_blog' element={<UserCommentedBlog />} />
          <Route path='liked_blog' element={<UserLikedBlog />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
