import React from 'react'
import { Link } from 'react-router-dom'

const Email = () => {
  return (
    <section className='Email mt-5 pt-4'>
      <div className="container">
        <div className="row py-5 px-4 rounded position-relative overflow-hidden" style={{backgroundColor:'#f5f5f5',boxShadow: '0 1px 3px rgba(0, 0, 0, .15)'}}>
          <div className="col-md-5">
            <h2 className="fw-bolder">Stay Informed With the Latest & Most Important News</h2>
          </div>
          <div className="col-md-7">
            <div className="input-group mb-3 border-bottom border-secondary" style={{maxWidth:'60%'}}>
              <input type="text" className="form-control bg-transparent border-0 rounded-0 text-white ps-0" placeholder="Your email address" />
              <button type="button" className="btn btn-dark rounded-5 fw-semibold py-1 border-0" style={{height:'fit-content'}}>Subscribe</button>
            </div>
            <p className='text-secondary' style={{maxWidth:'60%'}}>I consent to receive newsletter via email. For further information, please review our <Link className='text-black border-bottom border-black'>Privacy Policy</Link></p>
          </div>
          <img src="/public/emailImage.png" alt="/public/emailImage.png" className='position-absolute w-25' style={{right:'-2%',top:'-5%',height:'110%',opacity:'10%'}} />
        </div>
      </div>
    </section>
  )
}

export default Email
