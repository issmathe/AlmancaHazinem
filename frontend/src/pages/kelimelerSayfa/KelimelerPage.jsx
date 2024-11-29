import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const KelimelerPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Bir önceki sayfaya yönlendirme
  };

  const handleDerArtikelClick = () => {
    navigate("/kelimelerPage/derArtikel"); // Der Artikel sayfasına yönlendirme
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-8">Kelimeler</h1>
      <div className="w-full max-w-md flex flex-col gap-4">
        {/* Diğer butonlar yeşil */}
        <Button
          type="default"
          onClick={handleDerArtikelClick}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg h-12"
        >
          Der Artikel
        </Button>
        <Button
          type="default"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg h-12"
        >
          Die Artikel
        </Button>
        <Button
          type="default"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg h-12"
        >
          Das Artikel
        </Button>
        
        {/* Geri butonu mavi */}
        <Button
          type="primary"
          onClick={handleGoBack}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg h-12"
        >
          Geri Dön
        </Button>
      </div>
    </div>
  );
};

export default KelimelerPage;
