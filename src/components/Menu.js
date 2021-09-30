import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

function Menu () {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <Button variant='contained'>Accueil</Button>
          </Link>
        </li>
        <li>
          <Link to='/restaurants' style={{ textDecoration: 'none' }}>
            <Button variant='contained'>Restaurants</Button>
          </Link>
        </li>
        <li>
          <Link to='/components' style={{ textDecoration: 'none' }}>
            <Button variant='contained'>Components</Button>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Menu
