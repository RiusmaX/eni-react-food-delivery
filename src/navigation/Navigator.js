import {
  Route,
  Switch
} from 'react-router-dom'
import Home from '../pages/Home'
import Restaurants from '../pages/Restaurants'
import Restaurant from '../pages/Restaurant'

/**
 * Déclaration de notre routeur de navigation et des différentes routes
 * @returns Composant de navigation 
 */
function Navigator () {
  return (
    <Switch>
      <Route path='/restaurant/:id'>
        <Restaurant />  
      </Route>
      <Route path='/restaurants'>
        <Restaurants />
      </Route>
      <Route path='/'>
        <Home />
      </Route>
    </Switch>
  )
}

export default Navigator