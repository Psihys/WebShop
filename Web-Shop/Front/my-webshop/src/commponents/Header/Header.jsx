import React from 'react'
import { Link } from 'react-router-dom'

import './Header.css'

// Import icons
import { MdOutlineAccountCircle } from 'react-icons/md'
import { MdOutlineFavoriteBorder } from 'react-icons/md'
import { IoSearch } from 'react-icons/io5'
import { FaCartShopping } from 'react-icons/fa6'
const Header = () => {
  return (
    <div className="header">
        <div className="logo">
          <img src="logo.png" alt="" />
          <p className="logo-text">Logo</p>
        </div>
        <div className="navigation">
          <ul className="navigation-list">
            <li className="list-item">
              <Link to={'/'}>Home</Link>
            </li>
            <li className="list-item">
              <Link to={'/products'}>Products</Link>
            </li>
            <li className="list-item">
              <Link to={'/about-us'}>About Us</Link>
            </li>
            <li className="list-item">
              <Link to={'/contact-us'}>Contact Us</Link>
            </li>
          </ul>
        </div>
        <div className="nav-icons">
          <ul className="icons-list">
            <li className="icon-item">
              <MdOutlineAccountCircle size={30} color="black" />
            </li>
            <li className="icon-item">
              <MdOutlineFavoriteBorder size={30} color="black" />
            </li>
            <li className="icon-item">
              <IoSearch size={30} color="black" />
            </li>
            <li className="icon-item">
              <FaCartShopping size={30} color="black" />
            </li>
          </ul>
        </div>
      </div>
  )
}

export default Header