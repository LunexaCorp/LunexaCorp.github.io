import React, { useRef, useCallback, useState, useEffect } from "react";
import "./NyxDocsPage.css";

// Tipos
interface VideoTutorial {
  number: number;
  videoUrl: string;
  title: string;
  description: string;
  content: string;
}

interface VideoTutorialCardProps {
  number: number;
  videoUrl: string;
  title: string;
  description: string;
  content: string;
  setRef: (el: HTMLDivElement | null) => void;
}

// Función helper para extraer videoId de una URL de YouTube
const getYouTubeVideoId = (url: string): string => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : url;
};

// Componente para cada card de tutorial
const VideoTutorialCard: React.FC<VideoTutorialCardProps> = ({
  number,
  videoUrl,
  title,
  description,
  content,
  setRef,
}) => {
  const videoId = getYouTubeVideoId(videoUrl);

  return (
    <div className="tutorial-card" ref={setRef}>
      <div className="tutorial-number">{number}</div>

      <div className="tutorial-layout">
        {/* Video a la izquierda */}
        <div className="tutorial-video">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>

        {/* Contenido a la derecha */}
        <div className="tutorial-content">
          <div className="tutorial-header">
            <h3 className="tutorial-title">{title}</h3>
            <p className="tutorial-description">{description}</p>
          </div>

          <div className="tutorial-details">
            <h4>Contenido del video</h4>
            <p>{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente principal
const NyxDocsPage: React.FC = () => {
  const tutorials: VideoTutorial[] = [
    {
      number: 1,
      videoUrl: "https://youtu.be/dLquaH2kHHI",
      title: "Gestos Básicos",
      description: "Aprende los movimientos esenciales para controlar NYX",
      content:
        "content: "En este tutorial de inicio rápido se visualizan los movimientos fundamentales para manejar la interfaz. El video demuestra paso a paso cómo mover el cursor con fluidez, ejecutar clics precisos, pausar el puntero, mantener el clic para arrastrar y desplegar el menú de acciones rápidas; todo mediante gestos capturados en tiempo real.",
    },
    {
      number: 2,
      videoUrl: "https://www.youtube.com/watch?v=WkgHkrM9fo0",
      title: "Gestos Personalizados",
      description: "Crea y configura tus propios gestos personalizados",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.",
    },
    {
      number: 3,
      videoUrl: "https://www.youtube.com/watch?v=WkgHkrM9fo0",
      title: "Instalación del Sistema",
      description: "Guía completa para instalar NYX en tu PC",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fermentum dictum magna. Sed laoreet aliquam leo. Ut tellus dolor, dapibus eget, elementum vel, cursus eleifend, elit. Aenean auctor wisi et urna. Aliquam erat volutpat. Duis ac turpis.",
    },
    {
      number: 4,
      videoUrl: "https://www.youtube.com/watch?v=WkgHkrM9fo0",
      title: "Información del Sistema",
      description: "Conoce los requisitos y especificaciones técnicas",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.",
    },
    {
      number: 5,
      videoUrl: "https://www.youtube.com/watch?v=WkgHkrM9fo0",
      title: "Errores y Soluciones",
      description: "Resuelve problemas comunes y próximas actualizaciones",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    },
  ];

  // Crear refs para cada tutorial
  const tutorialRefs = useRef<HTMLDivElement[]>([]);
  const navigationRef = useRef<HTMLDivElement>(null);
  const [showFloatingNav, setShowFloatingNav] = useState(false);

  // Detectar cuando la navegación original sale de vista
  useEffect(() => {
    const handleScroll = () => {
      if (navigationRef.current) {
        const rect = navigationRef.current.getBoundingClientRect();
        setShowFloatingNav(rect.bottom < 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Función para hacer scroll al tutorial
  const scrollToTutorial = (index: number) => {
    const element = tutorialRefs.current[index];
    if (element) {
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition =
        elementPosition - window.innerHeight / 2 + element.offsetHeight / 2;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="nyx-docs-page">
      {/* Navegación flotante */}
      <div
        className={`floating-navigation ${showFloatingNav ? "visible" : ""}`}
      >
        <div className="floating-nav-container">
          {tutorials.map((tutorial, index) => (
            <button
              key={tutorial.number}
              className="tutorial-nav-button"
              onClick={() => scrollToTutorial(index)}
            >
              <span className="nav-button-number">{tutorial.number}</span>
              <span className="nav-button-title">{tutorial.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="container">
        {/* Hero Section */}
        <div className="docs-hero">
          <div className="hero-content">
            <h1>Aprende a usar NYX</h1>
            <p className="hero-subtitle">
              Guías paso a paso para dominar el control gestual
            </p>
          </div>

          {/* Navegación de tutoriales */}
          <div className="tutorial-navigation" ref={navigationRef}>
            {tutorials.map((tutorial, index) => (
              <button
                key={tutorial.number}
                className="tutorial-nav-button"
                onClick={() => scrollToTutorial(index)}
              >
                <span className="nav-button-number">{tutorial.number}</span>
                <span className="nav-button-title">{tutorial.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sección de Tutoriales */}
        <div className="tutorials-section">
          {tutorials.map((tutorial, index) => (
            <VideoTutorialCard
              key={tutorial.number}
              number={tutorial.number}
              videoUrl={tutorial.videoUrl}
              title={tutorial.title}
              description={tutorial.description}
              content={tutorial.content}
              setRef={useCallback(
                (el: HTMLDivElement | null) => {
                  if (el) tutorialRefs.current[index] = el;
                },
                [index]
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NyxDocsPage;
