import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import CreateType from '../components/modals/CreateType.js'
import CreateBrand from '../components/modals/CreateBrand.js'
import CreateProduct from '../components/modals/CreateProduct.js'

const Admin = () => {
  const [brandVisible, setBrandVisible] = useState(false)
  const [typeVisible, setTypeVisible] = useState(false)
  const [productVisible, setProductVisible] = useState(false)
  return (
    <Container>
      <Button onClick={() => setTypeVisible(true)}>Add type </Button>
      <Button onClick={() => setBrandVisible(true)}>Add brand </Button>
      <Button onClick={() => setProductVisible(true)}>Add Product </Button>
      <CreateType show={typeVisible} onHide ={()=> setTypeVisible(false)} />
      <CreateBrand show={brandVisible} onHide ={()=> setBrandVisible(false)}/>
      <CreateProduct show={productVisible} onHide ={()=> setProductVisible(false)}/>
    </Container>
  )
}

export default Admin
