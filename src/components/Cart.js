import { useRef } from 'react'
import Draggable from 'react-draggable'
import { useCart } from '../contexts/CartContext'
import CartItem from './CartItem'

import './styles/Cart.css'

/**
 * Composant responsable de l'affichage du panier (commande)
 * @returns Le composant Cart
 */
const Cart = () => {
  const { state: { cart } } = useCart()
  const nodeRef = useRef(null)
  /* Utilisation de React Draggable pour rendre le composant Cart déplaçable à la souris */
  return (
    <Draggable nodeRef={nodeRef}>
      <div ref={nodeRef} className='cart-container'>
        <h2>Votre commande : </h2>
        {
          // Boucle sur les items du cart pour affichage
          cart.map((item, index) => {
            return (
              <CartItem key={index} item={item} />
            )
          })
        }
      </div>
    </Draggable>
  )
}

// Export par défaut du composant
// Import sans les {}
export default Cart
