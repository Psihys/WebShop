import React, { useEffect,useState } from 'react'
import { Col, Container, Image, Row, Card, Button } from 'react-bootstrap'
import { CiStar } from "react-icons/ci";
import { data, useParams } from 'react-router-dom';
import { fetchOneProduct } from '../http/productAPI';


const ProductPage = () => {
  const [product, setProduct] = useState({info: []})
  const {id} = useParams()
  useEffect(() => {
    fetchOneProduct(id).then(data => setProduct(data))
  }, [])
  return (
    <Container>
      <Row>
      <Col mb={4}>
      <Image width={300} height={300} src={process.env.REACT_APP_API_URL  + '/' +  product.img}></Image>
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
        {product.info.map(info => 
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