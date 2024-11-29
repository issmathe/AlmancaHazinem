import { Button, Input, Form, message } from "antd";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const DerArtikel = ({ initialArticle = "der" }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate(); // Initialize the navigate function

  const onFinish = async (values) => {
    console.log("Kaydedilen Veriler:", {
      ...values,
      correctArticle: initialArticle,
      deutch: values.deutch.toUpperCase(),
      turkich: values.turkich.toUpperCase(),
    });

    try {
      const response = await fetch(process.env.REACT_APP_SERVER_URL + "/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correctArticle: initialArticle,
          deutch: values.deutch.toUpperCase(),
          turkich: values.turkich.toUpperCase(),
        }),
      });

      if (response.ok) {
        message.success("Kelime başarıyla kaydedildi!");
        form.resetFields();
        window.location.reload();
      } else {
        message.error("Bir hata oluştu, lütfen tekrar deneyin.");
      }
    } catch (error) {
      console.error("Hata:", error);
      message.error("Bir hata oluştu, lütfen internet bağlantınızı kontrol edin.");
    }
  };

  // Handle back button click
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  // Handle home page button click
  const handleHome = () => {
    navigate("/"); // Navigate to the home page
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
        <Form.Item label="Artikel">
          <Input value={initialArticle} disabled />
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

        <Form.Item className="flex justify-between">
          <Button type="primary" htmlType="submit" className="w-40">
            Kaydet
          </Button>

          {/* Geri button */}
          <Button 
            type="default" 
            onClick={handleBack} 
            className="ml-3 w-40 bg-red-500 text-white hover:bg-red-600"
          >
            Geri
          </Button>
        </Form.Item>

        {/* Anasayfa button */}
        <Form.Item className="w-full mt-4">
          <Button 
            onClick={handleHome} 
            className="w-full bg-green-500 text-white hover:bg-green-600"
          >
            Anasayfa
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DerArtikel;
