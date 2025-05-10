import React, { useContext } from 'react'
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { Context } from '../index'
import { NavLink, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import {
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
  BASKET_ROUTE,
} from '../utils/consts'
import './styles/NavBar.css'

const NavBar = observer(() => {
  const { user } = useContext(Context)
  const navigate = useNavigate()

  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
  }

  return (
    <Navbar className='nav_bar'>
      <Container className='container'>
        <NavLink className='logo' to={SHOP_ROUTE}>
          Web Shop
        </NavLink>
        <div className='page-navigation'>
          <NavLink className='nav-link' to={SHOP_ROUTE}>
            Shop
          </NavLink>
          <NavLink className='nav-link' to={BASKET_ROUTE}>
            Basket
          </NavLink>
        </div>

        {user.isAuth ? (
          <Nav className='auth-buttons'>
            {user.user.role === 'ADMIN' && (
              <Button className='auth-buttons' onClick={() => navigate(ADMIN_ROUTE)}>Admin Panel</Button>
            )}
            <Button className='auth-buttons'
              onClick={() => {
                logOut()
                navigate(LOGIN_ROUTE)
              }}
            >
              Exit
            </Button>
          </Nav>
        ) : (
          <Nav className='auth-buttons'>
            <Button className='auth-buttons' onClick={() => navigate(LOGIN_ROUTE)}>Sign in</Button>
            <Button className='auth-buttons' onClick={() => navigate(REGISTRATION_ROUTE)}>
              Sign up
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  )
})

export default NavBar
