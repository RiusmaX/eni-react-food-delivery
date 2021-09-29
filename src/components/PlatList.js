import PropTypes from "prop-types"
import PlatListItem from "./PlatListItem"

// Définition du format des propriétés attendues
PlatList.propTypes = {
  plats: PropTypes.array.isRequired
}

/**
 * Composant affichant la liste des plats d'un restaurant
 * @param {*} plats La liste des plats du restaurant 
 * @returns Le composant de liste des plats
 */
function PlatList ({ plats }) {
  return (
    <div className='list-container'>
      {
        plats.map((plat) => {
          return (
            <PlatListItem key={plat._id} plat={plat} />
          )
        })
      }
    </div>
  )
}

// Export par défaut du composant
// Import sans les {}
export default PlatList