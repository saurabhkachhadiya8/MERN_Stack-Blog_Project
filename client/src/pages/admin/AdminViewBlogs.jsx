import React from 'react'
import Header from '../../component/header'
import Adminsidebar from '../../component/Adminsidebar'

const AdminViewBlogs = () => {
  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="row">
          <h1 className='mb-4'>Welcome Admin</h1>
          <div className="col-md-3">
            <Adminsidebar />
          </div>
          <div className="col-md-9">
            <div>
              <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  <button className="nav-link active" id="nav-all-tab" data-bs-toggle="tab" data-bs-target="#nav-all" type="button" role="tab" aria-controls="nav-all" aria-selected="true">All</button>
                  <button className="nav-link" id="nav-admin-tab" data-bs-toggle="tab" data-bs-target="#nav-admin" type="button" role="tab" aria-controls="nav-admin" aria-selected="false">Admin</button>
                  <button className="nav-link" id="nav-manager-tab" data-bs-toggle="tab" data-bs-target="#nav-manager" type="button" role="tab" aria-controls="nav-manager" aria-selected="false">Manager</button>
                  <button className="nav-link" id="nav-user-tab" data-bs-toggle="tab" data-bs-target="#nav-user" type="button" role="tab" aria-controls="nav-user" aria-selected="false">User</button>
                </div>
              </nav>
              <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-all" role="tabpanel" aria-labelledby="nav-all-tab" tabIndex={0}>All</div>
                <div className="tab-pane fade" id="nav-admin" role="tabpanel" aria-labelledby="nav-admin-tab" tabIndex={0}>Admin</div>
                <div className="tab-pane fade" id="nav-manager" role="tabpanel" aria-labelledby="nav-manager-tab" tabIndex={0}>Manager</div>
                <div className="tab-pane fade" id="nav-user" role="tabpanel" aria-labelledby="nav-user-tab" tabIndex={0}>User</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default AdminViewBlogs
