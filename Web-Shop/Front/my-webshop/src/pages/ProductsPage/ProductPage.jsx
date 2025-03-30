import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../commponents/Header/Header'
import Footer from '../../commponents/Footer/Footer'

import { IoIosArrowForward } from 'react-icons/io'

const ProductPage = () => {
  return (
    <div className='container'>
      <Header />

      <div className='main-content'>
        <div className='page-navigation'>
          <h1 className='nav-title'>Our Shop</h1>
          <p className='nav-bar'>
            <Link to='/'>Home</Link> <IoIosArrowForward />
            <Link to='/products'>Products</Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ProductPage
