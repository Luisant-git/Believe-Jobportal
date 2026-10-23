import React, { useState, useEffect } from "react";
import {
  Input,
  Table,
  Button,
  Pagination,
  Modal,
  Spin,
  Drawer,
  Form,
  Switch,
  message,
} from "antd";
import {
  FaTrash,
  FaEye,
  FaPlus,
  FaRegEdit,
} from "react-icons/fa";
import { toast } from "react-toastify";
import {
  getBanner,
  deleteBanner,
  createBanner,
  getBannerById,
  updateBanner,
  updateBannerToggleActive,
} from "@/api/banner";
import Dragger from "antd/es/upload/Dragger";
import { InboxOutlined } from "@ant-design/icons";
import { Upload } from "@/api/upload";

const { Search } = Input;

function BannerList() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState(null);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [pdf, setPDF] = useState(null);
  const [fileList, setFileList] = useState(null);

  const [drawerState, setDrawerState] = useState({
    visible: false,
    isEditMode: false,
    bannerId: null,
  });

  const [formValues, setFormValues] = useState({
    name: "",
    isActive: false,
  });

  const [form] = Form.useForm();

  const pageSize = 25;

  const fetchBanners = () => {
    setLoading(true);
    getBanner({
      page: currentPage,
      limit: pageSize,
      search: searchTerm,
    })
      .then((response) => {
        setData(response?.data || []);
        setTotalItems(
          response?.data?.meta?.total || response?.data?.total || 0
        );
      })
      .catch((error) => {
        console.error("Error fetching banners:", error);
        toast.error("Error fetching banners");
      })
      .finally(() => setLoading(false));
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
    fetchBanners();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchBanners();
  };

  const confirmDelete = () => {
    deleteBanner(bannerToDelete)
      .then(() => {
        toast.success("Banner deleted successfully");
        fetchBanners();
      })
      .catch((error) => {
        toast.error("Error deleting banner");
        console.error("Delete error:", error);
      })
      .finally(() => {
        setIsDeleteModalVisible(false);
        setBannerToDelete(null);
      });
  };

  const cancelDelete = () => {
    setIsDeleteModalVisible(false);
    setBannerToDelete(null);
  };

  const showDeleteModal = (id) => {
    setBannerToDelete(id);
    setIsDeleteModalVisible(true);
  };

  const showBannerDetails = async (id) => {
    try {
      const response = await getBannerById(id);
      setSelectedBanner(response.data);
      setViewModalVisible(true);
    } catch (error) {
      toast.error("Error fetching banner details");
      console.error("Error:", error);
    }
  };

  const closeViewModal = () => {
    setViewModalVisible(false);
    setSelectedBanner(null);
  };

  const showAddDrawer = () => {
    setFormValues({
      name: "",
      isActive: false,
    });

    setDrawerState({
      visible: true,
      isEditMode: false,
      bannerId: null,
    });
    form.resetFields();
    setFileList(null);
    setPDF(null);
  };

  const showEditDrawer = async (banner) => {
    try {
      const response = await getBannerById(banner.id);
      const bannerData = response.data;

      setFormValues({
        name: bannerData.name || "",
        isActive: bannerData.isActive || false,
      });

      form.setFieldsValue({
        name: bannerData.name,
        isActive: bannerData.isActive,
      });

      if (bannerData.image) {
        setFileList([
          {
            uid: "-1",
            name: "banner-image.png",
            status: "done",
            url: bannerData.image,
          },
        ]);
      } else {
        setFileList([]);
      }

      setDrawerState({
        visible: true,
        isEditMode: true,
        bannerId: banner.id,
      });
    } catch (error) {
      toast.error("Error loading banner data");
      console.error("Error:", error);
    }
  };

  const closeDrawer = () => {
    setDrawerState({
      visible: false,
      isEditMode: false,
      bannerId: null,
    });
    form.resetFields();
    setFileList(null);
    setPDF(null);
  };

  const uploadProps = {
    name: "file",
    multiple: false,
    fileList: fileList,
    accept: ".jpg,.jpeg,.png,.gif,.webp",
    beforeUpload: (file) => {
      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp'
      ];
      
      const isAllowedType = allowedTypes.includes(file.type);
      const isLt5M = file.size / 1024 / 1024 < 5;
      
      if (!isAllowedType) {
        message.error("You can only upload JPG, JPEG, PNG, GIF, or WEBP files!");
        return false;
      }
      
      if (!isLt5M) {
        message.error("Image must be smaller than 5MB!");
        return false;
      }
      
      setPDF(file);
      setFileList([{
        uid: file.uid,
        name: file.name,
        status: "done",
        originFileObj: file
      }]);
      
      return false;
    },
    onRemove() {
      setFileList([]);
      setPDF(null);
    },
  };

  const handleInputChange = (field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
    form.setFieldsValue({ [field]: value });
  };

  const handleToggleActive = async (id, currentStatus) => {
    try {
      await updateBannerToggleActive(id, { isActive: !currentStatus });
      toast.success("Banner status updated successfully");
      fetchBanners();
    } catch (error) {
      toast.error("Error updating banner status");
      console.error("Toggle error:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      
      if (!formValues.name || formValues.name.trim() === "") {
        toast.error("Banner name is required");
        return;
      }

      if (!drawerState.isEditMode && !pdf) {
        toast.error("Please upload an image");
        return;
      }

      const values = { 
        name: formValues.name.trim(),
        isActive: formValues.isActive 
      };

      if (pdf) {
        const uploadResponse = await Upload(pdf);
        values.image = uploadResponse.urls[0];
      } else if (drawerState.isEditMode && fileList && fileList.length > 0) {
        values.image = fileList[0].url;
      }

      if (drawerState.isEditMode) {
        await updateBanner(drawerState.bannerId, values);
        toast.success("Banner updated successfully");
      } else {
        await createBanner(values);
        toast.success("Banner created successfully");
      }

      fetchBanners();
      closeDrawer();
    } catch (error) {
      console.error("Error:", error);
      const errorMessage =
        error.response?.data?.message ||
        (drawerState.isEditMode
          ? "Error updating banner"
          : "Error creating banner");
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, [currentPage, searchTerm]);

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img
          src={image || "https://via.placeholder.com/50"}
          alt="Banner"
          style={{
            width: "50px",
            height: "50px",
            objectFit: "cover",
            borderRadius: "4px",
          }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive, record) => (
        <Switch
          checked={isActive}
          onChange={() => handleToggleActive(record.id, isActive)}
          checkedChildren="Active"
          unCheckedChildren="Inactive"
        />
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
            onClick={() => showBannerDetails(record.id)}
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
              style={{ fontSize: "20px", lineHeight: "14px", fontWeight: 600, color: '#004080'}}
            >
              Banners
            </h1>
            <div style={{ display: "flex", gap: "8px" }}>
              <Search
                placeholder="Search banners"
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
                Add Banner
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
        title="Delete Banner Permanently"
        visible={isDeleteModalVisible}
        onOk={confirmDelete}
        onCancel={cancelDelete}
        okText="Delete Permanently"
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
        <p>Are you sure you want to permanently delete this banner? This action cannot be undone.</p>
      </Modal>

      <Modal
        title="Banner Details"
        visible={viewModalVisible}
        onCancel={closeViewModal}
        footer={null}
        width={500}
        bodyStyle={{
          padding: "20px",
        }}
        style={{
          top: "20px",
        }}
      >
        {selectedBanner && (
          <div className="bootstrap-modal-content">
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              {selectedBanner.image && (
                <img
                  src={selectedBanner.image}
                  alt="Banner"
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                    border: "1px solid #eee",
                    borderRadius: "8px",
                  }}
                />
              )}
              <h2 style={{ marginTop: "10px" }}>{selectedBanner.name}</h2>
              <p>
                Status:{" "}
                <span
                  style={{
                    color: selectedBanner.isActive ? "#52c41a" : "#ff4d4f",
                    fontWeight: "bold",
                  }}
                >
                  {selectedBanner.isActive ? "Active" : "Inactive"}
                </span>
              </p>
              {/* <p>Created: {new Date(selectedBanner.createdAt).toLocaleString()}</p> */}
            </div>
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
                  background: "#004080",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      <Drawer
        title={drawerState.isEditMode ? "Edit Banner" : "Add New Banner"}
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
                name="name"
                rules={[
                  { required: true, message: "Banner name is required" },
                  { min: 1, message: "Banner name cannot be empty" }
                ]}
              >
                <div className="form-input">
                  <input
                    type="text"
                    value={formValues.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                  <label className="lh-1 text-16 text-light-1">
                    Banner Name *
                  </label>
                </div>
              </Form.Item>
            </div>

            <div className="col-12 mt-3">
              <Form.Item 
                name="image" 
                label="Banner Image"
                rules={[
                  { 
                    required: !drawerState.isEditMode, 
                    message: "Please upload an image" 
                  }
                ]}
              >
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
                   You can only upload JPG, JPEG, PNG, GIF, or WEBP files! Maximum file size: 5MB.
                  </p>
                </Dragger>
              </Form.Item>
            </div>

            <div className="col-12 mt-3">
              <Form.Item name="isActive" valuePropName="checked">
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Switch
                    checked={formValues.isActive}
                    onChange={(checked) => handleInputChange("isActive", checked)}
                  />
                  <label className="lh-1 text-16 text-light-1">Active Status</label>
                </div>
              </Form.Item>
            </div>

            <div className="col-12 mt-3">
              <button
  type="submit"
  className="button h-50 px-24 -black-1 text-white w-100"
  style={{ backgroundColor: "#004080", fontWeight: "bold" }}
>
  {drawerState.isEditMode ? "Update Poster" : "Create Poster"}
</button>

            </div>
          </div>
        </Form>
      </Drawer>
    </div>
  );
}

export default BannerList;
