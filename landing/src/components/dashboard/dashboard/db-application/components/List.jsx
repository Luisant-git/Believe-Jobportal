import React, { useState, useEffect } from "react";
import {
  Input,
  Table,
  Button,
  Pagination,
  Modal,
  Spin,
  Tag,
  Drawer,
  Select,
  Upload,
  message,
  Form,
  Dropdown,
  Menu,
} from "antd";
import { FaEye, FaFilePdf, FaRegEdit, FaTrash, FaDownload, FaFilter } from "react-icons/fa";
import { toast } from "react-toastify";
import * as XLSX from 'xlsx';
import { InboxOutlined } from "@ant-design/icons";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  getApplications,
  getApplicationById,
  updateApplication,
  updateApplicationStatus,
  deleteApplication,
} from "@/api/applications";

import ArrowCircleRightTwoToneIcon from "@mui/icons-material/ArrowCircleRightTwoTone";
import { getLookup } from "@/api/job";
import { getJobSeekerLookUp } from "@/api/jobseeker";
import { userDisplayName } from "@/utils/common";
import ModalList from "./ModalList";
import UpdateApplicationStatus from "./UpdateApplicationStatus";

const { Search } = Input;
const { Option } = Select;
const { Dragger } = Upload;

function ApplicationList() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [titleFilter, setTitleFilter] = useState("");
  const [tempTitleFilter, setTempTitleFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [editDrawerVisible, setEditDrawerVisible] = useState(false);
  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [JobLookUp, setJobLookUp] = useState([]);
  const [JobSeekerLookUp, setJobSeekerLookUp] = useState([]);
  const [statusForm] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [pdf, setPDF] = useState(null);
  const [uploading, setUploading] = useState(false);

  const statusOptions = [
    { value: "pending", label: "Pending" },
    // { value: "withdrawn", label: "Withdrawn" },
    { value: "rejected", label: "Rejected" },
    { value: "accepted", label: "Accepted" },
    { value: "shortlisted", label: "Shortlisted" },
    { value: "interviewed", label: "Interviewed" },
    { value: "offered", label: "Offered" },
  ];

  const pageSize = 25;

  // Formik form setup
  const formik = useFormik({
    initialValues: {
      jobSeekerId: "",
      jobId: "",
      expectedSalary: "",
      currentSalary: "",
      experienceYears: "",
      coverLetter: "",
      resumeUrl: "",
    },
    validationSchema: Yup.object({
      jobSeekerId: Yup.string().required("Job seeker is required"),
      jobId: Yup.string().required("Job is required"),
      expectedSalary: Yup.number()
        .typeError("Expected salary must be a number")
        .min(0, "Expected salary cannot be negative"),
      currentSalary: Yup.number()
        .typeError("Current salary must be a number")
        .min(0, "Current salary cannot be negative"),
      experienceYears: Yup.number()
        .required("Experience years is required")
        .min(0, "Experience years cannot be negative"),
      coverLetter: Yup.string(),
      resumeUrl: Yup.string().test(
        "resume-validation",
        "Resume is required (either upload or provide URL)",
        function (value) {
          return value || fileList.length > 0;
        }
      ),
    }),
    onSubmit: async (values) => {
      try {
        setUploading(true);
        let resumeUrl = values.resumeUrl;

        // Upload new PDF if selected
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

        const payload = {
          resumeUrl: resumeUrl,
          coverLetter: values.coverLetter,
          jobSeekerId: values.jobSeekerId,
          jobId: values.jobId,
          expectedSalary: values.expectedSalary,
          currentSalary: values.currentSalary,
          experienceYears: parseFloat(values.experienceYears),
        };

        const response = await updateApplication(
          selectedApplication.id,
          payload
        );
        if (response.success) {
          toast.success("Application updated successfully");
          fetchApplications();
          closeEditDrawer();
        } else {
          toast.error(response.message || "Failed to update application");
        }
      } catch (error) {
        console.error("Error updating application:", error);
        toast.error(
          error.response?.data?.message || "Error updating application"
        );
      } finally {
        setUploading(false);
      }
    },
  });

  const handleDeleteApplication = async (id) => {
    try {
      const response = await deleteApplication(id);
      if (response.success) {
        toast.success("Application deleted successfully");
        fetchApplications();
      } else {
        toast.error(response.message || "Failed to delete application");
      }
    } catch (error) {
      console.error("Error deleting application:", error);
      toast.error(
        error.response?.data?.message || "Error deleting application"
      );
    }
  };

  const fetchApplications = () => {
    setLoading(true);
    getApplications({
      page: currentPage,
      limit: pageSize,
      ...(searchTerm && { search: searchTerm }),
      ...(titleFilter && { title: titleFilter }),
    })
      .then((response) => {
        const applications = response?.data?.data || [];
        setData(
          applications.map((app) => ({
            ...app,
            jobTitle: app.job?.title || "N/A",
            applicantName: app.jobSeeker?.name || "N/A",
          }))
        );
        setTotalItems(
          response?.data?.meta?.total || response?.data?.total || 0
        );
      })
      .catch((error) => {
        console.error("Error fetching applications:", error);
        toast.error("Error fetching applications");
      })
      .finally(() => setLoading(false));
  };

  const uploadProps = {
    name: "resume",
    multiple: false,
    fileList: fileList,
    accept: ".pdf",
    beforeUpload: (file) => {
      const isPDF = file.type === "application/pdf";
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isPDF) {
        message.error("You can only upload PDF files!");
        return Upload.LIST_IGNORE;
      }
      if (!isLt5M) {
        message.error("File must be smaller than 5MB!");
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
      formik.setFieldValue("resumeUrl", "");
    },
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
    fetchApplications();
  };

  const handleTitleFilter = (value) => {
    setTitleFilter(value);
    setCurrentPage(1);
  };

  const handleApplyFilter = () => {
    setTitleFilter(tempTitleFilter);
    setCurrentPage(1);
    setFilterDrawerVisible(false);
  };

  const GetLookUp = () => {
    getLookup().then((res) => {
      setJobLookUp(res.data);
    });
    getJobSeekerLookUp().then((res) => {
      setJobSeekerLookUp(res.data);
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const showApplicationDetails = async (id) => {
    try {
      const response = await getApplicationById(id);
      setSelectedApplication({
        ...response.data,
        jobTitle: response.data.job?.title || "N/A",
        applicantName: response.data.jobSeeker?.name || "N/A",
      });
      setViewModalVisible(true);
    } catch (error) {
      toast.error("Error fetching application details");
      console.error("Error:", error);
    }
  };

  const closeViewModal = () => {
    setViewModalVisible(false);
    setSelectedApplication(null);
  };

  const showEditDrawer = async (application) => {
    try {
      const response = await getApplicationById(application.id);
      const appData = response.data;
      setSelectedApplication({
        ...appData,
        jobTitle: appData.job?.title || "N/A",
        applicantName: appData.jobSeeker?.name || "N/A",
      });

      // Set initial file list if resumeUrl exists
      if (appData.resumeUrl) {
        setFileList([
          {
            uid: "-1",
            name: "current_resume.pdf",
            status: "done",
            url: appData.resumeUrl,
          },
        ]);
      } else {
        setFileList([]);
      }

      // Set form values
      formik.setValues({
        jobSeekerId: appData?.jobSeekerId || "",
        jobId: appData?.jobId || "",
        expectedSalary: appData?.expectedSalary || "",
        currentSalary: appData?.currentSalary || "",
        experienceYears: appData?.experienceYears || "",
        coverLetter: appData?.coverLetter || "",
        resumeUrl: appData?.resumeUrl || "",
      });

      setEditDrawerVisible(true);
    } catch (error) {
      toast.error("Error loading application data");
      console.error("Error:", error);
    }
  };

  const closeEditDrawer = () => {
    setEditDrawerVisible(false);
    formik.resetForm();
    setSelectedApplication(null);
    setFileList([]);
    setPDF(null);
  };

  const showStatusModal = (application) => {
    setSelectedApplication({
      ...application,
      jobTitle: application.job?.title || "N/A",
      applicantName: application.jobSeeker?.name || "N/A",
    });
    statusForm.setFieldsValue({
      status: application.status,
      reason: application.reason || "",
      description: application.description || "",
    });
    setStatusModalVisible(true);
  };

  const closeStatusModal = () => {
    setStatusModalVisible(false);
    statusForm.resetFields();
    setSelectedApplication(null);
  };

  const handleStatusSubmit = () => {
    statusForm
      .validateFields()
      .then((values) => {
        updateApplicationStatus(selectedApplication.id, values)
          .then((response) => {
            if (response.success) {
              toast.success("Application status updated successfully");
              fetchApplications();
              closeStatusModal();
            } else {
              toast.error(
                response.message || "Failed to update application status"
              );
            }
          })
          .catch((error) => {
            console.error("Error updating application status:", error);
            toast.error(
              error.response?.data?.message ||
                "Error updating application status"
            );
          });
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
  };

  useEffect(() => {
    GetLookUp();
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [currentPage, titleFilter]);

  const handleDownloadExcel = () => {
    const columns = [
      'Job Title', 'Applicant Name', 'Email', 'Phone', 'Experience Years',
      'Expected Salary', 'Current Salary', 'Applied Date', 'Status',
      'Cover Letter', 'Resume Available', 'Company', 'Job Location'
    ];

    const exportData = data.map(application => {
      const row = {};
      columns.forEach(col => {
        switch(col) {
          case 'Job Title': row[col] = application.job?.title || 'N/A'; break;
          case 'Applicant Name': row[col] = userDisplayName(application?.jobSeeker?.user) || 'N/A'; break;
          case 'Email': row[col] = application.jobSeeker?.user?.email || 'N/A'; break;
          case 'Phone': row[col] = application.jobSeeker?.phoneNumber || 'N/A'; break;
          case 'Experience Years': row[col] = `${application.experienceYears || 0} years`; break;
          case 'Expected Salary': row[col] = application.expectedSalary ? `₹${application.expectedSalary}` : 'N/A'; break;
          case 'Current Salary': row[col] = application.currentSalary ? `₹${application.currentSalary}` : 'N/A'; break;
          case 'Applied Date': row[col] = new Date(application.applicationDate).toLocaleDateString(); break;
          case 'Status': row[col] = application.status || 'N/A'; break;
          case 'Cover Letter': row[col] = application.coverLetter ? 'Yes' : 'No'; break;
          case 'Resume Available': row[col] = application.resumeUrl ? 'Yes' : 'No'; break;
          case 'Company': row[col] = application.job?.employer?.companyName || 'N/A'; break;
          case 'Job Location': row[col] = application.job?.location || 'N/A'; break;
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
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Job Applications');
    
    const fileName = `job_applications_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
    
    toast.success('Excel file downloaded successfully!');
  };

  const columns = [
    {
      title: "Job Title",
      dataIndex: "jobTitle",
      key: "jobTitle",
      render: (title) => title || "N/A",
    },
    {
      title: "Applicant Name",
      dataIndex: "applicantName",
      key: "applicantName",
      render: (name,record) => <span>{userDisplayName(record?.jobSeeker?.user)}</span>
    },
    {
      title: "Experience",
      dataIndex: "experienceYears",
      key: "experienceYears",
      render: (years) => `${years} years`,
    },
    {
      title: "Expected Salary",
      dataIndex: "expectedSalary",
      key: "expectedSalary",
      render: (salary) => (salary ? `₹${salary}` : "N/A"),
    },
    {
      title: "Applied Date",
      dataIndex: "applicationDate",
      key: "applicationDate",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Button
          type="default"
          variant="outlined"
          onClick={() => showStatusModal(record)}
        >
          {status}
          <ArrowCircleRightTwoToneIcon fontSize="inherit" />
        </Button>
      ),
    },
    {
      title: "Resume",
      key: "resume",
      render: (_, record) => (
        <Button
          type="link"
          icon={<FaFilePdf style={{ color: "#ff4d4f" }} />}
          onClick={() => window.open(record.resumeUrl, "_blank")}
          style={{ color: "#ff4d4f", padding: "4px 0" }}
        >
          View
        </Button>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            type="link"
            icon={<FaEye style={{ color: "#1890ff" }} />}
            onClick={() => showApplicationDetails(record.id)}
            style={{ padding: "4px 0" }}
          />
          <Button
            type="link"
            icon={<FaRegEdit style={{ color: "#1890ff" }} />}
            onClick={() => showEditDrawer(record)}
            style={{ padding: "4px 0" }}
          />
          <Button
            type="link"
            icon={<FaTrash style={{ color: "#ff4d4f" }} />}
            onClick={() => handleDeleteApplication(record.id)}
            style={{ padding: "4px 0" }}
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
              style={{ fontSize: "20px", lineHeight: "14px", fontWeight: 600, color:'#004080' }}
            >
              Job Applications
            </h1>
            <div style={{ display: "flex", gap: "8px" }}>
              <Search
                placeholder="Search applications"
                allowClear
                enterButton="Search"
                size="large"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onSearch={handleSearch}
                style={{ maxWidth: "400px" }}
              />
              <Button 
                size="large" 
                icon={<FaFilter />}
                onClick={() => {
                  setTempTitleFilter(titleFilter);
                  setFilterDrawerVisible(true);
                }}
              >
                Filter
              </Button>
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
                  dataSource={data.filter(item => 
                    !titleFilter || item.jobTitle === titleFilter
                  )}
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

      <ModalList
        viewModalVisible={viewModalVisible}
        closeViewModal={closeViewModal}
        selectedApplication={selectedApplication}
      />

      <UpdateApplicationStatus
        statusOptions={statusOptions}
        statusForm={statusForm}
        statusModalVisible={statusModalVisible}
        handleStatusSubmit={handleStatusSubmit}
        closeStatusModal={closeStatusModal}
      />

      <Drawer
        title="Edit Application"
        placement="right"
        onClose={closeEditDrawer}
        open={editDrawerVisible}
        width={600}
        className="custom-drawer"
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-md-12">
              <label htmlFor="jobSeekerId">Job Seeker</label>
              <div className="form-input border p-3">
                <select
                  id="jobSeekerId"
                  name="jobSeekerId"
                  value={formik.values.jobSeekerId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                >
                  <option value="">Select a Job Seeker</option>
                  {JobSeekerLookUp.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.username}
                    </option>
                  ))}
                </select>
              </div>
              {formik.touched.jobSeekerId && formik.errors.jobSeekerId ? (
                <div className="error-message">{formik.errors.jobSeekerId}</div>
              ) : null}
            </div>
            <div className="col-12 mt-3">
              <label htmlFor="jobId">Job</label>
              <div className="form-input border p-3">
                <select
                  id="jobId"
                  name="jobId"
                  value={formik.values.jobId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                >
                  <option value="">Select a Job</option>
                  {JobLookUp?.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o?.title}
                    </option>
                  ))}
                </select>
              </div>
              {formik.touched.jobId && formik.errors.jobId ? (
                <div className="error-message">{formik.errors.jobId}</div>
              ) : null}
            </div>
            <div className="col-12 mt-3">
              <label htmlFor="expectedSalary">Expected Salary</label>
              <div className="form-input">
                <input
                  type="text"
                  id="expectedSalary"
                  name="expectedSalary"
                  value={formik.values.expectedSalary}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.expectedSalary && formik.errors.expectedSalary ? (
                <div className="text-danger">
                  {formik.errors.expectedSalary}
                </div>
              ) : null}
            </div>

            <div className="col-12 mt-3">
              <label htmlFor="currentSalary">Current Salary</label>
              <div className="form-input">
                <input
                  type="text"
                  id="currentSalary"
                  name="currentSalary"
                  value={formik.values.currentSalary}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.currentSalary && formik.errors.currentSalary ? (
                <div className="text-danger">{formik.errors.currentSalary}</div>
              ) : null}
            </div>

            <div className="col-12 mt-3">
              <label htmlFor="experienceYears">Experience (in Year)</label>
              <div className="form-input">
                <input
                  type="text"
                  id="experienceYears"
                  name="experienceYears"
                  value={formik.values.experienceYears}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
              </div>
              {formik.touched.experienceYears &&
              formik.errors.experienceYears ? (
                <div className="text-danger">
                  {formik.errors.experienceYears}
                </div>
              ) : null}
            </div>
            <div>
              <div className="col-12 mt-3">
                <label htmlFor="resumeUrl">Resume</label>
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
                    Only PDF files are accepted. Maximum file size: 5MB.
                  </p>
                </Dragger>

                {formik.touched.resumeUrl && formik.errors.resumeUrl ? (
                  <div className="error-message">{formik.errors.resumeUrl}</div>
                ) : null}
              </div>
            </div>

            <div className="col-12 ">
              <label htmlFor="coverLetter">Cover Letter</label>
              <div className="form-input">
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  rows={4}
                  value={formik.values.coverLetter}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
            </div>

            <div className="col-12 mt-3">
              <Button
  type="primary"
  htmlType="submit"
  loading={uploading}
  className="button h-50 px-24 -black-1  w-100"
  style={{ backgroundColor: "#004080" }}
>
  Update Application
</Button>

            </div>
          </div>
        </form>
      </Drawer>

      {filterDrawerVisible && (
        <>
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 999
            }}
            onClick={() => setFilterDrawerVisible(false)}
          />
          <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            width: '400px',
            backgroundColor: 'white',
            zIndex: 1000,
            boxShadow: '-2px 0 10px rgba(0,0,0,0.1)',
            padding: '30px',
            overflowY: 'auto'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '30px',
              paddingBottom: '15px',
              borderBottom: '1px solid #f0f0f0'
            }}>
              <h3 style={{ margin: 0, color: '#004080', fontSize: '20px', fontWeight: '600' }}>Filter Applications</h3>
              <button
                onClick={() => setFilterDrawerVisible(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#999',
                  padding: '5px'
                }}
              >
                ×
              </button>
            </div>
            
            <div className="row x-gap-20 y-gap-20">
              <div className="col-12">
                <label style={{ display: 'block', marginBottom: '10px', color: '#333', fontWeight: '500' }}>Job Title</label>
                <div className="form-input border p-3">
                  <select
                    value={tempTitleFilter}
                    onChange={(e) => setTempTitleFilter(e.target.value)}
                    style={{ width: '100%', border: 'none', outline: 'none' }}
                  >
                    <option value="">All Job Titles</option>
                    {[...new Set(data.map(app => app.jobTitle))]
                      .filter(title => title && title !== "N/A")
                      .map((title, index) => (
                        <option key={index} value={title}>
                          {title}
                        </option>
                      ))
                    }
                  </select>
                </div>
              </div>
              
              <div className="col-12" style={{ marginTop: '30px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => {
                      setTempTitleFilter('');
                      setTitleFilter('');
                      setCurrentPage(1);
                      setFilterDrawerVisible(false);
                    }}
                    style={{
                      flex: 1,
                      padding: '12px 20px',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      background: 'white',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    Clear Filter
                  </button>
                  <button
                    onClick={handleApplyFilter}
                    style={{
                      flex: 1,
                      padding: '12px 20px',
                      border: 'none',
                      borderRadius: '6px',
                      backgroundColor: '#004080',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    Apply Filter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ApplicationList;
