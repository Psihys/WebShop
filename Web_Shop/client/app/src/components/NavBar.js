import React, { useContext } from 'react'
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { Context } from '../index'
import { NavLink } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

const NavBar = observer(() => {
  const { user } = useContext(Context)
  return (
    <>
      <Navbar bg='light' data-bs-theme='light'>
        <Container>
          <NavLink to='/shop' className='navbar-brand'>
            Web Shop
          </NavLink>
          {user.isAuth ? (
            <Nav className='me-auto'>
              <Button variant={'outline-dark'}> Admin Panel </Button>
              <Button variant={'outline-dark'} onClick={() => user.setIsAuth(false)}> Exit </Button>
            </Nav>
          ) : (
            <Nav className='me-auto'>
              <Button variant={'outline-dark'} onClick={() => user.setIsAuth(true)}> Auth </Button>
            </Nav>
          )}
        </Container>
      </Navbar>
    </>
  )
})

export default NavBar
