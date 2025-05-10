import React from 'react'
import { Col, Card,Image } from 'react-bootstrap'
import { CiStar } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import {PRODUCT_ROUTE} from '../utils/consts.js'

const ProductItem = ({product}) => {
  const navigate = useNavigate()
  return (
    <Col md={3} onClick={() => navigate(`${PRODUCT_ROUTE}/${product.id}`)}>
        <Card> 
           <Image width={150} height={150} src={product.img}></Image>
           <div>
            <div>
              text 
              <div>
                <div>{product.rating}</div>
                <CiStar />
              </div>
              <div>
                <div>
                  {product.name}
                </div>
                <div>
                  {product.price}
                </div>
              </div>
            </div>
           </div>
        </Card>
    </Col>
  )
}

export default ProductItem