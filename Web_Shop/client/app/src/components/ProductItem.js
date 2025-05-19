import React, { useContext } from 'react'
import { Col, Card, Image, Button } from 'react-bootstrap'
import { CiStar } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'
import { PRODUCT_ROUTE } from '../utils/consts.js'
import './styles/ProductItem.css'
import { Context, ContextBasket } from '../index'
import { addToBasket } from '../http/basketAPI'

const ProductItem = ({ product }) => {
  const navigate = useNavigate()
  const { user } = useContext(Context)
  const { basket } = useContext(ContextBasket)

  const handleAddToBasket = async (e) => {
    e.stopPropagation()
    try {
      if (user.isAuth) {
        console.log('Adding to basket:', product.id)
        await addToBasket(product.id)

        basket.addToBasket({
          id: product.id,
          name: product.name,
          price: product.price,
          img: product.img,
          quantity: 1,
        })

        alert('Product added to basket!')
      } else {
        alert('Please login to add items to basket')
      }
    } catch (error) {
      console.error('Error adding to basket:', error)
      if (error.response) {
        console.error('Response data:', error.response.data)
      }
      alert('Failed to add product to basket')
    }
  }

  return (
    <Col md={3} className='product-item'>
      <Card className={`product-card ${product.amount < 5 ? 'low-stock' : ''}`}>
        <div onClick={() => navigate(`${PRODUCT_ROUTE}/${product.id}`)}>
          <div className='image-container'>
            <Image
              width={150}
              height={150}
              src={process.env.REACT_APP_API_URL + '/' + product.img}
              className='product-image'
            />
            {product.amount < 5 && (
              <div className='low-stock-badge'>Low Stock: {product.amount}</div>
            )}
          </div>
          <div className='product-info'>
            <div className='product-rating'>
              <div>{product.rating}</div>
              <CiStar className='star-icon' />
            </div>
            <div className='product-details'>
              <div className='product-name'>{product.name}</div>
              <div className='product-price'>{product.price} ₴</div>
            </div>
          </div>
        </div>
        <Button
          className='add-to-basket-button'
          variant='outline-success'
          onClick={handleAddToBasket}
          disabled={product.amount <= 0}
        >
          {product.amount > 0 ? 'Add to Basket' : 'Out of Stock'}
        </Button>
      </Card>
    </Col>
  )
}

export default ProductItem
