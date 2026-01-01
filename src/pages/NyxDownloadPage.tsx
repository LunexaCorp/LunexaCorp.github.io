import { useState } from "react";
import "./NyxDownloadPage.css";
import { useNavigate } from "react-router-dom";
import NyxSystemRequirements from "../components/NyxSystemRequirements";
import NyxGeneralInformation from "../components/NyxGeneralnformation";

// Componente para las pestañas de sistema operativo
const OSTabs = ({ activeOS, onSelectOS }) => {
  const systems = ["Windows", "Linux"];

  return (
    <div className="os-tabs">
      {systems.map((os) => (
        <button
          key={os}
          className={`os-tab ${activeOS === os ? "active" : ""}`}
          onClick={() => onSelectOS(os)}
        >
          {os}
        </button>
      ))}
    </div>
  );
};

// Componente para el botón de descarga
const DownloadButton = ({ os }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getDownloadUrl = () => {
    const baseUrl =
      "https://github.com/FrancoAndreeYupanquiZapana/nyx/releases/latest/download";
    switch (os) {
      case "Windows":
        return `${baseUrl}/NYX-Windows.exe`;
      case "Linux":
        return `${baseUrl}/NYX.deb`;
      default:
        return `${baseUrl}/NYX-Windows.exe`;
    }
  };

  const getExtension = () => {
    switch (os) {
      case "Windows":
        return (
          <span className="button-text">
            <span className="extension">.exe (Windows)</span>
          </span>
        );
      case "Linux":
        return (
          <span className="button-text">
            <span className="extension">.deb (Linux)</span>
          </span>
        );
      default:
        return ".exe (Windows)";
    }
  };

  return (
    <div className="download-section">
      <a href={getDownloadUrl()} download>
        <button className="download-button">
          <span>Download</span>
          <span className="extension">{getExtension()}</span>
          <span className="arrow">▼</span>
        </button>
      </a>
      <p className="promo-text">
        Proyecto open source • Hecho con ❤️ por la comunidad
      </p>
    </div>
  );
};

// Componente para la información de versión
const VersionInfo = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const tabs = [
    { name: "Información general", value: "general" },
    { name: "Requerimientos del sistema", value: "requirements" },
    { name: "Aprender a usar NYX", value: "docs" },
  ];

  const handleTabClick = (tab) => {
    if (tab.value === "docs") {
      navigate("/nyx/docs");
    } else {
      setActiveTab(tab.value);
    }
  };

  return (
    <div className="version-info">
      <div className="info-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={`info-tab ${activeTab === tab.value ? "active" : ""}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab.name}
          </button>
        ))}
      </div>
    </div>
  );
};

// Componente para el video demo
const VideoPreview = ({ activeTab, setActiveTab }) => {
  return (
    <div className="video-preview">
      <div className="video-container">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/oJH8lowsa-U?si=5V2eWAI_AI7Hb0rM&autoplay=1&mute=1&loop=1&playlist=oJH8lowsa-U"
          title="NYX Demo"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
      <VersionInfo activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

interface BannerProps {
  Component: React.ComponentType;
}

const UnifiedProductBanner: React.FC<BannerProps> = ({ Component }) => {
  return (
    <div className="unified-banner">
      <Component />
    </div>
  );
};

// Uso:
<UnifiedProductBanner Component={NyxGeneralInformation} />;

// Componente principal de la página
const NyxDownloadPage = () => {
  const [activeOS, setActiveOS] = useState("Windows");
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="nyx-download-page">
      <div className="container">
        <OSTabs activeOS={activeOS} onSelectOS={setActiveOS} />

        <div className="main-content">
          <div className="left-section">
            <div className="header">
              <div className="logo">
                <img
                  src="/android-chrome-192x192.png"
                  alt="NYX Logo"
                  className="logo-icon"
                />
                <h1>NYX</h1>
              </div>
              <span className="badge">Open Source</span>
            </div>

            <h2 className="tagline">
              El único mouse que necesitas son tus manos
            </h2>

            <DownloadButton os={activeOS} />
          </div>

          <div className="right-section">
            <VideoPreview activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </div>

        {activeTab === "general" && (
          <UnifiedProductBanner Component={NyxGeneralInformation} />
        )}
        {activeTab === "requirements" && (
          <UnifiedProductBanner Component={NyxSystemRequirements} />
        )}
      </div>
    </div>
  );
};

export default NyxDownloadPage;
