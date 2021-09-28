import { useCart, actions } from '../contexts/CartContext'
import CartItem from './CartItem'

import './styles/Cart.css'

const Cart = () => {
  const { state: { cart } } = useCart()
  return (
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
  )
}

export default Cart