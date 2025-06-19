import React, { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  ecoDiscountEnabled: false,
  useGreenCoins: false,
  carbonOffset: false
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
case "TOGGLE_ECO_DISCOUNT":
      return {
        ...state,
        ecoDiscountEnabled: action.payload,
      };

    case "TOGGLE_GREEN_COINS":
      return {
        ...state,
        useGreenCoins: action.payload,
      };

    case "TOGGLE_CARBON_OFFSET":
      return {
        ...state,
        carbonOffset: action.payload,
      };

    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);


  const subtotal = state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = state.ecoDiscountEnabled ? subtotal * 0.1 : 0;
  const shippingBase = 49;
  const shippingFee = state.useGreenCoins ? 0 : shippingBase;
  const carbonOffsetFee = state.carbonOffset ? 20 : 0;
  const total = subtotal - discount + shippingFee + carbonOffsetFee;

  // Toggle functions
  const toggleEcoDiscount = (value) => dispatch({ type: "TOGGLE_ECO_DISCOUNT", payload: value });
  const toggleGreenCoins = (value) => dispatch({ type: "TOGGLE_GREEN_COINS", payload: value });
  const toggleCarbonOffset = (value) => dispatch({ type: "TOGGLE_CARBON_OFFSET", payload: value });

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        ecoDiscountEnabled: state.ecoDiscountEnabled,
        useGreenCoins: state.useGreenCoins,
        carbonOffset: state.carbonOffset,
        subtotal,
        discount,
        shippingBase,
        shippingFee,
        carbonOffsetFee,
        total,
        toggleEcoDiscount,
        toggleGreenCoins,
        toggleCarbonOffset,
        dispatch, // for other actions if needed
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
