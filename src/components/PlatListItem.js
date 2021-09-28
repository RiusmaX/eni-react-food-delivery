import PropTypes from "prop-types"

import { useCart, actions } from '../contexts/CartContext'

PlatListItem.propTypes = {
  plat: PropTypes.object.isRequired
}

function PlatListItem ({ plat }) {
  const { dispatch } = useCart()
  const addToCart = () => {
    dispatch({ type: actions.ADD_TO_CART, data: plat })
  }

  return (
    <div className='card'>
      { (plat.photos && plat.photos.length > 0) && <img src={`https://strapi.myidea.fr${plat.photos[0].url}`} />}
      <h3>{plat.nom}</h3>
      <h4>{plat.price.toFixed(2)} €</h4>
      <p>{plat.description}</p>
      <button onClick={addToCart}>Ajouter au panier</button>
    </div>
  )
} 

export default PlatListItem