import React, { useState, useEffect } from "react";
import { Button, Input, Form, message, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'; // Import icons

const DerArtikelGoster = () => {
  const [kelimeler, setKelimeler] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_SERVER_URL + "/api");
        const data = await response.json();
        
        // Sort words alphabetically
        const sortedData = data.sort((a, b) => {
          if (a.deutch.toLowerCase() < b.deutch.toLowerCase()) return -1;
          if (a.deutch.toLowerCase() > b.deutch.toLowerCase()) return 1;
          return 0;
        });

        setKelimeler(sortedData);
      } catch (error) {
        console.error("Hata:", error);
        message.error("Veri alırken bir hata oluştu.");
      }
    };
    fetchData();
  }, []);

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Emin misiniz?",
      content: "Bu kelimeyi silmek istediğinizden emin misiniz?",
      okText: "Evet",
      cancelText: "Hayır",
      onOk: async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/${id}`, {
            method: "DELETE",
          });
          if (response.ok) {
            message.success("Kelime başarıyla silindi!");
            setKelimeler(kelimeler.filter(kelime => kelime._id !== id));
          } else {
            message.error("Silme işlemi başarısız.");
          }
        } catch (error) {
          console.error("Hata:", error);
          message.error("Silme işlemi sırasında bir hata oluştu.");
        }
      },
    });
  };

  const handleEdit = (id) => {
    const recordToEdit = kelimeler.find(kelime => kelime._id === id);
    setEditingRecord(recordToEdit);
    form.setFieldsValue({
      deutch: recordToEdit.deutch,
      turkich: recordToEdit.turkich,
    });
    setIsModalVisible(true);
  };

  const handleSave = async () => {
    if (!editingRecord) return;

    const updatedRecord = form.getFieldsValue();

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/${editingRecord._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deutch: updatedRecord.deutch,
          turkich: updatedRecord.turkich,
        }),
      });

      if (response.ok) {
        message.success("Kelime başarıyla güncellendi!");
        setKelimeler(kelimeler.map(kelime => kelime._id === editingRecord._id ? { ...kelime, ...updatedRecord } : kelime));
        setEditingRecord(null);
        form.resetFields();
        setIsModalVisible(false);
      } else {
        message.error("Güncelleme işlemi başarısız.");
      }
    } catch (error) {
      console.error("Hata:", error);
      message.error("Güncelleme işlemi sırasında bir hata oluştu.");
    }
  };

  return (
    <div className="flex flex-col items-center p-5 bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-700 mb-5">Eklediğim Kelimeler</h1>

      <div className="flex w-full max-w-4xl mb-2 p-2 bg-gray-200 text-gray-600 font-semibold justify-between">
        <div className="w-1/12 text-center"> {/* Numara sütununun genişliği daraltıldı */} </div>
        <div className="w-1/3 text-center">Almanca Kelime</div>
        <div className="w-1/3 text-center">Türkçe Karşılık</div>
        <div className="w-1/6 text-center">İşlemler</div>
      </div>

      {kelimeler.length > 0 ? (
        kelimeler.map((kelime, index) => (
          <div key={kelime._id} className="flex w-full max-w-4xl mb-3 p-3 bg-white rounded-lg shadow-md justify-between">
            <div className="w-1/12 text-center">{index + 1}</div>
            <div className="w-1/3 text-center">{kelime.deutch}</div>
            <div className="w-1/3 text-center">{kelime.turkich}</div>
            <div className="w-1/6 flex space-x-2 justify-center">
              <Button
                type="primary"
                onClick={() => handleEdit(kelime._id)}
                icon={<EditOutlined />}  // Use the Edit icon
              />
              <Button
                type="danger"
                onClick={() => handleDelete(kelime._id)}
                icon={<DeleteOutlined />}  // Use the Delete icon
              />
            </div>
          </div>
        ))
      ) : (
        <p>Henüz veri bulunmamaktadır.</p>
      )}

      <Modal
        title="Kelime Düzenle"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          initialValues={{
            deutch: editingRecord?.deutch,
            turkich: editingRecord?.turkich,
          }}
          className="bg-white p-5 rounded-lg"
        >
          <Form.Item
            label="Almanca Kelime"
            name="deutch"
            rules={[{ required: true, message: "Almanca kelime zorunludur!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Türkçe Karşılık"
            name="turkich"
            rules={[{ required: true, message: "Türkçe karşılık zorunludur!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Kaydet
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DerArtikelGoster;
