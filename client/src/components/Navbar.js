import React from 'react'
import { Outlet, Link } from "react-router-dom";


function Navbar() {
  return (
    <div className='navbar'>
      <div className='brand-name'>ReWhen</div>
      <div>
        <ul className='link-list'>
          <li className='link'><Link to='/'>Images</Link></li>
          <li className='link'><Link to='/action'>Upload</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar