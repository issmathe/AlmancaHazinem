import React, { useState } from "react";

const AnaSayfa = () => {
  const [showArticles, setShowArticles] = useState(false);

  const handleShowArticles = () => {
    setShowArticles(true);
  };

  const handleGoBack = () => {
    setShowArticles(false);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Almanca Hazinem</h1>
      </header>
      <div style={styles.menu}>
        {!showArticles ? (
          <>
            <button style={styles.button}>Anasayfa</button>
            <button style={styles.button} onClick={handleShowArticles}>
              Kelimeler
            </button>
            <button style={styles.button}>Tekrar</button>
            <button style={styles.button}>Oyun</button>
            <button style={styles.button}>Bize Ulaşın</button>
          </>
        ) : (
          <>
            <button style={styles.button} onClick={handleGoBack}>
              Geri Dön
            </button>
            <button style={styles.button}>Der Artikel</button>
            <button style={styles.button}>Die Artikel</button>
            <button style={styles.button}>Das Artikel</button>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
  },
};

export default AnaSayfa;
