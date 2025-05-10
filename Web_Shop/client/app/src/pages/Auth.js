import React from 'react'
import { Button, Card, Container, Form, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


const Auth = () => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const navigate = useNavigate()
  return (
    <Container>
      <Card>
        <h2>
            {isLogin ? 'Authorization' : 'Registration'}
        </h2>
        <Form>
        
          {isLogin ?
          <>
          <Form.Control placeholder='Введите ваш email' />
          <Form.Control placeholder='Введите ваш пароль' />
          </>
          :
          <>
          <Form.Control placeholder='Введите ваш email' />
          <Form.Control placeholder='Подтвердите ваш email' />
          <Form.Control placeholder='Введите ваш пароль' />
          <Form.Control placeholder='Подтвердите пароль' />
          </>
        }
          <Row>
          {isLogin ? <div>
            Don't have an account? <NavLink to={REGISTRATION_ROUTE}>Registration</NavLink>
          </div> : <div>
            Have an account? <NavLink to={LOGIN_ROUTE}>Login</NavLink>
          </div>}
          {
            isLogin ?
            <Button variant={'outline-dark'} onClick={() => navigate(SHOP_ROUTE)} >Login</Button>
            :
            <Button variant={'outline-dark'} onClick={() => navigate(SHOP_ROUTE)} >Registration</Button>
          }
          </Row>
        </Form>
      </Card>
    </Container>
  )
}

export default Auth
