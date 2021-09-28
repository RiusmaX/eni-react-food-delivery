import React from 'react'

const CartContext = React.createContext()

const actions = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART'
}

const cartReducer = (state, action) => {
  switch (action.type) {
    case actions.ADD_TO_CART:
      // Si l'item est déjà présent
      if (state.cart.some((i) => i.item._id === action.data._id)) {
        // On modifie la quantité de l'élément dans tableau via la fonction map()
        // Ici l'utilisation de map() permet de conserver la pureté du reducer car elle retourne un nouveau tableau contrairement à slice() qui shadow copy
        let cart = state.cart.map(item => {
          // On retrouve l'item à modifier
          if (item.item._id === action.data._id) {
            // On retourne l'item avec la nouvelle quantité
            return {...item, quantity: item.quantity + 1 }
          } else {
            // Retourne l'item
            return item
          }
        })
        // On retourne le nouveau state
        return { ...state, cart: cart }
      } else {
        return { ...state, cart: state.cart.concat([{item: action.data, quantity: 1}]) }
      }
    case actions.REMOVE_FROM_CART:
      let cart = state.cart.filter((item) => item.item._id !== action.data)
      return { ...state, cart: cart }
    default:
      throw new Error('Unhandled action type : ' + action.type)
  }
}

const CartProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(cartReducer, { cart: [] })

  const value = { state, dispatch }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

const useCart = () => {
  const context = React.useContext(CartContext)
  if(!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export { CartProvider, useCart, actions }