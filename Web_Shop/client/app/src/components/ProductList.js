import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { ContextProduct } from '../index'
import { Row } from 'react-bootstrap'
import ProductItem from './ProductItem'

const ProductList = observer( () => {
    const { product } = useContext(ContextProduct)
  return (
    <Row>
        {product.products.map(product =>{
            return <ProductItem key={product.id} product={product}/>
        })}
    </Row>
  )
})

export default ProductList