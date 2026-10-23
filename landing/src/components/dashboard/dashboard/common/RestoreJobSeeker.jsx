import React, { useState, useEffect } from "react";
import { Modal, Button, Table, Input } from "antd";
import { toast } from "react-toastify";
import axios from "axios";

const RestoreJobSeeker = ({ visible, onClose, onRestore }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchDeletedJobSeekers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/jobseekers/deleted`);
      setData(response?.data || []);
    } catch (error) {
      toast.error("Error fetching deleted job seekers");
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (id) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/users/jobseekers/restore/${id}`);
      toast.success("Job seeker restored successfully");
      fetchDeletedJobSeekers();
      if (onRestore) onRestore();
    } catch (error) {
      toast.error("Error restoring job seeker");
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    if (visible) {
      fetchDeletedJobSeekers();
    }
  }, [visible]);

  const filteredData = data.filter(item =>
    item.user?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.user?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: "Name",
      key: "name",
      render: (_, record) => `${record.user?.firstName || ''} ${record.user?.lastName || ''}`.trim(),
    },
    {
      title: "Email",
      dataIndex: ["user", "email"],
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: ["phoneNumber"],
      key: "phone",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
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
      title="Restore Job Seekers"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <div className="mb-3">
        <Input.Search
          placeholder="Search job seekers..."
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

export default RestoreJobSeeker;