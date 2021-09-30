import PropTypes from 'prop-types'

import { useCart, actions } from '../contexts/CartContext'

// Définition du format des propriétés attendues
PlatListItem.propTypes = {
  plat: PropTypes.object.isRequired
}

/**
 * Composant affichant un item de plat dans la liste des plats d'un restaurant
 * @param {*} plat Le plat à afficher
 * @returns Le composant d'item de liste des plats
 */
function PlatListItem ({ plat }) {
  const { dispatch } = useCart()

  /**
   * Méthode d'ajout au panier via le contexte Cart
   */
  const addToCart = () => {
    dispatch({ type: actions.ADD_TO_CART, data: plat })
  }

  return (
    <div className='card'>
      {(plat.photos && plat.photos.length > 0) && <img src={`https://strapi.myidea.fr${plat.photos[0].url}`} alt='Plat' />}
      <h3>{plat.nom}</h3>
      <h4>{plat.price.toFixed(2)} €</h4>
      <p>{plat.description}</p>
      <button onClick={addToCart}>Ajouter au panier</button>
    </div>
  )
}

// Export par défaut du composant
// Import sans les {}
export default PlatListItem
