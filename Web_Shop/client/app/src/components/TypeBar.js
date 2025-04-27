import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { ContextProduct } from '../index'
import { ListGroup } from 'react-bootstrap'

const TypeBar = observer(() => {
  const { product } = useContext(ContextProduct)
  return (
    <ListGroup>
      {product.types.map(type =>
        <ListGroup.Item
          key={type.id}
          style={{ cursor: 'pointer' }}
          active ={type.id === product.selectedType.id}
          onClick = { () => product.setSelectedType(type) }
        >
          {type.name}
        </ListGroup.Item>
      )}
    </ListGroup>
  )
})

export default TypeBar
