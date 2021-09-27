import {
  Route,
  Switch
} from 'react-router-dom'
import Home from '../pages/Home'
import Restaurants from '../pages/Restaurants'

function Navigator () {
  return (
    <Switch>
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