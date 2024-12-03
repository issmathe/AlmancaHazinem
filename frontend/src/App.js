import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import KelimelerPage from "./pages/kelimelerSayfa/KelimelerPage";
import DerArtikelPage from "./pages/kelimelerSayfa/DerArtikelPage";
import DieArtikelPage from "./pages/kelimelerSayfa/DieArtikelPage";
import OyunPage from "./pages/oyun/OyunPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/kelimelerPage" element={<KelimelerPage />} />
      <Route path="/kelimelerPage/derArtikel" element={<DerArtikelPage />} />
      <Route path="/kelimelerPage/dieArtikel" element={<DieArtikelPage />} />
      <Route path="/oyunPage" element={<OyunPage />} />
    </Routes>
  );
}

export default App;
