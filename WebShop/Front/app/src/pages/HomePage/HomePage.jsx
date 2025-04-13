import { Link } from 'react-router-dom'
import { importAllImages } from '../../utils/importAllImages'
// Import styles
import './HomePage.css'

// Import icons
import { MdOutlineAccountCircle } from 'react-icons/md'
import { FaShoppingCart } from 'react-icons/fa'
import { MdOutlineFavoriteBorder } from 'react-icons/md'

// Import all images from category folder
const categoryImages = importAllImages(
  require.context(
    '../../components/CategoryImages',
    false,
    /\.(png|jpe?g|svg)$/
  )
)

const productImages = importAllImages(
  require.context(
    '../../components/ProductsImages',
    false,
    /\.(png|jpe?g|svg)$/
  )
)

const HomePage = () => {
  return (
    <div>
      <div className="container">
        <div className="header">
          <div className="navigation">
            <div className="logo">
              <img className="logo-img" src="" alt="Logo" />
            </div>
            <ul className="navigation-list">
              <li>
                <Link to={'/'}>Home</Link>
              </li>
              <li>
                <Link to={'/products'}>Products</Link>
              </li>
              <li>
                <Link to={'/about'}>About</Link>
              </li>
              <li>
                <Link to={'/contact'}>Contact</Link>
              </li>
            </ul>

            <ul className="navigation-icons">
              <li>
                <Link to={'/cart'}>
                  {' '}
                  <FaShoppingCart />{' '}
                </Link>
              </li>
              <li>
                <Link to={'/favorite'}>
                  <MdOutlineFavoriteBorder />
                </Link>
              </li>
              <li>
                <Link to={'/login'}>
                  <MdOutlineAccountCircle />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="main">
          <div className="first-section">
            <div className="section-intro">
              <h1 className="intro-title">Welcome to our online shop</h1>
              <p className="intro-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quod.
              </p>
            </div>
            <ul className="categories-list">
              {categoryImages.map((image, index) => (
                <li key={index} className="categories-item">
                  <Link to="/products">
                    <img src={image} alt={`Category ${index + 1}`} />
                    <p className="category-description">Category {index + 1}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="second-section">
            <div className="section-intro">
              <h2 className="intro-title">Our products</h2>
              <p className="intro-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quod.
              </p>
            </div>
            <ul className="product-list">
              {productImages.map((image, index) => (
                <li key={index} className="product-item">
                  <img src={image} alt={`Product ${index + 1}`} />
                  <p className="product-description">Product {index + 1}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer"></div>
      </div>
    </div>
  )
}

export default HomePage
