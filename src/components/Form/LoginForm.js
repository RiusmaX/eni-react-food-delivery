import PropTypes from 'prop-types'
import { useState } from 'react'

import TextInput from './TextInput'

// Définition des propriétés
LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool
}

/**
 * Composant contenant le formulaire d'enregistrement
 * @param {*} props Propriétés du composant
 * @returns Un Composant
 */
function LoginForm ({ onSubmit, loading, ...props }) {
  // Initialisation de l'état local permettant de stocker la saisie de l'utilisateur
  const [formData, setFormData] = useState({ identifier: '', password: '' })

  /**
   * Gère la saisie de l'utilisateur
   * @param {*} e évènement provenant du HTML (correspondant à l'action de frappe sur le clavier)
   */
  const handleChange = (e) => {
    setFormData({
      ...formData, // Fusion avec les données déjà présentes dans l'état local
      [e.target.name]: e.target.value // Utilisation du name pour remplir l'état local dynamiquement
    })
  }

  /**
   * Gère le clic sur le bouton d'inscription
   * @param {*} e évènement provenant du HTML (correspondant à l'action du clic sur le bouton)
   */
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label='Email'
        name='identifier'
        onChange={handleChange}
        value={formData.identifier}
      />
      <br />
      <TextInput
        type='password'
        label='Password'
        name='password'
        onChange={handleChange}
        value={formData.password}
      />
      <br />
      <input type='submit' value={loading ? 'Chargement...' : 'Se connecter'} />
    </form>
  )
}

export default LoginForm
