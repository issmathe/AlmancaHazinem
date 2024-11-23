import React, { useState } from "react";
import { Input, Button, message } from "antd";

const Deneme = () => {
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    price: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(process.env.REACT_APP_SERVER_URL + "/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        message.success("Kayıt başarılı! ID: " + data._id);
        setFormData({ title: "", name: "", price: "" }); // Formu temizle
      } else {
        message.error("Bir hata oluştu!");
      }
    } catch (error) {
      console.error("Hata:", error);
      message.error("Sunucuya bağlanırken bir hata oluştu.");
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-4 w-full max-w-md mx-auto mt-4">
        <h1 className="text-xl font-semibold mb-4 text-center">Veri Ekle</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="block mb-1 font-medium text-gray-700">
              Başlık (Title)
            </label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Başlık girin"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="block mb-1 font-medium text-gray-700">
              İsim (Name)
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="İsim girin"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="block mb-1 font-medium text-gray-700">
              Fiyat (Price)
            </label>
            <Input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="Fiyat girin"
              required
            />
          </div>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
          >
            Kaydet
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Deneme;
