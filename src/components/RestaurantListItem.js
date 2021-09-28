import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './styles/RestaurantListItem.css'

RestaurantListItem.propTypes = {
  restaurant: PropTypes.object.isRequired
}

function RestaurantListItem ({ restaurant }) {
  console.log(restaurant)
  return (
    <div className='card'>
      <img src={`https://strapi.myidea.fr${restaurant.photos[0].url}`} />
      <h3>{restaurant.title}</h3>
      <p>{restaurant.description}</p>
      <Link to={`/restaurant/${restaurant._id}`}>
        Voir le restaurant
      </Link>
    </div>
  )
}

export default RestaurantListItem