import React from "react";
import { useNavigate } from "react-router-dom";
import resim from "../assets/images/almancahazinem.jpg"; 

const AnaSayfa = () => {
  const navigate = useNavigate();

  const handleKelimelerClick = () => {
    navigate("/KelimelerPage"); // KelimelerPage sayfasına yönlendirme
  };

  const handleOyunClick = () => {
    navigate("/oyunPage"); // Oyun sayfasına yönlendirme
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-300 p-4">
      <header className="mb-5 text-center">
        <img src={resim} alt="Örnek Resim" className="rounded-lg w-64 h-auto" />
      </header>
      <div className="w-full max-w-md flex flex-col gap-4">
        <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg py-3">
          Anasayfa
        </button>
        <button
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg py-3"
          onClick={handleKelimelerClick}
        >
          Kelime Ekle
        </button>
        <button
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg py-3"
          onClick={handleOyunClick}
        >
          Oyun
        </button>
        <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg py-3">
          Tekrar
        </button>
        <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg py-3">
          Bize Ulaşın
        </button>
      </div>
    </div>
  );
};

export default AnaSayfa;
