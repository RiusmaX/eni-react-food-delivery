import PropTypes from 'prop-types'
import RestaurantListItem from "./RestaurantListItem"

import './styles/RestaurantList.css'

RestaurantList.propTypes = {
  restaurants: PropTypes.array.isRequired
}

function RestaurantList ({ restaurants }) {
  return (
    <div className='list-container'>
      {
        restaurants.map((restaurant) => {
          return  <RestaurantListItem
                    key={restaurant._id}
                    restaurant={restaurant}
                  />
        })
      }
    </div>
  )
}

export default RestaurantList