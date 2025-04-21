import React from 'react'

const Advertisement = () => {
  return (
    <></>
  )
}
const VerticalAdvertisement = () => {
  return (
    <>
      <div className="col-lg-12 card border-0 h-100" style={{ backgroundColor: '#f5f5f5',boxShadow: '0 1px 3px rgba(0, 0, 0, .15)' }}>
        <p className='mb-0 position-absolute text-uppercase start-50' style={{ fontSize: '12px', letterSpacing: '1px', transform: 'translateX(-50%)' }}>Advertisement</p>
        <div className="card-body">
          <div className='p-4 pt-5 pb-0 h-100 d-flex flex-column justify-content-between' style={{ background: 'url(/public/advertisement-bg.jpg) no-repeat center', backgroundSize: 'cover', backgroundBlendMode: 'darken', backgroundColor: '#4f4f4f', color: '#ccc' }}>
            <div>
              <h4 className='logo'><span className='text-white py-1 px-2 rounded-3'>Saurabh's</span>Blog</h4>
              <p className="card-subtitle mb-5 pb-5 fw-bolder fs-1 lh-1 mt-4 pt-3">Modern blog and magazine with MERN Stack</p>
            </div>
            <div className='h-50 position-relative'>
              <img src="/public/advertisement-image.png" alt="/public/advertisement-image.png" className='position-absolute h-100 object-fit-cover rounded-top start-50' style={{ width: '70%', bottom: '12%', transform: 'translateX(-50%)', opacity: '0.5', boxShadow: '0 -13px 15px -10px rgb(0, 0, 0,0.3)' }} />
              <img src="/public/advertisement-image.png" alt="/public/advertisement-image.png" className='position-absolute h-100 object-fit-cover rounded-top start-50' style={{ width: '80%', bottom: '9%', transform: 'translateX(-50%)', opacity: '0.88', boxShadow: '0 -13px 15px -10px rgb(0, 0, 0,0.3)' }} />
              <img src="/public/advertisement-image.png" alt="/public/advertisement-image.png" className='position-absolute h-100 object-fit-cover rounded-top start-50' style={{ width: '90%', bottom: '5%', transform: 'translateX(-50%)', boxShadow: '0 -13px 15px -10px rgb(0, 0, 0,0.3)' }} />
              <img src="/public/advertisement-image.png" alt="/public/advertisement-image.png" className='position-absolute w-100 h-100 object-fit-cover rounded-top bottom-0 start-0' style={{ boxShadow: '0 -13px 15px -8px rgb(0, 0, 0,0.3)' }} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
const HorizontalAdvertisement = () => {
  return (
    <>
      <section className='mt-5 pt-4'>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 card border-0 h-100" style={{ backgroundColor: '#f5f5f5',boxShadow: '0 1px 3px rgba(0, 0, 0, .15)' }}>
              <p className='mb-0 position-absolute text-uppercase start-50' style={{ fontSize: '12px', letterSpacing: '1px', transform: 'translateX(-50%)' }}>Advertisement</p>
              <div className="card-body col-lg-9 mx-auto">
                <div className='p-4 pt-5 pb-0 h-100 d-flex' style={{ background: 'url(/public/advertisement-bg.jpg) no-repeat center', backgroundSize: 'cover', backgroundBlendMode: 'darken', backgroundColor: '#4f4f4f', color: '#ccc' }}>
                  <div className='col-lg-7 pe-5'>
                    <h4 className='logo'><span className='text-white py-1 px-2 rounded-3'>Saurabh's</span>Blog</h4>
                    <p className="card-subtitle mb-4 fw-bolder fs-1 lh-1 mt-4 pt-3">Modern blog and magazine with MERN Stack</p>
                  </div>
                  <div className='col-lg-5 position-relative'>
                    <img src="/public/advertisement-image.png" alt="/public/advertisement-image.png" className='position-absolute h-100 object-fit-cover rounded-top start-50' style={{ width: '70%', bottom: '12%', transform: 'translateX(-50%)', opacity: '0.5', boxShadow: '0 -13px 15px -10px rgb(0, 0, 0,0.3)' }} />
                    <img src="/public/advertisement-image.png" alt="/public/advertisement-image.png" className='position-absolute h-100 object-fit-cover rounded-top start-50' style={{ width: '80%', bottom: '9%', transform: 'translateX(-50%)', opacity: '0.88', boxShadow: '0 -13px 15px -10px rgb(0, 0, 0,0.3)' }} />
                    <img src="/public/advertisement-image.png" alt="/public/advertisement-image.png" className='position-absolute h-100 object-fit-cover rounded-top start-50' style={{ width: '90%', bottom: '5%', transform: 'translateX(-50%)', boxShadow: '0 -13px 15px -10px rgb(0, 0, 0,0.3)' }} />
                    <img src="/public/advertisement-image.png" alt="/public/advertisement-image.png" className='position-absolute w-100 h-100 object-fit-cover rounded-top bottom-0 start-0' style={{ boxShadow: '0 -13px 15px -8px rgb(0, 0, 0,0.3)' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export {
  Advertisement, VerticalAdvertisement, HorizontalAdvertisement
}
