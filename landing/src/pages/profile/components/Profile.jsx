import React, { useEffect, useState } from "react";
import "./ProfileCard.css";
import Header1 from "@/components/header/header-11";
import axiosServices from "@/utils/axios";
import {
  Modal,
  Form,
  Input,
  Upload,
  Button,
  message,
  Switch,
  Alert,
  Select,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { AddCircleOutline } from "@mui/icons-material";
import { Upload as UploadAPI } from "@/api/upload";
import { useNavigate } from "react-router-dom";

function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

const ProfileCard = () => {
  const [data, setData] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMissingAlert, setShowMissingAlert] = useState(false);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const decoded = parseJwt(token);
  const jobSeekerId =
    decoded?.seekerId ||
    decoded?.jobSeekerId ||
    decoded?.job_seeker_id ||
    decoded?.specificId ||
    decoded?.sub;

  const endpoints = {
    key: "users/data/job-seeker",
    update: "users",
  };

  const profileCard = async (jobSeekerId) => {
    try {
      const response = await axiosServices.get(
        `${endpoints.key}/${jobSeekerId}`
      );

      let resp = response.data;

      if (resp && resp.user) {
        setData({
          ...resp.user,
          jobSeeker: resp,
        });
      } else {
        setData(resp);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);

    form.setFieldsValue({
      firstName: data?.firstName || data?.user?.firstName,
      lastName: data?.lastName || data?.user?.lastName,
      phoneNumber:
        data?.phoneNumber ||
        data?.user?.phoneNumber ||
        data?.jobSeeker?.phoneNumber,
      gender: data?.gender || data?.jobSeeker?.gender,
      workStatus: data?.workStatus || data?.jobSeeker?.workStatus,
      location: data?.location || data?.jobSeeker?.location,
      preferredLocations:
        data?.preferredLocations || data?.jobSeeker?.preferredLocations,
      preferredSalary:
        data?.preferredSalary || data?.jobSeeker?.preferredSalary,
      skills: (data?.skills || data?.jobSeeker?.skills)?.join(", "),
      city: data?.city || data?.jobSeeker?.city,
      experience: data?.experience || data?.jobSeeker?.experience,
      education: data?.education || data?.jobSeeker?.education,
      highestEducation:
        data?.highestEducation || data?.jobSeeker?.highestEducation,
      isactive: data?.isactive ?? data?.jobSeeker?.isactive,
    });

    const resumeUrl = data?.resume || data?.jobSeeker?.resume;
    if (resumeUrl && resumeUrl !== "null") {
      setFileList([
        {
          uid: "-1",
          name: "current_resume.pdf",
          status: "done",
          url: resumeUrl,
        },
      ]);
    } else {
      setFileList([]);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setFileList([]);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      const skillsArray = values.skills
        ? values.skills.split(",").map((skill) => skill.trim())
        : [];
      const payload = {
        email: data?.email || data?.user?.email,
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
        gender: values.gender,
        workStatus: values.workStatus,
        location: values.location,
        preferredLocations: Array.isArray(values.preferredLocations)
          ? values.preferredLocations.join(", ")
          : values.preferredLocations || "",
        preferredSalary: values.preferredSalary,
        city: values.city,
        skills: skillsArray,
        experience: values.experience,
        education: values.education,
        highestEducation: values.highestEducation,
      };

      // Handle resume upload or removal
      if (fileList.length === 0) {
        // Resume was removed
        payload.resume = null;
      } else if (fileList.length > 0 && fileList[0].originFileObj) {
        // New resume file uploaded
        const uploadResponse = await UploadAPI(fileList[0].originFileObj);
        payload.resume = uploadResponse.urls[0];
      }
      // If fileList has existing resume (no originFileObj), keep current resume

      // Send the main payload as JSON
      await axiosServices.patch(
        `${endpoints.update}/${userId}/jobseeker`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      message.success("Profile updated successfully");
      setIsModalVisible(false);
      profileCard(jobSeekerId);
    } catch (error) {
      console.error("Update error:", error);
      message.error(
        error.response?.data?.message ||
          "Failed to update profile. Please check all required fields."
      );
    } finally {
      setLoading(false);
    }
  };

  const uploadProps = {
    onRemove: (file) => {
      setFileList([]);
    },
    beforeUpload: (file) => {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
        "application/rtf",
      ];
      const isAllowed = allowedTypes.includes(file.type);
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isAllowed) {
        message.error("You can upload PDF, DOC, DOCX, TXT, or RTF files!");
        return false;
      }
      if (!isLt2M) {
        message.error("File must be smaller than 2MB!");
        return false;
      }

      setFileList([
        {
          uid: file.uid,
          name: file.name,
          status: "done",
          originFileObj: file,
        },
      ]);
      return false;
    },
    fileList,
  };

  // Calculate completion percentage & missing fields
  // --- FIX: Unify data access for all fields ---
  const jobSeeker = data?.jobSeeker || data;
  const firstName = data?.firstName || data?.user?.firstName;
  const lastName = data?.lastName || data?.user?.lastName;
  const email = data?.email || data?.user?.email;
  const phoneNumber =
    data?.phoneNumber || data?.user?.phoneNumber || jobSeeker?.phoneNumber;
  const gender = data?.gender || data?.user?.gender || jobSeeker?.gender;
  const workStatus =
    data?.workStatus || data?.user?.workStatus || jobSeeker?.workStatus;
  const location = data?.location || jobSeeker?.location;
  const preferredLocations =
    data?.preferredLocations || jobSeeker?.preferredLocations;
  const preferredSalary = data?.preferredSalary || jobSeeker?.preferredSalary;
  const resume =
    jobSeeker?.resume && jobSeeker?.resume !== "null"
      ? jobSeeker?.resume
      : null;
  const city = jobSeeker?.city;
  const skills = jobSeeker?.skills;
  const experience = jobSeeker?.experience;
  const highestEducation = jobSeeker?.highestEducation;
  const education = jobSeeker?.education;
  const isactive = jobSeeker?.isactive;

  const fields = [
    firstName,
    email,
    resume,
    phoneNumber,
    lastName,
    location,
    preferredLocations?.length > 0,
    preferredSalary,
    workStatus,
    gender,
    skills?.length > 0,
    city,
    experience,
    education,
    isactive !== undefined,
  ];
  const filledFields = fields.filter(Boolean).length;
  const completionPercentage = Math.round((filledFields / fields.length) * 100);
  const missingFields = fields.length - filledFields;

  // Show alert if missing fields
  useEffect(() => {
    if (data && missingFields > 0) {
      setShowMissingAlert(true);
    } else {
      setShowMissingAlert(false);
    }
  }, [data, missingFields]);

  useEffect(() => {
    if (jobSeekerId) {
      profileCard(jobSeekerId);
    }
    // eslint-disable-next-line
  }, [jobSeekerId]);

  return (
    <>
    <Header1/>
    <div className="profile-card-outer">
      {showMissingAlert ? (
        <Alert
          message={
            <span>
              <b style={{ color: "red" }}>Fill the missing profile details.</b>
              <Button
                type="link"
                style={{ color: "red", marginLeft: 10 }}
                onClick={showModal}
              >
                Fill Now
              </Button>
            </span>
          }
          type="error"
          showIcon
          style={{ marginBottom: "1rem" }}
        />
      ) : (
        <>
          {/* all fields filled go to home page */}
          <Alert
            message={
              <span>
                <b style={{ color: "#004080" }}>Every field has been filled out.</b>
                <Button
                  type="link"
                  style={{ color: "#004080", marginLeft: 10 }}
                >
                  <a href="/">Go to Home</a>
                </Button>
              </span>
            }
            type="info"
            showIcon
            style={{ marginBottom: "1rem" }}
          />
        </>
      )}

      <div className="profile-card-main">
        <div className="profile-photo position-relative mt-40">
          <div className="progress-ring"></div>
          <div
            className="progress-ring-filled"
            style={{ "--percentage": `${completionPercentage}%` }}
          ></div>
          <div className="photo-circle d-flex align-items-center justify-content-center">
            <button className="btn btn-light rounded-circle fs-4">
              <AddCircleOutline />
            </button>
          </div>
          <div className="progress-percentage">{completionPercentage}%</div>
        </div>

        <div className="info-section ms-4 flex-grow-1">
          <h5 style={{ color: "#004080" }} className="fw-bold">
            {firstName ? (
              firstName.toUpperCase()
            ) : (
              <span className="text-muted">[First Name]</span>
            )}{" "}
            {lastName ? (
              lastName.toUpperCase()
            ) : (
              <span className="text-muted">[Last Name]</span>
            )}{" "}
            <i className="bi bi-pencil ms-2"></i>
          </h5>

          <p className="text-muted mb-2">
            {education || <span className="text-danger">[Education]</span>}
          </p>

          <div className="row">
            <div className="col-6">
              <div className="info-item">
                <i className="bi bi-geo-alt"></i>{" "}
                {city || <span className="text-danger">[Location]</span>}
              </div>
              <div className="info-item">
                <i className="bi bi-geo-alt"></i>{" "}
                {isactive ? (
                  <span className="text-success">ACTIVE</span>
                ) : (
                  <span className="text-warning">DEACTIVE</span>
                )}
              </div>
            </div>
            <div className="col-6">
              <div className="info-item">
                <i className="bi bi-telephone"></i>{" "}
                {phoneNumber || <span className="text-danger">[Phone]</span>}
                {phoneNumber && <span className="text-success ms-2">✓</span>}
              </div>
              <div className="info-item">
                <i className="bi bi-envelope"></i>{" "}
                {email ? (
                  `${email.split("@")[0]}@...`
                ) : (
                  <span className="text-danger">[Email]</span>
                )}
                {email && <span className="text-success ms-2">✓</span>}
              </div>
            </div>
            <div className="col-6 d-flex flex-row">
              <div className="info-item">
                <i className="bi bi-gender-ambiguous"></i>{" "}
                {gender || <span className="text-danger">[Gender]</span>}
                {gender && <span className="text-success ms-2">✓</span>}
              </div>
              <div style={{ paddingLeft: "226px" }} className="info-item">
                <i className="bi bi-briefcase"></i>{" "}
                {workStatus || (
                  <span className="text-danger">[Work Status]</span>
                )}
                {workStatus && <span className="text-success ms-2">✓</span>}
              </div>
            </div>
          </div>
        </div>

        <div className="right-box">
          <div className="item">
            <div style={{ color: "#004080" }}>
              {skills?.length > 0 ? (
                `Skills: ${skills.join(", ")}`
              ) : (
                <span className="text-danger">Add skills</span>
              )}
            </div>
            <span>{skills?.length > 0 ? "✓" : "↑10%"}</span>
          </div>

          <div className="item">
            <div style={{ color: "#004080" }}>
              {experience ? (
                `Experience: ${experience}`
              ) : (
                <span className="text-danger">Add experience</span>
              )}
            </div>
            <span>{experience ? "✓" : "↑10%"}</span>
          </div>

          <div className="item">
            <div style={{ color: "#004080" }}>
              {preferredSalary || (
                <span className="text-danger">Add Preferred Salary</span>
              )}
            </div>
            <span>{preferredSalary ? "✓" : "↑10%"}</span>
          </div>

          <div className="item">
            <div style={{ color: "#004080" }}>
              {location || (
                <span className="text-danger">Add Current Location</span>
              )}
            </div>
            <span>{location ? "✓" : "↑10%"}</span>
          </div>

          <div className="item">
            <div style={{ color: "#004080" }}>
              {preferredLocations?.length > 0 ? (
                preferredLocations.join(", ")
              ) : (
                <span className="text-danger">Add Preferred Locations</span>
              )}
            </div>
            <span>{preferredLocations?.length > 0 ? "✓" : "↑10%"}</span>
          </div>

          <div className="item">
            <div style={{ color: "#004080" }}>
              {resume && resume !== "null" ? (
                "Resume uploaded"
              ) : (
                <span className="text-danger">Upload resume</span>
              )}
            </div>
            <span>{resume && resume !== "null" ? "✓" : "↑10%"}</span>
          </div>

          {missingFields > 0 ? (
            <button className="add-details-btn" onClick={showModal}>
              Add {missingFields} missing details
            </button>
          ) : (
            <button className="add-update-btn" onClick={() => showModal()}>
              Update Profile
            </button>
          )}

          {missingFields === 0 && (
            <button className="add-home-btn" onClick={() => navigate("/")}>
              Go to Home
            </button>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        title={`Complete Your Profile (${missingFields} fields missing)`}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSubmit}
        confirmLoading={loading}
        width={700}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <div className="row">
            <div className="col-md-6">
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[
                  { required: true, message: "Please input first name!" },
                ]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: "Please input last name!" }]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                name="phoneNumber"
                label="Phone Number"
                rules={[
                  { required: true, message: "Please input phone number!" },
                ]}
              >
                <Input placeholder="Phone Number" />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item name="city" label="Location">
                <Input placeholder="Location" />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item name="skills" label="Skills (comma separated)">
                <Input placeholder="e.g., JavaScript, React, Node.js" />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item name="experience" label="Experience">
                <Input placeholder="e.g., 5 years" />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item name="education" label="Education">
                <Input placeholder="e.g., Bachelor's Degree" />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item name="location" label="Current Location">
                <Input placeholder="Current Location" />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item
                name="workStatus"
                label="Work Status"
                rules={[
                  { required: true, message: "Please select work status!" },
                ]}
              >
                <Select placeholder="Select Work Status">
                  <Select.Option value="employed">Employed</Select.Option>
                  <Select.Option value="unemployed">Unemployed</Select.Option>
                  <Select.Option value="freelancer">Freelancer</Select.Option>
                </Select>
              </Form.Item>
            </div>

            <div className="col-md-6">
              <Form.Item
                name="gender"
                label="Gender"
                rules={[{ required: true, message: "Please select gender!" }]}
              >
                <Select placeholder="Select Gender">
                  <Select.Option value="male">Male</Select.Option>
                  <Select.Option value="female">Female</Select.Option>
                  <Select.Option value="other">Other</Select.Option>
                </Select>
              </Form.Item>
            </div>

            <div className="col-md-6">
              <Form.Item name="preferredLocations" label="Preferred Locations">
                <Input placeholder="e.g., Remote, New York" />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item name="preferredSalary" label="Preferred Salary">
                <Input placeholder="e.g., ₹100,000" />
              </Form.Item>
            </div>

            {/* <div className="col-12">
              <Form.Item name="isactive" label="Status" valuePropName="checked">
                <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
              </Form.Item>
            </div> */}
            <div className="col-12">
              <Form.Item label="Resume (All document formats)">
                <Upload {...uploadProps}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
    </>
  );
};

export default ProfileCard;
