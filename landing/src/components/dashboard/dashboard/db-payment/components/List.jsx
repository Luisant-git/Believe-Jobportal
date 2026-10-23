import React, { useState, useEffect } from "react";
import {
  Input,
  Table,
  Button,
  Modal,
  Spin,
  Descriptions,
  Tag,
  Drawer,
  Switch,
  Image,
  Upload,
  Pagination,
} from "antd";
import { FaTrash, FaEye, FaRegEdit, FaUpload, FaTimes, FaDownload } from "react-icons/fa";
import { toast } from "react-toastify";
import * as XLSX from 'xlsx';
import {
  getSubscriptions,
  updateSubscription,
  deleteSubscription,
} from "@/api/payments";
import { getEmployers } from "@/api/employers";
import { Upload as UploadAPI } from "@/api/upload";
import moment from "moment";

const { Search } = Input;

function SubscriptionList() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  console.log("SubscriptionList data:", data);

  const [employers, setEmployers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [formState, setFormState] = useState({
    isActive: true,
    endDate: "",
    candidateLimit: "",
    jobLimit: "",
    transactionId: "",
    screenshot: "",
  });
  const [uploading, setUploading] = useState(false);

  // status display
  const statusOptions = [
    { value: "active", label: "Active", color: "green" },
    { value: "expired", label: "Expired", color: "red" },
  ];

  // Fetch Subscriptions
  const fetchSubscriptions = async (search = "") => {
    setLoading(true);
    try {
      const response = await getSubscriptions();
      let subscriptions = response?.data || [];

      // Client-side filtering if search term exists
      if (search) {
        subscriptions = subscriptions.filter((item) => {
          const firstName = item.employer?.user?.firstName?.toLowerCase() || "";
          const lastName = item.employer?.user?.lastName?.toLowerCase() || "";
          const email = item.employer?.user?.email?.toLowerCase() || "";
          const planName = item.planName?.toLowerCase() || "";
          const searchLower = search.toLowerCase();

          return (
            firstName.includes(searchLower) ||
            lastName.includes(searchLower) ||
            email.includes(searchLower) ||
            planName.includes(searchLower)
          );
        });
      }

      const processedData = subscriptions.map((item) => ({
        ...item,
        employerName: item.employer?.companyName || "N/A",
        endDate: moment(item.endDate).format("YYYY-MM-DD"),
      }));
      
      setData(processedData);
      setFilteredData(processedData);
    } catch (error) {
      toast.error("Error fetching subscriptions");
    } finally {
      setLoading(false);
    }
  };

  // Fetch Employers
  const fetchEmployers = async () => {
    try {
      const res = await getEmployers();
      setEmployers(res.data || []);
    } catch (e) {
      setEmployers([]);
    }
  };

  useEffect(() => {
    fetchEmployers();
    fetchSubscriptions();
    // eslint-disable-next-line
  }, []);

  // SEARCH
  const handleSearch = (value) => {
    setSearchTerm(value);
    if (!value.trim()) {
      setFilteredData(data);
      setCurrentPage(1);
      return;
    }
    
    const filtered = data.filter((item) => {
      const firstName = item.employer?.user?.firstName?.toLowerCase() || "";
      const lastName = item.employer?.user?.lastName?.toLowerCase() || "";
      const email = item.employer?.user?.email?.toLowerCase() || "";
      const planName = item.planName?.toLowerCase() || "";
      const searchLower = value.toLowerCase();

      return (
        firstName.includes(searchLower) ||
        lastName.includes(searchLower) ||
        email.includes(searchLower) ||
        planName.includes(searchLower)
      );
    });
    
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex);
  };

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  useEffect(() => {
    handleSearch(searchTerm);
  }, [data]);

  const handleDownloadExcel = () => {
    const columns = [
      'First Name', 'Last Name', 'Email', 'Company Name', 'Plan Name',
      'Price', 'Application Limit', 'Job Post Limit', 'Days Left',
      'Start Date', 'Expiry Date', 'Transaction ID', 'Is Active',
      'Payment Screenshot', 'Created At'
    ];

    const exportData = filteredData.map(subscription => {
      const row = {};
      columns.forEach(col => {
        switch(col) {
          case 'First Name': row[col] = subscription.employer?.user?.firstName || 'N/A'; break;
          case 'Last Name': row[col] = subscription.employer?.user?.lastName || 'N/A'; break;
          case 'Email': row[col] = subscription.employer?.user?.email || 'N/A'; break;
          case 'Company Name': row[col] = subscription.employer?.companyName || 'N/A'; break;
          case 'Plan Name': row[col] = subscription.planName || 'N/A'; break;
          case 'Price': row[col] = `₹${subscription.price?.toFixed(2) || '0.00'}`; break;
          case 'Application Limit': row[col] = subscription.candidateLimit || 'N/A'; break;
          case 'Job Post Limit': row[col] = subscription.jobLimit || 'N/A'; break;
          case 'Days Left': row[col] = subscription.daysLeft || 'N/A'; break;
          case 'Start Date': row[col] = subscription.startDate ? moment(subscription.startDate).format('DD/MM/YYYY') : 'N/A'; break;
          case 'Expiry Date': row[col] = subscription.endDate ? moment(subscription.endDate).format('DD/MM/YYYY') : 'N/A'; break;
          case 'Transaction ID': row[col] = subscription.transactionId || 'N/A'; break;
          case 'Is Active': row[col] = subscription.isActive ? 'Yes' : 'No'; break;
          case 'Payment Screenshot': row[col] = subscription.screenshot ? 'Yes' : 'No'; break;
          case 'Created At': row[col] = subscription.createdAt ? moment(subscription.createdAt).format('DD/MM/YYYY HH:mm') : 'N/A'; break;
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
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Payment Records');
    
    const fileName = `payment_records_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
    
    toast.success('Excel file downloaded successfully!');
  };

  // DELETE
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const showDeleteModal = (id) => {
    setDeleteId(id);
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteSubscription(deleteId);
      toast.success("Subscription deleted successfully");
      fetchSubscriptions();
    } catch (error) {
      toast.error("Error deleting subscription");
    } finally {
      setIsDeleteModalVisible(false);
      setDeleteId(null);
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalVisible(false);
    setDeleteId(null);
  };

  // VIEW
  const showSubscriptionDetails = (subscription) => {
    setSelectedSubscription(subscription);
    setViewModalVisible(true);
  };

  const closeViewModal = () => {
    setViewModalVisible(false);
    setSelectedSubscription(null);
  };

  // DRAWER (EDIT)
  const showDrawer = (subscription) => {
    setSelectedSubscription(subscription);
    setFormState({
      isActive:
        subscription.isActive !== undefined ? subscription.isActive : true,
      endDate: moment(subscription.endDate).format("YYYY-MM-DD"),
      candidateLimit: subscription.candidateLimit || "",
      jobLimit: subscription.jobLimit || "",
      transactionId: subscription.transactionId || "",
      screenshot: subscription.screenshot || "",
    });
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedSubscription(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSwitchChange = (checked) => {
    setFormState((prev) => ({
      ...prev,
      isActive: checked,
    }));
  };

  const handleDateChange = (e) => {
    setFormState((prev) => ({
      ...prev,
      endDate: e.target.value,
    }));
  };

  const handleImageUpload = async (file) => {
    setUploading(true);
    try {
      const response = await UploadAPI(file);
      if (response && response.urls && response.urls.length > 0) {
        const imagePath = response.urls[0];
        setFormState((prev) => ({
          ...prev,
          screenshot: imagePath,
        }));
        toast.success("Image uploaded successfully");
      } else {
        toast.error("Upload failed: No file URL in server response");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(
        `Failed to upload image: ${error.message || "Unknown error"}`
      );
    } finally {
      setUploading(false);
    }
    return false;
  };

  const handleUpdate = async () => {
    if (!formState.endDate) {
      toast.error("Please select an end date.");
      return;
    }
    try {
      await updateSubscription(selectedSubscription.id, {
        isActive: formState.isActive,
        endDate: formState.endDate,
        candidateLimit: Number(formState.candidateLimit),
        jobLimit: Number(formState.jobLimit),
        transactionId: formState.transactionId,
        screenshot: formState.screenshot,
      });
      toast.success("Subscription updated successfully");
      closeDrawer();
      fetchSubscriptions();
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(
          Array.isArray(error.response.data.message)
            ? error.response.data.message.join(", ")
            : error.response.data.message
        );
      } else {
        toast.error("Error updating subscription");
      }
    }
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      render: (_, record) => (
        <span>{record?.employer.user.firstName || "N/A"}</span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_, record) => (
        <span>{record?.employer.user.email || "N/A"}</span>
      ),
    },
    {
      title: "Plan",
      dataIndex: "planName",
      key: "planName",
      render: (name) => name.charAt(0).toUpperCase() + name.slice(1),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `₹${price.toFixed(2)}`,
    },
    {
      title: "Application Limit",
      dataIndex: "candidateLimit",
      key: "candidateLimit",
    },
    {
      title: "Job Post Limit",
      dataIndex: "jobLimit",
      key: "jobLimit",
    },
    {
      title: "Days Left",
      dataIndex: "daysLeft",
      key: "daysLeft",
    },
    {
      title: "Expiry Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (date) => moment(date).format("MMM D, YYYY"),
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    //   render: (status) => {
    //     const statusObj = statusOptions.find((opt) => opt.value === status);
    //     return statusObj ? (
    //       <Tag color={statusObj.color}>
    //         {status.charAt(0).toUpperCase() + status.slice(1)}
    //       </Tag>
    //     ) : null;
    //   },
    // },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      align: "center",
      render: (isActive) => (
        <Button
          type="primary"
          style={{
            background: isActive ? "#52c41a" : "#f5222d",
            borderColor: isActive ? "#52c41a" : "#f5222d",
            color: "#fff",
            minWidth: "70px",
          }}
          size="small"
        >
          {isActive ? "Active" : "Inactive"}
        </Button>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "1px", justifyContent: "center" }}>
          <Button
            type="link"
            danger
            icon={<FaTrash />}
            onClick={() => showDeleteModal(record.id)}
          />
          <Button
            type="link"
            icon={<FaEye />}
            onClick={() => showSubscriptionDetails(record)}
          />
          <Button icon={<FaRegEdit />} onClick={() => showDrawer(record)} />
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
              style={{
                fontSize: "20px",
                lineHeight: "14px",
                fontWeight: 600,
                color: "#004080",
              }}
            >
              Payment Records
            </h1>
            <div style={{ display: "flex", gap: "8px" }}>
              <Search
                placeholder="Search subscriptions"
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
                  dataSource={getCurrentPageData()}
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
                    total={filteredData.length}
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

      {/* Delete Modal */}
      <Modal
        title="Confirm Deletion"
        open={isDeleteModalVisible}
        onOk={confirmDelete}
        onCancel={cancelDelete}
        okText="Delete"
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
        style={{
          top: "20%",
        }}
      >
        <p>Are you sure you want to delete this subscription?</p>
      </Modal>

      {/* View Modal */}
      <Modal
        title="Subscription Details"
        open={viewModalVisible}
        onCancel={closeViewModal}
        footer={[
          <Button key="close" onClick={closeViewModal}
           style={{
                  padding: "8px 16px",
                  fontSize: "14px",
                  borderRadius: "4px",
                  border: "none",
                  background: "#004080",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
          >
            Close
          </Button>,
        ]}
      >
        {selectedSubscription && (
          <Descriptions bordered column={1} size="middle">
            <Descriptions.Item label="Employer">
              {selectedSubscription.employer?.companyName || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Plan">
              {selectedSubscription.planName}
            </Descriptions.Item>
            <Descriptions.Item label="Price">
              ₹{selectedSubscription.price.toFixed(2)}
            </Descriptions.Item>
            <Descriptions.Item label="Application Limit">
              {selectedSubscription.candidateLimit}
            </Descriptions.Item>
            <Descriptions.Item label="Job Post Limit">
              {selectedSubscription.jobLimit}
            </Descriptions.Item>
            <Descriptions.Item label="Days Left">
              {selectedSubscription.daysLeft} days
            </Descriptions.Item>
            <Descriptions.Item label="Expiry Date">
              {moment(selectedSubscription.endDate).format("MMM D, YYYY")}
            </Descriptions.Item>
            <Descriptions.Item label="Is Active">
              <Switch checked={selectedSubscription.isActive} disabled />
            </Descriptions.Item>

            <Descriptions.Item label="Transaction ID">
              {selectedSubscription.transactionId || "N/A"}
            </Descriptions.Item>

            {selectedSubscription.screenshot ? (
              <Descriptions.Item label="Payment Screenshot">
                <Image
                  width={200}
                  src={selectedSubscription.screenshot}
                  alt="Payment Screenshot"
                />
              </Descriptions.Item>
            ) : (
              <Descriptions.Item label="Payment Screenshot">
                N/A
              </Descriptions.Item>
            )}
          </Descriptions>
        )}
      </Modal>

      {/* Edit Drawer */}
      <Drawer
        title="Edit Subscription"
        placement="right"
        open={drawerVisible}
        onClose={closeDrawer}
        width={400}
        destroyOnClose
        footer={
          <div style={{ textAlign: "right" }}>
            <Button onClick={closeDrawer} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button type="primary" onClick={handleUpdate}>
              Update
            </Button>
          </div>
        }
      >
        <form>
          <div style={{ marginBottom: 20 }}>
            <label
              style={{ fontWeight: 500, display: "block", marginBottom: 6 }}
            >
              Application Limit
            </label>
            <input
              type="number"
              name="candidateLimit"
              value={formState.candidateLimit}
              onChange={handleFormChange}
              min={0}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #d9d9d9",
                borderRadius: "4px",
                fontSize: "16px",
              }}
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label
              style={{ fontWeight: 500, display: "block", marginBottom: 6 }}
            >
              Job Post Limit
            </label>
            <input
              type="number"
              name="jobLimit"
              value={formState.jobLimit}
              onChange={handleFormChange}
              min={0}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #d9d9d9",
                borderRadius: "4px",
                fontSize: "16px",
              }}
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label
              style={{ fontWeight: 500, display: "block", marginBottom: 6 }}
            >
              Expiry Date
            </label>
            <input
              type="date"
              name="endDate"
              value={formState.endDate}
              onChange={handleDateChange}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #d9d9d9",
                borderRadius: "4px",
                fontSize: "16px",
              }}
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label
              style={{ fontWeight: 500, display: "block", marginBottom: 6 }}
            >
              Transaction ID
            </label>
            <input
              type="text"
              name="transactionId"
              value={formState.transactionId}
              onChange={handleFormChange}
              placeholder="Enter transaction ID"
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #d9d9d9",
                borderRadius: "4px",
                fontSize: "16px",
              }}
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label
              style={{ fontWeight: 500, display: "block", marginBottom: 6 }}
            >
              Payment Screenshot
            </label>
            {formState.screenshot ? (
              <div>
                <div style={{ marginBottom: 8 }}>
                  <Image
                    width={100}
                    src={formState.screenshot}
                    alt="Payment Screenshot"
                  />
                </div>
                <Button
                  type="primary"
                  danger
                  size="small"
                  icon={<FaTimes />}
                  onClick={() =>
                    setFormState((prev) => ({ ...prev, screenshot: "" }))
                  }
                >
                  Remove Image
                </Button>
              </div>
            ) : (
              <Upload
                beforeUpload={(file) => {
                  const isImage = file.type.startsWith("image/");
                  if (!isImage) {
                    toast.error("Please upload an image file only!");
                    return false;
                  }
                  const isLt5M = file.size / 1024 / 1024 < 5;
                  if (!isLt5M) {
                    toast.error("Image must be smaller than 5MB!");
                    return false;
                  }
                  return handleImageUpload(file);
                }}
                showUploadList={false}
                accept="image/*"
                disabled={uploading}
              >
                <Button
                  icon={<FaUpload />}
                  loading={uploading}
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Upload Screenshot"}
                </Button>
              </Upload>
            )}
          </div>
          <div style={{ marginBottom: 20 }}>
            <label
              style={{ fontWeight: 500, display: "block", marginBottom: 6 }}
            >
              Is Active
            </label>
            <Switch
              checked={formState.isActive}
              onChange={handleSwitchChange}
            />
          </div>
        </form>
      </Drawer>
    </div>
  );
}

export default SubscriptionList;
