import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { createType } from '../../http/productAPI'

const CreateType = ({ show, onHide }) => {
  const [value, setValue] = useState('')
  const addType = () => {
    createType({name: value}).then((data) => {
      setValue('')
      onHide()
    })
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
          <Form.Control
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder='Введите название типа'
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
        <Button onClick={addType}> Add new type</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateType
