import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import KelimelerPage from "./pages/kelimelerSayfa/KelimelerPage";
import DerArtikelPage from "./pages/kelimelerSayfa/DerArtikelPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/kelimelerPage" element={<KelimelerPage />} />
      <Route path="/kelimelerPage/derArtikel" element={<DerArtikelPage />} />
    </Routes>
  );
}

export default App;
