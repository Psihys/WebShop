import React, { useContext, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import TypeBar from '../components/TypeBar'
import BrandBar from '../components/BrandBar'
import ProductList from '../components/ProductList'
import { observer } from 'mobx-react-lite'
import { ContextProduct } from '..'
import { fetchBrands, fetchProducts, fetchTypes } from '../http/productAPI'
import Pages from '../components/Pages'

const Shop = observer(() => {
  const {product} = useContext(ContextProduct)

useEffect(() => {
  fetchTypes().then(data => product.setTypes(data))
  fetchBrands().then(data => product.setBrands(data))
}, []) // загружаем один раз типы и бренды

useEffect(() => {
  fetchProducts(
    product.selectedType.id || null,
    product.selectedBrand.id || null,
    product.page,
    product.limit
  ).then(data => {
    product.setProducts(data.rows)
    product.setTotalCount(data.count)
  })
}, [product.page, product.selectedType, product.selectedBrand, product.limit])

  return (
    <Container>
      <Row>
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          <ProductList />
          <Pages/>
        </Col>
      </Row>
    </Container>
  )
})

export default Shop
