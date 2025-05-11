import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { ContextProduct } from '..'
import { Pagination } from 'react-bootstrap'

const Pages = observer(() => {
  const { product } = useContext(ContextProduct)
  const pageCount = Math.ceil(product.totalCount / product.limit)

  const pages = []

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1)
  }
  return (
    <Pagination>
      {pages.map((page) => {
        return (
          <Pagination.Item
            key={page}
            active={product.page === page}
            onClick={() => product.setPage(page)}
          >
            {page}
          </Pagination.Item>
        )
      })}
    </Pagination>
  )
})

export default Pages
