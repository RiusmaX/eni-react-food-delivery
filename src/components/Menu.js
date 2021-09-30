import { Button, Grid } from '@mui/material'
import { Link } from 'react-router-dom'

function Menu () {
  return (
    <nav>
      <Grid container spacing={2}>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <Button variant='contained'>Accueil</Button>
        </Link>

        <Link to='/restaurants' style={{ textDecoration: 'none' }}>
          <Button variant='contained'>Restaurants</Button>
        </Link>

        <Link to='/components' style={{ textDecoration: 'none' }}>
          <Button variant='contained'>Components</Button>
        </Link>
      </Grid>
    </nav>
  )
}

export default Menu
