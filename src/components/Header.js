import { Link } from 'react-router-dom'
import { logout, useAuth } from '../contexts/AuthContext'
import { useModal, openModal } from '../contexts/ModalContext'

/**
 * En-tête de l'application
 * Contient le menu de navigation et les fonctionnalité de connexion/déconnexion
 * @returns Le composant d'en-tête
 */
function Header() {
  // Ne pas afficher le header sur certaines pages (exemple pour l'accueil)
  // if(window.location.pathname === '/') {
  //   return null
  // }
  // Fonction pour faire apparaître le modal via le contexte Modal
  const { dispatch } = useModal()
  // Fonction pour déconnecter l'utilisateur via le contexte Auth
  const authDispatch = useAuth().dispatch
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to='/'>Accueil</Link>
          </li>
          <li>
            <Link to='/restaurants'>Restaurants</Link>
          </li>
        </ul>
        <button onClick={() => openModal(dispatch)}>Login / Register</button>
        <button onClick={() => logout(authDispatch)}>Logout</button>
      </nav>
    </header>
  )
}

// Export par défaut du composant
// Import sans les {}
export default Header