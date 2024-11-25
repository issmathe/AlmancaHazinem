
import React, { useState } from "react";

const DerArtikel = () => {
  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Şimdilik sadece console.log ile gönderim simule ediliyor
    console.log("Kelime:", word, "Türkçe Karşılığı:", translation);

    // Formu temizle
    setWord("");
    setTranslation("");
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Der Artikel Kelime Ekle</h1>
      </header>
      <form style={styles.form} onSubmit={handleSubmit}>
        <label style={styles.label}>
          Almanca Kelime (der):
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            style={styles.input}
            placeholder="Örn: der Tisch"
            required
          />
        </label>
        <label style={styles.label}>
          Türkçe Karşılığı:
          <input
            type="text"
            value={translation}
            onChange={(e) => setTranslation(e.target.value)}
            style={styles.input}
            placeholder="Örn: Masa"
            required
          />
        </label>
        <button type="submit" style={styles.button}>
          Kaydet
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f9f9f9",
    padding: "20px",
  },
  header: {
    marginBottom: "20px",
    textAlign: "center",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
  },
  form: {
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  label: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#555",
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginTop: "5px",
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

export default DerArtikel;

