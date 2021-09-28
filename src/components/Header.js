import { Link } from 'react-router-dom'

function Header() {
  // Ne pas afficher le header sur certaines pages 
  // if(window.location.pathname === '/') {
  //   return null
  // }
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
      </nav>
    </header>
  )
}

export default Header