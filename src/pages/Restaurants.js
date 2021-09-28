import { useEffect, useState } from "react"
import RestaurantList from "../components/RestaurantList"

import { getRestaurants } from '../services/Api'

function Restaurants () {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      const restaurants = await getRestaurants()
      setRestaurants(restaurants)
      setLoading(false)
    }
    
    getData()
  }, [])

  // Chargement
  if (loading) {
    return (
      <h2>Chargement...</h2>
    )
  }

  // Pas de données ou erreur de chargement
  if(!restaurants || restaurants.length < 1) {
    return (
      <h2>Aucuns restaurants</h2>
    )
  }

  // Rendu du composant
  return (
    <RestaurantList restaurants={restaurants} />
  )
}

export default Restaurants