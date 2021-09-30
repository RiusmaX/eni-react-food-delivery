import React, { Component } from 'react'
import Select from '../components/Select'
import { getCitiesByCountry, getCountries } from '../services/GeoApi'
import AuthContext from '../contexts/AuthContext'

/**
 * Afficher deux listes dynamiques
 * @returns 
 */
class ComponentsClass extends Component {
  static contextType = AuthContext

  constructor(props) {
    super(props)
    // Initialisation de l'état local
    this.state = {
      countries: [],
      cities: []
    }
  }

  // Initialisation des données (country + cities pour le premier élément de countries)
  getData = async () => {
    const data = await getCountries()
    if (data && data.data) {
      this.setState({
        countries: data.data
      })
      this.getCities(data.data[0].country)
    }
  }

  // Récupération des cities en fonction du country
  getCities = async (country) => {
    const data = await getCitiesByCountry(country)
    if (data && data.data) {
      this.setState({
        cities: data.data
      })
    }
  }

  // Initilisation des données au montage du composant dans le DOM
  componentDidMount () {
    this.getData()
  }

  // Gestion du changement d'option dans le Select
  handleChangeSelect = (e) => {
    this.getCities(e.target.value)
  }

  // Affichage
  render () {
    const { countries, cities } = this.state
    const { state: { user, jwt } } = this.context
    return (
      <div style={{marginTop: 50}}>
        <h2>
          {user && jwt ? 'Bonjour, ' + user.username : "Vous n'êtes pas connecté"}
        </h2>
        <Select
          data={countries}
          onChange={this.handleChangeSelect}
          selector='country'
        />
        <Select
          data={cities}
        />
      </div>
    )
  }
}

export default ComponentsClass