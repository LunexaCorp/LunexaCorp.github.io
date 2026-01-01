import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NyxDownloadPage from "./pages/NyxDownloadPage";
import NyxHeader from "./components/NyxHeader";
import { Outlet } from "react-router-dom";
import Nyx from "./pages/Nyx";
import NyxDocsPage from "./pages/NyxDocsPage";

const NyxLayout = () => (
  <>
    <NyxHeader />
    <Outlet />
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nyx" element={<NyxLayout />}>
          <Route index element={<Nyx />} /> 
          <Route path="download" element={<NyxDownloadPage />} />
          <Route path="docs" element={<NyxDocsPage />} />
        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;
