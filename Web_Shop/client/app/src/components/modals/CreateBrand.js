import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { createBrand } from '../../http/productAPI'

const CreateBrand = ({ show, onHide }) => {
  const [value, setValue] = useState('')

  const addBrand = () => {
    createBrand({ name: value }).then(() => {
      setValue('')
      onHide()
    })
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить новый бренд
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Введите название бренда"
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Закрыть</Button>
        <Button variant="primary" onClick={addBrand}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateBrand
