import {
  Route,
  Switch
} from 'react-router-dom'
import Home from '../pages/Home'
import Restaurants from '../pages/Restaurants'
import Restaurant from '../pages/Restaurant'
import Components from '../pages/Components'
import ComponentsClass from '../pages/ComponentsClass'

/**
 * Déclaration de notre routeur de navigation et des différentes routes
 * @returns Composant de navigation
 */
function Navigator () {
  return (
    <Switch>
      {/* Route dynamique avec le paramètre "id" */}
      <Route path='/restaurant/:id'>
        <Restaurant />
      </Route>
      <Route path='/restaurants'>
        <Restaurants />
      </Route>
      <Route path='/components'>
        <Components />
        <ComponentsClass />
      </Route>
      <Route path='/'>
        <Home />
      </Route>
    </Switch>
  )
}

// Export par défaut du composant
// Import sans les {}
export default Navigator
