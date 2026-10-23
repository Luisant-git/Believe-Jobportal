import React, { useState, useEffect } from "react";
import { Modal, Button, Table, Input } from "antd";
import { toast } from "react-toastify";
import axios from "axios";

const RestoreEmployer = ({ visible, onClose, onRestore }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchDeletedEmployers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/employers/deleted`);
      setData(response?.data || []);
    } catch (error) {
      toast.error("Error fetching deleted employers");
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (id) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/users/employers/restore/${id}`);
      toast.success("Employer restored successfully");
      fetchDeletedEmployers();
      if (onRestore) onRestore();
    } catch (error) {
      toast.error("Error restoring employer");
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    if (visible) {
      fetchDeletedEmployers();
    }
  }, [visible]);

  const filteredData = data.filter(item =>
    item.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.contactPerson?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Contact Person",
      key: "contactPerson",
      render: (_, record) => `${record.contactPerson || ''}`.trim(),
    },
    {
      title: "Email",
      dataIndex: ["user", "email"],
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "companyPhone",
      key: "phone",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          onClick={() => handleRestore(record.id)}
        >
          Restore
        </Button>
      ),
    },
  ];

  return (
    <Modal
      title="Restore Employers"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <div className="mb-3">
        <Input.Search
          placeholder="Search employers..."
          onSearch={handleSearch}
          style={{ width: 300 }}
        />
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        size="small"
      />
    </Modal>
  );
};

export default RestoreEmployer;