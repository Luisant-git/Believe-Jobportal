import React, { useState, useEffect } from "react";
import {
  Input,
  Table,
  Button,
  Pagination,
  Modal,
  Spin,
  Descriptions,
  Tag,
  Drawer,
  Form,
  Row,
  Col,
  Avatar,
  message,
} from "antd";
import {
  FaTrash,
  FaEye,
  FaPlus,
  FaRegEdit,
  FaGlobe,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import {
  getCompanyDetails,
  deleteCompanyDetails,
  createCompanyDetails,
  getCompanyDetailsById,
  updateCompanyDetails,
} from "@/api/company";
import Dragger from "antd/es/upload/Dragger";
import { InboxOutlined } from "@ant-design/icons";
import axios from "axios";

const { Search } = Input;

function CompanyList() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState(null);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [pdf, setPDF] = useState(null);
  const [fileList, setFileList] = useState(null);

  const [drawerState, setDrawerState] = useState({
    visible: false,
    isEditMode: false,
    companyId: null,
  });

  const [formValues, setFormValues] = useState({
    companyName: "",
    companyWebsite: "",
    companyDescription: "",
    companyAddress: "",
    companyCity: "",
    companyState: "",
    companyLocation: "",
    companyEmail: "",
    companyPhone: "",
  });

  const [form] = Form.useForm();

  const pageSize = 10;

  const fetchCompanies = () => {
    setLoading(true);
    getCompanyDetails({
      page: currentPage,
      limit: pageSize,
      search: searchTerm,
    })
      .then((response) => {
        setData(response?.data?.data || []);
        setTotalItems(
          response?.data?.meta?.total || response?.data?.total || 0
        );
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
        toast.error("Error fetching companies");
      })
      .finally(() => setLoading(false));
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
    fetchCompanies();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchCompanies();
  };

  const confirmDelete = () => {
    deleteCompanyDetails(companyToDelete)
      .then(() => {
        toast.success("Company moved to trash successfully");
        fetchCompanies();
      })
      .catch((error) => {
        toast.error("Error moving company to trash");
        console.error("Delete error:", error);
      })
      .finally(() => {
        setIsDeleteModalVisible(false);
        setCompanyToDelete(null);
      });
  };

  const cancelDelete = () => {
    setIsDeleteModalVisible(false);
    setCompanyToDelete(null);
  };

  const showDeleteModal = (id) => {
    setCompanyToDelete(id);
    setIsDeleteModalVisible(true);
  };

  const showCompanyDetails = async (id) => {
    try {
      const response = await getCompanyDetailsById(id);
      setSelectedCompany(response.data);
      setViewModalVisible(true);
    } catch (error) {
      toast.error("Error fetching company details");
      console.error("Error:", error);
    }
  };

  const closeViewModal = () => {
    setViewModalVisible(false);
    setSelectedCompany(null);
  };

  const showAddDrawer = () => {
    setFormValues({
      companyName: "",
      companyWebsite: "",
      companyDescription: "",
      companyAddress: "",
      companyCity: "",
      companyState: "",
      companyLocation: "",
      companyEmail: "",
      companyPhone: "",
    });

    setDrawerState({
      visible: true,
      isEditMode: false,
      companyId: null,
    });
    form.resetFields();
    setFileList(null);
    setPDF(null);
  };

  const showEditDrawer = async (company) => {
    try {
      const response = await getCompanyDetailsById(company.id);
      const companyData = response.data;

      setFormValues({
        companyName: companyData.companyName || "",
        companyWebsite: companyData.companyWebsite || "",
        companyDescription: companyData.companyDescription || "",
        companyAddress: companyData.companyAddress || "",
        companyCity: companyData.companyCity || "",
        companyState: companyData.companyState || "",
        companyLocation: companyData.companyLocation || "",
        companyEmail: companyData.companyEmail || "",
        companyPhone: companyData.companyPhone || "",
      });

      form.setFieldsValue({
        companyName: companyData.companyName,
        companyWebsite: companyData.companyWebsite,
        companyDescription: companyData.companyDescription,
        companyLocation: companyData.companyLocation,
        companyCity: companyData.companyCity,
        companyState: companyData.companyState,
        companyAddress: companyData.companyAddress,
        companyPhone: companyData.companyPhone,
        companyEmail: companyData.companyEmail,
      });

      if (companyData.companyLogo) {
        setFileList([
          {
            uid: "-1",
            name: "company-logo.png",
            status: "done",
            url: companyData.companyLogo,
          },
        ]);
      } else {
        setFileList([]);
      }

      setDrawerState({
        visible: true,
        isEditMode: true,
        companyId: company.id,
      });
    } catch (error) {
      toast.error("Error loading company data");
      console.error("Error:", error);
    }
  };

  const closeDrawer = () => {
    setDrawerState({
      visible: false,
      isEditMode: false,
      companyId: null,
    });
    form.resetFields();
    setFileList(null);
    setPDF(null);
  };

  const uploadProps = {
    name: "file",
    multiple: false,
    fileList: fileList,
    accept: "image/*",
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isImage) {
        message.error("You can only upload image files!");
        return false;
      }
      if (!isLt5M) {
        message.error("Image must be smaller than 5MB!");
        return false;
      }
      return true;
    },
    onChange(info) {
      const { status } = info.file;
      setFileList(info.fileList.slice(-1));
      setPDF(info.file);

      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onRemove() {
      setFileList([]);
      setPDF(null);
    },
  };

  const validateWebsite = (_, value) => {
    if (value && !/^https?:\/\/.+\..+/.test(value)) {
      return Promise.reject("Please enter a valid website URL");
    }
    return Promise.resolve();
  };

  const validateEmail = (_, value) => {
    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return Promise.reject("Please enter a valid email address");
    }
    return Promise.resolve();
  };

  const validatePhone = (_, value) => {
    if (value && !/^[\d\s\+\-\(\)]{7,}$/.test(value)) {
      return Promise.reject("Please enter a valid phone number");
    }
    return Promise.resolve();
  };

  const handleInputChange = (field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
    form.setFieldsValue({ [field]: value });
  };

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      const values = { ...formValues };

      if (pdf) {
        const formData = new FormData();
        formData.append("files", pdf);

        const uploadResponse = await axios.post(
          `${import.meta.env.VITE_API_URL}/uploads`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        values.companyLogo = uploadResponse.data.urls[0];
      } else if (drawerState.isEditMode && fileList && fileList.length > 0) {
        values.companyLogo = fileList[0].url;
      }

      if (drawerState.isEditMode) {
        await updateCompanyDetails(drawerState.companyId, values);
        toast.success("Company updated successfully");
      } else {
        await createCompanyDetails(values);
        toast.success("Company created successfully");
      }

      fetchCompanies();
      closeDrawer();
    } catch (error) {
      if (error.response) {
        console.error("Error:", error);
        const errorMessage =
          error.response?.data?.message ||
          (drawerState.isEditMode
            ? "Error updating company"
            : "Error creating company");
        toast.error(errorMessage);
      } else {
        console.error("Validation failed or upload error:", error);
      }
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, [currentPage, searchTerm]);

  const columns = [
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {record.companyLogo && (
            <Avatar
              src={
                <img
                  src={
                    record?.companyLogo ||
                    "https://avatar.iran.liara.run/public/26"
                  }
                  alt="avatar"
                />
              }
            />
          )}
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Location",
      dataIndex: "companyLocation",
      key: "companyLocation",
      render: (location, record) => (
        <div>
          <div>{location}</div>
          <div style={{ fontSize: "12px", color: "#666" }}>
            {record.companyCity}, {record.companyState}
          </div>
        </div>
      ),
    },
    {
      title: "Contact",
      key: "contact",
      render: (_, record) => (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <FaEnvelope size={12} />
            <span>{record.companyEmail}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <FaPhone size={12} />
            <span>{record.companyPhone}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Website",
      dataIndex: "companyWebsite",
      key: "companyWebsite",
      render: (website) => (
        <a href={website} target="_blank" rel="noopener noreferrer">
          <FaGlobe /> Visit
        </a>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            type="link"
            danger
            icon={<FaTrash />}
            onClick={() => showDeleteModal(record.id)}
          />
          <Button
            type="link"
            icon={<FaEye />}
            onClick={() => showCompanyDetails(record.id)}
          />
          <Button
            type="link"
            icon={<FaRegEdit />}
            onClick={() => showEditDrawer(record)}
          />
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: "0 15px" }}>
      <div style={{ margin: "0 -15px" }}>
        <div style={{ paddingBottom: "30px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "12px",
            }}
          >
            <h1
              style={{ fontSize: "20px", lineHeight: "14px", fontWeight: 600 }}
            >
              Companies
            </h1>
            <div style={{ display: "flex", gap: "8px" }}>
              <Search
                placeholder="Search companies"
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
                onClick={showAddDrawer}
              >
                Add Company
              </Button>
            </div>
          </div>
        </div>

        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: "8px",
              height: "300px",
            }}
          >
            <Spin size="large" />
          </div>
        ) : (
          <div>
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                padding: "12px",
              }}
            >
              <Table
                dataSource={data}
                columns={columns}
                rowKey="id"
                pagination={false}
                scroll={{ x: true }}
              />
              <div
                style={{
                  marginTop: "12px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
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
        )}
      </div>

      <Modal
        title="Move to Trash"
        visible={isDeleteModalVisible}
        onOk={confirmDelete}
        onCancel={cancelDelete}
        okText="Move to Trash"
        cancelText="Cancel"
        okButtonProps={{
          style: {
            background: "#dc3545",
            borderColor: "#dc3545",
            color: "#fff",
          },
        }}
        cancelButtonProps={{
          style: {
            background: "#6c757d",
            borderColor: "#6c757d",
            color: "#fff",
          },
        }}
        bodyStyle={{
          padding: "20px",
        }}
        style={{
          top: "20%",
        }}
      >
        <p>Are you sure you want to move this company to trash? You can restore it later if needed.</p>
      </Modal>

      <Modal
        title="Company Details"
        visible={viewModalVisible}
        onCancel={closeViewModal}
        footer={null}
        width={700}
        bodyStyle={{
          padding: "20px",
        }}
        style={{
          top: "20px",
        }}
      >
        {selectedCompany && (
          <div className="bootstrap-modal-content">
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              {selectedCompany.companyLogo && (
                <img
                  src={selectedCompany.companyLogo}
                  alt="Company Logo"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "1px solid #eee",
                  }}
                />
              )}
              <h2 style={{ marginTop: "10px" }}>
                {selectedCompany.companyName}
              </h2>
              {selectedCompany.companyWebsite && (
                <a
                  href={selectedCompany.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-block", marginTop: "5px" }}
                >
                  <FaGlobe /> Visit Website
                </a>
              )}
            </div>

            <Descriptions bordered column={1}>
              <Descriptions.Item label="Description">
                {selectedCompany.companyDescription || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <FaMapMarkerAlt />
                  <span>
                    {selectedCompany.companyAddress},{" "}
                    {selectedCompany.companyCity},{" "}
                    {selectedCompany.companyState},{" "}
                    {selectedCompany.companyLocation}
                  </span>
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="Contact Email">
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <FaEnvelope />
                  <span>{selectedCompany.companyEmail}</span>
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                <div
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <FaPhone />
                  <span>{selectedCompany.companyPhone}</span>
                </div>
              </Descriptions.Item>
            </Descriptions>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={closeViewModal}
                style={{
                  padding: "8px 16px",
                  fontSize: "14px",
                  borderRadius: "4px",
                  border: "none",
                  background: "#1890ff",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
                className="-black-1 bg-blue-1"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      <Drawer
        title={drawerState.isEditMode ? "Edit Company" : "Add New Company"}
        placement="right"
        onClose={closeDrawer}
        visible={drawerState.visible}
        width={600}
        className="custom-drawer"
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <div className="row">
            <div className="col-12">
              <Form.Item
                name="companyName"
                rules={[
                  { required: true, message: "Company name is required" },
                ]}
              >
                <div className="form-input">
                  <input
                    type="text"
                    value={formValues.companyName}
                    onChange={(e) =>
                      handleInputChange("companyName", e.target.value)
                    }
                    required
                  />
                  <label className="lh-1 text-16 text-light-1">
                    Company Name *
                  </label>
                </div>
              </Form.Item>
            </div>

            <div className="col-12 mt-3">
              <Form.Item name="companyLogo" label="Company Logo">
                <Dragger
                  {...uploadProps}
                  className="p-4 border-dashed border-2 rounded-lg"
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag image to upload
                  </p>
                  <p className="ant-upload-hint">
                    Only image files are accepted. Maximum file size: 5MB.
                  </p>
                </Dragger>
              </Form.Item>
            </div>

            <div className="col-12 mt-3">
              <Form.Item
                name="companyWebsite"
                rules={[
                  { required: true, message: "Website is required" },
                  { validator: validateWebsite },
                ]}
              >
                <div className="form-input">
                  <input
                    type="url"
                    value={formValues.companyWebsite}
                    onChange={(e) =>
                      handleInputChange("companyWebsite", e.target.value)
                    }
                    required
                  />
                  <label className="lh-1 text-16 text-light-1">Website *</label>
                </div>
              </Form.Item>
            </div>

            <div className="col-12 mt-3">
              <Form.Item
                name="companyDescription"
                rules={[{ required: true, message: "Description is required" }]}
              >
                <div className="form-input">
                  <textarea
                    value={formValues.companyDescription}
                    onChange={(e) =>
                      handleInputChange("companyDescription", e.target.value)
                    }
                    rows={4}
                    required
                  />
                  <label className="lh-1 text-16 text-light-1">
                    Description *
                  </label>
                </div>
              </Form.Item>
            </div>

            <div className="col-12 mt-3">
              <Form.Item
                name="companyAddress"
                rules={[{ required: true, message: "Address is required" }]}
              >
                <div className="form-input">
                  <input
                    type="text"
                    value={formValues.companyAddress}
                    onChange={(e) =>
                      handleInputChange("companyAddress", e.target.value)
                    }
                    required
                  />
                  <label className="lh-1 text-16 text-light-1">Address *</label>
                </div>
              </Form.Item>
            </div>

            <div className="col-12 mt-3">
              <Form.Item
                name="companyCity"
                rules={[{ required: true, message: "City is required" }]}
              >
                <div className="form-input">
                  <input
                    type="text"
                    value={formValues.companyCity}
                    onChange={(e) =>
                      handleInputChange("companyCity", e.target.value)
                    }
                    required
                  />
                  <label className="lh-1 text-16 text-light-1">City *</label>
                </div>
              </Form.Item>
            </div>

            <div className="col-12 mt-3">
              <Form.Item
                name="companyState"
                rules={[{ required: true, message: "State is required" }]}
              >
                <div className="form-input">
                  <input
                    type="text"
                    value={formValues.companyState}
                    onChange={(e) =>
                      handleInputChange("companyState", e.target.value)
                    }
                    required
                  />
                  <label className="lh-1 text-16 text-light-1">State *</label>
                </div>
              </Form.Item>
            </div>

            <div className="col-12 mt-3">
              <Form.Item
                name="companyLocation"
                rules={[{ required: true, message: "Location is required" }]}
              >
                <div className="form-input">
                  <input
                    type="text"
                    value={formValues.companyLocation}
                    onChange={(e) =>
                      handleInputChange("companyLocation", e.target.value)
                    }
                    required
                  />
                  <label className="lh-1 text-16 text-light-1">
                    Location *
                  </label>
                </div>
              </Form.Item>
            </div>

            <div className="col-12 mt-3">
              <Form.Item
                name="companyEmail"
                rules={[
                  { required: true, message: "Email is required" },
                  { validator: validateEmail },
                ]}
              >
                <div className="form-input">
                  <input
                    type="email"
                    value={formValues.companyEmail}
                    onChange={(e) =>
                      handleInputChange("companyEmail", e.target.value)
                    }
                    required
                  />
                  <label className="lh-1 text-16 text-light-1">Email *</label>
                </div>
              </Form.Item>
            </div>

            <div className="col-12 mt-3">
              <Form.Item
                name="companyPhone"
                rules={[
                  { required: true, message: "Phone is required" },
                  { validator: validatePhone },
                ]}
              >
                <div className="form-input">
                  <input
                    type="text"
                    value={formValues.companyPhone}
                    onChange={(e) =>
                      handleInputChange("companyPhone", e.target.value)
                    }
                    required
                  />
                  <label className="lh-1 text-16 text-light-1">Phone *</label>
                </div>
              </Form.Item>
            </div>

            <div className="col-12 mt-3">
              <button
                type="submit"
                className="button h-50 px-24 -black-1 bg-blue-1 text-white w-100"
              >
                {drawerState.isEditMode ? "Update Company" : "Create Company"}
              </button>
            </div>
          </div>
        </Form>
      </Drawer>
    </div>
  );
}

export default CompanyList;
