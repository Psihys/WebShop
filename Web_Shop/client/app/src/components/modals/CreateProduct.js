import React, { useContext, useEffect, useState } from 'react'
import { Modal, Form, Button, Dropdown } from 'react-bootstrap'
import { ContextProduct } from '../..'
import './styles/createProduct.css' // You can add the custom styles in a separate CSS file
import { createProduct, fetchBrands, fetchTypes } from '../../http/productAPI'
import { observer } from 'mobx-react-lite'

const CreateProduct = observer(({ show, onHide }) => {
  const { product } = useContext(ContextProduct)
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [file, setFile] = useState(null)
  const [info, setInfo] = useState([])

  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }])
  }

  const closeButton = () => {
    setName('')
    setPrice(0)
    setInfo([])
    product.setSelectedType(null)
    product.setSelectedBrand(null)
    onHide()
  }
  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number))
  }

  const changeInfo = (key, value, number) => {
    setInfo(info.map((i) => (i.number === number ? { ...i, [key]: value } : i)))
  }

  const selectFyle = (e) => {
    setFile(e.target.files[0])
  }

  const addProduct = () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', `${price}`)
    formData.append('img', file)
    formData.append('typeId', product.selectedType.id)
    formData.append('brandId', product.selectedBrand.id)
    formData.append('info', JSON.stringify(info))
    createProduct(formData).then(() => onHide())
  }

  useEffect(() => {
    if (show) {
      fetchTypes().then((data) => product.setTypes(data))
      fetchBrands().then((data) => product.setBrands(data))
    }
  }, [show])

  return (
    <Modal
      show={show}
      onHide={closeButton}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      className='create-product-modal'
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Добавить новый продукт
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className='mb-3'>
            <Dropdown.Toggle variant='outline-secondary'>
              {product.selectedType
                ? product.selectedType.name
                : 'Выберите тип'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {product.types.map((type) => (
                <Dropdown.Item
                  onClick={() => product.setSelectedType(type)}
                  key={type.id}
                >
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className='mb-3'>
            <Dropdown.Toggle variant='outline-secondary'>
              {product.selectedBrand
                ? product.selectedBrand.name
                : 'Выберите бренд'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {product.brands.map((brand) => (
                <Dropdown.Item
                  onClick={() => product.setSelectedBrand(brand)}
                  key={brand.id}
                >
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Введите название продукта'
            className='mb-3'
          />
          <Form.Control
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            type='number'
            placeholder='Введите цену продукта'
            className='mb-3'
          />
          <Form.Control type='file' className='mb-3' onChange={selectFyle} />

          <Button variant='outline-primary' onClick={addInfo}>
            Добавить описание
          </Button>

          {info.map((i) => (
            <Form key={i.number} className='d-flex align-items-center mb-3'>
              <Form.Control
                value={i.title}
                onChange={(e) => changeInfo('title', e.target.value, i.number)}
                placeholder='Введите название'
                className='me-2'
                style={{ flex: 1 }}
              />
              <Form.Control
                value={i.description}
                onChange={(e) =>
                  changeInfo('description', e.target.value, i.number)
                }
                placeholder='Введите описание'
                className='me-2'
                style={{ flex: 2 }}
              />
              <Button
                variant='danger'
                onClick={() => removeInfo(i.number)}
                className='ml-2'
              >
                Удалить
              </Button>
            </Form>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={closeButton}>
          Закрыть
        </Button>
        <Button variant='primary' onClick={addProduct}>
          Добавить продукт
        </Button>
      </Modal.Footer>
    </Modal>
  )
})

export default CreateProduct
