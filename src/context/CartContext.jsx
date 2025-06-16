import React, { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || []
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
  const existingItemIndex = state.cart.findIndex(
    (item) => item.title === action.payload.title
  );

  if (existingItemIndex >= 0) {
    const updatedCart = state.cart.map((item, index) => {
      if (index === existingItemIndex) {
        return {
          ...item,
          quantity: item.quantity + action.payload.quantity,
        };
      }
      return item;
    });

    return { cart: updatedCart };
  } else {
    return { cart: [...state.cart, action.payload] };
  }
}

    case "REMOVE_FROM_CART":
      return {
        cart: state.cart.filter((item) => item.id !== action.payload)
      };

    case "UPDATE_QUANTITY":
      return {
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
      case "TOGGLE_GIFT_OPTION": {
  const updatedCart = state.cart.map(item => 
    item.id === action.payload
      ? { ...item, giftOption: !item.giftOption }
      : item
  );
  return { cart: updatedCart };
}


    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider value={{ cart: state.cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
