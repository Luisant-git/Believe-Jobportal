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
  Typography,
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
import { getJobs, deleteJob, getFilter, updateJobsToggleActive } from "@/api/job";
import axios from "axios";
// import { userDisplayName } from "@/utils/common";
import ModalList from "./ModalList";
import { render } from "react-dom";
const { Search } = Input;

function JobList() {
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

  const pageSize = 25;
  const jobTypes = [
    "full_time",
    "part_time",
    "contract",
    "internship",
    "temporary",
  ];
  const statusOptions = ["open", "closed"];

  const getlist = () => {
    setLoading(true);
    const params = {
      page: currentPage,
      limit: pageSize,
      ...(searchTerm && { q: searchTerm }),
      ...(filters.remote !== undefined && { remote: filters.remote }),
      ...(filters.approved !== undefined && { approved: filters.approved }),
      ...(filters.jobType && { jobType: filters.jobType }),
      ...(filters.status && { status: filters.status }),
    };

    const apiCall = searchTerm ? getFilter : getJobs;

    apiCall(params)
      .then((res) => {

        setData(res?.data || []);
        setTotalItems(res.data?.meta?.total || res.data?.total || 0);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleSearch = () => {
    setCurrentPage(1);
    getlist();
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

  const applyFilters = () => {
    setDrawerVisible(false);
    setCurrentPage(1);
    getlist();
  };

  useEffect(() => {
    getlist();
  }, [filters]);

  const confirmDelete = async () => {
    try {
      await deleteJob(jobToDelete);
      toast.success("Job deleted successfully");
      getlist();
    } catch (error) {
      toast.error("Error deleting job");
      console.error("Delete error:", error);
    } finally {
      setIsDeleteModalVisible(false);
      setJobToDelete(null);
    }
  };

  const handleStatusChange = async (id, isactive) => {
    const newStatus = isactive ? "open" : "closed";
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/jobs/${id}/status`,
        { status: newStatus }
      );
      if (response) {
        await getlist();
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update job status");
    }
  };

  const handleToggleActive = async (id) => {
    try {
      await updateJobsToggleActive(id);
      toast.success("Job active status updated successfully");
      getlist();
    } catch (error) {
      toast.error("Error updating job active status");
      console.error("Toggle active error:", error);
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
    // eslint-disable-next-line
  }, [currentPage]);

  useEffect(() => {
    getlist();
  }, []);

  const columns = [
    {
      title: "Display Home",
      dataIndex: "isActive",
      key: "isActive",
      align: "center",
      render: (isActive, record) => (
        <Switch
          checked={isActive}
          onChange={() => handleToggleActive(record.id)}
          checkedChildren="Yes"
          unCheckedChildren="No"
        />
      ),
    },
    {
      title: "Job Code",
      dataIndex: "jobCode",
      key: "jobCode",
      align: "center",
      render: (text) => (
        <Text
          strong
          style={{
            fontSize: "15px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100%",
          }}
          title={text} // shows full text on hover
        >
          {text}
        </Text>
      ),
    },
    {
      title: "Job Title",
      dataIndex: "title",
      key: "title",
      width: 200,
      align: "left",
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center", minHeight: 40 }}>
          <Text
            strong
            style={{
              fontSize: "15px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "100%",
            }}
            title={record?.title} // shows full text on hover
          >
            {record?.title}
          </Text>
        </div>
      ),
    },
    {
      title: "Company",
      dataIndex: "companyName",
      render: (_, record) => (
        <span>{record?.companyDetails?.companyName}</span>
      ),
      align: "center",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (text) => <span>{text}</span>,
      align: "center",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (_, record) => <span>{record?.category?.name}</span>,
      align: "center",
    },
    // {
    //   title: "CreatedBy",
    //   dataIndex: "createdBy",
    //   key: "createdBy",
    //   render: (_, record) => (
    //     <span>{userDisplayName(record?.createdBy)}</span>
    //   ),
    //   align: "center",
    // },
    {
      title: "Remote",
      dataIndex: "remote",
      key: "remote",
      render: (_, record) => (
        <>
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
                borderRadius: "4px",
                backgroundColor: "#2e55fa",
                color: "white",
              }}
            >
              Remote
            </span>
          )}
        </>
      ),
      align: "center",
    },
    {
      title: "Salary",
      dataIndex: "salaryRange",
      key: "salaryRange",
      align: "center",
    },
    {
      title: "Job Type",
      dataIndex: "type",
      key: "type",
      render: (text) => (
        <Tag color="success">{text?.toUpperCase().replace(/_/g, " ")}</Tag>
      ),
      align: "center",
    },
    {
      title: "Positions",
      dataIndex: "numberOfPositions",
      key: "numberOfPositions",
      render: (_, record) => (
        <Tag color="orange">{record?.numberOfPositions}</Tag>
      ),
      align: "center",
    },
    {
      title: "Applications",
      dataIndex: "applicationCount",
      key: "applicationCount",
      render: (_, record) => (
        <Tag color="blue">{record?.applicationCount || 0}</Tag>
      ),
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status, record) => {
        const isactive = status === "open";
        return (
          <Popconfirm
            title={`Are you sure you want to ${
              isactive ? "close" : "open"
            } this job?`}
            onConfirm={() => handleStatusChange(record.id, !isactive)}
            onCancel={() => {}}
            okText="Yes"
            cancelText="No"
          >
            <Switch
              checked={isactive}
              checkedChildren="opened"
              unCheckedChildren="closed"
              style={{
                backgroundColor: isactive ? "#52c41a" : "#f5222d",
              }}
            />
          </Popconfirm>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
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
            onClick={() => showJobDetails(record)}
          />
          <Link to={`/dashboard/db-job/editjob/${record.id}`}>
            <Button icon={<FaRegEdit />} />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: "0 15px" }}>
      {/* Custom Drawer */}
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
              <h3 style={{ color:'#004080',margin: 0, fontSize: "20px", fontWeight: 500 }}>
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

              {/* <div style={{ marginBottom: "16px", position: "relative" }}>
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
              </div> */}

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

              {/* <div style={{ marginBottom: "16px", position: "relative" }}>
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
              </div> */}
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
                  padding: "14px 24px",
                  fontSize: "16px",
                  borderRadius: "6px",
                  border: "1px solid #004080",
                  background: "#fff",
                  color: "#004080",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Clear Filter
              </button>
              <button
                onClick={applyFilters}
                style={{
                  padding: "14px 24px",
                  fontSize: "16px",
                  borderRadius: "6px",
                  border: "none",
                  background: "#004080",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Apply Filter
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
              style={{ fontSize: "20px", lineHeight: "14px", fontWeight: 600, color:'#004080' }}
            >
              Jobs
            </h1>
            <div style={{ display: "flex", gap: "8px" }}>
              <Search
                placeholder="Search jobs"
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
                icon={<FaFilter />}
                onClick={() => setDrawerVisible(true)}
              >
                Filters
              </Button>
              <Link to="/dashboard/db-job/addjob">
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

export default JobList;