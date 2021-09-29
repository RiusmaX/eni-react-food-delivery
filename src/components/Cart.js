import Draggable from 'react-draggable'
import { useCart } from '../contexts/CartContext'
import CartItem from './CartItem'

import './styles/Cart.css'

const Cart = () => {
  const { state: { cart } } = useCart()
  /* Utilisation de React Draggable pour rendre le composant Cart déplaçable à la souris */
  return (
    <Draggable>
      <div className='cart-container'>
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

export default Cart