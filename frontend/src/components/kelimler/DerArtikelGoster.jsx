import React, { useEffect, useState } from "react";
import { Card, Button, message, Row, Col, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const DerArtikelGoster = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Veriyi almak için useEffect kullanıyoruz
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_SERVER_URL + "/api");
        const result = await response.json();

        if (response.ok) {
          setData(result); // Gelen veriyi state'e set et
        } else {
          message.error("Veri yüklenirken bir hata oluştu.");
        }
      } catch (error) {
        console.error("Hata:", error);
        message.error("Bir hata oluştu, lütfen internet bağlantınızı kontrol edin.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div className="flex flex-col items-center p-5 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-700 mb-5">Der Artikel Verileri</h1>

      {/* Loading Spinner */}
      {loading ? (
        <Spin indicator={antIcon} />
      ) : (
        <Row gutter={[16, 16]} className="w-full max-w-4xl">
          {/* Veriyi Listeleme */}
          {data.map((item, index) => (
            <Col xs={24} sm={12} lg={8} key={index}>
              <Card
                title={item.title}
                bordered={false}
                className="w-full h-full shadow-lg"
                bodyStyle={{ padding: "10px" }}
              >
                <p><strong>İsim:</strong> {item.name}</p>
                <Button type="primary" className="w-full mt-4">
                  Detaylar
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Geri Dön butonu */}
      <Button
        type="default"
        onClick={() => window.history.back()}
        className="mt-5"
      >
        Geri Dön
      </Button>
    </div>
  );
};

export default DerArtikelGoster;
