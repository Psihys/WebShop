// In your BasketStore.js file
import { makeAutoObservable } from 'mobx';

export default class BasketStore {
  constructor() {
    this._basketItems = [];
    this._totalPrice = 0;
    makeAutoObservable(this);
  }

  // Add this method to your BasketStore class
  changeQuantity(id, quantity) {
    if (quantity < 1) return;
    
    const item = this._basketItems.find(item => item.id === id);
    if (item) {
      item.quantity = quantity;
      this.calculateTotalPrice();
    }
  }

  // Make sure you have these existing methods
  setBasketItems(items) {
    this._basketItems = items;
    this.calculateTotalPrice();
  }

  addToBasket(item) {
    const existingItem = this._basketItems.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this._basketItems.push({...item, quantity: 1});
    }
    this.calculateTotalPrice();
  }

  removeFromBasket(id) {
    this._basketItems = this._basketItems.filter(item => item.id !== id);
    this.calculateTotalPrice();
  }

  clearBasket() {
    this._basketItems = [];
    this._totalPrice = 0;
  }

  calculateTotalPrice() {
    this._totalPrice = this._basketItems.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
  }

  get basketItems() {
    return this._basketItems;
  }

  get totalPrice() {
    return this._totalPrice;
  }
}
