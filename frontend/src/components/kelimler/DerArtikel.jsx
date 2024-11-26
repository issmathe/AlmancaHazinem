import React from "react";
import { Button, Input, Form, message } from "antd";

const DerArtikel = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log("Kaydedilen Veriler:", values);

    try {
      // POST isteği ile veriyi sunucuya gönder
      const response = await fetch(process.env.REACT_APP_SERVER_URL + "/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: values.title, // title verisi
          name: values.name,   // name verisi
        }),
      });

      // Sunucudan gelen yanıtı kontrol et
      if (response.ok) {
        message.success("Veri başarıyla kaydedildi!");
        form.resetFields(); // Formu temizle
      } else {
        message.error("Bir hata oluştu, lütfen tekrar deneyin.");
      }
    } catch (error) {
      console.error("Hata:", error);
      message.error("Bir hata oluştu, lütfen internet bağlantınızı kontrol edin.");
    }
  };

  return (
    <div className="flex flex-col items-center p-5 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-700 mb-5">
        Der Artikel Kelime Ekle
      </h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="w-full max-w-md bg-white p-5 rounded-lg shadow-lg"
      >
        <Form.Item
          label="Başlık"
          name="title"
          rules={[{ required: true, message: "Başlık alanı zorunludur!" }]}
        >
          <Input placeholder="Örn: Öğrenilecek Kelimeler" />
        </Form.Item>
        
        <Form.Item
          label="İsim"
          name="name"
          rules={[{ required: true, message: "İsim alanı zorunludur!" }]}
        >
          <Input placeholder="Örn: Yusuf" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Kaydet
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DerArtikel;
