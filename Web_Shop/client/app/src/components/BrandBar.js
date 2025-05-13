import React, { useContext } from 'react'
import { Card, Row } from 'react-bootstrap'
import { ContextProduct } from '../index'
import { observer } from 'mobx-react-lite'
import './styles/BrandBar.css'

const BrandBar = observer(() => {
  const { product } = useContext(ContextProduct)
  return (
    <Row className="brand-bar">
      {product.brands.map((brand) => (
        <Card
          key={brand.id}
          className="brand-card"
          style={{ cursor: 'pointer' }}
          onClick={() => product.setSelectedBrand(brand)}
          border={brand.id === product.selectedBrand.id ? 'danger' : 'light'}
        >
          {brand.name}
        </Card>
      ))}
    </Row>
  )
})

export default BrandBar
