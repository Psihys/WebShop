import React from 'react'
import { Button, Container } from 'react-bootstrap'
import CreateTyp from '../components/modals/CreateType.js'

const Admin = () => {
  return (
    <Container>
      <Button>Add type </Button>
      <Button>Add brand </Button>
      <Button>Add Product </Button>
      <createType show={true} />
      <createBrand />
      <createProduct />
    </Container>
  )
}

export default Admin
