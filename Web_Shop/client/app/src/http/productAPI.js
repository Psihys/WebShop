import { $authHost, $host } from '.' // Импортируйте $authHost и $host

export const createType = async (type) => {
  const { data } = await $authHost.post('/api/type', type)
  return data
}

export const fetchTypes = async () => {
  const { data } = await $host.get('/api/type')
  return data
}

export const createBrand = async (brand) => {
  const { data } = await $authHost.post('/api/brand', brand)
  return data
}

export const fetchBrands = async () => {
  const { data } = await $host.get('/api/brand')
  return data
}

export const createProduct = async (product) => {
  const { data } = await $authHost.post('/api/product', product)
  return data
}

export const fetchProducts = async (typeId, brandId, page, limit) => {
  const { data } = await $host.get('/api/product', { // Замінили '/api/device' на '/api/product'
    params: {
      typeId,
      brandId,
      page,
      limit,
    },
  })
  return data
}


export const fetchOneProduct = async (id) => {
  const { data } = await $host.get('/api/product/' + id)
  return data
}


export const updateProduct = async (product) => {
  const {data} = await $authHost.put('api/product', product);
  return data;
}