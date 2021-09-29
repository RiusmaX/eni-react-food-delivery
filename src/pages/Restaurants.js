import { useEffect, useState } from "react"
import RestaurantList from "../components/RestaurantList"

import { getRestaurants } from '../services/Api'

/**
 * Page affichant la liste des restaurants
 * @returns Un composant sous forme de page
 */
function Restaurants () {
  // Etat local de stockage de la liste des restaurants 
  const [restaurants, setRestaurants] = useState([])
  // Gestion du chargement
  const [loading, setLoading] = useState(false)

  // Méthode équivalente aux méthodes de cycle de vie d'un composant sous forme de classe
  // Par défaut, appelé au montage du composant ainsi qu'a ses rafraîchissements 
  useEffect(() => {
    // Déclaration d'une méthode asynchrone afin de récupérer les données
    // On ne peut pas rentre un useEffect entier asynchrone car cela pourrait être bloquant pour notre rendu, on passe donc par une méthode intermédiaire
    const getData = async () => {
      setLoading(true) // Affichage du chargement
      const restaurants = await getRestaurants() // Récupération des données des restaurants via l'API
      setRestaurants(restaurants) // Insertion des restaurants dans l'état local
      setLoading(false) // Masquage du chargement
    }
    // Appel de la méthode précédemment déclarée
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

  // Rendu du composant une fois les donnéees chargées
  return (
    <RestaurantList restaurants={restaurants} />
  )
}

// Export par défaut du composant
// Import sans les {}
export default Restaurants