import { makeAutoObservable } from 'mobx'

export default class ProductStore {
  constructor() {
    this._types = []
    this._brands = []
    this._products = []
    this._totalCount = 0
    this._page = 1
    this._selectedType = {}
    this._selectedBrand = {}
    this._limit = 4
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

  setTotalCount(count) {
    // Добавляем метод для установки общего количества
    this._totalCount = count
  }

  setSelectedType(type) {
    this.setPage(1)
    this._selectedType = type
  }
  setSelectedBrand(brand) {
    this.setPage(1)
    this._selectedBrand = brand
  }

  setLimit(limit) {
    this._limit = limit
  }

  setPage(page) {
    this._page = page
  }

  get page(){
    return this._page
  }

  get limit() {
    return this._limit
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

  get totalCount() {
    // Геттер для получения общего количества
    return this._totalCount
  }

  get selectedType() {
    return this._selectedType
  }
  get selectedBrand() {
    return this._selectedBrand
  }
}
