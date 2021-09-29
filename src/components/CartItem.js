import PropTypes from 'prop-types'

import { useCart, actions } from '../contexts/CartContext'

// Définition du format des propriétés attendues
CartItem.propTypes = {
  item: PropTypes.object.isRequired
}

/**
 * Composant représentant 1 item du panier
 * @param {*} item Représente 1 élément du panier 
 * @returns Le composant item du panier
 */
function CartItem ({ item }) {
  const { dispatch } = useCart()

  /**
   * Suppression de l'élément du panier
   * @param {*} e évènement du clic sur le bouton
   */
  const remove = (e) => {
    e.preventDefault() // Empêcher le comportement par défaut du navigateur (rechargement de page)
    dispatch({ type: actions.REMOVE_FROM_CART, data: item.item })
  }

  return (
    <div style={{display: 'flex', flexDirection: 'row' /* Exemple de style inline */}}>
      <button onClick={remove}>X</button>
      <h4>{item.item.nom}</h4>
      <h5>{item.quantity}</h5>
    </div>
  )
}

// Export par défaut du composant
// Import sans les {}
export default CartItem