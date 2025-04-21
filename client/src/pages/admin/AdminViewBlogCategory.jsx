import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import Header from '../../component/header';
import Adminsidebar from '../../component/Adminsidebar';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const AdminViewBlogCategory = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const [all_BlogCategory, setAll_BlogCategory] = useState([]);
    const [other_BlogCategory, setOther_BlogCategory] = useState([]);
    const [my_BlogCategory, setMy_BlogCategory] = useState([]);

    const fetchBlogCategory = async () => {
        let res = await fetch(`http://localhost:8080/admin/viewblogcategory`, ({
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth?.token?.token}`
            }
        }));
        let data = await res.json();
        if (data.success) {
            setAll_BlogCategory(data?.all_BlogCategory);
            setOther_BlogCategory(data?.other_BlogCategory);
            setMy_BlogCategory(data?.my_BlogCategory);
        }
    }
    const deleteBlogCategory = async (e, blogcatid) => {
        e.preventDefault();
        let res = await fetch(`http://localhost:8080/admin/deleteblogcategory?blogcatid=${blogcatid}`, ({
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth?.token?.token}`
            }
        }));
        let data = await res.json();
        if (data.success) {
            toast.success(data?.message);
            fetchBlogCategory();
        } else {
            toast.error(data?.message);
            fetchBlogCategory();
        }
    }
    const changeBlogCategoryStatus = async (e, blogcatid, status) => {
        e.preventDefault();
        let res = await fetch(`http://localhost:8080/admin/changeblogcategorystatus`, ({
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth?.token?.token}`
            },
            body: JSON.stringify({
                blogcatid,
                status
            })
        }));
        let data = await res.json();
        if (data.success) {
            toast.success(data?.message);
            fetchBlogCategory();
        } else {
            toast.error(data?.message);
            fetchBlogCategory();
        }
    }
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
        fetchBlogCategory();
    }, []);

    return (
        <div>
            <Header />
            <section className='admin'>
                <div className="container mt-5">
                    <div className="row">
                        <h1 className='mb-4 d-flex justify-content-between align-items-center'>
                            Welcome {auth?.token?.user?.name}
                            <Link to={`/admin/addblogcategory`} className="btn btn-dark">Add Blog Category</Link>
                        </h1>
                        <div className="col-md-3">
                            <Adminsidebar />
                        </div>
                        <div className="col-md-9">
                            <div>
                                <nav>
                                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                        <button className="nav-link active" id="nav-all-tab" data-bs-toggle="tab" data-bs-target="#nav-all" type="button" role="tab" aria-controls="nav-all" aria-selected="true">All</button>
                                        <button className="nav-link" id="nav-other-tab" data-bs-toggle="tab" data-bs-target="#nav-other" type="button" role="tab" aria-controls="nav-other" aria-selected="false">Other</button>
                                        <button className="nav-link" id="nav-my-tab" data-bs-toggle="tab" data-bs-target="#nav-my" type="button" role="tab" aria-controls="nav-my" aria-selected="false">My</button>
                                    </div>
                                </nav>
                                <div className="tab-content py-4" id="nav-tabContent">
                                    <div className="tab-pane fade show active" id="nav-all" role="tabpanel" aria-labelledby="nav-all-tab" tabIndex={0}>
                                        {!all_BlogCategory.length ? (
                                            <h1 style={{ textAlign: 'center' }}>BlogCategory Not Available</h1>
                                        ) : (
                                            <table className="table fs-5">
                                                <thead>
                                                    <tr className='text-center'>
                                                        <th scope="col" width={'5%'}>#</th>
                                                        <th scope="col" width={'15%'}>Image</th>
                                                        <th scope="col" width={'20%'}>Name</th>
                                                        <th scope="col" width={'20%'}>Created By</th>
                                                        <th scope="col" width={'15%'}>Created At</th>
                                                        <th scope="col" width={'15%'}>Status</th>
                                                        <th scope="col" width={'10%'}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {all_BlogCategory.map((val, index) => {
                                                        return (
                                                            <tr key={++index} className='text-center'>
                                                                <td>{++index}</td>
                                                                <td><img src={val?.image?.image} alt={val?.image?.image} style={{ width: '100px', height: '100px', objectFit: 'cover' }} /></td>
                                                                <td className='text-start'>{val?.name}</td>
                                                                <td className='text-start'>{val?.createdBy?.name}</td>
                                                                <td className='text-start'>{timeAgo(val?.createdAt)}</td>
                                                                <td className='align-content-center'>
                                                                    {val?.status == 'active' ? <p onClick={(e) => changeBlogCategoryStatus(e, val?._id, 'active')} className='text-success' style={{ cursor: 'pointer' }}>Active</p> : <p onClick={(e) => changeBlogCategoryStatus(e, val?._id, 'deactive')} className='text-danger' style={{ cursor: 'pointer' }}>Deactive</p>}
                                                                </td>
                                                                <td className='align-content-center'>
                                                                    {val?.createdBy?._id == auth?.token?.user?._id ? (
                                                                        <>
                                                                            <button onClick={() => navigate('/admin/editblogcategory', { state: val })} type="button" className='btn btn-success mb-2' style={{ width: '90%' }}>Edit</button>
                                                                            <button onClick={(e) => deleteBlogCategory(e, val?._id)} type="button" className='btn btn-danger' style={{ width: '90%' }}>Delete</button>
                                                                        </>
                                                                    ) : (
                                                                        <p>Not Authorized</p>
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        )}
                                    </div>
                                    <div className="tab-pane fade" id="nav-other" role="tabpanel" aria-labelledby="nav-other-tab" tabIndex={0}>
                                        {!other_BlogCategory.length ? (
                                            <h1 style={{ textAlign: 'center' }}>BlogCategory Not Available</h1>
                                        ) : (
                                            <table className="table fs-5">
                                                <thead>
                                                    <tr className='text-center'>
                                                        <th scope="col" width={'5%'}>#</th>
                                                        <th scope="col" width={'20%'}>Image</th>
                                                        <th scope="col" width={'20%'}>Name</th>
                                                        <th scope="col" width={'20%'}>Created By</th>
                                                        <th scope="col" width={'20%'}>Created At</th>
                                                        <th scope="col" width={'15%'}>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {other_BlogCategory.map((val, index) => {
                                                        return (
                                                            <tr key={++index} className='text-center'>
                                                                <td>{++index}</td>
                                                                <td><img src={val?.image?.image} alt={val?.image?.image} style={{ width: '100px', height: '100px', objectFit: 'cover' }} /></td>
                                                                <td className='text-start'>{val?.name}</td>
                                                                <td className='text-start'>{val?.createdBy?.name}</td>
                                                                <td className='text-start'>{timeAgo(val?.createdAt)}</td>
                                                                <td className='align-content-center'>
                                                                    {val?.status == 'active' ? <p onClick={(e) => changeBlogCategoryStatus(e, val?._id, 'active')} className='text-success' style={{ cursor: 'pointer' }}>Active</p> : <p onClick={(e) => changeBlogCategoryStatus(e, val?._id, 'deactive')} className='text-danger' style={{ cursor: 'pointer' }}>Deactive</p>}
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        )}
                                    </div>
                                    <div className="tab-pane fade" id="nav-my" role="tabpanel" aria-labelledby="nav-my-tab" tabIndex={0}>
                                        {!my_BlogCategory.length ? (
                                            <h1 style={{ textAlign: 'center' }}>BlogCategory Not Available</h1>
                                        ) : (
                                            <table className="table fs-5">
                                                <thead>
                                                    <tr className='text-center'>
                                                        <th scope="col" width={'5%'}>#</th>
                                                        <th scope="col" width={'20%'}>Image</th>
                                                        <th scope="col" width={'20%'}>Name</th>
                                                        <th scope="col" width={'20%'}>Created At</th>
                                                        <th scope="col" width={'20%'}>Status</th>
                                                        <th scope="col" width={'15%'}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {my_BlogCategory.map((val, index) => {
                                                        return (
                                                            <tr key={++index} className='text-center'>
                                                                <td>{++index}</td>
                                                                <td><img src={val?.image?.image} alt={val?.image?.image} style={{ width: '100px', height: '100px', objectFit: 'cover' }} /></td>
                                                                <td className='text-start'>{val?.name}</td>
                                                                <td className='text-start'>{timeAgo(val?.createdAt)}</td>
                                                                <td className='align-content-center'>
                                                                    {val?.status == 'active' ? <p onClick={(e) => changeBlogCategoryStatus(e, val?._id, 'active')} className='text-success' style={{ cursor: 'pointer' }}>Active</p> : <p onClick={(e) => changeBlogCategoryStatus(e, val?._id, 'deactive')} className='text-danger' style={{ cursor: 'pointer' }}>Deactive</p>}
                                                                </td>
                                                                <td className='align-content-center'>
                                                                    <button onClick={() => navigate('/admin/editblogcategory', { state: val })} type="button" className='btn btn-success mb-2' style={{ width: '90%' }}>Edit</button>
                                                                    <button onClick={(e) => deleteBlogCategory(e, val?._id)} type="button" className='btn btn-danger' style={{ width: '90%' }}>Delete</button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div >
                    </div >
                </div >
            </section>
            <ToastContainer
                position='top-center'
                autoClose={2000}
            />
        </div >
    )
}

export default AdminViewBlogCategory;
