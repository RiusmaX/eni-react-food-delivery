import { useEffect, useState } from "react"
import RestaurantList from "../components/RestaurantList"

import { getRestaurants } from '../services/Api'

function Restaurants () {
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    const getData = async () => {
      const restaurants = await getRestaurants()
      setRestaurants(restaurants)
    }

    getData()
  })

  return (
    <RestaurantList restaurants={restaurants} />
  )
}

export default Restaurants