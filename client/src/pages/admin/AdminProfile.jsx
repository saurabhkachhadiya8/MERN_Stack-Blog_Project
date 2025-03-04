import React, { useEffect, useState } from 'react'
import Header from '../../component/header'
import Adminsidebar from '../../component/Adminsidebar'
import './AdminProfile.css'
import { useAuth } from '../../context/AuthContext'

const AdminProfile = () => {

  const [auth, setAuth] = useAuth();
  const [profile, setProfile] = useState();

  useEffect(() => {
    setProfile(auth?.token?.user);
  }, []);

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
            <div className="container">
              <div className="row">
                <h2>Your Profile</h2>
                <div className="col-md-7 ">
                  <div className="panel panel-default">
                    <div className="panel-body">
                      <div className="box box-info">
                        <div className="box-body">
                          <div className="col-sm-6">
                            <div align="center"> <img alt="User Pic" src={profile?.image} className="img-circle img-responsive" width={200} /></div>
                            <br />
                          </div>
                          <div className="col-sm-6">
                            <h4 className='text-capitalize' style={{ color: '#00b1b1' }}>{profile?.name} </h4>
                            <span><p>{profile?.role}</p></span>
                          </div>
                          <div className="clearfix" />
                          <hr style={{ margin: '5px 0 5px 0' }} />
                          <div className="col-sm-5 col-xs-6 title ">Email :</div><div className="col-sm-7">{profile?.email}</div>
                          <div className="clearfix" />
                          <div className="bot-border" />
                          <div className="col-sm-5 col-xs-6 title ">Gender :</div><div className="col-sm-7 text-capitalize">{profile?.gender}</div>
                          <div className="clearfix" />
                          <div className="bot-border" />
                          <div className="col-sm-5 col-xs-6 title ">City :</div><div className="col-sm-7">{profile?.city}</div>
                          <div className="clearfix" />
                          <div className="bot-border" />
                          <div className="col-sm-5 col-xs-6 title ">Contact :</div><div className="col-sm-7">{profile?.contact}</div>
                          <div className="clearfix" />
                          <div className="bot-border" />
                          <div className="col-sm-5 col-xs-6 title ">Date Of Joining :</div><div className="col-sm-7">15 Jun 2016</div>
                          <div className="clearfix" />
                          <div className="bot-border" />
                          {/* /.box-body */}
                        </div>
                        {/* /.box */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminProfile
