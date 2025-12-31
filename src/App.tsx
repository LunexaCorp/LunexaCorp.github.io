import './App.css'
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Nyx from './pages/Nyx';

function App() {
  return (
    <Router>
      <nav style={{ padding: '1rem', background: '#1e293b' }}>
          <Link to="/" style={{ color: 'white', marginRight: '1rem' }}>Inicio</Link>
          <Link to="/nyx" style={{ color: '#10b981' }}>Proyecto NYX</Link>
        </nav>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nyx" element={<Nyx />} />
        </Routes>
    </Router>
  )
}

export default App
