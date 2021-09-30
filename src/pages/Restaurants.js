import { useEffect, useState } from 'react'
import SearchInput from '../components/Form/SearchInput'
import RestaurantList from '../components/RestaurantList'

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
  // Gestion de la recherche
  const [searchText, setSearchText] = useState('')

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

  // Gestion de la saisie dans le composant de recherche
  const handleSearch = (text) => {
    setSearchText(text)
  }

  // Chargement
  if (loading) {
    return (
      <h2>Chargement...</h2>
    )
  }

  // Filtrage des restaurants en fonction du terme de recherche (titre et description)
  const restaurantsFiltered = restaurants.filter(
    // On utilise toLocaleLowerCase() afin de comparer des chaînes caractère au même format
    (r) => r.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
    r.description.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
  )

  // Rendu du composant une fois les donnéees chargées
  return (
    <div>
      <SearchInput onChange={handleSearch} />
      {
        !restaurants || restaurants.length < 1
          ? <h2>Aucuns restaurants</h2>
          : <RestaurantList restaurants={restaurantsFiltered} />
      }
    </div>
  )
}

// Export par défaut du composant
// Import sans les {}
export default Restaurants
