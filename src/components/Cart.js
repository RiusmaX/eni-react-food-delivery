import Draggable from 'react-draggable'
import { useCart } from '../contexts/CartContext'
import CartItem from './CartItem'

import './styles/Cart.css'

const Cart = () => {
  const { state: { cart } } = useCart()
  return (
    <Draggable>
      <div className='cart-container'>
        <h2>Votre commande : </h2>
        {
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