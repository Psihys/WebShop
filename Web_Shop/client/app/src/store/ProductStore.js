import { makeAutoObservable } from 'mobx'

export default class ProductStore {
  constructor() {
    this._types = [
      { id: 1, name: 'Something' },
      { id: 2, name: 'Car' },
      { id: 3, name: 'Lenovo' },
    ]
    this._brands = [
      { id: 1, name: 'Samsung' },
      { id: 2, name: 'Asus' },
    ]
    this._products = [
      {
        id: 1,
        name: '12pro',
        price: 2000,
        rating: 0,
        img: '31cbf309-79ff-417a-b33c-68ed0e20383d.jpg',
      },
      {
        id: 2,
        name: '13pro',
        price: 2000,
        rating: 0,
        img: 'f1935497-2212-4cff-ab44-72793c167274.jpg',
      },
      {
        id: 3,
        name: '14pro',
        price: 2000,
        rating: 0,
        img: '99d97f80-db2b-41b0-b66b-e03afca57ecd.jpg',
      },
    ]
    this._selectedType = {}
    this._selectedBrand = {}
    makeAutoObservable(this)
  }

  setTypes(types) {
    this._types = types
  }
  setBrands(brands) {
    this._brands = brands
  }
  setProducts(products) {
    this._products = products
  }

  setSelectedType(type) {
    this._selectedType = type
  }
  setSelectedBrand(brand) {
    this._selectedBrand = brand
  }

  get types() {
    return this._types
  }
  get brands() {
    return this._brands
  }
  get products() {
    return this._products
  }

  get selectedType() {
    return this._selectedType
  }
  get selectedBrand() {
    return this._selectedBrand
  }
}
