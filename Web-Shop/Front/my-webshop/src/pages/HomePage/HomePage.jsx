import React from 'react'
import './HomePage.css'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../commponents/Header/Header'
import Footer from '../../commponents/Footer/Footer'

// Dynamically import category images
const importCategoryImages = (r) => r.keys().map(r)
const categoryImages = importCategoryImages(
  require.context(
    '../../assets/images/homepage-images/category',
    false,
    /^\.\/category\d+\.png$/
  )
)

// Dynamically import product images
const importProductImages = (r) => r.keys().map(r)
const productImages = importProductImages(
  require.context(
    '../../assets/images/products',
    false,
    /^\.\/image\d+\.png$/
  )
)

// Categories
const categories = [
  {
    id: 1,
    name: 'Category 1',
    image: categoryImages[0],
  },
  {
    id: 2,
    name: 'Category 2',
    image: categoryImages[1],
  },
  {
    id: 3,
    name: 'Category 3',
    image: categoryImages[2],
  },
]

// Products
const products = [
  {
    id: 1,
    name: 'Product 1',
    image: productImages[0],
    price: 120,
  },
  {
    id: 2,
    name: 'Product 2',
    image: productImages[1],
    price: 150,
  },
  {
    id: 3,
    name: 'Product 3',
    image: productImages[2],
    price: 200,
    },
    {
      id: 4,
        name: 'Product 4',
        image: productImages[3],
    price: 250,
    },
    {
        id: 5,
        name: 'Product 5',
        image: productImages[4],
        price: 300,
    },
    {
        id: 6,
        name: 'Product 6',
        image: productImages[5],
        price: 250,
    },
    {
        id: 7,
        name: 'Product 7',
        image: productImages[6],
        price: 300,

    },
    {
        id: 8,
        name: 'Product 8',
        image: productImages[7],
        price: 250,
    }
]

const HomePage = () => {

  // Use useNavigate hook to programmatically navigate to Product page
  const navigate = useNavigate()


  return (
    <div className="container">
      <Header />
      <div className="main-content">
        <div className="first-section">
          <div className="first-section-intro">
            <h1 className="main-section-title">Welcome to Our Store!</h1>
            <p className="main-section-text">
              Discover our wide range of products and start shopping today!
            </p>
          </div>
          <ul className="category-list">
            {categories.map((category) => (
              <li key={category.id} className="category-item">
                <Link
                  to={`/products/${category.name}`}
                  className="category-card"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="category-image"
                  />
                  <h3 className="category-name">{category.name}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="second-section">
          <div className="second-section-intro">
            <h1 className="main-section-title">Our Products</h1>
            <p className="main-section-text">
              Discover our wide range of products and start shopping today!
            </p>
          </div>
          <ul className="product-list">
            {products.map((product) => (
              <li key={product.id} className="product-item">
                <Link to={`/product/${product.name}`} className="product-card">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">${product.price}</p>
                </Link>
              </li>
            ))}
          </ul>
          <button
          onClick={() => navigate('/products')}
          className="see-more-btn">See More</button>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default HomePage
