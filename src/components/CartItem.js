import PropTypes from 'prop-types'

import { useCart, actions } from '../contexts/CartContext'

CartItem.propTypes = {
  item: PropTypes.object.isRequired
}

function CartItem ({ item }) {
  const { dispatch } = useCart()

  const remove = (e) => {
    e.preventDefault()
    dispatch({ type: actions.REMOVE_FROM_CART, data: item.item._id })
  }

  return (
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <button onClick={remove}>X</button>
      <h4>{item.item.nom}</h4>
      <h5>{item.quantity}</h5>
    </div>
  )
}

export default CartItem