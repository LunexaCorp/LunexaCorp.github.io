import { Download, BookOpen, Github } from 'lucide-react';
import './NyxHeader.css';
import { NavLink } from 'react-router-dom';

const NyxHeader = () => {
  return (
    <header className="nyx-header">
      <div className="header-container">
        {/* Lado Izquierdo: Download */}
        <div className="header-left">
          <NavLink 
            to="/nyx/download" 
            className="nav-item"
          >
            <Download size={18} strokeWidth={2.5} />
            <span>Descargas</span>
          </NavLink>
        </div>

        {/* Centro: Documentación */}
        <div className="header-center">
          <NavLink 
            to="/nyx/docs" 
            className="nav-item"
          >
            <span>Documentación</span>
            <BookOpen size={18} strokeWidth={2.5} />
          </NavLink>
        </div>

        {/* Lado Derecho: Github */}
        <div className="header-right">
          <a 
            href="https://github.com/FrancoAndreeYupanquiZapana/nyx" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="nav-item external-link"
          >
            <span>Repositorio</span>
            <Github size={18} strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </header>
  );
};

export default NyxHeader;