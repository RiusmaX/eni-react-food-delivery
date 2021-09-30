import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// Import du fichier CSS
import './styles/RestaurantListItem.css'

// Définition du format des propriétés attendues
RestaurantListItem.propTypes = {
  restaurant: PropTypes.object.isRequired
}

/**
 * Composant affichant d'un item restaurant dans la liste des restaurants
 * @param {*} restaurant Le restaurant à afficher
 * @returns Le composant d'item de liste des restaurants
 */
function RestaurantListItem ({ restaurant }) {
  return (
    <div className='card'>
      {/* Ecriture d'une string avec les backlits pour insérer des variables ou du code */}
      <img src={`https://strapi.myidea.fr${restaurant.photos[0].url}`} alt='Restaurant' />
      <h3>{restaurant.title}</h3>
      <p>{restaurant.description}</p>
      <Link to={`/restaurant/${restaurant._id}`}>
        Voir le restaurant
      </Link>
    </div>
  )
}

// Export par défaut du composant
// Import sans les {}
export default RestaurantListItem
