import React from 'react';
import { Col, Card, Image } from 'react-bootstrap';
import { CiStar } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_ROUTE } from '../utils/consts.js';
import './styles/ProductItem.css'; // Make sure to create this file for custom styles

const ProductItem = ({ product }) => {
  const navigate = useNavigate();

  return (
    <Col md={3} onClick={() => navigate(`${PRODUCT_ROUTE}/${product.id}`)} className="product-item">
      <Card className="product-card">
        <div className="image-container">
          <Image width={150} height={150} src={process.env.REACT_APP_API_URL + '/' + product.img} className="product-image" />
        </div>
        <div className="product-info">
          <div className="product-rating">
            <div>{product.rating}</div>
            <CiStar className="star-icon" />
          </div>
          <div className="product-details">
            <div className="product-name">{product.name}</div>
            <div className="product-price">{product.price} ₴</div>
          </div>
        </div>
      </Card>
    </Col>
  );
};

export default ProductItem;
