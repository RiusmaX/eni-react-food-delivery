import axios from "axios"

const api = axios.create({
  baseURL: 'https://strapi.myidea.fr',
  headers: {
    'Content-Type': 'application/json'
  }
})

const register = async (user) => {
  try {
    const response = await api.post('/auth/local/register', user)
    return response.data
  } catch (e) {
    console.error(e)
    throw new Error(e)
  }
}

const login = async (credentials) => {
  try {
    const response = await api.post('/auth/local', credentials)
    return response.data
  } catch (e) {
    console.error(e)
    throw new Error(e)
  }
}

const getRestaurants = async () => {
  try {
    const response = await api.get('/restaurants')
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const getRestaurantById = async (id) => {
  try {
    const response = await api.get(`/restaurants/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export {
  register,
  login,
  getRestaurants,
  getRestaurantById
}