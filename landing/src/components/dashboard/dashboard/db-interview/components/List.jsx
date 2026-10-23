import React, { useState, useEffect } from "react";
import {
  FaEye,
  FaPlus,
  FaRegEdit,
  FaMapMarkerAlt,
  FaTrash,
  FaDownload,
} from "react-icons/fa";
import { toast } from "react-toastify";
import * as XLSX from 'xlsx';
import {
  getEmployers,
  createEmployer,
  updateEmployer,
  deleteEmployer,
  updateEmployersToggleActive,
  createEmployerWithoutPassword,
} from "@/api/employers";
import {
  Input,
  Table,
  Button,
  Pagination,
  Spin,
  Drawer,
  Form,
  message,
  Popconfirm,
  Switch,
  Avatar,
  Modal,
  Descriptions,
} from "antd";
import { InboxOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import Dragger from "antd/es/upload/Dragger";
import RestoreComponent from "../../common/RestoreEmployer";

const { Search } = Input;

function EmployersList() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedEmployer, setSelectedEmployer] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [form] = Form.useForm();
  const [IdProof, setIdProof] = useState(null);
  const [companyLogoUrl, setCompanyLogoUrl] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [fileList2, setFileList2] = useState([]);
  const [uploadedFileNameId, setUploadedFileName] = useState(null);
  const [uploadedFileNameLogo, setUploadedFileNamelogo] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    companyName: "",
    companyWebsite: "",
    companyDescription: "",
    contactPerson: "",
    companyType: "",
    companySize: "",
    companyIndustry: "",
    companyLocation: "",
    companyCity: "",
    companyState: "",
    companyPincode: "",
    companyAddress: "",
    companyPhone: "",
    companyEmail: "",
    // full_name: "",
    designation: "",
    employee_id: null,
    authorization_letter: null,
    business_card: null,
  });
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteEmployerId, setDeleteEmployerId] = useState(null);
  const [restoreModalVisible, setRestoreModalVisible] = useState(false);

  const handleDeleteClick = (id) => {
    setDeleteEmployerId(id);
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteEmployer(deleteEmployerId);
      toast.success("Employer deleted successfully");
      fetchEmployers();
    } catch (error) {
      toast.error("Error deleting employer");
    } finally {
      setDeleteModalVisible(false);
      setDeleteEmployerId(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
    setDeleteEmployerId(null);
  };

  const uploadFileHandler = async (
    file,
    setFileUrl,
    setFileListSetter,
    setNameSetter
  ) => {
    const formDataUpload = new FormData();
    formDataUpload.append("files", file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/uploads`,
        formDataUpload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setFileUrl(response?.data?.urls[0]);
      setFileListSetter([{ ...file, status: "done" }]);
      setNameSetter(file.name);
      message.success(`${file.name} file uploaded successfully`);
      return response?.data?.urls[0];
    } catch (error) {
      console.error("Error uploading file:", error);
      message.error("File upload failed. Please try again.");
      return null;
    }
  };

  // Fix: Prevent multiple upload API calls by checking file status and only uploading once
  const handleSingleFileUpload = (name, setFieldValue, setNameSetter) => ({
    name: "file",
    multiple: false,
    accept: ".pdf,.jpg,.jpeg,.png",
    beforeUpload: (file) => {
      const isRightType = /\.(pdf|jpg|jpeg|png)$/i.test(file.name);
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isRightType) {
        message.error("Only PDF or image files allowed!");
        return false;
      }
      if (!isLt5M) {
        message.error("File must be smaller than 5MB!");
        return false;
      }
      return true;
    },
    onChange: async (info) => {
      // Only upload if status is 'uploading' and originFileObj exists
      const fileObj = info.file.originFileObj || info.file;
      if (info.file.status === "uploading" && fileObj) {
        await uploadFileHandler(
          fileObj,
          (url) => setFieldValue(name, url),
          () => {},
          setNameSetter
        );
      }
    },
    onRemove: () => {
      setFieldValue(name, null);
      setNameSetter(null);
    },
    showUploadList: false,
  });

  const uploadPropsid = {
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
    onChange: async (info) => {
      // Only upload if status is 'uploading' and originFileObj exists
      const fileObj = info.file.originFileObj || info.file;
      if (info.file.status === "uploading" && fileObj) {
        const url = await uploadFileHandler(
          fileObj,
          setIdProof,
          setFileList,
          setUploadedFileName
        );
        if (url) setIdProof(url);
      }
    },
    onRemove() {
      setFileList([]);
      setIdProof(null);
      setUploadedFileName(null);
    },
  };

  const uploadPropslogo = {
    name: "file",
    multiple: false,
    fileList: fileList2,
    // image format only mention here
    accept: ".jpg,.jpeg,.png",
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
    onChange: async (info) => {
      // Only upload if status is 'uploading' and originFileObj exists
      const fileObj = info.file.originFileObj || info.file;
      if (info.file.status === "uploading" && fileObj) {
        const url = await uploadFileHandler(
          fileObj,
          setCompanyLogoUrl,
          setFileList2,
          setUploadedFileNamelogo
        );
        if (url) setCompanyLogoUrl(url);
      }
    },
    onRemove() {
      setFileList2([]);
      setCompanyLogoUrl(null);
      setUploadedFileNameLogo(null);
    },
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? e.target.files[0] : value,
    }));
  };

  const handleFileFieldChange = (name, url) => {
    setFormData((prev) => ({
      ...prev,
      [name]: url,
    }));
  };

  // FIX: Don't send password on update
  const handleSubmit = async () => {
    try {
      setUploading(true);
      let employerData = {
        ...formData,
        companyLogo:
          companyLogoUrl || (isEditMode ? selectedEmployer.companyLogo : ""),
        identityProof:
          IdProof || (isEditMode ? selectedEmployer.identityProof : ""),
      };

      if (isEditMode) {
        // Remove password on update to avoid "property password should not exist" error
        const { password, ...dataWithoutPassword } = employerData;
        employerData = dataWithoutPassword;
        await updateEmployer(selectedEmployer.id, employerData);
        toast.success("Employer updated successfully");
      } else {
        const { password, ...dataWithoutPassword } = employerData;
        await createEmployerWithoutPassword(dataWithoutPassword);
        toast.success("Employer created successfully");
      }

      fetchEmployers();
      closeDrawer();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.response?.data?.message || "Error submitting form");
    } finally {
      setUploading(false);
    }
  };

  const pageSize = 25;

  const fetchEmployers = () => {
    setLoading(true);
    getEmployers({
      page: parseInt(currentPage),
      limit: parseInt(pageSize),
      ...(searchTerm && { search: searchTerm }),
    })
      .then((response) => {
        setData(response?.data?.data || response?.data || []);
        setTotalItems(
          response?.data?.meta?.total || response?.data?.total || 0
        );
      })
      .catch((error) => {
        console.error("Error fetching employers:", error);
        toast.error("Error fetching employers");
      })
      .finally(() => setLoading(false));
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
    fetchEmployers();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchEmployers();
  };

  const showEmployerDetails = (id) => {
    try {
      const employer = data.find((e) => e.id === id);
      setSelectedEmployer(employer);
      setViewModalVisible(true);
    } catch (error) {
      toast.error("Error fetching employer details");
      console.error("Error:", error);
    }
  };

  const closeViewModal = () => {
    setViewModalVisible(false);
    setSelectedEmployer(null);
  };

  const showAddDrawer = () => {
    setIsEditMode(false);
    setFormData({
      email: "",
      password: "",
      companyName: "",
      companyWebsite: "",
      companyDescription: "",
      contactPerson: "",
      companyType: "",
      companySize: "",
      companyIndustry: "",
      companyLocation: "",
      companyCity: "",
      companyState: "",
      companyPincode: "",
      companyAddress: "",
      companyPhone: "",
      companyEmail: "",
      // full_name: "",
      designation: "",
      employee_id: null,
      authorization_letter: null,
      business_card: null,
    });
    setIdProof(null);
    setCompanyLogoUrl(null);
    setUploadedFileName(null);
    setUploadedFileNamelogo(null);
    setFileList([]);
    setFileList2([]);
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setFormData({
      email: "",
      password: "",
      companyName: "",
      companyWebsite: "",
      companyDescription: "",
      contactPerson: "",
      companyType: "",
      companySize: "",
      companyIndustry: "",
      companyLocation: "",
      companyCity: "",
      companyState: "",
      companyPincode: "",
      companyAddress: "",
      companyPhone: "",
      companyEmail: "",
      // full_name: "",
      designation: "",
      employee_id: null,
      authorization_letter: null,
      business_card: null,
    });
    setIdProof(null);
    setCompanyLogoUrl(null);
    setUploadedFileName(null);
    setUploadedFileNamelogo(null);
    setFileList([]);
    setFileList2([]);
    setIsEditMode(false);
    setSelectedEmployer(null);
  };

  const showEditDrawer = (employer) => {
    setIsEditMode(true);
    setSelectedEmployer(employer);

    setIdProof(employer.identityProof || null);
    setCompanyLogoUrl(employer.companyLogo || null);

    setFormData({
      email: employer.email || "",
      password: "",
      companyName: employer.companyName || "",
      companyWebsite: employer.companyWebsite || "",
      companyDescription: employer.companyDescription || "",
      companyType: employer.companyType || "",
      companySize: employer.companySize || "",
      companyIndustry: employer.companyIndustry || "",
      companyLocation: employer.companyLocation || "",
      companyCity: employer.companyCity || "",
      companyState: employer.companyState || "",
      companyPincode: employer.companyPincode || "",
      companyAddress: employer.companyAddress || "",
      companyPhone: employer.companyPhone || "",
      companyEmail: employer.companyEmail || "",
      contactPerson: employer.contactPerson || "",
      // full_name: employer.full_name || "",
      designation: employer.designation || "",
      employee_id: employer.employee_id || null,
      authorization_letter: employer.authorization_letter || null,
      business_card: employer.business_card || null,
    });

    setFileList([]);
    setFileList2([]);
    setUploadedFileName(null);
    setUploadedFileNamelogo(null);
    setDrawerVisible(true);
  };

  const validateWebsite = (value) => {
    if (
      value &&
      !/^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
    ) {
      return "Please enter a valid website URL";
    }
    return undefined;
  };

  const validateEmail = (value) => {
    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Please enter a valid email address";
    }
    return undefined;
  };

  const validatePhone = (value) => {
    if (value && !/^[\d\s\+\-\(\)]{7,}$/.test(value)) {
      return "Please enter a valid phone number";
    }
    return undefined;
  };

  useEffect(() => {
    fetchEmployers();
    // eslint-disable-next-line
  }, [currentPage, searchTerm]);

  const handleStatusChange = async (id, isactive) => {
    const response = await axios.patch(
      `${import.meta.env.VITE_API_URL}/users/${id}/status`,
      { isactive }
    );
    if (response) {
      await fetchEmployers();
    }
  };

  const handleToggleTrust = async (id) => {
    try {
      await updateEmployersToggleActive(id);
      toast.success("Employer trust status updated successfully");
      fetchEmployers();
    } catch (error) {
      toast.error("Error updating employer trust status");
      console.error("Toggle trust error:", error);
    }
  };

  const handleDownloadExcel = () => {
    const columns = [
      'Company Name', 'Contact Person', 'Email', 'Company Email', 'Company Phone',
      'Company Type', 'Company Size', 'Company Industry', 'Company Location',
      'Company City', 'Company State', 'Company Pincode', 'Company Address',
      'Company Website', 'Designation', 'Status', 'Active', 'Display Home',
      'Created At', 'Updated At'
    ];

    const exportData = data.map(employer => {
      const row = {};
      columns.forEach(col => {
        switch(col) {
          case 'Company Name': row[col] = employer.companyName || ''; break;
          case 'Contact Person': row[col] = employer.contactPerson || ''; break;
          case 'Email': row[col] = employer.email || ''; break;
          case 'Company Email': row[col] = employer.companyEmail || ''; break;
          case 'Company Phone': row[col] = employer.companyPhone || ''; break;
          case 'Company Type': row[col] = employer.companyType || ''; break;
          case 'Company Size': row[col] = employer.companySize || ''; break;
          case 'Company Industry': row[col] = employer.companyIndustry || ''; break;
          case 'Company Location': row[col] = employer.companyLocation || ''; break;
          case 'Company City': row[col] = employer.companyCity || ''; break;
          case 'Company State': row[col] = employer.companyState || ''; break;
          case 'Company Pincode': row[col] = employer.companyPincode || ''; break;
          case 'Company Address': row[col] = employer.companyAddress || ''; break;
          case 'Company Website': row[col] = employer.companyWebsite || ''; break;
          case 'Designation': row[col] = employer.designation || ''; break;
          case 'Status': row[col] = employer.status || ''; break;
          case 'Active': row[col] = employer.isActive ? 'Yes' : 'No'; break;
          case 'Display Home': row[col] = employer.isTrust ? 'Yes' : 'No'; break;
          case 'Created At': row[col] = employer.createdAt || ''; break;
          case 'Updated At': row[col] = employer.updatedAt || ''; break;
        }
      });
      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData, { header: columns });
    
    // Make headers bold
    const headerRange = XLSX.utils.decode_range(worksheet['!ref']);
    for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
      if (!worksheet[cellAddress]) continue;
      worksheet[cellAddress].s = {
        font: { bold: true },
        fill: { fgColor: { rgb: "CCCCCC" } },
        alignment: { horizontal: "center" }
      };
    }
    
    // Auto-fit column widths
    const colWidths = columns.map(col => ({ wch: Math.max(col.length, 15) }));
    worksheet['!cols'] = colWidths;
    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Employers');
    
    const fileName = `employers_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
    
    toast.success('Excel file downloaded successfully!');
  };

  // Modal for full employer details
  const EmployerDetailsModal = ({ visible, onClose, employer }) => (
    <Modal
      title="Employer Details"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={700}
    >
      {employer ? (
        <Descriptions column={1} bordered>
          <Descriptions.Item label="Company Name">
            {employer.companyName}
          </Descriptions.Item>
          <Descriptions.Item label="Contact Person">
            {employer.contactPerson}
          </Descriptions.Item>
          <Descriptions.Item label="Company Email">
            {employer.companyEmail}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{employer.email}</Descriptions.Item>
          <Descriptions.Item label="Company Phone">
            {employer.companyPhone}
          </Descriptions.Item>
          <Descriptions.Item label="Company Type">
            {employer.companyType}
          </Descriptions.Item>
          <Descriptions.Item label="Company Size">
            {employer.companySize}
          </Descriptions.Item>
          <Descriptions.Item label="Company Industry">
            {employer.companyIndustry}
          </Descriptions.Item>
          <Descriptions.Item label="Company State">
            {employer.companyState}
          </Descriptions.Item>
          <Descriptions.Item label="Company City">
            {employer.companyCity}
          </Descriptions.Item>
          <Descriptions.Item label="Company Pincode">
            {employer.companyPincode}
          </Descriptions.Item>
          <Descriptions.Item label="Company Address">
            {employer.companyAddress}
          </Descriptions.Item>
          <Descriptions.Item label="Company Website">
            <a
              href={employer.companyWebsite}
              target="_blank"
              rel="noopener noreferrer"
            >
              {employer.companyWebsite}
            </a>
          </Descriptions.Item>
          <Descriptions.Item label="Company Logo">
            {employer.companyLogo ? (
              <img
                src={employer.companyLogo}
                alt="logo"
                style={{ maxHeight: 60 }}
              />
            ) : (
              "N/A"
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Identity Proof">
            {employer.identityProof ? (
              <img
                src={employer.identityProof}
                alt="idproof"
                style={{ maxHeight: 60 }}
              />
            ) : (
              "N/A"
            )}
          </Descriptions.Item>
          {/* <Descriptions.Item label="Full Name">
            {employer.full_name || "N/A"}
          </Descriptions.Item> */}
          <Descriptions.Item label="Designation">
            {employer.designation || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Employee ID">
            {employer.employee_id ? (
              <a
                href={employer.employee_id}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#1677ff", fontWeight: 600 }}
              >
                View File
              </a>
            ) : (
              "N/A"
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Authorization Letter">
            {employer.authorization_letter ? (
              <a
                href={employer.authorization_letter}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#1677ff", fontWeight: 600 }}
              >
                View File
              </a>
            ) : (
              "N/A"
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Business Card">
            {employer.business_card ? (
              <a
                href={employer.business_card}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#1677ff", fontWeight: 600 }}
              >
                View File
              </a>
            ) : (
              "N/A"
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            {employer.status}
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {employer.createdAt}
          </Descriptions.Item>
          <Descriptions.Item label="Updated At">
            {employer.updatedAt}
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <Spin />
      )}
    </Modal>
  );

  const columns = [
    {
      title: "Display Home",
      dataIndex: "isTrust",
      key: "isTrust",
      align: "center",
      render: (isTrust, record) => (
        <Switch
          checked={isTrust}
          onChange={() => handleToggleTrust(record.employerId || record.id)}
          checkedChildren="Yes"
          unCheckedChildren="No"
        />
      ),
    },
    {
      title: "Company",
      dataIndex: "companyName",
      key: "companyName",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
          <Avatar
            style={{ backgroundColor: "#87d068" }}
            icon={<UserOutlined />}
          />
          <span>{record.companyName}</span>
        </div>
      ),
    },
    {
      title: "Contact Person",
      dataIndex: "contactPerson",
      key: "contactPerson",
      render: (text, record) => (
        <div>
          <div>{text}</div>
          <div style={{ fontSize: "12px", color: "#666" }}>{record.email}</div>
        </div>
      ),
    },
    {
      title: "Company Phone",
      key: "companyPhone",
      render: (text, record) => (
        <div>
          <div style={{ fontSize: "12px", color: "#666" }}>
            {record.companyPhone}
          </div>
        </div>
      ),
    },
    {
      title: "Company Type",
      key: "companyType",
      render: (text, record) => (
        <div>
          <div style={{ fontSize: "12px", color: "#666" }}>
            {record.companyType}
          </div>
        </div>
      ),
    },
    {
      title: "Location",
      key: "companyLocation",
      render: (text, record) => (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <FaMapMarkerAlt size={12} />
          </div>
          <div style={{ fontSize: "12px", color: "#666" }}>
            {record.companyLocation}
          </div>
        </div>
      ),
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive, record) => (
        <Popconfirm
          title={`Are you sure you want to ${
            isActive ? "deactivate" : "activate"
          } this Employer ?`}
          onConfirm={() => handleStatusChange(record.id, !isActive)}
          onCancel={() => {}}
          okText="Yes"
          cancelText="No"
        >
          <Switch
            checked={isActive}
            checkedChildren="Active"
            unCheckedChildren="Inactive"
            style={{
              backgroundColor: isActive ? "#52c41a" : "#f5222d",
            }}
          />
        </Popconfirm>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            type="link"
            icon={<FaEye />}
            onClick={() => showEmployerDetails(record.id)}
          />
          <Button icon={<FaRegEdit />} onClick={() => showEditDrawer(record)} />
          <Button
            danger
            type="link"
            icon={<FaTrash />}
            onClick={() => handleDeleteClick(record.employerId)}
          />
        </div>
      ),
    },
  ];

  // --- Add/Edit Drawer Form Fields: extended with all fields as per your API ---
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
              style={{
                fontSize: "20px",
                lineHeight: "14px",
                fontWeight: 600,
                color: "#004080",
              }}
            >
              Employers
            </h1>
            <div style={{ display: "flex", gap: "8px" }}>
              <Search
                placeholder="Search employers"
                allowClear
                enterButton="Search"
                size="large"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onSearch={handleSearch}
                style={{ maxWidth: "400px" }}
              />
              <Button
                type="default"
                size="large"
                icon={<FaDownload />}
                onClick={handleDownloadExcel}
              >
                Download Excel
              </Button>
              <Button
                type="default"
                size="large"
                icon={<FaTrash />}
                onClick={() => setRestoreModalVisible(true)}
              >
                Restore
              </Button>
              <Button
                type="primary"
                size="large"
                icon={<FaPlus />}
                onClick={showAddDrawer}
              >
                Add Employer
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
          </div>
        )}
      </div>

      {/* Employer Details Modal */}
      <EmployerDetailsModal
        visible={viewModalVisible}
        onClose={closeViewModal}
        employer={selectedEmployer}
      />

      {/* move to trash Modal */}
      <Modal
        title="Confirm Move to Trash"
        open={deleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        okText="Move to Trash"
        okButtonProps={{ danger: true }}
        cancelText="Cancel"
        destroyOnClose
      >
        <p>Are you sure you want to move this employer to trash?</p>
      </Modal>

      {/* Add/Edit Employer Drawer */}
      <Drawer
        title={isEditMode ? "Edit Employer" : "Add New Employer"}
        placement="right"
        onClose={closeDrawer}
        open={drawerVisible}
        width={600}
        className="custom-drawer"
      >
        <div className="row">
          {/* All text fields */}
          {[
            { label: "Email", name: "email", type: "email" },
            // {
            //   label: "Password",
            //   name: "password",
            //   type: "password",
            //   show: !isEditMode,
            // },
            { label: "Company Name", name: "companyName", type: "text" },
            { label: "Company Website", name: "companyWebsite", type: "url" },
            {
              label: "Company Description",
              name: "companyDescription",
              type: "textarea",
            },
            { label: "Contact Person", name: "contactPerson", type: "text" },
            { label: "Company Type", name: "companyType", type: "select" },
            { label: "Company Size", name: "companySize", type: "text" },
            {
              label: "Company Industry",
              name: "companyIndustry",
              type: "text",
            },
            {
              label: "Company Location",
              name: "companyLocation",
              type: "text",
            },
            { label: "Company City", name: "companyCity", type: "text" },
            { label: "Company State", name: "companyState", type: "text" },
            { label: "Company Pincode", name: "companyPincode", type: "text" },
            { label: "Company Address", name: "companyAddress", type: "text" },
            { label: "Company Phone", name: "companyPhone", type: "text" },
            { label: "Company Email", name: "companyEmail", type: "email" },
            // { label: "Full Name", name: "full_name", type: "text" },
            { label: "Designation", name: "designation", type: "text" },
          ].map(
            (field, idx) =>
              (field.show === undefined || field.show) && (
                <div className={`col-12 mt-3`} key={field.name}>
                  <div className="form-input">
                    {field.type === "textarea" ? (
                      <textarea
                        name={field.name}
                        rows={4}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        required={field.name !== "companyLocation"}
                      />
                    ) : field.type === "select" ? (
                      <select
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        required
                        style={{ marginTop: 38 }}
                        className="form-input border p-3"
                      >
                        <option value="">Select a Company Type</option>
                        <option value="Private Ltd">
                          Private Limited Company (Pvt Ltd)
                        </option>
                        <option value="Public Ltd">
                          Public Limited Company
                        </option>
                        <option value="sole_proprietorship">
                          Sole Proprietorship
                        </option>
                        <option value="partnership">Partnership</option>
                        <option value="llp">
                          Limited Liability Partnership (LLP)
                        </option>
                        <option value="opc">One Person Company (OPC)</option>
                        <option value="section_8">
                          Section 8 Company (NGO)
                        </option>
                        <option value="joint_venture">
                          Joint-Venture Company
                        </option>
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        required={field.name !== "companyLocation"}
                      />
                    )}
                    <label className="lh-1 text-16 text-light-1">
                      {field.label} {field.name !== "companyLocation" && "*"}
                    </label>
                  </div>
                  {(field.name === "email" || field.name === "companyEmail") &&
                    validateEmail(formData[field.name]) && (
                      <div style={{ color: "red", fontSize: "12px" }}>
                        {validateEmail(formData[field.name])}
                      </div>
                    )}
                  {field.name === "companyWebsite" &&
                    validateWebsite(formData.companyWebsite) && (
                      <div style={{ color: "red", fontSize: "12px" }}>
                        {validateWebsite(formData.companyWebsite)}
                      </div>
                    )}
                  {field.name === "companyPhone" &&
                    validatePhone(formData.companyPhone) && (
                      <div style={{ color: "red", fontSize: "12px" }}>
                        {validatePhone(formData.companyPhone)}
                      </div>
                    )}
                </div>
              )
          )}

          {/* File Uploads */}
          {[
            {
              label: "Identity Proof",
              name: "identityProof",
              uploadProps: uploadPropsid,
              uploadedFileName: uploadedFileNameId,
              fileUrl: IdProof,
            },
            {
              label: "Company Logo",
              name: "companyLogo",
              uploadProps: uploadPropslogo,
              uploadedFileName: uploadedFileNameLogo,
              fileUrl: companyLogoUrl,
            },
            {
              label: "Employee ID",
              name: "employee_id",
              uploadProps: handleSingleFileUpload(
                "employee_id",
                (name, url) => handleFileFieldChange("employee_id", url),
                setUploadedFileName
              ),
              uploadedFileName: formData.employee_id
                ? formData.employee_id.split("/").pop()
                : null,
              fileUrl: formData.employee_id,
            },
            {
              label: "Authorization Letter",
              name: "authorization_letter",
              uploadProps: handleSingleFileUpload(
                "authorization_letter",
                (name, url) =>
                  handleFileFieldChange("authorization_letter", url),
                setUploadedFileName
              ),
              uploadedFileName: formData.authorization_letter
                ? formData.authorization_letter.split("/").pop()
                : null,
              fileUrl: formData.authorization_letter,
            },
            {
              label: "Business Card",
              name: "business_card",
              uploadProps: handleSingleFileUpload(
                "business_card",
                (name, url) => handleFileFieldChange("business_card", url),
                setUploadedFileName
              ),
              uploadedFileName: formData.business_card
                ? formData.business_card.split("/").pop()
                : null,
              fileUrl: formData.business_card,
            },
          ].map((fileField, idx) => (
            <div className="col-12 mt-3" key={fileField.name}>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", marginBottom: "8px" }}>
                  {fileField.label}
                </label>
                <Dragger {...fileField.uploadProps}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to upload
                  </p>
                  <p className="ant-upload-hint">
                    {fileField.name === "companyLogo"
                      ? "Only image files are accepted. Maximum file size: 5MB."
                      : "Only PDF or image files are accepted. Maximum file size: 5MB."}
                  </p>
                </Dragger>
                {fileField.uploadedFileName && (
                  <p
                    style={{
                      marginTop: "10px",
                      fontSize: "14px",
                      color: "#1890ff",
                    }}
                  >
                    File: {fileField.uploadedFileName}
                  </p>
                )}
              </div>
            </div>
          ))}

          <div className="col-12 mt-3">
            <button
              type="button"
              onClick={handleSubmit}
              className="button h-50 px-24 -black-1 text-white w-100"
              style={{ backgroundColor: "#004080" }}
              disabled={uploading}
            >
              {uploading
                ? isEditMode
                  ? "Updating..."
                  : "Creating..."
                : isEditMode
                ? "Update Employer"
                : "Create Employer"}
            </button>
          </div>
        </div>
      </Drawer>

      {/* Restore Component */}
      <RestoreComponent
        type="employer"
        visible={restoreModalVisible}
        onClose={() => setRestoreModalVisible(false)}
        onRestore={fetchEmployers}
      />
    </div>
  );
}

export default EmployersList;
