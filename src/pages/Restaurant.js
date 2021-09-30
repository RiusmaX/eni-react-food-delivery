import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import PlatList from '../components/PlatList'
import { getRestaurantById } from '../services/Api'

/**
 * Composant représentant la page d'un restaurant
 * @returns Le composant
 */
function Restaurant () {
  // Récupération du paramètre id de la route (/restaurant/:id)
  const { id } = useParams()
  // Initialisation du state qui contiendra les données du restaurant
  const [restaurant, setRestaurant] = useState(null)
  // Gestion du chargement
  const [loading, setLoading] = useState(false)

  // Initialise les données au montage du composant (équivalent au componentDidMount)
  useEffect(() => {
    // Déclaration d'une méthode pour récupérer les données en asynchrone
    const getData = async (id) => {
      setLoading(true)
      // Récupération des données via l'API
      const restaurant = await getRestaurantById(id)
      // Sauvegarde des données dans l'état local du composant
      setRestaurant(restaurant)
      setLoading(false)
    }

    getData(id)
  }, [id]) // On précise la variable qui doit redéclancher le useEffect

  // Gestion du chargement
  if (loading || !restaurant) {
    return <h2>Chargement...</h2>
  }

  return (
    <div>
      <h1>{restaurant.title}</h1>
      <img src={`https://strapi.myidea.fr${restaurant.photos[0].url}`} alt='Logo Restaurant' />
      <p>{restaurant.description}</p>
      <h2>La carte :</h2>
      <PlatList plats={restaurant.plats} />
    </div>
  )
}

// Export par défaut du composant
// Import sans les {}
export default Restaurant
