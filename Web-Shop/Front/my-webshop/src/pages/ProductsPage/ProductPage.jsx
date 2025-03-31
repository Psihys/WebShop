import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../commponents/Header/Header'
import Footer from '../../commponents/Footer/Footer'
import { IoIosArrowForward } from 'react-icons/io'
import { FaHeart, FaShoppingCart } from 'react-icons/fa'
import './ProductPage.css'

const importAll = (r) => r.keys().map(r)
const productImages = importAll(
  require.context('../../assets/images/products', false, /\.png$/)
)

const products = productImages.map((image, index) => ({
  id: index + 1,
  name: `Product ${index + 1}`,
  image,
  price: (index + 1) * 50,
}))

const ProductPage = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const handleFavoriteClick = (product) => {
    console.log(`Added to favorite: ${product.name}`)
  }

  const handleCartClick = (product) => {
    console.log(`Added to cart: ${product.name}`)
  }

  const totalPages = Math.ceil(products.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem)

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
        <div className="product-list">
          {currentItems.map((product) => (
            <div
              key={product.id}
              className="product-item"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <Link to={`/product/${product.id}`} className="product-card">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                {hoveredProduct === product.id && (
                  <div className="hover-actions">
                    <button
                      className="favorite-btn"
                      onClick={(e) => {
                        e.preventDefault()
                        handleFavoriteClick(product)
                      }}
                    >
                      <FaHeart />
                    </button>
                    <button
                      className="cart-btn"
                      onClick={(e) => {
                        e.preventDefault()
                        handleCartClick(product)
                      }}
                    >
                      <FaShoppingCart />
                    </button>
                  </div>
                )}
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">${product.price}</p>
              </Link>
            </div>
          ))}
        </div>
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ProductPage
