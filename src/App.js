import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Cart from './components/Cart';
import Header from './components/Header';
import Navigator from './navigation/Navigator';

import { CartProvider } from './contexts/CartContext'

function App() {
  return (
    <div className="App">
      <Router>
        <CartProvider>
          <Header />
          <Navigator />
          <Cart />
        </CartProvider>
      </Router>
    </div>
  );
}

export default App;
