const mongoose = require("mongoose");

const KelimelerSchema = mongoose.Schema(
  {
    correctArticle: { 
      type: String, 
      enum: ["der", "die", "das"], // Sadece bu üç değer kabul edilir
      required: true 
    },
    deutch: { type: String, required: true }, // Başlık
    turkich: { type: String, required: true },  // Kelime
    
  },
  { timestamps: true } // Otomatik oluşturulma ve güncellenme tarihleri
);

const Kelimeler = mongoose.model("istenenler", KelimelerSchema); // 'istenenler' koleksiyonu
module.exports = Kelimeler;
