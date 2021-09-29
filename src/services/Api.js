import axios from "axios"

/**
 * Création d'une instance d'axios permettant de ne pas en redéclarer une dans chaque fonction
 */
console.log('API URL : ' + process.env.REACT_APP_API_URL)

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

/**
 * Enregistre un utilisateur dans l'API
 * @param {*} user les données saisies par l'utilisateur
 * @returns la réponse de l'API (contenant le JWT et le user)
 */
const register = async (user) => {
  try {
    const response = await api.post('/auth/local/register', user)
    return response.data
  } catch (e) {
    console.error(e)
    throw new Error(e)
  }
}

/**
 * Connecte un utilisateur via l'API (récupération du JWT)
 * @param {*} credentials les données saisies par l'utilisateur
 * @returns la réponse de l'API (contenant le JWT et le user)
 */
const login = async (credentials) => {
  try {
    const response = await api.post('/auth/local', credentials)
    return response.data
  } catch (e) {
    console.error(e)
    throw new Error(e)
  }
}

/**
 * Récupère la liste des restaurants dans l'API
 * @returns les données demandées à l'API
 */
const getRestaurants = async () => {
  try {
    const response = await api.get('/restaurants')
    return response.data
  } catch (error) {
    console.error(error)
  }
}

/**
 * Récupère un restaurant par son ID
 * @param {*} id ID du restaurant
 * @returns le restaurant
 */
const getRestaurantById = async (id) => {
  try {
    const response = await api.get(`/restaurants/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

// Export des différentes méthodes pour les rendre disponibles dans les autres composants
export {
  register,
  login,
  getRestaurants,
  getRestaurantById
}