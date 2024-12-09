import React, { useState, useEffect } from "react";
import { Button, Input, Form, message, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const DerArtikelGoster = () => {
  const [kelimeler, setKelimeler] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTime, setLockTime] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_SERVER_URL + "/api");
        const data = await response.json();
        const sortedData = data.sort((a, b) => a.deutch.localeCompare(b.deutch));
        setKelimeler(sortedData);
      } catch (error) {
        console.error("Hata:", error);
        message.error("Veri alırken bir hata oluştu.");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isLocked && lockTime) {
      const interval = setInterval(() => {
        const remainingTime = Math.max(0, lockTime - Date.now());
        if (remainingTime === 0) {
          setIsLocked(false);
          setLockTime(null);
          setAttempts(0);
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isLocked, lockTime]);

  const handleDelete = async () => {
    if (password !== "1234") {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= 3) {
        message.error("Şifre 3 kez yanlış girildi. Silme işlemi 5 dakika boyunca kilitlendi.");
        setIsLocked(true);
        setLockTime(Date.now() + 5 * 60 * 1000); // 5 dakika
        setIsPasswordModalVisible(false);
        setPassword("");
      } else if (newAttempts === 2) {
        message.warning("Son giriş hakkınız kaldı!");
      } else {
        message.error("Geçersiz şifre. Tekrar deneyin.");
      }
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/${deleteId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        message.success("Kelime başarıyla silindi!");
        setKelimeler(kelimeler.filter((kelime) => kelime._id !== deleteId));
        setIsPasswordModalVisible(false);
        setPassword("");
      } else {
        message.error("Silme işlemi başarısız.");
      }
    } catch (error) {
      console.error("Hata:", error);
      message.error("Silme işlemi sırasında bir hata oluştu.");
    }
  };

  const openPasswordModal = (id) => {
    if (isLocked) {
      message.warning("Silme işlemi kilitli. Lütfen 5 dakika sonra tekrar deneyin.");
      return;
    }
    setDeleteId(id);
    setIsPasswordModalVisible(true);
  };

  const handleEdit = (id) => {
    const recordToEdit = kelimeler.find((kelime) => kelime._id === id);
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
        setKelimeler(
          kelimeler.map((kelime) =>
            kelime._id === editingRecord._id ? { ...kelime, ...updatedRecord } : kelime
          )
        );
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
        <div className="w-1/12 text-center"></div>
        <div className="w-1/3 text-center">Almanca Kelime</div>
        <div className="w-1/3 text-center">Türkçe Karşılık</div>
        <div className="w-1/6 text-center">İşlemler</div>
      </div>

      {kelimeler.length > 0 ? (
        kelimeler.map((kelime, index) => (
          <div
            key={kelime._id}
            className="flex w-full max-w-4xl mb-3 p-3 bg-white rounded-lg shadow-md justify-between"
          >
            <div className="w-1/12 text-center">{index + 1}</div>
            <div className="w-1/3 text-center">{kelime.deutch}</div>
            <div className="w-1/3 text-center">{kelime.turkich}</div>
            <div className="w-1/6 flex space-x-2 justify-center">
              <Button
                type="primary"
                onClick={() => handleEdit(kelime._id)}
                icon={<EditOutlined />}
              />
              <Button
                type="danger"
                onClick={() => openPasswordModal(kelime._id)}
                icon={<DeleteOutlined />}
              />
            </div>
          </div>
        ))
      ) : (
        <p>Henüz veri bulunmamaktadır.</p>
      )}

      {/* Edit Modal */}
      <Modal
        title="Kelime Düzenle"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
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

      {/* Password Modal */}
      <Modal
        title="Şifre Gerekli"
        open={isPasswordModalVisible}
        onCancel={() => setIsPasswordModalVisible(false)}
        onOk={handleDelete}
        okText="Sil"
        cancelText="İptal"
      >
        <Input.Password
          placeholder="Şifre girin"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default DerArtikelGoster;
