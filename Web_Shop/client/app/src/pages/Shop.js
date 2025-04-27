import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import TypeBar from '../components/TypeBar'
import BrandBar from '../components/BrandBar'
import ProductList from '../components/ProductList'

const Shop = () => {
  return (
    <Container>
      <Row>
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          <ProductList />
        </Col>
      </Row>
    </Container>
  )
}

export default Shop
