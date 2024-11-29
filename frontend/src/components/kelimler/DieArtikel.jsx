import React, { useState } from "react";
import { Button, Input, Form, message } from "antd";

const DerArtikel = ({ initialArticle = "der" }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log("Kaydedilen Veriler:", { ...values, correctArticle: initialArticle });

    try {
      // POST isteği ile veriyi sunucuya gönder
      const response = await fetch(process.env.REACT_APP_SERVER_URL + "/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correctArticle: initialArticle, // Otomatik seçilen artikel
          deutch: values.deutch, // Almanca kelime
          turkich: values.turkich, // Türkçe karşılık
        }),
      });

      if (response.ok) {
        message.success("Kelime başarıyla kaydedildi!");
        form.resetFields();
      } else {
        message.error("Bir hata oluştu, lütfen tekrar deneyin.");
      }
    } catch (error) {
      console.error("Hata:", error);
      message.error("Bir hata oluştu, lütfen internet bağlantınızı kontrol edin.");
    }
  };

  return (
<div className="flex flex-col items-center p-5 bg-gray-100">
<h1 className="text-2xl font-bold text-gray-700 mb-5">Der Artikelli Kelime Ekle</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="w-full max-w-md bg-white p-5 rounded-lg shadow-lg"
      >
        {/* Artikel otomatik seçili */}
        <Form.Item label="Artikel">
          <Input value={initialArticle} disabled /> {/* Artikel sadece görüntüleme */}
        </Form.Item>

        <Form.Item
          label="Almanca Kelime"
          name="deutch"
          rules={[{ required: true, message: "Almanca kelime zorunludur!" }]}
        >
          <Input placeholder="Örn: Lehrer" />
        </Form.Item>

        <Form.Item
          label="Türkçe Karşılık"
          name="turkich"
          rules={[{ required: true, message: "Türkçe karşılık zorunludur!" }]}
        >
          <Input placeholder="Örn: Öğretmen" />
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
