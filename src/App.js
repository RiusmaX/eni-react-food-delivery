import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Navigator from './navigation/Navigator';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Navigator />
      </Router>
    </div>
  );
}

export default App;
