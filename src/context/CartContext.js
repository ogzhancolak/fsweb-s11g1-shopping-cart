import React, { createContext } from 'react';

const CartContext = createContext({
  cart: [],
  addItem: () => {},
  removeProduct: () => {},
});

export default CartContext;
