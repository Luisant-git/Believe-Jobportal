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
  Upload,
  message,
  Tag,
  Switch,
  Popconfirm,
  Avatar,
} from "antd";
import { FaEye, FaPlus, FaRegEdit, FaFilePdf, FaTrash, FaDownload } from "react-icons/fa";
import { toast } from "react-toastify";
import * as XLSX from 'xlsx';
import { InboxOutlined, UserOutlined } from "@ant-design/icons";
import {
  createJobSeekerApi,
  deleteJobSeekerApi,
  softDeleteJobSeekerApi,
  getJobSeekerApi,
  getJobSeekerByIdApi,
  updateJobSeekerApi,
  updateStatusApi,
  createJobSeekerWithoutPasswordApi,
} from "@/api/jobseeker";
import axios from "axios";
import dayjs from "dayjs";
import { userDisplayName } from "@/utils/common";
import ModalList from "./ModalList";
import RestoreComponent from "../../common/RestoreJobSeeker";

const { Search } = Input;
const { Dragger } = Upload;

function JobSeekerList() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedJobSeeker, setSelectedJobSeeker] = useState(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [pdf, setPDF] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [mode, setMode] = useState("create");
  const [restoreModalVisible, setRestoreModalVisible] = useState(false);

  const [jobSeekerData, setJobSeekerData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    skills: "",
    experience: "",
    education: "",
    resume: "",
    city: "",
    highestEducation: "",
    userId: "",
  });

  const pageSize = 25;

  const fetchJobSeekers = async () => {
    setLoading(true);
    try {
      const response = await getJobSeekerApi({
        page: parseInt(currentPage),
        limit: parseInt(pageSize),
        ...(searchTerm && { search: searchTerm }),
      });

      const tableData = Array.isArray(response.data.data)
        ? response.data.data
        : [];
      setData(tableData);
      setTotalItems(response.data.total || 0);
    } catch (error) {
      console.error("Error fetching job seekers:", error);
      toast.error("Error fetching job seekers");
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

  const showJobSeekerDetails = async (id) => {
    setLoading(true);
    try {
      const response = await getJobSeekerByIdApi(id);
      setSelectedJobSeeker(response?.data);
      setViewModalVisible(true);
    } catch (error) {
      console.error("Error fetching job seeker details:", error);
      toast.error("Error fetching job seeker details");
    } finally {
      setLoading(false);
    }
  };

  const closeViewModal = () => {
    setViewModalVisible(false);
    setSelectedJobSeeker(null);
  };

  const showCreateDrawer = () => {
    setMode("create");
    setJobSeekerData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
      skills: "",
      experience: "",
      education: "",
      resume: "",
      city: "",
      highestEducation: "",
    });
    setFileList([]);
    setPDF(null);
    setIsDrawerVisible(true);
  };

  const showEditDrawer = async (id) => {
    setLoading(true);
    try {
      const response = await getJobSeekerByIdApi(id);
      const jobSeeker = response.data;

      setMode("edit");
      setJobSeekerData({
        firstName: jobSeeker.user.firstName || "",
        lastName: jobSeeker.user.lastName || "",
        email: jobSeeker.user.email || "",
        password: "", // Don't pre-fill password for security
        phoneNumber: jobSeeker?.phoneNumber || "",
        skills: jobSeeker?.skills?.join(", ") || "",
        experience: jobSeeker?.experience || "",
        education: jobSeeker?.education || "",
        resume: jobSeeker?.resume || "",
        city: jobSeeker?.city || "",
        highestEducation: jobSeeker?.highestEducation || "",
        userId: jobSeeker.userId,
      });

      // Set file list if resume exists
      if (jobSeeker?.resume) {
        setFileList([
          {
            uid: "-1",
            name: "current_resume.pdf",
            status: "done",
            url: jobSeeker.resume,
          },
        ]);
      } else {
        setFileList([]);
      }

      setIsDrawerVisible(true);
    } catch (error) {
      console.error("Error fetching job seeker:", error);
      toast.error("Error fetching job seeker details");
    } finally {
      setLoading(false);
    }
  };
  // move to trash
  const handleDelete = async (id) => {
    Modal.confirm({
      title: 'Move Job Seeker to Trash',
      content: 'Are you sure you want to move this job seeker to trash?',
      okText: 'Move to Trash',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        setLoading(true);
        try {
          await softDeleteJobSeekerApi(id);
          toast.success("Job seeker deleted successfully");
          fetchJobSeekers();
        } catch (error) {
          console.error("Error deleting job seeker:", error);
          toast.error("Error deleting job seeker");
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setJobSeekerData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
      skills: "",
      experience: "",
      education: "",
      resume: "",
      city: "",
      highestEducation: "",
    });
    setFileList([]);
    setPDF(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobSeekerData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const uploadProps = {
    name: "resume",
    multiple: false,
    fileList: fileList,
    accept: "",     // accept all document files
    beforeUpload: (file) => {
      const isPDF = file.type.startsWith("application/");
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isPDF) {
        message.error("You can only upload document format files!");
        return Upload.LIST_IGNORE;
      }
      if (!isLt5M) {
        message.error("File must be smaller than 2MB!");
        return Upload.LIST_IGNORE;
      }
      return false;
    },
    onChange(info) {
      const { status } = info.file;
      setFileList(info.fileList.slice(-1));
      setPDF(info.file);

      if (status === "done") {
        message.success(`${info.file.name} file ready for upload`);
      } else if (status === "error") {
        message.error(`${info.file.name} file rejected`);
      }
    },
    onRemove() {
      setFileList([]);
      setPDF(null);
      setJobSeekerData((prev) => ({
        ...prev,
        resume: "",
      }));
    },
  };

  const handleSubmit = async () => {
    if (
      !jobSeekerData.firstName ||
      !jobSeekerData.lastName ||
      !jobSeekerData.phoneNumber
    ) {
      toast.error("Required fields are missing");
      return;
    }

    // Additional validation for create mode
    if (
      mode === "create" &&
      (!jobSeekerData.email)
    ) {
      toast.error("Email is required for new job seekers");
      return;
    }

    try {
      setUploading(true);
      let resumeUrl = jobSeekerData.resume;
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
        resumeUrl = uploadResponse.data.urls[0];
      }

      if (mode === "create") {
        const registrationData = {
          email: jobSeekerData.email,
          firstName: jobSeekerData.firstName,
          lastName: jobSeekerData.lastName,
          phoneNumber: jobSeekerData.jobSeeker,
          resume: resumeUrl,
          skills: jobSeekerData.skills.split(",").map((skill) => skill.trim()),
          experience: jobSeekerData.experience,
          education: jobSeekerData.education,
          city: jobSeekerData.city,
          highestEducation: jobSeekerData.highestEducation,
        };

        await createJobSeekerWithoutPasswordApi(registrationData);
        toast.success("Job seeker created successfully");
      } else {
        const updatePayload = {
          email: jobSeekerData.email,
          // password: jobSeekerData.password,
          firstName: jobSeekerData.firstName,
          lastName: jobSeekerData.lastName,
          phoneNumber: jobSeekerData.phoneNumber,
          skills: jobSeekerData.skills.split(",").map((skill) => skill.trim()),
          experience: jobSeekerData.experience,
          education: jobSeekerData.education,
          resume: resumeUrl,
          city: jobSeekerData.city,
          highestEducation: jobSeekerData.highestEducation,
        };

        await updateJobSeekerApi(jobSeekerData.userId, updatePayload);
        toast.success("Job seeker updated successfully");
      }

      fetchJobSeekers();
      closeDrawer();
    } catch (error) {
      console.error(
        `Error ${mode === "create" ? "creating" : "updating"} job seeker:`,
        error
      );
      toast.error(
        error.response?.data?.message ||
          `Error ${mode === "create" ? "creating" : "updating"} job seeker`
      );
    } finally {
      setUploading(false);
    }
  };

  const handleStatusChange = async (id, isactive) => {
    const response = await axios.patch(
      `${import.meta.env.VITE_API_URL}/users/${id}/status`,
      { isactive }
    );
    if (response) {
      await fetchJobSeekers();
    }
  };

  useEffect(() => {
    fetchJobSeekers();
  }, [currentPage, searchTerm]);

  const handleDownloadExcel = () => {
    const columns = [
      'First Name', 'Last Name', 'Full Name', 'Email', 'Phone Number',
      'City', 'Highest Education', 'Skills', 'Experience', 'Education',
      'Resume', 'Status', 'Created At', 'Updated At'
    ];

    const exportData = data.map(jobSeeker => {
      const row = {};
      columns.forEach(col => {
        switch(col) {
          case 'First Name': row[col] = jobSeeker.user?.firstName || ''; break;
          case 'Last Name': row[col] = jobSeeker.user?.lastName || ''; break;
          case 'Full Name': row[col] = userDisplayName(jobSeeker); break;
          case 'Email': row[col] = jobSeeker.email || ''; break;
          case 'Phone Number': row[col] = jobSeeker.phoneNumber || ''; break;
          case 'City': row[col] = jobSeeker.city || ''; break;
          case 'Highest Education': row[col] = jobSeeker.highestEducation || ''; break;
          case 'Skills': row[col] = jobSeeker.skills?.join(', ') || ''; break;
          case 'Experience': row[col] = jobSeeker.experience || ''; break;
          case 'Education': row[col] = jobSeeker.education || ''; break;
          case 'Resume': row[col] = jobSeeker.resume ? 'Yes' : 'No'; break;
          case 'Status': row[col] = jobSeeker.isActive ? 'Active' : 'Inactive'; break;
          case 'Created At': row[col] = dayjs(jobSeeker.createdAt).format('DD/MM/YYYY HH:mm'); break;
          case 'Updated At': row[col] = dayjs(jobSeeker.updatedAt).format('DD/MM/YYYY HH:mm'); break;
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
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Job Seekers');
    
    const fileName = `job_seekers_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
    
    toast.success('Excel file downloaded successfully!');
  };

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
          <span>{userDisplayName(record)}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    // {
    //   title: "Role",
    //   dataIndex: "role",
    //   key: "role",
    //   render: (role) => (
    //     <Tag color={role === "job_seeker" ? "blue" : "default"}>
    //       {role === "job_seeker" ? "Job Seeker" : role}
    //     </Tag>
    //   ),
    // },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive, record) => (
        <Popconfirm
          title={`Are you sure you want to ${
            isActive ? "deactivate" : "activate"
          } this job seeker?`}
          onConfirm={() => handleStatusChange(record.userId, !isActive)}
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
      title: "Skills",
      key: "skills",
      render: (_, record) =>
        record?.skills?.join(", ") || "No skills listed",
    },
    {
      title: "Resume",
      key: "resume",
      render: (_, record) =>
        record?.resume ? (
          <a
            href={record.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFilePdf style={{ fontSize: "20px", color: "red" }} />
          </a>
        ) : (
          "No resume"
        ),
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => dayjs(date).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Updated",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date) => dayjs(date).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            type="link"
            icon={<FaEye />}
            onClick={() => showJobSeekerDetails(record.id)}
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
          <h1 style={{color:'#004080'}} className="text-20 lh-14 fw-600">Job Seekers</h1>
          <div className="d-flex gap-2">
            <Search
              placeholder="Search job seekers"
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
              onClick={showCreateDrawer}
            >
              Add Job Seeker
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

      <ModalList
        viewModalVisible={viewModalVisible}
        closeViewModal={closeViewModal}
        selectedJobSeeker={selectedJobSeeker}
      />

      <Drawer
        title={mode === "create" ? "Add Job Seeker" : "Edit Job Seeker"}
        open={isDrawerVisible}
        onClose={closeDrawer}
        destroyOnClose={true}
        footer={null}
        width={700}
      >
        <div className="row">
          <div className="col-md-6 p-2">
            <div className="form-input">
              <input
                type="text"
                name="firstName"
                value={jobSeekerData.firstName}
                onChange={handleInputChange}
                required
              />
              <label className="lh-1 text-16 text-light-1">First Name *</label>
            </div>
          </div>
          <div className="col-md-6 p-2">
            <div className="form-input">
              <input
                type="text"
                name="lastName"
                value={jobSeekerData.lastName}
                onChange={handleInputChange}
                required
              />
              <label className="lh-1 text-16 text-light-1">Last Name *</label>
            </div>
          </div>
          <div className="col-md-6 p-2">
            <div className="form-input">
              <input
                type="text"
                name="phoneNumber"
                value={jobSeekerData.phoneNumber}
                onChange={handleInputChange}
                required
              />
              <label className="lh-1 text-16 text-light-1">
                Phone Number *
              </label>
            </div>
          </div>

          <>
            <div className="col-md-6 p-2">
              <div className="form-input">
                <input
                  type="email"
                  name="email"
                  value={jobSeekerData.email}
                  onChange={handleInputChange}
                  required
                />
                <label className="lh-1 text-16 text-light-1">Email *</label>
              </div>
            </div>
            {/* {mode=="create" && (
              <div className="col-md-6 p-2">
                <div className="form-input">
                  <input
                    type="password"
                    name="password"
                    value={jobSeekerData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <label className="lh-1 text-16 text-light-1">
                    Password *
                  </label>
                </div>
              </div>
            )} */}
          </>

          <div className="col-md-6 p-2">
            <div className="form-input">
              <input
                type="text"
                name="city"
                value={jobSeekerData.city}
                onChange={handleInputChange}
              />
              <label className="lh-1 text-16 text-light-1">City</label>
            </div>
          </div>

          <div className="col-md-6 p-2">
            <div className="form-input">
              <input
                type="text"
                name="highestEducation"
                value={jobSeekerData.highestEducation}
                onChange={handleInputChange}
              />
              <label className="lh-1 text-16 text-light-1">
                Highest Education
              </label>
            </div>
          </div>

          <div className="col-md-6 p-2">
            <div className="form-input">
              <input
                type="text"
                name="skills"
                value={jobSeekerData.skills}
                onChange={handleInputChange}
                placeholder="Comma separated list (e.g., JavaScript, React)"
              />
              <label className="lh-1 text-16 text-light-1">Skills</label>
            </div>
          </div>

          <div className="col-md-6 p-2">
            <div className="form-input">
              <input
                type="text"
                name="experience"
                value={jobSeekerData.experience}
                onChange={handleInputChange}
              />
              <label className="lh-1 text-16 text-light-1">Experience</label>
            </div>
          </div>

          <div className="col-md-6 p-2">
            <div className="form-input">
              <input
                type="text"
                name="education"
                value={jobSeekerData.education}
                onChange={handleInputChange}
              />
              <label className="lh-1 text-16 text-light-1">Education</label>
            </div>
          </div>

          <div className="col-12 mt-3 d-flex flex-column gap-5 p-2">
            <div>
              {/* <label className="lh-1 text-16 text-light-1">Resume</label> */}
              <label className="lh-1 text-16 text-light-1">Resume</label>
              <Dragger
                {...uploadProps}
                className="p-4 border-dashed border-2 rounded-lg"
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag PDF file to upload
                </p>
                <p className="ant-upload-hint">
                  All document files are accepted. Maximum file size: 2MB.
                </p>
              </Dragger>
            </div>

            <div className="col-12 mt-3">
            <button
  onClick={handleSubmit}
  className="button h-50 px-24 -black-1 text-white w-100"
  style={{ backgroundColor: "#004080", fontWeight: "bold" }}
  disabled={uploading}
>
  {uploading
    ? mode === "create"
      ? "Creating..."
      : "Updating..."
    : mode === "create"
    ? "Create Job Seeker"
    : "Update Job Seeker"}
</button>

            </div>
          </div>
        </div>
      </Drawer>

      {/* Restore Component */}
      <RestoreComponent
        type="jobseeker"
        visible={restoreModalVisible}
        onClose={() => setRestoreModalVisible(false)}
        onRestore={fetchJobSeekers}
      />
    </div>
  );
}

export default JobSeekerList;
