import React, { useState, useEffect } from "react";
import {
  Input,
  Table,
  Button,
  Pagination,
  Modal,
  Spin,
  Drawer,
  message,
  Tag,
  Switch,
  Popconfirm,
  Avatar,
  Select,
} from "antd";
import { FaEye, FaPlus, FaRegEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { UserOutlined } from "@ant-design/icons";
import axios from "axios";
import dayjs from "dayjs";

const { Search } = Input;
const { Option } = Select;

function CreateAdminSuperAdminList() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [mode, setMode] = useState("create");

  const [adminData, setAdminData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "admin",
    userId: "",
  });

  const pageSize = 25;

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/admins`,
        {
          params: {
            page: currentPage,
            limit: pageSize,
            ...(searchTerm && { search: searchTerm }),
          },
        }
      );
      console.log("Fetched admins:", response.data);
      
      setData(response.data.data || []);
      setTotalItems(response.data.total || 0);
    } catch (error) {
      console.error("Error fetching admins:", error);
      toast.error("Error fetching admins");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const showAdminDetails = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/admins/${id}`
      );
      setSelectedAdmin(response.data);
      setViewModalVisible(true);
    } catch (error) {
      console.error("Error fetching admin details:", error);
      toast.error("Error fetching admin details");
    } finally {
      setLoading(false);
    }
  };

  const closeViewModal = () => {
    setViewModalVisible(false);
    setSelectedAdmin(null);
  };

  const showCreateDrawer = () => {
    setMode("create");
    setAdminData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "admin",
    });
    setIsDrawerVisible(true);
  };

  const showEditDrawer = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/admins/${id}`
      );
      const admin = response.data;
      setMode("edit");
      setAdminData({
        firstName: admin.firstName || "",
        lastName: admin.lastName || "",
        email: admin.email || "",
        password: "",
        role: admin.role || "admin",
        userId: admin.id,
      });
      setIsDrawerVisible(true);
    } catch (error) {
      console.error("Error fetching admin:", error);
      toast.error("Error fetching admin details");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: "Delete Admin",
      content: "Are you sure you want to delete this admin?",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        setLoading(true);
        try {
          await axios.delete(
            `${import.meta.env.VITE_API_URL}/auth/admins/${id}`
          );
          toast.success("Admin deleted successfully");
          fetchAdmins();
        } catch (error) {
          console.error("Error deleting admin:", error);
          toast.error("Error deleting admin");
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setAdminData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "admin",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleChange = (value) => {
    setAdminData((prev) => ({
      ...prev,
      role: value,
    }));
  };



  const handleSubmit = async () => {
    if (
      !adminData.firstName ||
      !adminData.lastName ||
      !adminData.email ||
      (mode === "create" && !adminData.password)
    ) {
      toast.error("Required fields are missing");
      return;
    }

    try {
      setLoading(true);
      if (mode === "create") {
        await axios.post(`${import.meta.env.VITE_API_URL}/auth/register/admin`, {
          email: adminData.email,
          password: adminData.password,
          firstName: adminData.firstName,
          lastName: adminData.lastName,
          role: adminData.role,
        });
        toast.success("Admin created successfully");
      } else {
        const updatePayload = {
          email: adminData.email,
          firstName: adminData.firstName,
          lastName: adminData.lastName,
          role: adminData.role,
        };
        if (adminData.password) {
          updatePayload.password = adminData.password;
        }
        await axios.put(
          `${import.meta.env.VITE_API_URL}/auth/admins/${adminData.userId}`,
          updatePayload
        );
        toast.success("Admin updated successfully");
      }
      fetchAdmins();
      closeDrawer();
    } catch (error) {
      console.error(
        `Error ${mode === "create" ? "creating" : "updating"} admin:`,
        error
      );
      toast.error(
        error.response?.data?.message ||
          `Error ${mode === "create" ? "creating" : "updating"} admin`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, isactive) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/${id}/status`,
        { isactive }
      );
      fetchAdmins();
    } catch (error) {
      toast.error("Error updating status");
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, [currentPage, searchTerm]);

  const columns = [
    {
      title: "Name",
      key: "name",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
          <Avatar
            style={{ backgroundColor: "#87d068" }}
            icon={<UserOutlined />}
          />
          <span>{`${record.firstName} ${record.lastName}`}</span>
        </div>
      ),
    },
    {
      title: "Email",
      key: "email",
      render: (_, record) => record.email,
    },
    {
      title: "Role",
      key: "role",
      render: (_, record) => (
        <Tag color={record.role === "super_admin" ? "red" : "blue"}>
          {record.role === "super_admin" ? "Super Admin" : "Admin"}
        </Tag>
      ),
    },
    {
      title: "Status",
      key: "isActive",
      render: (_, record) => (
        <Popconfirm
          title={`Are you sure you want to ${
            record.isactive ? "deactivate" : "activate"
          } this admin?`}
          onConfirm={() =>
            handleStatusChange(record.id, !record.isactive)
          }
          okText="Yes"
          cancelText="No"
        >
          <Switch
            checked={record.isactive}
            checkedChildren="Active"
            unCheckedChildren="Inactive"
            style={{
              backgroundColor: record.isactive ? "#52c41a" : "#f5222d",
            }}
          />
        </Popconfirm>
      ),
    },

    {
      title: "Created",
      key: "createdAt",
      render: (_, record) =>
        dayjs(record.createdAt).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            type="link"
            icon={<FaEye />}
            onClick={() => showAdminDetails(record.id)}
          />
          <Button
            icon={<FaRegEdit />}
            onClick={() => showEditDrawer(record.id)}
          />
          <Button
            danger
            icon={<FaTrash />}
            onClick={() => handleDelete(record.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="container-fluid">
      <div className="row y-gap-10 justify-between items-end pb-30 lg:pb-30 md:pb-32">
        <div className="col-12 d-flex align-item-center justify-content-between bg-white rounded p-3">
          <h1 style={{ color: "#004080" }} className="text-20 lh-14 fw-600">
            Admin Management
          </h1>
          <div className="d-flex gap-2">
            <Search
              placeholder="Search admins"
              allowClear
              enterButton="Search"
              size="large"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onSearch={handleSearch}
              style={{ maxWidth: "400px" }}
            />
            <Button
              type="primary"
              size="large"
              icon={<FaPlus />}
              onClick={showCreateDrawer}
            >
              Add Admin
            </Button>
          </div>
        </div>
      </div>

      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center bg-white rounded"
          style={{ height: "300px" }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <div className="tabs__content pt-0 js-tabs-content">
          <div className="tabs__pane -tab-item-1 is-tab-el-active">
            <div className="row y-gap-20">
              <div className="bg-white rounded p-3">
                <Table
                  dataSource={data}
                  columns={columns}
                  rowKey="id"
                  pagination={false}
                  scroll={{ x: true }}
                />
                <div className="mt-3 d-flex justify-content-end">
                  <Pagination
                    current={currentPage}
                    total={totalItems}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      <Modal
        title="Admin Details"
        open={viewModalVisible}
        onCancel={closeViewModal}
        footer={null}
        width={600}
      >
        {selectedAdmin && (
          <div>
            <p><strong>Name:</strong> {`${selectedAdmin.firstName} ${selectedAdmin.lastName}`}</p>
            <p><strong>Email:</strong> {selectedAdmin.email}</p>
            <p><strong>Role:</strong> {selectedAdmin.role}</p>
            <p><strong>Status:</strong> {selectedAdmin.isactive ? "Active" : "Inactive"}</p>
            <p><strong>Created:</strong> {dayjs(selectedAdmin.createdAt).format("DD/MM/YYYY HH:mm")}</p>
          </div>
        )}
      </Modal>

      {/* Create/Edit Drawer */}
      <Drawer
        title={mode === "create" ? "Add Admin" : "Edit Admin"}
        open={isDrawerVisible}
        onClose={closeDrawer}
        destroyOnClose={true}
        footer={null}
        width={500}
      >
        <div className="row">
          <div className="col-12 p-2">
            <div className="form-input">
              <input
                type="text"
                name="firstName"
                value={adminData.firstName}
                onChange={handleInputChange}
                required
              />
              <label className="lh-1 text-16 text-light-1">First Name *</label>
            </div>
          </div>
          <div className="col-12 p-2">
            <div className="form-input">
              <input
                type="text"
                name="lastName"
                value={adminData.lastName}
                onChange={handleInputChange}
                required
              />
              <label className="lh-1 text-16 text-light-1">Last Name *</label>
            </div>
          </div>
          <div className="col-12 p-2">
            <div className="form-input">
              <input
                type="email"
                name="email"
                value={adminData.email}
                onChange={handleInputChange}
                required
              />
              <label className="lh-1 text-16 text-light-1">Email *</label>
            </div>
          </div>
          <div className="col-12 p-2">
            <div className="form-input">
              <input
                type="password"
                name="password"
                value={adminData.password}
                onChange={handleInputChange}
                required={mode === "create"}
              />
              <label className="lh-1 text-16 text-light-1">
                Password {mode === "create" ? "*" : "(leave blank to keep current)"}
              </label>
            </div>
          </div>
          <div className="col-12 p-2">
            <label className="lh-1 text-16 text-light-1 mb-2">Role *</label>
            <Select
              value={adminData.role}
              onChange={handleRoleChange}
              style={{ width: "100%" }}
              size="large"
            >
              <Option value="admin">Admin</Option>
              <Option value="super_admin">Super Admin</Option>
            </Select>
          </div>

          <div className="col-12 mt-3 p-2">
            <button
              onClick={handleSubmit}
              className="button h-50 px-24 -black-1 text-white w-100"
              style={{ backgroundColor: "#004080", fontWeight: "bold" }}
              disabled={loading}
            >
              {loading
                ? mode === "create"
                  ? "Creating..."
                  : "Updating..."
                : mode === "create"
                ? "Create Admin"
                : "Update Admin"}
            </button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default CreateAdminSuperAdminList;