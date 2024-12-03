import React, { useState, useEffect, useCallback } from "react";
import { Button, message } from "antd";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

const Oyun = () => {
  const [currentWord, setCurrentWord] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null); // Kullanıcının cevabı doğru mu, yanlış mı
  const [loading, setLoading] = useState(false); // Yeni kelime yüklenirken spinner göstermek için
  const [allWords, setAllWords] = useState([]); // Tüm kelimeleri tutmak için
  const navigate = useNavigate(); // Geri butonu için navigate

  // useCallback kullanarak fetchAllWords fonksiyonunu stabil tutuyoruz
  const fetchAllWords = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(process.env.REACT_APP_SERVER_URL + "/api");
      const data = await response.json();
      setAllWords(data);
      fetchRandomWord(data); // Tüm kelimelerden rastgele birini seç
    } catch (error) {
      console.error("Hata:", error);
      message.error("Kelime verileri yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllWords(); // Sayfa yüklendiğinde tüm kelimeleri çek
  }, [fetchAllWords]);

  const fetchRandomWord = (words) => {
    if (words.length === 0) {
      message.error("Kelime listesi boş!");
      return;
    }
    const randomIndex = Math.floor(Math.random() * words.length);
    setCurrentWord(words[randomIndex]);
    setIsCorrect(null); // Yeni kelime geldiğinde durumu sıfırla
  };

  const handleAnswer = (selectedArticle) => {
    if (!currentWord) return;

    if (selectedArticle === currentWord.correctArticle) {
      setIsCorrect(true);
      message.success("Doğru cevap!");
    } else {
      setIsCorrect(false);
      message.error(`Yanlış cevap! Doğru artikel: ${currentWord.correctArticle}`);
    }

    // Birkaç saniye sonra yeni kelime getir
    setTimeout(() => {
      fetchRandomWord(allWords);
    }, 2000);
  };

  return (
    <div className="flex flex-col justify-between min-h-screen bg-gray-100 p-4">
      {/* Başlık */}
      <header className="text-center mb-4">
        <h1 className="text-xl font-bold text-gray-700">Artikel Tahmin Oyunu</h1>
      </header>

      {/* Kelime ve Seçenekler */}
      {loading ? (
        <p className="text-center">Yükleniyor...</p>
      ) : currentWord ? (
        <div
          className={classNames(
            "w-full max-w-sm mx-auto p-6 text-center bg-white rounded-lg shadow-md transition-all duration-500",
            {
              "bg-green-100": isCorrect === true, // Doğru cevap için yeşil arka plan
              "bg-red-100": isCorrect === false,  // Yanlış cevap için kırmızı arka plan
            }
          )}
        >
          <p className="text-lg font-semibold mb-4">{currentWord.deutch}</p>
          <div className="flex flex-col gap-4">
            <Button
              type="default"
              onClick={() => handleAnswer("der")}
              className="bg-blue-500 text-white hover:bg-blue-600 rounded-lg py-2"
            >
              Der
            </Button>
            <Button
              type="default"
              onClick={() => handleAnswer("die")}
              className="bg-pink-500 text-white hover:bg-pink-600 rounded-lg py-2"
            >
              Die
            </Button>
            <Button
              type="default"
              onClick={() => handleAnswer("das")}
              className="bg-yellow-500 text-white hover:bg-yellow-600 rounded-lg py-2"
            >
              Das
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-center">Kelime bulunamadı!</p>
      )}

      {/* Geri Butonu */}
      <footer className="mt-4 mb-4"> {/* Aradaki boşluğu küçülttük */}
        <Button
          onClick={() => navigate(-1)} // Bir önceki sayfaya yönlendirme
          className="w-full bg-blue-500 text-white hover:bg-blue-600 rounded-lg py-2"
        >
          Geri
        </Button>
      </footer>
    </div>
  );
};

export default Oyun;
