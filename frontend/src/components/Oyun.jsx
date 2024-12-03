import React, { useState, useEffect, useCallback } from "react";
import { Button, message } from "antd";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

const Oyun = () => {
  const [currentWord, setCurrentWord] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allWords, setAllWords] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false); // Butonları devre dışı bırakmak için durum
  const navigate = useNavigate();

  const fetchAllWords = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(process.env.REACT_APP_SERVER_URL + "/api");
      const data = await response.json();
      setAllWords(data);
      fetchRandomWord(data);
    } catch (error) {
      console.error("Hata:", error);
      message.error("Kelime verileri yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllWords();
  }, [fetchAllWords]);

  const fetchRandomWord = (words) => {
    if (words.length === 0) {
      message.error("Kelime listesi boş!");
      return;
    }
    const randomIndex = Math.floor(Math.random() * words.length);
    setCurrentWord(words[randomIndex]);
    setIsCorrect(null);
  };

  const handleAnswer = (selectedArticle) => {
    if (!currentWord || isDisabled) return; // Eğer butonlar devre dışı ise işlem yapılmasın

    setIsDisabled(true); // Butonları devre dışı bırak

    if (selectedArticle === currentWord.correctArticle) {
      setIsCorrect(true);
      message.success("Doğru cevap!");
    } else {
      setIsCorrect(false);
      message.error(
        `Yanlış cevap! Doğru artikel: ${currentWord.correctArticle}`
      );
    }

    // 2 saniye sonra butonları tekrar aktif et
    setTimeout(() => {
      setIsDisabled(false);
      fetchRandomWord(allWords);
    }, 1500);
  };

  return (
    <div className="flex flex-col justify-center min-h-screen bg-blue-300 p-4">
      <header className="text-center mb-3">
        <h1 className="text-xl font-bold text-gray-700">
          Artikel Tahmin Oyunu
        </h1>
      </header>

      {loading ? (
        <p className="text-center">Yükleniyor...</p>
      ) : currentWord ? (
        <div
          className={classNames(
            "w-full max-w-md mx-auto p-6 text-center bg-white rounded-lg shadow-md transition-all duration-500",
            {
              "bg-green-100": isCorrect === true,
              "bg-red-100": isCorrect === false,
            }
          )}
        >
          <p className="text-lg font-semibold mb-4">{currentWord.deutch}</p>
          <div className="flex flex-col gap-3">
            <Button
              type="default"
              onClick={() => handleAnswer("der")}
              className="bg-blue-500 text-white hover:bg-blue-600 rounded-lg py-2"
              disabled={isDisabled} // Butonu devre dışı bırak
            >
              Der
            </Button>
            <Button
              type="default"
              onClick={() => handleAnswer("die")}
              className="bg-pink-500 text-white hover:bg-pink-600 rounded-lg py-2"
              disabled={isDisabled} // Butonu devre dışı bırak
            >
              Die
            </Button>
            <Button
              type="default"
              onClick={() => handleAnswer("das")}
              className="bg-yellow-500 text-white hover:bg-yellow-600 rounded-lg py-2"
              disabled={isDisabled} // Butonu devre dışı bırak
            >
              Das
            </Button>
            <Button
              onClick={() => navigate(-1)}
              className="w-full bg-blue-500 text-white hover:bg-blue-600 rounded-lg py-2"
            >
              Geri
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-center">Kelime bulunamadı!</p>
      )}

      <footer className="mt-5">
        <footer className="mt-5 flex justify-center"></footer>
      </footer>
    </div>
  );
};

export default Oyun;
