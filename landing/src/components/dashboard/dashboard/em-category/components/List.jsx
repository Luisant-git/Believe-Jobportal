import React, { useState, useEffect } from "react";
import {
  Input,
  Table,
  Button,
  Pagination,
  Modal,
  Spin,
  Descriptions,
  Drawer,
  Form,
} from "antd";
import { FaTrash, FaEye, FaPlus, FaRegEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  createJobCategory,
  getJobCategoriesByUser,
  updateJobCategory,
  deleteJobCategory,
} from "@/api/em-category";
import { userDisplayName } from "@/utils/common";

const { Search } = Input;

function CategoryList() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isAddDrawerVisible, setIsAddDrawerVisible] = useState(false);
  const [isEditDrawerVisible, setIsEditDrawerVisible] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  });
  
  const pageSize = 5;
  


  
  const fetchCategories = (searchValue = searchTerm) => {
    const userId = localStorage.getItem("userId")
    if (!userId) return;


    
    setLoading(true);
    getJobCategoriesByUser(userId, {
      page: currentPage,
      limit: pageSize,
      ...(searchValue && { search: searchValue }),
    })
      .then((response) => {
        setData(response?.data || []);
        setTotalItems(response?.meta?.total || response?.total || 0);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        toast.error("Error fetching categories");
      })
      .finally(() => setLoading(false));
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
    fetchCategories(value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const confirmDelete = () => {
    const userId = localStorage.getItem("userId")

    if (!userId || !categoryToDelete) return;
    
    deleteJobCategory(categoryToDelete, userId)
      .then((response) => {
        if (response.success) {
          toast.success("Category deleted successfully");
          fetchCategories();
        } else {
          toast.error(response.message || "Failed to delete category");
        }
      })
      .catch((error) => {
        toast.error("Error deleting category");
        console.error("Delete error:", error);
      })
      .finally(() => {
        setIsDeleteModalVisible(false);
        setCategoryToDelete(null);
      });
  };

  const cancelDelete = () => {
    setIsDeleteModalVisible(false);
    setCategoryToDelete(null);
  };

  const showDeleteModal = (id) => {
    setCategoryToDelete(id);
    setIsDeleteModalVisible(true);
  };

  const showCategoryDetails = (category) => {
    setSelectedCategory(category);
    setViewModalVisible(true);
  };

  const closeViewModal = () => {
    setViewModalVisible(false);
    setSelectedCategory(null);
  };

  const showAddDrawer = () => {
    setIsAddDrawerVisible(true);
  };

  const closeAddDrawer = () => {
    setIsAddDrawerVisible(false);
    setNewCategory({
      name: "",
      description: "",
    });
  };

  const handleNewCategoryChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddSubmit = () => {
    const userId = localStorage.getItem("userId")
    if (!newCategory.name) {
      toast.error("Category name is required");
      return;
    }



    if (!userId) {
      toast.error("User ID is missing");
      return;
    }
    
    createJobCategory(userId, newCategory)
      .then((response) => {
        if (response.success) {
          toast.success("Category added successfully");
          fetchCategories();
          closeAddDrawer();
        } else {
          toast.error(response.message || "Failed to add category");
        }
      })
      .catch((error) => {
        console.error("Error adding category:", error);
        toast.error("Error adding category");
      });
  };

  const showEditDrawer = (category) => {
    setEditCategory({
      id: category.id,
      name: category.name,
      description: category.description,
     
    });
    setIsEditDrawerVisible(true);
  };

  const closeEditDrawer = () => {
    setIsEditDrawerVisible(false);
    setEditCategory(null);
  };

  const handleEditCategoryChange = (e) => {
    const { name, value } = e.target;
    setEditCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = () => {
    const userId = localStorage.getItem("userId")

    if (!editCategory?.name) {
      toast.error("Category name is required");
      return;
    }

    if (!userId || !editCategory?.id) {
      toast.error("Missing required information");
      return;
    }

    const updatePayload = {
      name: editCategory.name,
      description: editCategory.description,
    };

    updateJobCategory(editCategory.id, userId, updatePayload)
      .then((response) => {
        if (response?.success) {
          toast.success("Category updated successfully");
          fetchCategories();
          closeEditDrawer();
        } else {
          toast.error(response?.message || "Failed to update category");
        }
      })
      .catch((error) => {
        console.error("Error updating category:", error);
        toast.error("Error updating category");
      });
  };

  useEffect(() => {
    fetchCategories()
  }, [currentPage, searchTerm]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => text || "No description",
    },
    // {
    //   title: "CreatedAt",
    //   dataIndex: "createdAt",
    //   key: "createdAt",
     
      
    // },
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
          {/* <Button
            icon={<FaEye />}
            onClick={() => showCategoryDetails(record)}
          /> */}
           <Button
                      type="link"
                      icon={<FaEye />}
                      onClick={() => showCategoryDetails(record)}
                    />

<Button
            icon={<FaRegEdit />}
            onClick={() => showEditDrawer(record)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="container-fluid">
      <div className="row y-gap-10 justify-between items-end pb-30 lg:pb-30 md:pb-32">
        <div className="col-12 d-flex align-item-center justify-content-between bg-white rounded p-3">
          <h1 style={{color: '#004080'}} className="text-20 lh-14 fw-600">Job Categories</h1>
          <div className="d-flex gap-2">
            <Search
              placeholder="Search categories"
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
              Add Category
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

      <Modal
        title="Delete Category Permanently"
        open={isDeleteModalVisible}
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
        styles={{
          padding: "20px",
        }}
        style={{
          top: "20%",
        }}
      >
        <p>Are you sure you want to permanently delete this category? This action cannot be undone.</p>
      </Modal>

      {/* View Category Modal */}
      <Modal
        title="Category Details"
        open={viewModalVisible}
        onCancel={closeViewModal}
        footer={null}
        width={600}
      >
        {selectedCategory && (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Name">
              {selectedCategory.name}
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              {selectedCategory.description || "No description"}
            </Descriptions.Item>
            {/* <Descriptions.Item label="Created By">
              {selectedCategory.createdBy}
            </Descriptions.Item> */}
          </Descriptions>
        )}
      </Modal>

      {/* Add Category Drawer */}
      <Drawer
        title="Add New Job Category"
        placement="right"
        onClose={closeAddDrawer}
        open={isAddDrawerVisible}
        width={600}
        className="custom-drawer"
      >
        <Form layout="vertical">
          <div className="row">
            <div className="col-12">
              <Form.Item
                name="name"
                label="Category Name"
                rules={[
                  { required: true, message: "Category name is required" },
                ]}
              >
                <div className="form-input">
                  <input
                    type="text"
                    name="name"
                    value={newCategory.name}
                    onChange={handleNewCategoryChange}
                    required
                  />
                  <label className="lh-1 text-16 text-light-1">
                    Category Name *
                  </label>
                </div>
              </Form.Item>
            </div>

            <div className="col-12 mt-3">
              <Form.Item name="description" label="Description">
                <div className="form-input">
                  <textarea
                    name="description"
                    rows={4}
                    value={newCategory.description}
                    onChange={handleNewCategoryChange}
                  />
                  <label className="lh-1 text-16 text-light-1">
                    Description
                  </label>
                </div>
              </Form.Item>
            </div>

            <div className="col-12 mt-3">
             <button
  type="button"
  onClick={handleAddSubmit}
  className="button h-50 px-24 -black-1 text-white w-100"
  style={{ backgroundColor: "#004080", fontWeight: "bold" }}
>
  Add Category
</button>

            </div>
          </div>
        </Form>
      </Drawer>

      {/* Edit Category Drawer */}
      <Drawer
        title="Edit Job Category"
        placement="right"
        onClose={closeEditDrawer}
        open={isEditDrawerVisible}
        width={600}
        className="custom-drawer"
      >
        <Form layout="vertical">
          <div className="row">
            <div className="col-12">
              <Form.Item
                name="name"
                label="Category Name"
                rules={[
                  { required: true, message: "Category name is required" },
                ]}
              >
                <div className="form-input">
                  <input
                    type="text"
                    name="name"
                    value={editCategory?.name || ""}
                    onChange={handleEditCategoryChange}
                    required
                  />
                  <label className="lh-1 text-16 text-light-1">
                    Category Name *
                  </label>
                </div>
              </Form.Item>
            </div>

            <div className="col-12 mt-3">
              <Form.Item name="description" label="Description">
                <div className="form-input">
                  <textarea
                    name="description"
                    rows={4}
                    value={editCategory?.description || ""}
                    onChange={handleEditCategoryChange}
                  />
                  <label className="lh-1 text-16 text-light-1">
                    Description
                  </label>
                </div>
              </Form.Item>
            </div>

            <div className="col-12 mt-3">
              <button
                type="button"
                onClick={handleEditSubmit}
                className="button h-50 px-24 -black-1  text-white w-100"
                 style={{ backgroundColor: "#004080", fontWeight: "bold" }}
              >
                Update Category
              </button>
            </div>
          </div>
        </Form>
      </Drawer>
    </div>
  );
}

export default CategoryList;