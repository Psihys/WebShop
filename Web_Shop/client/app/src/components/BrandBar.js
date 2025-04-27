import React, { useContext } from 'react'
import { Card, Row } from 'react-bootstrap'
import { ContextProduct } from '../index'
import { observer } from 'mobx-react-lite'

const BrandBar = observer(() => {
  const { product } = useContext(ContextProduct)
  return (
    <Row>
      {product.brands.map((brand) => (
        <Card
          key={brand.id}
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
