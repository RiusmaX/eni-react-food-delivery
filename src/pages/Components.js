import { useState, useEffect } from "react"
import Select from "../components/Select"
import { getCitiesByCountry, getCountries } from "../services/GeoApi"

/**
 * Afficher deux listes dynamiques
 * @returns 
 */
function Components () {
  const [countries, setCountries] = useState([])
  const [cities, setCities] = useState([])

  // Chargement des données
  useEffect(() => {
    const getData = async () => {
      const data = await getCountries()
      if (data && data.data){
        setCountries(data.data)
        // Initialisation des villes sur le premier pays de la liste
        getCities(data.data[0].country)
      }
    }
    getData()
  }, [])

  // Récupération des villes en fonction de la valeur du 1er select
  const getCities = async (country) => {
    const data = await getCitiesByCountry(country)
    if (data && data.data) {
      setCities(data.data)
    }
  }

  // Gestion du changement de sélection du Select
  const handleChangeSelect = (e) => {
    getCities(e.target.value)
  }

  return (
    <div data-testid='components-container' style={{marginTop: 50}}>
      <h1 data-testid='title' >Composant sous forme de fonction</h1>
      <Select
        data={countries}
        onChange={handleChangeSelect}
        selector='country'
      />
      <Select
        data={cities}
      />
    </div>
  )
}

export default Components