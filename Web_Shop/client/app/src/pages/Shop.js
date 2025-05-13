import  {React, useContext, useEffect } from 'react'
import TypeBar from '../components/TypeBar'
import BrandBar from '../components/BrandBar'
import ProductList from '../components/ProductList'
import { observer } from 'mobx-react-lite'
import { ContextProduct } from '..'
import { fetchBrands, fetchProducts, fetchTypes } from '../http/productAPI'
import Pages from '../components/Pages'
import './styles/shopPage.css'
const Shop = observer(() => {
  const { product } = useContext(ContextProduct)

  useEffect(() => {
    fetchTypes().then((data) => product.setTypes(data))
    fetchBrands().then((data) => product.setBrands(data))
  }, []) 

  useEffect(() => {
    fetchProducts(
      product.selectedType.id || null,
      product.selectedBrand.id || null,
      product.page,
      product.limit
    ).then((data) => {
      product.setProducts(data.rows)
      product.setTotalCount(data.count)
    })
  }, [product.page, product.selectedType, product.selectedBrand, product.limit])

  return (
    <div className='shop-container'>
      
        <div className='shop-types'>
          <TypeBar />
        </div>
        <div className='shop-brands_products'>
          <div className='shop-brands'>
            <BrandBar />
          </div>
          <div className='shop-product_list'>
            <ProductList />
          </div>
          <div className='shop-pagination'>
            <Pages />
          </div>
        </div>
      
    </div>
  )
})

export default Shop
