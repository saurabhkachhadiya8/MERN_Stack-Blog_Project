import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='mt-5 bg-black'>
      <div className="container text-secondary">
        <div className="row">
          <div className="col-md-3 p-3 border border-secondary d-flex align-items-center justify-content-center">
            <i className="fa-brands fa-facebook-f rounded-circle text-center" style={{ width: '30px', height: '30px', lineHeight: '30px', backgroundColor: 'rgba(255,255,255,0.2)' }}></i>
            <span className='fw-semibold ms-1'>Facebook</span>
          </div>
          <div className="col-md-3 p-3 border border-secondary d-flex align-items-center justify-content-center">
            <i className="fa-brands fa-x-twitter rounded-circle text-center" style={{ width: '30px', height: '30px', lineHeight: '30px', backgroundColor: 'rgba(255,255,255,0.2)' }}></i>
            <span className='fw-semibold ms-1'>X Network</span>
          </div>
          <div className="col-md-3 p-3 border border-secondary d-flex align-items-center justify-content-center">
            <i className="fa-brands fa-pinterest rounded-circle text-center" style={{ width: '30px', height: '30px', lineHeight: '30px', backgroundColor: 'rgba(255,255,255,0.2)' }}></i>
            <span className='fw-semibold ms-1'>Pinterest</span>
          </div>
          <div className="col-md-3 p-3 border border-secondary d-flex align-items-center justify-content-center">
            <i className="fa-brands fa-instagram rounded-circle text-center" style={{ width: '30px', height: '30px', lineHeight: '30px', backgroundColor: 'rgba(255,255,255,0.2)' }}></i>
            <span className='fw-semibold ms-1'>Instagram</span>
          </div>
        </div>
        <div className="row py-4 border-bottom border-secondary">
          <div className="col-md-3 py-4">
            <h2 className='logo'><span className='text-white py-1 px-2 rounded-3'>Saurabh's</span>Blog</h2>
            <p className='pt-3'>Our platform covers everything from global events and politics to entertainment, technology, and lifestyle, ensuring you never miss a story.</p>
          </div>
          <div className="col-md-3 py-4">
            <h5 className="heading position-relative text-white text-uppercase mb-3" style={{ width: 'fit-content' }}>Links</h5>
            <div className="menu d-flex flex-column lh-lg">
              <Link>Privacy Policy</Link>
              <Link>Terms & Conditions</Link>
              <Link>Why Us</Link>
              <Link>Team</Link>
              <Link>Careers</Link>
            </div>
          </div>
          <div className="col-md-3 py-4">
            <h5 className="heading position-relative text-white text-uppercase mb-3" style={{ width: 'fit-content' }}>Menu</h5>
            <div className="menu d-flex flex-column lh-lg">
              <Link>Partners & Certifications</Link>
              <Link>Case Studies</Link>
              <Link>Events & FAQ</Link>
              <Link>Solutions</Link>
              <Link>Reviews & Awards</Link>
            </div>
          </div>
          <div className="col-md-3 py-4">
            <h5 className="heading position-relative text-white text-uppercase mb-4" style={{ width: 'fit-content' }}>Newsletter</h5>
            <div className="input-group mb-3 border-bottom border-secondary">
              <input type="text" className="form-control bg-black border-0 rounded-0 text-white ps-0" placeholder="Your email address" />
              <button type="button" className="btn rounded-5 fw-semibold py-1">Subscribe</button>
            </div>
            <p>I consent to receive newsletter via email. For further information, please review our <Link className='text-white border-bottom border-secondary'>Privacy Policy</Link></p>
          </div>
        </div>
        <div className="row py-4">
          <ul className='menu text-uppercase d-flex gap-4 mb-1'>
            <li><Link className='text-white'>Home</Link></li>
            <li><Link className='text-white'>About Us</Link></li>
            <li><Link className='text-white'>Contact Us</Link></li>
            <li><Link className='text-white'>Privacy Policy</Link></li>
            <li><Link className='text-white'>Terms and Conditions</Link></li>
          </ul>
          <p>Copyright &copy; 2025 SAURABH'S BLOG. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
