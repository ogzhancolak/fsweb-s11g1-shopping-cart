import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { data } from "./data";

import ProductContext from "./context/ProductContext";
import CartContext from './context/CartContext';

// Bileşenler
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  const [products, setProducts] = useState(data);
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    // verilen itemi sepete ekleyin
    setCart([ ...cart, item ]);
  };

  useEffect (() => {
    const toCart = localStorage.getItem("cart");
    if(toCart) {
      setCart(JSON.parse(toCart));
    }
  }, [])

  useEffect (() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  },[cart])

  const removeProduct = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addItem }}>
      <CartContext.Provider value={{ cart, removeProduct }}>
        <div className="App">
          <Navigation cart={cart} />

          {/* Routelar */}
          <main className="content">
            <Route exact path="/">
              <Products products={products} addItem={addItem} />
            </Route>

            <Route path="/cart">
              <ShoppingCart cart={cart} />
            </Route>
          </main>
        </div>
      </CartContext.Provider>
    </ProductContext.Provider>

  );
}

export default App;
