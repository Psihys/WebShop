import React from 'react'
import { Col, Container, Image, Row, Card, Button } from 'react-bootstrap'
import { CiStar } from "react-icons/ci";

const ProductPage = () => {
  const product ={
        id: 1,
        name: '12pro',
        price: 2000,
        rating: 0,
        img: '31cbf309-79ff-417a-b33c-68ed0e20383d.jpg',
      }

      const description = [
        {
          id: 1,
          title: 'title',
          description: 'description',
        },
        {
          id: 2,
          title: 'title',
          description: 'description',
        },
        {
          id: 3,
          title: 'title',
          description: 'description',
        },
      ]
  return (
    <Container>
      <Row>
      <Col mb={4}>
      <Image width={300} height={300} src={product.img}></Image>
      </Col>
      <Col mb={4}>
      <Row>
        <h2>
          {product.name}
        </h2>
        <div>
          {product.rating}
          <CiStar />
        </div>
      </Row>
      </Col>
      <Col mb={4}>
        <Card>
          <h3>
            {product.price}
          </h3>
          <Button>Add to cart</Button>
        </Card>
      </Col>
      </Row>
      <Row>
        {description.map(info => 
          <Row key={info.id}>
            <h4>
              {info.title}
            </h4>
            <div>
              {info.description}
            </div>
          </Row>
        )}
      </Row>
    </Container>
  )
}

export default ProductPage