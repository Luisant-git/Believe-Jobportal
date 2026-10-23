import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Spin,
  Descriptions,
  Drawer,
  Form,
  DatePicker,
  InputNumber,
  Card,
  Select,
  Input,
  Upload,
  Image,
} from "antd";
import { FaEye, FaPlus, FaUpload } from "react-icons/fa";
import { toast } from "react-toastify";
import { createSubscription, getSubscriptionsByUser } from "@/api/subscription";
import { Upload as UploadAPI } from "@/api/upload";
import dayjs from "dayjs";
import { getEmployerByUserId } from "@/api/user";
import qrcode from "../../../../../../public/img/general/qrcode.jpg";

const PLAN_CONFIG = {
  "Free Plan": {
    price: 0,
    candidateLimit: 15,
    jobLimit: 1,
    endDate: () => dayjs().add(30, "day").format("YYYY-MM-DD"),
    disabled: true,
  },
  "Standard Plan": {
    price: 999,
    candidateLimit: 25,
    jobLimit: 10,
    endDate: () => dayjs().add(90, "day").format("YYYY-MM-DD"),
    disabled: true,
  },
  "Premium Plan": {
    price: 2999,
    candidateLimit: 50,
    jobLimit: 50,
    endDate: () => dayjs().add(180, "day").format("YYYY-MM-DD"),
    disabled: true,
  },
};

function SubscriptionList() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [isAddDrawerVisible, setIsAddDrawerVisible] = useState(false);
  const [employerId, setEmployerId] = useState(null);
  const [form] = Form.useForm();
  const [newSubscription, setNewSubscription] = useState({
    planName: "",
    price: 0,
    candidateLimit: 0,
    jobLimit: 0,
    endDate: "",
    employerId: "",
    transactionId: "",
    screenshot: "",
  });
  const [uploading, setUploading] = useState(false);

  // fetch employer details
  const fetchEmployerDetails = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    try {
      const response = await getEmployerByUserId(userId);
      if (response && response.data) {
        setNewSubscription((prev) => ({
          ...prev,
          employerId: response.data.employer.id,
        }));
        setEmployerId(response.data.employer.id);
      }
    } catch (error) {
      console.error("Error fetching employer details:", error);
    }
  };

  // fetch subscriptions
  const fetchSubscriptions = async () => {
    if (!employerId || employerId === "null") {
      toast.error("Employer ID is not set. Please try again.");
      return;
    }
    setLoading(true);
    try {
      const response = await getSubscriptionsByUser(employerId);
      const subscriptionData = response?.data;
      setData(subscriptionData);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      toast.error("Error fetching subscriptions");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  // open details modal
  const showSubscriptionDetails = (subscription) => {
    setSelectedSubscription(subscription);
    setViewModalVisible(true);
  };

  // close details modal
  const closeViewModal = () => {
    setViewModalVisible(false);
    setSelectedSubscription(null);
  };

  // open drawer
  const showAddDrawer = () => {
    setIsAddDrawerVisible(true);
  };

  // close drawer
  const closeAddDrawer = () => {
    setIsAddDrawerVisible(false);
    setNewSubscription({
      planName: "",
      price: 0,
      candidateLimit: 0,
      jobLimit: 0,
      endDate: "",
      employerId: employerId,
      transactionId: "",
      screenshot: "",
    });
    form.resetFields();
  };

  // handle plan change (auto-fill)
  const handlePlanChange = (value) => {
    let config = PLAN_CONFIG[value];
    if (config) {
      setNewSubscription((prev) => ({
        ...prev,
        planName: value,
        price: config.price,
        candidateLimit: config.candidateLimit,
        jobLimit: config.jobLimit,
        endDate: config.endDate(),
      }));
      // Set form values to show in UI
      form.setFieldsValue({
        planName: value,
        price: config.price,
        candidateLimit: config.candidateLimit,
        jobLimit: config.jobLimit,
        endDate: dayjs(config.endDate()),
      });
    } else {
      setNewSubscription((prev) => ({
        ...prev,
        planName: value,
        price: 0,
        candidateLimit: 0,
        jobLimit: 0,
        endDate: "",
      }));
      form.resetFields();
      form.setFieldsValue({ planName: value });
    }
  };

  // handle number change (only if not auto-filled)
  const handleNumberChange = (name, value) => {
    setNewSubscription((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle date change (only if not auto-filled)
  const handleDateChange = (date, dateString) => {
    setNewSubscription((prev) => ({
      ...prev,
      endDate: dateString,
    }));
  };

  const isPlanAutoFilled =
    PLAN_CONFIG[newSubscription.planName] &&
    PLAN_CONFIG[newSubscription.planName].disabled;

  // handle image upload
  const handleImageUpload = async (file) => {
    setUploading(true);
    try {
      const response = await UploadAPI(file);

      if (response && response.urls && response.urls.length > 0) {
        const imagePath = response.urls[0];
        setNewSubscription((prev) => ({
          ...prev,
          screenshot: imagePath,
        }));
        form.setFieldsValue({ screenshot: imagePath });
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
  console.log("Current newSubscription state:", newSubscription);

  // handle submit
  const handleAddSubmit = () => {
    if (!newSubscription.planName) {
      toast.error("Plan name is required");
      return;
    }
    if (!newSubscription.transactionId) {
      toast.error("Transaction ID is required");
      return;
    }
    if (!newSubscription.screenshot) {
      toast.error("Payment screenshot is required");
      return;
    }
    if (!employerId) {
      toast.error("Employer ID is missing");
      return;
    }
    const payload = {
      ...newSubscription,
      employerId: employerId,
      endDate: newSubscription.endDate
        ? new Date(newSubscription.endDate).toISOString()
        : "",
    };

    createSubscription(payload)
      .then((response) => {
        setNewSubscription({
          planName: "",
          price: 0,
          candidateLimit: 0,
          jobLimit: 0,
          endDate: "",
          employerId: employerId,
          transactionId: "",
          screenshot: "",
        });
        fetchSubscriptions();
        closeAddDrawer();
        if (response.success) {
          toast.success("Subscription added successfully");
        }
      })
      .catch((error) => {
        setNewSubscription({
          planName: "",
          price: 0,
          candidateLimit: 0,
          jobLimit: 0,
          endDate: "",
          employerId: employerId,
          transactionId: "",
          screenshot: "",
        });
        toast.error(error.message || "Failed to add subscription");
        closeAddDrawer();
      });
  };

  useEffect(() => {
    fetchEmployerDetails();
  }, []);

  useEffect(() => {
    if (employerId) {
      fetchSubscriptions();
    }
  }, [employerId]);

  return (
    <div className="container-fluid">
      <div className="row y-gap-10 justify-between items-end pb-30 lg:pb-30 md:pb-32">
        <div className="col-12 d-flex align-item-center justify-content-between bg-white rounded p-3">
          <h1 style={{ color: "#004080" }} className="text-20 lh-14 fw-600">
            Subscriptions
          </h1>
          <Button
            type="primary"
            size="large"
            icon={<FaPlus />}
            onClick={showAddDrawer}
            
          >
            Add Subscription
          </Button>
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
        <div className="row y-gap-20">
          <div className="col-12">
            {data && data.id ? (
              <Card
                title="Current Subscription"
                className="bg-white rounded"
                extra={
                  <Button
                    type="link"
                    icon={<FaEye />}
                    onClick={() => showSubscriptionDetails(data)}
                  >
                    View Details
                  </Button>
                }
              >
                <div className="row">
                  <div className="col-md-6">
                    <p>
                      <strong>Plan:</strong> {data.planName}
                    </p>
                    <p>
                      <strong>Price:</strong> ₹{data.price}
                    </p>
                    <p>
                      <strong>Job Post Limit:</strong> {data.jobLimit}
                    </p>
                    <p>
                      <strong>Application Limit:</strong> {data.candidateLimit}
                    </p>
                    {data.transactionId && (
                      <p>
                        <strong>Transaction ID:</strong> {data.transactionId}
                      </p>
                    )}
                  </div>
                  <div className="col-md-6">
                    <p>
                      <strong>Days Left:</strong> {data.daysLeft} days
                    </p>
                    <p>
                      <strong>Expiry Date:</strong>{" "}
                      {dayjs(data.endDate).format("YYYY-MM-DD")}
                    </p>
                    <p>
                      <strong>Status:</strong>
                      <span
                        className={`badge ${
                          data.isActive ? "bg-success" : "bg-danger"
                        } ms-2`}
                      >
                        {data.isActive ? "Active" : "Inactive"}
                        {data.daysLeft > 0 && !data.isActive
                          ? " (Wait for admin approval)"
                          : ""}
                      </span>
                    </p>
                    {data.screenshot && (
                      <div className="mt-2">
                        <strong>Payment Screenshot:</strong>
                        <div className="mt-1">
                          <Image
                            width={80}
                            src={data.screenshot}
                            alt="Payment Screenshot"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="bg-white rounded text-center">
                <div className="py-5">
                  <h4>No Subscription Found</h4>
                  <p className="text-muted">
                    You don't have any active subscription.
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* View Subscription Modal */}
      <Modal
        title="Subscription Details"
        open={viewModalVisible}
        onCancel={closeViewModal}
        footer={null}
        width={600}
      >
        {selectedSubscription && (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Plan Name">
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
              {dayjs(selectedSubscription.endDate).format("YYYY-MM-DD")}
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

      {/* Add Subscription Drawer */}
      <Drawer
        title="Add New Subscription"
        placement="right"
        onClose={closeAddDrawer}
        open={isAddDrawerVisible}
        width={600}
        className="custom-drawer"
      >
        <Form layout="vertical" form={form}>
          <div className="row">
            <div className="col-12">
              <Form.Item
                name="planName"
                label="Plan Name"
                rules={[{ required: true, message: "Plan name is required" }]}
              >
                <Select
                  placeholder="Select a plan"
                  value={newSubscription.planName}
                  onChange={handlePlanChange}
                  style={{ width: "100%" }}
                >
                  <Select.Option value="Free Plan">Free Plan</Select.Option>
                  <Select.Option value="Standard Plan">
                    Standard Plan
                  </Select.Option>
                  <Select.Option value="Premium Plan">
                    Premium Plan
                  </Select.Option>
                </Select>
              </Form.Item>
            </div>

            <div className="col-12 mt-3 ">
              <Form.Item
                name="price"
                label="Price"
                rules={[
                  { required: true, message: "Price is required" },
                  { type: "number", min: 0, message: "Price must be positive" },
                ]}
              >
                <InputNumber
                  style={{ width: "100%", color: "black" }}
                  min={0}
                  step={0.01}
                  value={newSubscription.price}
                  onChange={(value) => handleNumberChange("price", value)}
                  disabled={isPlanAutoFilled}
                />
              </Form.Item>
            </div>

            <div className="col-12 mt-3">
              <Form.Item
                name="candidateLimit"
                label="Application Limit"
                rules={[
                  { required: true, message: "Application Limit is required" },
                  { type: "number", min: 0, message: "Limit must be positive" },
                ]}
              >
                <InputNumber
                  style={{ width: "100%", color: "black" }}
                  min={0}
                  value={newSubscription.candidateLimit}
                  onChange={(value) =>
                    handleNumberChange("candidateLimit", value)
                  }
                  disabled={isPlanAutoFilled}
                />
              </Form.Item>
            </div>

            <div className="col-12 mt-3">
              <Form.Item
                name="jobLimit"
                label="Job Post Limit"
                rules={[
                  { required: true, message: "Job Post Limit is required" },
                  { type: "number", min: 0, message: "Limit must be positive" },
                ]}
              >
                <InputNumber
                  style={{ width: "100%", color: "black" }}
                  min={0}
                  value={newSubscription.jobLimit}
                  onChange={(value) => handleNumberChange("jobLimit", value)}
                  disabled={isPlanAutoFilled}
                />
              </Form.Item>
            </div>

            <div className="col-12 mt-3">
              <Form.Item
                name="endDate"
                label="Expiry Date"
                rules={[{ required: true, message: "End date is required" }]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  value={
                    newSubscription.endDate
                      ? dayjs(newSubscription.endDate)
                      : null
                  }
                  onChange={(_, dateString) => handleDateChange(_, dateString)}
                  disabled={isPlanAutoFilled}
                  format="YYYY-MM-DD"
                  className="custom-date"
                />
              </Form.Item>
              <style>
                {`
    .custom-date input {
      color: black !important;
    }
  `}
              </style>
            </div>

            <div className="col-12 mt-3">
              <div
                style={{
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  padding: "20px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <h4
                  style={{
                    marginBottom: "15px",
                    color: "#333",
                    textAlign: "center",
                  }}
                >
                  QR CODE
                </h4>

                <div
                  style={{ display: "flex", flexDirection: "column", gap: 20 }}
                >
                  <div style={{ flex: "0 0 auto" }}>
                    <img
                      src={qrcode}
                      alt="QR code"
                      style={{
                        width: "600px",
                        height: "500px",
                        border: "2px solid #ddd",
                        borderRadius: "8px",
                      }}
                    />
                  </div>

                  <div style={{ flex: "1", paddingLeft: "10px" }}>
                    <h5 style={{ marginBottom: "10px", color: "#333" }}>
                      Bank Details
                    </h5>
                    <div style={{ lineHeight: "1.6", color: "#555" }}>
                      <p style={{ margin: "5px 0" }}>
                        <strong>Account Name:</strong> Believe Jobs
                      </p>
                      <p style={{ margin: "5px 0" }}>
                        <strong>Bank:</strong> SBI (State Bank of India)
                      </p>
                      <p style={{ margin: "5px 0" }}>
                        <strong>Account Number:</strong> 44182717045
                      </p>
                      <p style={{ margin: "5px 0" }}>
                        <strong>IFSC Code:</strong> SBIN0000913
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 mt-3">
              <Form.Item
                name="transactionId"
                label="Transaction ID"
                rules={[
                  { required: true, message: "Transaction ID is required" },
                ]}
              >
                <Input
                  placeholder="Enter transaction ID"
                  value={newSubscription.transactionId}
                  onChange={(e) =>
                    setNewSubscription((prev) => ({
                      ...prev,
                      transactionId: e.target.value,
                    }))
                  }
                />
              </Form.Item>
            </div>

            <div className="col-12 mt-3">
              <Form.Item
                name="screenshot"
                label="Payment Screenshot"
                rules={[
                  { required: true, message: "Payment screenshot is required" },
                ]}
              >
                <Upload
                  beforeUpload={(file) => {
                    // Validate file type
                    const isImage = file.type.startsWith("image/");
                    if (!isImage) {
                      toast.error("Please upload an image file only!");
                      return false;
                    }

                    // Validate file size (max 5MB)
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
                {newSubscription.screenshot && (
                  <div className="mt-2">
                    <Image
                      width={100}
                      src={newSubscription.screenshot}
                      alt="Payment Screenshot"
                    />
                    <p className="text-success mt-1">
                      ✓ Screenshot uploaded successfully
                    </p>
                  </div>
                )}
              </Form.Item>
            </div>

            <div className="col-12 mt-3">
              <button
                type="button"
                onClick={handleAddSubmit}
                className="button h-50 px-24 -black-1  text-white w-100"
                style={{ backgroundColor: "#004080" }}
              >
                Add Subscription
              </button>
            </div>
          </div>
        </Form>
      </Drawer>
    </div>
  );
}

export default SubscriptionList;
