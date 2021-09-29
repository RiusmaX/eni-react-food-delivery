import { Link } from 'react-router-dom'
import { logout, useAuth } from '../contexts/AuthContext'
import { useModal, openModal } from '../contexts/ModalContext'

function Header() {
  // Ne pas afficher le header sur certaines pages 
  // if(window.location.pathname === '/') {
  //   return null
  // }
  const { dispatch } = useModal()
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

export default Header