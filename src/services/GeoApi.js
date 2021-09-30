import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_GEO_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

const getCountries = async () => {
  try {
    const response = await api.get('/countries')
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const getCitiesByCountry = async (country) => {
  try {
    const body = { country }
    // == const body = { country: country }
    const response = await api.post('/countries/cities', body)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export {
  getCountries,
  getCitiesByCountry
}
