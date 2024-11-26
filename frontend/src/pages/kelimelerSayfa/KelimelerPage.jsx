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
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-8">Kelimeler</h1>
      <div className="w-full max-w-md flex flex-col gap-4">
        <Button
          type="primary"
          onClick={handleGoBack}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
        >
          Geri Dön
        </Button>
        <Button
          type="default"
          onClick={handleDerArtikelClick}
          className="w-full bg-white border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-lg"
        >
          Der Artikel
        </Button>
        <Button
          type="default"
          className="w-full bg-white border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-lg"
        >
          Die Artikel
        </Button>
        <Button
          type="default"
          className="w-full bg-white border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-lg"
        >
          Das Artikel
        </Button>
      </div>
    </div>
  );
};

export default KelimelerPage;
