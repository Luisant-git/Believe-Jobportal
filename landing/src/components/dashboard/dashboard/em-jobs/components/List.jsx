import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Input,
  Table,
  Button,
  Pagination,
  Modal,
  Spin,
  Descriptions,
  Popconfirm,
  Switch,
  Tag,
} from "antd";
import {
  FaTrash,
  FaEye,
  FaFilter,
  FaPlus,
  FaTimes,
  FaRegEdit,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { getEmployerJobs, deleteJob, updateJob } from "@/api/em-jobs";
import axios from "axios";
import { userDisplayName } from "@/utils/common";
import { Typography } from "antd";
import ModalList from "./ModalList";
import { getAuthData } from "@/utils/auth";

const { Search } = Input;

function EmployerJobList() {
  const { user } = getAuthData();
  const userId = localStorage.getItem("userId");
  const { Text } = Typography;
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [filters, setFilters] = useState({
    remote: undefined,
    approved: undefined,
    jobType: "",
    status: "",
  });
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const pageSize = 5;
  const jobTypes = [
    "full_time",
    "part_time",
    "contract",
    "internship",
    "temporary",
  ];
  const statusOptions = ["open", "closed"];

  const getlist = async () => {
    setLoading(true);

    await getEmployerJobs(userId)
      .then((res) => {

        setData(res || []);
        // setTotalItems(res.data?.meta?.total || res.data?.total || 0);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log("error message log : ", err);
        toast.error(
          errorData?.message || err.message || "Something went wrong"
        );
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      remote: undefined,
      approved: undefined,
      jobType: "",
      status: "",
    });
    setSearchTerm("");
    setCurrentPage(1);
  };

  const confirmDelete = async () => {
    try {
      await deleteJob(userId, jobToDelete);
      toast.success("Job moved to trash successfully");
      getlist();
    } catch (error) {
      toast.error("Error moving job to trash");
      console.error("Delete error:", error);
    } finally {
      setIsDeleteModalVisible(false);
      setJobToDelete(null);
    }
  };

  const handleStatusChange = async (id, isActive) => {
    const newStatus = isActive ? "open" : "closed";
    try {
      await updateJob(userId, id, { status: newStatus });
      toast.success("Job status updated successfully");
      getlist();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update job status");
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalVisible(false);
    setJobToDelete(null);
  };

  const showDeleteModal = (id) => {
    setJobToDelete(id);
    setIsDeleteModalVisible(true);
  };

  const showJobDetails = (job) => {
    setSelectedJob(job);
    setViewModalVisible(true);
  };

  const closeViewModal = () => {
    setViewModalVisible(false);
    setSelectedJob(null);
  };

  useEffect(() => {
    getlist();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getlist();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const columns = [
    {
      title: "Job Code",
      dataIndex: "jobCode",
      key: "jobCode",
      width: 100,
      align: "center",
      render: (text) => <Text strong>{text}</Text>
    },
    {
      title: "Job Title",
      dataIndex: "title",
      key: "title",
      width: 150,
      align: "center",
      render: (text, record) => (
        <>
          <Text strong> {record?.title}</Text>
        </>
      ),
    },
    {
      title: "Company",
      dataIndex: "companyName",
      width: 130,
      align: "center",
      render: (text, record) => (
        <span>{record?.companyDetails?.companyName}</span>
      ),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      width: 90,
      align: "center",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 120,
      align: "center",
      render: (text, record) => <span>{record?.category?.name}</span>,
    },
    // {
    //   title: "CreatedBy",
    //   dataIndex: "createdAt",
    //   key: "createdAt",
    //   render: (text, record) => (
    //     <span>{userDisplayName(record?.createdBy)}</span>
    //   ),
    // },
    {
      title: "Remote",
      dataIndex: "remote",
      key: "remote",
      width: 80,
      render: (text, record) => (
        <span>
          {record.remote && (
            <span
              style={{
                display: "inline-block",
                padding: "3px 8px",
                fontSize: "12px",
                fontWeight: 500,
                lineHeight: 1,
                textAlign: "center",
                whiteSpace: "nowrap",
                verticalAlign: "baseline",
                borderRadius: "4px",
                backgroundColor: "#2e55fa",
                color: "white",
              }}
            >
              Remote
            </span>
          )}
        </span>
      ),
    },
    {
      title: "Salary",
      dataIndex: "salaryRange",
      key: "salaryRange",
      width: 120,
    },
    {
      title: "Job Type",
      dataIndex: "type",
      key: "type",
      width: 90,
      render: (text) => (
        <Tag color="success">{text?.toUpperCase().replace(/_/g, " ")}</Tag>
      ),
    },
    {
      title: "Positions",
      dataIndex: "numberOfPositions",
      key: "numberOfPositions",
      width: 80,
      render: (text, record) => (
        <Tag color="orange">{record?.numberOfPositions}</Tag>
      ),
    },
    {
      title: "Applications",
      dataIndex: "applicationCount",
      key: "applicationCount",
      width: 110,
      render: (text, record) => (
        <Tag color="blue">{record?.applicationCount || 0}</Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 90,
      render: (status, record) => {
        const isActive = status === "open";
        return (
          <Popconfirm
            title={`Are you sure you want to ${
              isActive ? "close" : "open"
            } this job?`}
            onConfirm={() => handleStatusChange(record.id, !isActive)}
            onCancel={() => {}}
            okText="Yes"
            cancelText="No"
          >
            <Switch
              checked={isActive}
              checkedChildren="opened"
              unCheckedChildren="closed"
              style={{
                backgroundColor: isActive ? "#52c41a" : "#f5222d",
              }}
            />
          </Popconfirm>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      render: (_, record) => (
        <div style={{ display: "flex", gap: "1px" }}>
          <Button
            type="link"
            danger
            icon={<FaTrash />}
            onClick={() => showDeleteModal(record.id)}
          />
          <Button
            type="link"
            icon={<FaEye />}
            onClick={() => showJobDetails(record)}
          />
          <Link to={`/em-job/editjob/${record.id}`}>
            <Button
              icon={<FaRegEdit />}
              onClick={() => showEditDrawer(record)}
            />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: "0 15px" }}>
      {/* Filter Drawer */}
      {drawerVisible && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              width: "400px",
              height: "100%",
              background: "white",
              boxShadow: "-2px 0 8px rgba(0, 0, 0, 0.15)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                padding: "16px 24px",
                borderBottom: "1px solid #f0f0f0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 500 }}>
                Filter Jobs
              </h3>
              <button
                onClick={() => setDrawerVisible(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                <FaTimes />
              </button>
            </div>
            <div style={{ padding: "24px", flex: 1, overflowY: "auto" }}>
              <div style={{ marginBottom: "16px", position: "relative" }}>
                <select
                  value={filters.remote}
                  onChange={(e) =>
                    handleFilterChange("remote", e.target.value === "true")
                  }
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #d9d9d9",
                    borderRadius: "4px",
                    fontSize: "16px",
                  }}
                >
                  <option value="">Select Remote Status</option>
                  <option value="true">Remote</option>
                  <option value="false">On-site</option>
                </select>
                <label
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "10px",
                    background: "white",
                    padding: "0 5px",
                    fontSize: "12px",
                    color: "#888",
                  }}
                >
                  Remote Status
                </label>
              </div>

              <div style={{ marginBottom: "16px", position: "relative" }}>
                <select
                  value={filters.approved}
                  onChange={(e) =>
                    handleFilterChange("approved", e.target.value === "true")
                  }
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #d9d9d9",
                    borderRadius: "4px",
                    fontSize: "16px",
                  }}
                >
                  <option value="">Select Approval Status</option>
                  <option value="true">Approved</option>
                  <option value="false">Not Approved</option>
                </select>
                <label
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "10px",
                    background: "white",
                    padding: "0 5px",
                    fontSize: "12px",
                    color: "#888",
                  }}
                >
                  Approval Status
                </label>
              </div>

              <div style={{ marginBottom: "16px", position: "relative" }}>
                <select
                  value={filters.jobType}
                  onChange={(e) =>
                    handleFilterChange("jobType", e.target.value)
                  }
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #d9d9d9",
                    borderRadius: "4px",
                    fontSize: "16px",
                  }}
                >
                  <option value="">Select Job Type</option>
                  {jobTypes.map((type) => (
                    <option key={type} value={type}>
                      {type
                        .split("_")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </option>
                  ))}
                </select>
                <label
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "10px",
                    background: "white",
                    padding: "0 5px",
                    fontSize: "12px",
                    color: "#888",
                  }}
                >
                  Job Type
                </label>
              </div>

              <div style={{ marginBottom: "16px", position: "relative" }}>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #d9d9d9",
                    borderRadius: "4px",
                    fontSize: "16px",
                  }}
                >
                  <option value="">Select Status</option>
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
                <label
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "10px",
                    background: "white",
                    padding: "0 5px",
                    fontSize: "12px",
                    color: "#888",
                  }}
                >
                  Status
                </label>
              </div>
            </div>
            <div
              style={{
                padding: "10px 16px",
                borderTop: "1px solid #f0f0f0",
                display: "flex",
                justifyContent: "flex-end",
                gap: "8px",
              }}
            >
              <button
                onClick={resetFilters}
                style={{
                  padding: "8px 16px",
                  fontSize: "14px",
                  borderRadius: "4px",
                  border: "1px solid #d9d9d9",
                  background: "#fff",
                  cursor: "pointer",
                }}
              >
                Reset
              </button>
              <button
                onClick={applyFilters}
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
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

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
              style={{ fontSize: "20px", lineHeight: "14px", fontWeight: 600, color: '#004080' }}
            >
              My Jobs
            </h1>
            <div style={{ display: "flex", gap: "8px" }}>
              <Search
                placeholder="Search my jobs"
                allowClear
                enterButton="Search"
                size="large"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                // onSearch={handleSearch}
                style={{ maxWidth: "400px" }}
              />
              {/* <Button
                type="default"
                size="large"
                icon={<FaFilter />}
                onClick={() => setDrawerVisible(true)}
              >
                Filters
              </Button> */}
              <Link to="/em-job/addjob">
                <Button type="primary" size="large" icon={<FaPlus />}>
                  Add Job
                </Button>
              </Link>
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
                scroll={{ x: 'max-content', y: 400 }}
                size="small"
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
        title="Delete Job"
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
        styles={{
          padding: "20px",
        }}
        style={{
          top: "20%",
        }}
      >
        <p>Are you sure you want to delete this job?</p>
      </Modal>

      <ModalList
        viewModalVisible={viewModalVisible}
        closeViewModal={closeViewModal}
        selectedJob={selectedJob}
      />
    </div>
  );
}

export default EmployerJobList;
