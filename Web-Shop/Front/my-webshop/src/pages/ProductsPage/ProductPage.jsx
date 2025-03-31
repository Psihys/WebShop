import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../commponents/Header/Header'
import Footer from '../../commponents/Footer/Footer'

import { IoIosArrowForward } from 'react-icons/io'

// Function to import all product images dynamically
const importAll = (r) => r.keys().map(r)
const productImages = importAll(
  require.context('../../assets/images/products', false, /\.png$/)
)

// Sample products data
const products = productImages.map((image, index) => ({
  id: index + 1,
  name: `Product ${index + 1}`,
  image,
  price: (index + 1) * 50, 
}))

const ProductPage = () => {
  return (
    <div className="container">
      <Header />

      <div className="main-content">
        <div className="page-navigation">
          <h1 className="nav-title">Our Shop</h1>
          <p className="nav-bar">
            <Link to="/">Home</Link> <IoIosArrowForward />
            <Link to="/products">Products</Link>
          </p>
        </div>

        {/* Product List */}
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-item">
              <Link to={`/product/${product.id}`} className="product-card">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">${product.price}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ProductPage
