import { logout, useAuth } from '../contexts/AuthContext'
import { useModal, openModal } from '../contexts/ModalContext'
import Menu from './Menu'

/**
 * En-tête de l'application
 * Contient le menu de navigation et les fonctionnalité de connexion/déconnexion
 * @returns Le composant d'en-tête
 */
function Header () {
  // Ne pas afficher le header sur certaines pages (exemple pour l'accueil)
  // if(window.location.pathname === '/') {
  //   return null
  // }
  // Fonction pour faire apparaître le modal via le contexte Modal
  const { dispatch } = useModal()
  // Fonction pour déconnecter l'utilisateur via le contexte Auth
  const authDispatch = useAuth().dispatch
  // Le menu de
  return (
    <header>
      <Menu />
      <button onClick={() => openModal(dispatch)}>Login / Register</button>
      <button onClick={() => logout(authDispatch)}>Logout</button>
    </header>
  )
}

// Export par défaut du composant
// Import sans les {}
export default Header
