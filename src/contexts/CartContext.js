import React from 'react'

// Création du contexte (état global)
const CartContext = React.createContext()

// Définition des actions possibles pour ce contexte
const actions = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART'
}

/**
 * Retourne le nouvel état mit à jour correspondant au type d'action définit plus haut
 * @param state l'état précédent la mise à jour
 * @param action action propagée à l'aide la méthode dispatch(). Contient le type d'action et la data éventuelle associée
 * @return le nouvel état
 * */
const cartReducer = (state, action) => {
  switch (action.type) {
    case actions.ADD_TO_CART:
      // Si l'item est déjà présent
      if (state.cart.some((i) => i.item._id === action.data._id)) {
        // On modifie la quantité de l'élément dans tableau via la fonction map()
        // Ici l'utilisation de map() permet de conserver la pureté du reducer car elle retourne un nouveau tableau contrairement à slice() qui shadow copy
        const cart = state.cart.map(item => {
          // On retrouve l'item à modifier
          if (item.item._id === action.data._id) {
            // On retourne l'item avec la nouvelle quantité
            return { ...item, quantity: item.quantity + 1 }
          } else {
            // Retourne l'item
            return item
          }
        })
        // On retourne le nouveau state
        return { ...state, cart: cart }
      } else {
        // Si il n'est pas présent dans la liste, on l'ajoute au tableau des items du cart
        return { ...state, cart: state.cart.concat([{ item: action.data, quantity: 1 }]) }
      }
    case actions.REMOVE_FROM_CART:
      // On recréé un tableau d'éléments en supprimant l'élément dont l'id a été passé dans le paramètre action.data
      const cart = state.cart.filter((item) => item.item._id !== action.data._id)
      return { ...state, cart: cart }
    default:
      // Cas par défaut si l'action n'existe pas
      throw new Error('Unhandled action type : ' + action.type)
  }
}

/**
 * Provider à placer au dessus des enfants (consumers) ayant besoin d'avoir accès à ce contexte
 * @param {*} children les enfants du composant
 * @returns Composant Provider à placer autour des enfants (consumers)
 */
const CartProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(cartReducer, { cart: [] })

  const value = { state, dispatch }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

/**
 * Hook permettant un test de la bonne application de notre context et vérifiant la présence du Provider
 * @returns context { state, dispatch }
 */
const useCart = () => {
  const context = React.useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

// Export sélectif
// Import avec {}
export { CartProvider, useCart, actions }
