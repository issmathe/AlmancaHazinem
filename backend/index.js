const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const database = require('./database.js');
const kelimelerRoute = require("./routes/kelimelers.js");

dotenv.config();

const app = express();

// CORS middleware doğru şekilde kullanılıyor
app.use(cors());

// JSON verilerini kabul et
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

// Veritabanı bağlantısı sağlanmalı
database(); // Veritabanı bağlantısı burada çağrılmalı

const PORT = process.env.PORT || 5001;

// Kelimeler API route'u
app.use("/api", kelimelerRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
