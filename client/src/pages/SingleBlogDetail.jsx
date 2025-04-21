import React, { useEffect, useState } from 'react'
import Header from '../component/header'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Email from './home/Email';
import { PopRecBlog_Categories_Ad } from './home/AllBlogs';
import { useAuth } from '../context/AuthContext';
import Footer from './home/Footer';
import { toast, ToastContainer } from 'react-toastify';

const SingleBlogDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuth();
  // single blog 
  const [blog, setBlog] = useState();
  // blog category 
  const [blogCategory, setBlogCategory] = useState([]);
  // blog 
  const [blogs, setBlogs] = useState([]);
  // related single blog 
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  const fetchData = async () => {
    let res = await fetch(`http://localhost:8080/home/fetchdata`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    let data = await res.json();
    if (data.success) {
      setBlogCategory(data?.blogCategory);
      setBlogs(data?.blogs);
      setRelatedBlogs(data?.allBlogs.filter((blog) => blog?.category?.name == location?.state?.category?.name && blog?._id != location?.state?._id).sort(() => Math.random() - 0.5));
    }
  };
  const handleCategoryWiseBlogs = async (e, blogcat) => {
    e.preventDefault();
    if (!auth?.token) {
      toast.error('Login to Open Category Details');
      return setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
    let res = await fetch(`http://localhost:8080/category_wise_blog/fetchdata?id=${blogcat?._id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    let data = await res.json();
    if (data.success) {
      (!data?.categoryWiseBlogs || !data?.categoryWiseBlogs.length) ? toast.error(`No Blog Available of "${blogcat?.name.toUpperCase()}"`) : navigate('/category_wise_blogs', { state: data?.categoryWiseBlogs });
    }
  };
  const handleAuthorWiseBlogs = async (e, blogauthor) => {
    e.preventDefault();
    if (!auth?.token) {
      toast.error('Login to Open Author Details');
      return setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
    let res = await fetch(`http://localhost:8080/author_wise_blog/fetchdata?id=${blogauthor?._id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    let data = await res.json();
    if (data.success) {
      (!data?.authorWiseBlogs || !data?.authorWiseBlogs.length) ? toast.error(`No Blog Available of "${blogauthor?.name}"`) : navigate('/author_wise_blogs', { state: data?.authorWiseBlogs });
    }
  };
  const timeAgo = (timestamp) => {
    const diffMs = Date.now() - new Date(timestamp).getTime();
    const diffSec = Math.floor(diffMs / 1000);
    if (diffSec < 60) return `${diffSec} seconds ago`;

    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin} minutes ago`;

    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr} hours ago`;

    const diffDay = Math.floor(diffHr / 24);
    if (diffDay < 30) return `${diffDay} days ago`;

    const diffMonth = Math.floor(diffDay / 30);
    if (diffMonth < 12) return `${diffMonth} months ago`;

    const diffYear = Math.floor(diffMonth / 12);
    return `${diffYear} years ago`;
  };
  useEffect(() => {
    setBlog(location?.state);
    fetchData();
  }, [location?.state]);

  return (
    <>
      <Header />
      <section className='singleBlogDetail mt-5 pt-4'>
        <div className="container">
          <div className="row">
            <div className="col-md-9 position-sticky h-100" style={{ top: '-100%' }}>
              <div className="row text-uppercase">
                <h6 className="border-top border-bottom py-2 text-black fw-bolder">
                  <Link to={'/'} className='home text-black me-3'>Home</Link>/<span onClick={(e) => handleCategoryWiseBlogs(e, blog?.category)} className='category mx-3'>{blog?.category?.name}</span>/<span className='ms-3'>{blog?.title}</span>
                </h6>
              </div>
              <div className="row pt-4">
                <h1 className='fw-bold mb-4' style={{ fontSize: '50px' }}>{blog?.title}</h1>
                <div className='d-flex align-items-center'>
                  <img src={blog?.author?.image} alt={blog?.author?.image} className='object-fit-cover rounded-circle me-2' style={{ width: '45px', height: '45px' }} />
                  <div>
                    <span onClick={(e) => handleCategoryWiseBlogs(e, blog?.category)} className="card-text fw-bolder fs-5 me-4">{blog?.author?.name}</span>
                    <span>{timeAgo(blog?.createdAt)}</span>
                  </div>
                </div>
              </div>
              <div className="row pt-5 d-flex flex-column align-items-center">
                <div className="col-md-12">
                  <img src={blog?.thumbnail?.image} alt={blog?.thumbnail?.image} className='rounded w-100 object-fit-cover' />
                </div>
                <div className="col-md-10 pt-5">
                  <p className='fs-5' style={{ textAlign: 'justify' }}>{blog?.content}</p>
                </div>
              </div>
              <div className="row d-flex flex-column align-items-center">
                <div className="col-md-10 pt-5">
                  <CommentBox blog_Props={blog} />
                </div>
              </div>
              <div className="row d-flex flex-column align-items-center">
                <div className="col-md-12 pt-5">
                  <LikeDislikeBox blog_Props={blog} />
                </div>
              </div>
              {!relatedBlogs.length ? '' : (
                <>
                  <div className="row mt-5 pt-4">
                    <h2 className='fw-bolder mb-3'>Related Posts</h2>
                    <div className="row">
                      {relatedBlogs.slice(0, 3).map((blog, index) => {
                        return (
                          <div key={++index} className="col-lg-4 card border-0 mb-2">
                            <img onClick={(e) => {
                              e.preventDefault();
                              navigate('/blog', { state: blog });
                              window.location.reload();
                            }} src={blog?.thumbnail?.image} className="card-img-top rounded object-fit-cover" alt={blog?.thumbnail?.image} height={'200px'} style={{ cursor: 'pointer' }} />
                            <div className="card-body px-0 py-2">
                              <p onClick={(e) => handleCategoryWiseBlogs(e, blog?.category)} className="category card-text mb-2 text-uppercase fw-bold text-secondary">#{blog?.category?.name}</p>
                              <h4 onClick={(e) => {
                                e.preventDefault();
                                navigate('/blog', { state: blog });
                                window.location.reload();
                              }} className="title card-title mb-0">{blog?.title}</h4>
                              <p onClick={(e) => handleAuthorWiseBlogs(e, blog?.author)} className='author mb-0 fst-italic ms-auto'>-- {blog?.author?.name}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </>
              )}
              <div className="row">
                <Email />
              </div>
            </div>
            <div className="col-lg-3 position-sticky h-100" style={{ top: '-100%' }}>
              <PopRecBlog_Categories_Ad blogs_Props={blogs} blogCategory_Props={blogCategory} />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
const CommentBox = ({ blog_Props }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [blog, setBlog] = useState();
  const [comment, setComment] = useState();
  const [viewComments, setViewComments] = useState(null);
  const [editId, setEditId] = useState('');
  const addComment = async (e, blogid) => {
    e.preventDefault();
    if (!auth?.token) {
      toast.error('Please login to comment');
      return setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
    let res = await fetch(`${auth?.token?.user?.role == 'admin' ? 'http://localhost:8080/admin/addblogcomment' : auth?.token?.user?.role == 'user' && 'http://localhost:8080/user/addblogcomment'}`, ({
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth?.token?.token}`
      },
      body: JSON.stringify({
        id: blogid,
        text: comment
      })
    }));
    let data = await res.json();
    if (data.success) {
      toast.success(data?.message);
      setComment('');
    } else {
      toast.error(data?.message);
    }
  }
  const editComment = async (e, comment) => {
    e.preventDefault();
    setComment(comment?.text);
    setEditId(comment?._id);
    setViewComments(null);
  }
  const updateComment = async (e) => {
    e.preventDefault();
    let res = await fetch(`${auth?.token?.user?.role == 'admin' ? 'http://localhost:8080/admin/editblogcomment' : auth?.token?.user?.role == 'user' && 'http://localhost:8080/user/editblogcomment'}`, ({
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth?.token?.token}`
      },
      body: JSON.stringify({
        id: editId,
        text: comment
      })
    }));
    let data = await res.json();
    if (data.success) {
      toast.success(data?.message);
      setBlog(data?.updatedBlog);
      setComment('');
      setEditId('');
    } else {
      toast.error(data?.message);
    }
  }
  const deleteComment = async (e, commentid) => {
    e.preventDefault();
    let res = await fetch(`${auth?.token?.user?.role == 'admin' ? `http://localhost:8080/admin/deleteblogcomment?id=${commentid}` : auth?.token?.user?.role == 'user' && `http://localhost:8080/user/deleteblogcomment?id=${commentid}`}`, ({
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth?.token?.token}`
      }
    }));
    let data = await res.json();
    if (data.success) {
      toast.success(data?.message);
      setBlog(data?.updatedBlog);
    } else {
      toast.error(data?.message);
    }
  }
  useEffect(() => {
    setBlog(blog_Props);
  }, [blog_Props]);
  return (
    <>
      <div className='CommentBox p-5 rounded position-relative' style={{ backgroundColor: '#f5f5f5', boxShadow: '0 1px 3px rgba(0, 0, 0, .15)' }}>
        <h4 className='heading mb-3 d-flex justify-content-between align-items-center'>Leave a reply
          {blog?.comments.length >= 1 && (
            <span onClick={() => setViewComments(!viewComments ? `show-${blog?._id}` : null)} className='fs-5 text-black border-bottom border-black' style={{ transition: 'all .3s', cursor: 'pointer' }}>{`${blog?.comments.length} ${blog?.comments.length > 1 ? 'Comments' : 'Comment'}`}</span>
          )}
        </h4>
        <form onSubmit={(e) => !editId ? addComment(e, blog?._id) : updateComment(e)}>
          <div className="mb-3">
            <textarea onChange={(e) => setComment(e.target.value)} value={comment} name="comment" className="form-control border-0 border-bottom border-black rounded-0 pb-3 px-0 bg-transparent" placeholder='Comment' rows={1}></textarea>
          </div>
          <button type="submit" className="btn btn-dark w-100 text-uppercase">Post Comment</button>
        </form>
        {viewComments == `show-${blog?._id}` && (
          <div className="comments position-absolute w-100 start-0 bottom-0 p-5" style={{ backgroundColor: '#f5f5f5', boxShadow: '0 1px 3px rgba(0, 0, 0, .15)', overflowY: 'auto', height: '200%', scrollbarWidth: 'thin' }}>
            <button onClick={() => setViewComments(null)} className="btn btn-dark position-absolute top-0 end-0 rounded-0 fs-5 p-0" style={{ cursor: 'pointer', width: '40px', height: '40px' }}><i className='fas fa-close'></i></button>
            <div className='h-100 overflow-y-auto' style={{ scrollbarWidth: 'none' }}>
              {blog?.comments.map((comment, i) => {
                return (
                  <div key={++i} className='mb-3'>
                    <div className="d-flex align-items-center">
                      <img src={comment?.user?.image} alt={comment?.user?.image} width={45} height={45} className='object-fit-cover rounded-circle' />
                      <p className="card-text fw-bold mb-0 ps-2 fs-5">{comment?.user?.name}</p>
                      {blog?.author?._id == comment?.user?._id && <span className='ms-2 px-2 bg-black text-white rounded' style={{ fontSize: '13px' }}>Author</span>}
                      {auth?.token?.user?.role == 'admin' ? (
                        (comment?.user?.role == 'admin' && comment?.user?._id != auth?.token?.user?._id) ? '' : (
                          <div className="dropdown ms-auto">
                            <button className="btn p-0 border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" width={20} height={20} fill="currentColor">
                                <path d="M64 48c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48S90.5 48 64 48zm0 160c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48zm0 160c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48z" />
                              </svg>
                            </button>
                            <ul className="dropdown-menu">
                              <li className="dropdown-item" style={{ cursor: 'pointer' }} onClick={(e) => editComment(e, comment)} >Edit Comment</li>
                              <li className="dropdown-item text-danger" style={{ cursor: 'pointer' }} onClick={(e) => deleteComment(e, comment?._id)}>Delete Comment</li>
                            </ul>
                          </div>
                        )
                      ) : auth?.token?.user?.role == 'user' && (
                        comment?.user?._id == auth?.token?.user?._id && (
                          <div className="dropdown ms-auto">
                            <button className="btn p-0 border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" width={20} height={20} fill="currentColor">
                                <path d="M64 48c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48S90.5 48 64 48zm0 160c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48zm0 160c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48z" />
                              </svg>
                            </button>
                            <ul className="dropdown-menu">
                              <li className="dropdown-item" style={{ cursor: 'pointer' }} onClick={(e) => editComment(e, comment)} >Edit Comment</li>
                              <li className="dropdown-item text-danger" style={{ cursor: 'pointer' }} onClick={(e) => deleteComment(e, comment?._id)}>Delete Comment</li>
                            </ul>
                          </div>
                        )
                      )}
                    </div>
                    <p className="card-text ps-5">{comment?.text}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )}
        <ToastContainer
          position='top-center'
          autoClose={2000}
        />
      </div>
    </>
  )
}
const LikeDislikeBox = ({ blog_Props }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [blog, setBlog] = useState();
  // like 
  const handleLike = async (e, blogid) => {
    e.preventDefault();
    if (!auth?.token) {
      toast.error('Please login to Like');
      return setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
    let res = await fetch(`http://localhost:8080/like/handle_like`, ({
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth?.token?.token}`
      },
      body: JSON.stringify({
        id: blogid
      })
    }));
    let data = await res.json();
    if (data.success) {
      setBlog(data?.updatedBlog);
      toast.success(data?.message);
    } else {
      toast.error(data?.message);
    }
  }
  // dislike 
  const handleDislike = async (e, blogid) => {
    e.preventDefault();
    if (!auth?.token) {
      toast.error('Please login to Dislike');
      return setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
    let res = await fetch(`http://localhost:8080/like/handle_dislike`, ({
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth?.token?.token}`
      },
      body: JSON.stringify({
        id: blogid
      })
    }));
    let data = await res.json();
    if (data.success) {
      setBlog(data?.updatedBlog);
      toast.success(data?.message);
    } else {
      toast.error(data?.message);
    }
  }
  useEffect(() => {
    setBlog(blog_Props);
  }, [blog_Props]);

  return (
    <>
      <div className='LikeDislikeBox p-3 d-flex' style={{ backgroundColor: '#f5f5f5', boxShadow: '0 1px 3px rgba(0, 0, 0, .15)', transition: 'all 0.5s' }}>
        {blog?.likes.find((like) => like?._id == auth?.token?.user?._id) ? (
          <div className="col-md-12 d-flex">
            <div onClick={(e) => handleLike(e, blog?._id)} className='like col-md-9 rounded p-2 d-flex justify-content-center align-items-center text-uppercase fw-semibold' style={{ backgroundColor: '#e5e5e5', cursor: 'pointer' }}>
              {blog?.likes.find((like) => like?._id == auth?.token?.user?._id) ? (
                <>
                  <span className='d-none'>Upvote</span>
                  <i className='fa-solid fa-thumbs-up fs-4 text-black d-flex'></i>
                </>
              ) : (
                <>
                  <span>Upvote</span>
                  <i className='fa-regular fa-thumbs-up fs-4 text-black'></i>
                </>
              )}
            </div>
            <div className='col-md-3 text-center fw-semibold'>
              <h4 className='mb-0 fw-bold'>{blog?.likes.length}</h4>
              <span>{blog?.likes.length > 1 ? 'Points' : 'Point'}</span>
            </div>
          </div>
        ) : blog?.dislikes.find((like) => like?._id == auth?.token?.user?._id) ? (
          <div className="col-md-12 d-flex">
            <div className='col-md-3 text-center fw-semibold'>
              <h4 className='mb-0 fw-bold'>{blog?.dislikes.length >= 1 ? '-' + blog?.dislikes.length : blog?.dislikes.length}</h4>
              <span>{blog?.dislikes.length > 1 ? 'Points' : 'Point'}</span>
            </div>
            <div onClick={(e) => handleDislike(e, blog?._id)} className='dislike col-md-9 rounded p-2 d-flex justify-content-center align-items-center text-uppercase fw-semibold' style={{ backgroundColor: '#e5e5e5', cursor: 'pointer', display: `${blog?.likes.find((like) => like?._id == auth?.token?.user?._id) ? 'none' : 'block'}` }}>
              {blog?.dislikes.find((dislike) => dislike?._id == auth?.token?.user?._id) ? (
                <>
                  <span className='d-none'>Downvote</span>
                  <i className='fa-solid fa-thumbs-down fs-4 text-black d-flex'></i>
                </>
              ) : (
                <>
                  <span>Downvote</span>
                  <i className='fa-regular fa-thumbs-down fs-4 text-black'></i>
                </>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="col-md-6 d-flex">
              <div onClick={(e) => handleLike(e, blog?._id)} className='like col-md-9 rounded p-2 d-flex justify-content-center align-items-center text-uppercase fw-semibold' style={{ backgroundColor: '#e5e5e5', cursor: 'pointer' }}>
                {blog?.likes.find((like) => like?._id == auth?.token?.user?._id) ? (
                  <>
                    <span className='d-none'>Upvote</span>
                    <i className='fa-solid fa-thumbs-up fs-4 text-black d-flex'></i>
                  </>
                ) : (
                  <>
                    <span>Upvote</span>
                    <i className='fa-regular fa-thumbs-up fs-4 text-black'></i>
                  </>
                )}
              </div>
              <div className='col-md-3 text-center fw-semibold'>
                <h4 className='mb-0 fw-bold'>{blog?.likes.length}</h4>
                <span>{blog?.likes.length > 1 ? 'Points' : 'Point'}</span>
              </div>
            </div>
            <div className="col-md-6 d-flex">
              <div className='col-md-3 text-center fw-semibold'>
                <h4 className='mb-0 fw-bold'>{blog?.dislikes.length >= 1 ? '-' + blog?.dislikes.length : blog?.dislikes.length}</h4>
                <span>{blog?.dislikes.length > 1 ? 'Points' : 'Point'}</span>
              </div>
              <div onClick={(e) => handleDislike(e, blog?._id)} className='dislike col-md-9 rounded p-2 d-flex justify-content-center align-items-center text-uppercase fw-semibold' style={{ backgroundColor: '#e5e5e5', cursor: 'pointer', display: `${blog?.likes.find((like) => like?._id == auth?.token?.user?._id) ? 'none' : 'block'}` }}>
                {blog?.dislikes.find((dislike) => dislike?._id == auth?.token?.user?._id) ? (
                  <>
                    <span className='d-none'>Downvote</span>
                    <i className='fa-solid fa-thumbs-down fs-4 text-black d-flex'></i>
                  </>
                ) : (
                  <>
                    <span>Downvote</span>
                    <i className='fa-regular fa-thumbs-down fs-4 text-black'></i>
                  </>
                )}
              </div>
            </div>
          </>
        )}
        <ToastContainer
          position='top-center'
          autoClose={2000}
        />
      </div>
    </>
  )
}

export default SingleBlogDetail
