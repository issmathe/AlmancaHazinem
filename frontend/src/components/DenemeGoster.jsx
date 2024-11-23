import React, { useEffect, useState } from "react";
import { List, Card, Button, message, Spin } from "antd";

const DenemeGoster = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(process.env.REACT_APP_SERVER_URL + "/api");
      if (response.ok) {
        const result = await response.json();
        setData(result);
      } else {
        message.error("Veriler alınırken bir hata oluştu.");
      }
    } catch (error) {
      console.error("Hata:", error);
      message.error("Sunucuya bağlanırken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(process.env.REACT_APP_SERVER_URL + `/api/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        message.success("Veri başarıyla silindi.");
        setData((prevData) => prevData.filter((item) => item._id !== id));
      } else {
        message.error("Veri silinirken bir hata oluştu.");
      }
    } catch (error) {
      console.error("Hata:", error);
      message.error("Sunucuya bağlanırken bir hata oluştu.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-4 w-full max-w-2xl mx-auto">
        <h1 className="text-xl font-semibold mb-4 text-center">Veri Listesi</h1>
        {loading ? (
          <div className="flex justify-center items-center">
            <Spin size="large" />
          </div>
        ) : data.length > 0 ? (
          <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <Card
                  title={item.title}
                  extra={
                    <Button
                      danger
                      size="small"
                      onClick={() => handleDelete(item._id)}
                    >
                      Sil
                    </Button>
                  }
                >
                  <p><strong>İsim:</strong> {item.name}</p>
                  <p><strong>Fiyat:</strong> {item.price}</p>
                </Card>
              </List.Item>
            )}
          />
        ) : (
          <p className="text-center text-gray-500">Hiç veri bulunamadı.</p>
        )}
      </div>
    </div>
  );
};

export default DenemeGoster;
