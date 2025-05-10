import React, { useContext, useState } from 'react'
import { Modal, Form, Button, Dropdown } from 'react-bootstrap'
import { ContextProduct } from '../..'

const CreateProduct = ({ show, onHide }) => {
  const { product } = useContext(ContextProduct)
  const [info, setInfo] = useState([])

  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }])
  }
  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number))
  }
  return (
    <Modal
      show={show}
      onHide={onHide}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Add new type
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown>
            <Dropdown.Toggle>Choose type</Dropdown.Toggle>
            <Dropdown.Menu>
              {product.types.map((type) => (
                <Dropdown.Item key={type.id}>{type.name}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle>Choose brand</Dropdown.Toggle>
            <Dropdown.Menu>
              {product.brands.map((brand) => (
                <Dropdown.Item key={brand.id}>{brand.name}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Form.Control placeholder='Enter product name' />
          <Form.Control type='number' placeholder='Enter product price' />
          <Form.Control type='file' />
          <Button onClick={addInfo}>Add new description</Button>
          {info.map((i) => (
            <Form key={i.number} className='d-flex align-items-center mb-2'>
              <Form.Control placeholder='Enter title' className='me-2' />
              <Form.Control placeholder='Enter description' className='me-2' />
              <Button variant='danger' onClick={() => removeInfo(i.number)}>
                Delete
              </Button>
            </Form>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
        <Button onClick={onHide}> Add new type</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateProduct
