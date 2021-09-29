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

// Fonction essentielle du React Modal afin qu'il détermine la racine de notre application
ReactModal.setAppElement('#root')

function App() {
  return (
    <div className="App">
      <Router> {/* Déclaration du routage principal de l'application */}
        <CartProvider> {/* Encadrer les composants enfants ayant besoin de l'accès au contexte par un Provider */}
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
