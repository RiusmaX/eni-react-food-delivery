import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Cart from './components/Cart';
import Header from './components/Header';
import Navigator from './navigation/Navigator';

import { CartProvider } from './contexts/CartContext'
import AuthModal from './components/AuthModal';
import ReactModal from 'react-modal';
import { ModalProvider } from './contexts/ModalContext';
import { AuthProvider } from './contexts/AuthContext';

ReactModal.setAppElement('#root')

function App() {
  return (
    <div className="App">
      <Router>
        <CartProvider>
          <ModalProvider>
            <AuthProvider>
              <Header />
              <Navigator />
              <Cart />
              <AuthModal />
            </AuthProvider>
          </ModalProvider>
        </CartProvider>
      </Router>
    </div>
  );
}

export default App;
