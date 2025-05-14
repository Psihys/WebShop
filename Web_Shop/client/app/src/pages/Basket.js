import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import { ContextBasket } from '../index'
import {
  fetchBasket,
  removeFromBasket,
  clearBasket,
  updateBasketQuantity,
} from '../http/basketAPI'

const Basket = observer(() => {
  const { basket } = useContext(ContextBasket)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBasket = async () => {
      try {
        const data = await fetchBasket()

        // Transform data to match our store format
        const basketItems = data.map((item) => ({
          id: item.deviceId,
          name: item.device.name,
          price: item.device.price,
          img: item.device.img,
          quantity: 1,
        }))

        basket.setBasketItems(basketItems)
      } catch (error) {
        console.error('Error loading basket:', error)
      } finally {
        setLoading(false)
      }
    }

    loadBasket()
  }, [basket])

  const handleRemoveItem = async (id) => {
    try {
      await removeFromBasket(id)
      basket.removeFromBasket(id)
    } catch (error) {
      console.error('Error removing item:', error)
    }
  }

  const handleClearBasket = async () => {
    try {
      await clearBasket()
      basket.clearBasket()
    } catch (error) {
      console.error('Error clearing basket:', error)
    }
  }

  const handleQuantityChange = async (id, newQuantity) => {
    if (newQuantity < 1) return

    try {
      await updateBasketQuantity(id, newQuantity)
      basket.changeQuantity(id, newQuantity)
    } catch (error) {
      console.error('Error updating quantity:', error)
    }
  }

  // In your Basket.js component, update the useEffect function
useEffect(() => {
  const loadBasket = async () => {
    try {
      const data = await fetchBasket();
      
      // Transform data to match our store format
      const basketItems = data.map(item => ({
        id: item.deviceId,
        name: item.device.name,
        price: item.device.price,
        img: item.device.img,
        quantity: item.quantity || 1 // Use the quantity from the server or default to 1
      }));
      
      basket.setBasketItems(basketItems);
    } catch (error) {
      console.error('Error loading basket:', error);
    } finally {
      setLoading(false);
    }
  };
  
  loadBasket();
}, [basket]);


  if (loading) {
    return (
      <Container className='mt-5'>
        <h3>Loading...</h3>
      </Container>
    )
  }

  return (
    <Container className='mt-4'>
      <h2>Your Basket</h2>

      {basket.basketItems.length > 0 ? (
        <>
          {basket.basketItems.map((item) => (
            <Card key={item.id} className='mb-3'>
              <Card.Body>
                <Row className='align-items-center'>
                  <Col md={2}>
                    <Image
                      width={100}
                      height={100}
                      src={process.env.REACT_APP_API_URL + '/' + item.img}
                      alt={item.name}
                    />
                  </Col>
                  <Col md={6}>
                    <h5>{item.name}</h5>
                    <h6>${item.price}</h6>
                  </Col>
                  <Col md={4} className='text-end'>
                    <Button
                      variant='danger'
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Remove
                    </Button>
                    <div className='d-flex align-items-center'>
                      <Button
                        variant='outline-secondary'
                        size='sm'
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </Button>
                      <span className='mx-2'>{item.quantity}</span>
                      <Button
                        variant='outline-secondary'
                        size='sm'
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}

          <Card className='mt-4'>
            <Card.Body>
              <Row className='align-items-center'>
                <Col md={8}>
                  <h4>Total: ${basket.totalPrice}</h4>
                </Col>
                <Col md={4} className='text-end'>
                  <Button
                    variant='danger'
                    className='me-2'
                    onClick={handleClearBasket}
                  >
                    Clear Basket
                  </Button>
                  <Button variant='success'>Checkout</Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </>
      ) : (
        <Card>
          <Card.Body className='text-center'>
            <h4>Your basket is empty</h4>
            <p>Add some products to your basket to see them here.</p>
          </Card.Body>
        </Card>
      )}
    </Container>
  )
})

export default Basket
