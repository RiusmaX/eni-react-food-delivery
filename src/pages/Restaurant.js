import { useEffect, useState } from "react"
import { useParams } from "react-router"
import PlatList from "../components/PlatList"
import { getRestaurantById } from "../services/Api"

function Restaurant () {
  const { id } = useParams()
  const [restaurant, setRestaurant] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getData = async (id) => {
      setLoading(true)
      const restaurant = await getRestaurantById(id)
      setRestaurant(restaurant)
      setLoading(false)
    }

    getData(id)
  }, [])

  if (loading || !restaurant) {
    return <h2>Chargement...</h2>
  }

  return (
    <div>
      <h1>{restaurant.title}</h1>
      <img src={`https://strapi.myidea.fr${restaurant.photos[0].url}`} />
      <p>{restaurant.description}</p>
      <h2>La carte :</h2>
      <PlatList plats={restaurant.plats} />
    </div>
  )

}

export default Restaurant