import React, { useEffect, useState } from 'react'
import { addToBasket } from '../http/basketAPI'
import { Col, Container, Image, Row, Card, Button } from 'react-bootstrap'
import { CiStar } from 'react-icons/ci'
import { data, useParams } from 'react-router-dom'
import { fetchOneProduct } from '../http/productAPI'
import "./styles/ProductPage.css"
const ProductPage = () => {
  const [product, setProduct] = useState({ info: [] })
  const { id } = useParams()
  useEffect(() => {
    fetchOneProduct(id).then((data) => setProduct(data))
  }, [])

  const handleAddToCart = async () => {
    try {
      await addToBasket(id) // Use the product id from useParams
      alert('Product added to cart!')
    } catch (error) {
      console.error('Error adding to cart:', error)
      alert(error.response?.data?.message || 'Error adding product to cart')
    }
  }

  return (
    <Container>
      <Row>
        <Col mb={4}>
          <Image
            width={300}
            height={300}
            src={process.env.REACT_APP_API_URL + '/' + product.img}
          ></Image>
        </Col>
        <Col mb={4}>
          <Row>
            <h2>{product.name}</h2>
            <div>
              {product.rating}
              <CiStar />
            </div>
          </Row>
        </Col>
        
        <Col mb={4}>
          <Card>
            <h3>{product.price}</h3>
            {product.amount > 0 ? (
              <>
                <p className={product.amount < 5 ? 'text-warning' : ''}>
                  In stock: {product.amount}{' '}
                  {product.amount < 5 && '(Low stock)'}
                </p>
                <Button onClick={handleAddToCart}>Add to cart</Button>
              </>
            ) : (
              <>
                <p className='text-danger'>Out of stock</p>
                <Button disabled>Add to cart</Button>
              </>
            )}
          </Card>
        </Col>
      </Row>
      <Row>
        {product.info.map((info) => (
          <Row key={info.id}>
            <h4>{info.title}</h4>
            <div>{info.description}</div>
          </Row>
        ))}
      </Row>
    </Container>
  )
}

export default ProductPage
