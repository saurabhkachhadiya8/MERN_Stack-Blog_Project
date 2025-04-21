import React, { useEffect, useState } from 'react'
import Header from '../../component/header'
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import Adminsidebar from '../../component/Adminsidebar';

const AdminEditBlogCategory = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth();
    const [blogCategoryId, setBlogCategoryId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formdata = new FormData;
        formdata.append("id", blogCategoryId);
        formdata.append("name", name);
        formdata.append("description", description);
        formdata.append("image", image);
        let res = await fetch(`http://localhost:8080/admin/updateblogcategory`, ({
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${auth?.token?.token}`
            },
            body: formdata
        }));
        let blog = await res.json();
        if (blog?.success) {
            toast.success(blog?.message);
            setTimeout(() => {
                navigate('/admin/viewblogcategory');
            }, 2000);
        } else {
            toast.error(blog?.message);
        }
    }
    useEffect(() => {
        setBlogCategoryId(location?.state?._id);
        setName(location?.state?.name);
        setDescription(location?.state?.description);
        setImage(location?.state?.image?.image);
    }, [auth?.token?.user && location?.state]);

    return (
        <div>
            <Header />
            <div className="container mt-5">
                <div className="row">
                    <h1 className='mb-4'>Welcome {auth?.token?.user?.name}</h1>
                    <div className="col-md-3">
                        <Adminsidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="card">
                            <div className="card-header">
                                <h4>Add Blog Category</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input type="text" className="form-control" placeholder='Enter category name' onChange={(e) => setName(e.target.value)} value={name} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description (Optional)</label>
                                        <textarea className="form-control" rows="5" placeholder='Enter blog description' onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
                                    </div>
                                    <div className="mb-3 d-flex justify-content-between">
                                        <div style={{ width: '49%' }}>
                                            <label htmlFor="image" className="form-label">Change Image</label>
                                            <input type="file" className="form-control" onChange={(e) => { setImage(e.target.files[0]) }} style={{ height: '150px' }} />
                                        </div>
                                        <div style={{ width: '49%' }}>
                                            <label htmlFor="image" className="form-label">{location?.state?.image?.image == image ? 'Old Image' : 'New Image'}</label>
                                            {image && <img src={location?.state?.image?.image == image ? image : URL.createObjectURL(image)} alt={image} width={'100%'} style={{ height: '150px', objectFit: 'cover' }} className='rounded' />}
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-dark">Update</button>
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
        </div>
    )
}

export default AdminEditBlogCategory;
