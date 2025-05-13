import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { ContextProduct } from '../index';
import { Row } from 'react-bootstrap';
import ProductItem from './ProductItem';
import './styles/ProductList.css'; // Make sure to create this file for custom styles

const ProductList = observer(() => {
  const { product } = useContext(ContextProduct);
  return (
    <Row className="product-list">
      {product.products.map((product) => {
        return <ProductItem key={product.id} product={product} />;
      })}
    </Row>
  );
});

export default ProductList;
