import PropTypes from 'prop-types'
import RestaurantListItem from './RestaurantListItem'

import './styles/RestaurantList.css'

// Définition du format des propriétés attendues
RestaurantList.propTypes = {
  restaurants: PropTypes.array.isRequired
}

/**
 * Composant affichant des restaurants
 * @param {*} restaurants La liste des restaurants
 * @returns Le composant de liste des restaurants
 */
function RestaurantList ({ restaurants }) {
  return (
    <div className='list-container'>
      {
        // On boucle sur la liste des restaurants et on retourne un RestaurantListItem pour chaque élément de la liste
        restaurants.map((restaurant) => {
          return (
            <RestaurantListItem
              key={restaurant._id}
              restaurant={restaurant}
            />
          )
        })
      }
    </div>
  )
}

// Export par défaut du composant
// Import sans les {}
export default RestaurantList
