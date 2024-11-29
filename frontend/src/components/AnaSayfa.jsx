import React from "react";
import { useNavigate } from "react-router-dom";

const AnaSayfa = () => {
  const navigate = useNavigate();

  const handleKelimelerClick = () => {
    navigate("/KelimelerPage"); // KelimelerPage sayfasına yönlendirme
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Almanca Hazinem</h1>
      </header>
      <div style={styles.menu}>
        <button style={styles.button}>Anasayfa</button>
        <button style={styles.button} onClick={handleKelimelerClick}>
          Kelimeler
        </button>
        <button style={styles.button}>Tekrar</button>
        <button style={styles.button}>Oyun</button>
        <button style={styles.button}>Bize Ulaşın</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center", // Dikey ortalama
    height: "100vh",
    backgroundColor: "#f0f0f0",
    padding: "10px",
  },
  header: {
    marginBottom: "20px",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },
  menu: {
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Yatayda ortalama
    gap: "10px",
  },
  button: {
    padding: "15px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    textAlign: "center",
    cursor: "pointer",
    width: "100%", // Butonlar genişliğe uyum sağlar
  },
};

export default AnaSayfa;
