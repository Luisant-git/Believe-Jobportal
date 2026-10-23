import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import NotificationSystem from "react-notification-system";
import axios from "axios";
import { toast } from "react-toastify";

const { Dragger } = Upload;

// Debug component to log Formik state
const FormikDebug = () => {
  const { values, errors, touched, isValid } = useFormikContext();
  // Uncomment for debugging:
  // console.log("Formik state:", { values, errors, touched, isValid });
  return null;
};

const educationOptions = [
  { value: "", label: "-- Select Education --" },
  { value: "High School", label: "High School" },
  { value: "Diploma", label: "Diploma" },
  { value: "Bachelor's", label: "Bachelor's Degree" },
  { value: "Master's", label: "Master's Degree" },
  { value: "PhD", label: "PhD / Doctorate" },
  { value: "Other", label: "Other" },
];

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/\d/, "Must contain at least one number")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  gender: Yup.string().required("Gender is required"),
  resume: Yup.mixed().required("Resume is required"),
  current_location: Yup.string().required("Current location is required"),
  location: Yup.string().required("location is required"),
  skills: Yup.string().required("Skills are required"),
  experience: Yup.string().required("Experience is required"),
  education: Yup.string().required("Education is required"),
  highestEducation: Yup.string().required("Highest education is required"),
  workStatus: Yup.string().required("Work status is required"),
  preferredLocations: Yup.string().required("Preferred locations are required"),
  preferredSalary: Yup.string().required("Preferred salary is required"),
});

const SignUpForm = () => {
  const [uploading, setUploading] = useState(false);
  const notificationSystem = useRef(null);
  const [resumeFileList, setResumeFileList] = useState([]);
  const [resumeFile, setResumeFile] = useState(null);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setUploading(true);

      // Upload resume
      let resumeUrl = "";
      if (resumeFile) {
        const formData = new FormData();
        formData.append("files", resumeFile);
        const uploadResponse = await axios.post(
          `${API_URL}/Uploads`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        resumeUrl = Array.isArray(uploadResponse.data.urls)
          ? uploadResponse.data.urls[0]
          : uploadResponse.data.urls || uploadResponse.data.url || "";
      }

      const registrationData = {
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phone,
        gender: values.gender,
        resume: resumeUrl,
        current_location: values.current_location,
        location: values.location,
        skills: values.skills.split(",").map((skill) => skill.trim()),
        experience: values.experience,
        education: values.education,
        highestEducation: values.highestEducation,
        workStatus: values.workStatus,
        preferredLocations: values.preferredLocations
          .split(",")
          .map((loc) => loc.trim()),
        preferredSalary: values.preferredSalary,
      };

      const registrationResponse = await axios.post(
        `${API_URL}/auth/register/job-seeker`,
        registrationData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = registrationResponse.data;
      const userId = data.id || data.user?.id;
      if (!userId) {
        alert("User ID not found in server response.");
      }
      localStorage.setItem("userId", data.id);
      localStorage.setItem(
        "token",
        data.access_token || registrationResponse.data.access_token
      );
      toast.success("Registration successful!");
      navigate("/login");
      resetForm();
      setResumeFileList([]);
      setResumeFile(null);
    } catch (error) {
      notificationSystem.current.addNotification({
        message: error.response?.data?.message || error.message,
        level: "error",
      });
    } finally {
      setUploading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full m-auto items-center bg-gray-100 dark:bg-gray-900 py-20 px-20 sm:px-6">
      <NotificationSystem ref={notificationSystem} />
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
          firstName: "",
          lastName: "",
          phone: "",
          gender: "",
          resume: null,
          current_location: "",
          location: "",
          skills: "",
          experience: "",
          education: "",
          highestEducation: "",
          workStatus: "",
          preferredLocations: "",
          preferredSalary: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, errors, touched }) => (
          <Form className="space-y-8">
            <FormikDebug />
            <div className="text-center">
              <h1
                className="text-3xl font-bold text-gray-900"
                style={{ color: "#004080" }}
              >
                Job Seeker Registration
              </h1>
              <p className="mt-2 text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Log in
                </Link>
              </p>
            </div>

            {/* Email */}
            <div className="form-group">
              <label style={{color:'#004080'}} className="block text-sm font-medium mb-1">Email*</label>
              <Field
                type="email"
                name="email"
                className={`w-full p-2 border rounded ${
                  errors.email && touched.email ? "border-red-500" : ""
                }`}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Password */}
              <div className="form-group">
                <label style={{color:'#004080'}} className="block text-sm font-medium text-gray-700 mb-1">
                  Password*
                </label>
                <Field
                  type="password"
                  name="password"
                  className={`w-full p-2 border rounded ${
                    errors.password && touched.password ? "border-red-500" : ""
                  }`}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger"
                />
              </div>

              {/* Confirm Password */}
              <div className="form-group">
                <label style={{color:'#004080'}} className="block text-sm font-medium mb-1">
                  Confirm Password*
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  className={`w-full p-2 border rounded ${
                    errors.confirmPassword && touched.confirmPassword
                      ? "border-red-500"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-danger"
                />
              </div>

              {/* First Name */}
              <div className="form-group">
                <label style={{color:'#004080'}} className="block text-sm font-medium mb-1">
                  First Name*
                </label>
                <Field
                  type="text"
                  name="firstName"
                  className={`w-full p-2 border rounded ${
                    errors.firstName && touched.firstName
                      ? "border-red-500"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-danger"
                />
              </div>

              {/* Last Name */}
              <div className="form-group">
                <label style={{color:'#004080'}} className="block text-sm font-medium mb-1">
                  Last Name*
                </label>
                <Field
                  type="text"
                  name="lastName"
                  className={`w-full p-2 border rounded ${
                    errors.lastName && touched.lastName ? "border-red-500" : ""
                  }`}
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-danger"
                />
              </div>

              {/* Phone Number */}
              <div className="form-group">
                <label style={{color:'#004080'}} className="block text-sm font-medium mb-1">
                  Phone Number*
                </label>
                <Field
                  type="text"
                  name="phone"
                  className={`w-full p-2 border rounded ${
                    errors.phone && touched.phone ? "border-red-500" : ""
                  }`}
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-danger"
                />
              </div>

              {/* Gender */}
              <div className="form-group">
                <label style={{color:'#004080'}} className="block text-sm font-medium mb-1">
                  Gender*
                </label>
                <Field
                  as="select"
                  name="gender"
                  className={`w-full p-2 border rounded ${
                    errors.gender && touched.gender ? "border-red-500" : ""
                  }`}
                >
                  <option value="">-- Select Gender --</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Field>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>

            {/* Preferred Location */}
            <div className="form-group">
              <label style={{color:'#004080'}} className="block text-sm font-medium mb-1">
                Location*
              </label>
              <Field
                type="text"
                name="location"
                className={`w-full p-2 border rounded ${
                  errors.location && touched.location ? "border-red-500" : ""
                }`}
              />
              <ErrorMessage
                name="location"
                component="div"
                className="text-danger"
              />
            </div>

            {/* Current Location */}
            <div className="form-group">
              <label style={{color:'#004080'}} className="block text-sm font-medium mb-1">
                Current Location*
              </label>
              <Field
                type="text"
                name="current_location"
                className={`w-full p-2 border rounded ${
                  errors.current_location && touched.current_location
                    ? "border-red-500"
                    : ""
                }`}
              />
              <ErrorMessage
                name="current_location"
                component="div"
                className="text-danger"
              />
            </div>

            {/* Skills */}
            <div className="form-group">
              <label style={{color:'#004080'}} className="block text-sm font-medium mb-1">Skills*</label>
              <Field
                type="text"
                name="skills"
                placeholder="Enter skills separated by commas"
                className={`w-full p-2 border rounded ${
                  errors.skills && touched.skills ? "border-red-500" : ""
                }`}
              />
              <ErrorMessage
                name="skills"
                component="div"
                className="text-danger"
              />
            </div>

            {/* Experience */}
            <div className="form-group">
              <label style={{color:'#004080'}} className="block text-sm font-medium mb-1">
                Experience*
              </label>
              <Field
                type="text"
                name="experience"
                className={`w-full p-2 border rounded ${
                  errors.experience && touched.experience
                    ? "border-red-500"
                    : ""
                }`}
              />
              <ErrorMessage
                name="experience"
                component="div"
                className="text-danger"
              />
            </div>

            {/* Education (Dropdown) */}
            <div className="form-group">
              <label style={{color:'#004080'}} className="block text-sm font-medium mb-1">
                Education*
              </label>
              <Field
                as="select"
                name="education"
                className={`w-full p-2 border rounded ${
                  errors.education && touched.education ? "border-red-500" : ""
                }`}
              >
                {educationOptions.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="education"
                component="div"
                className="text-danger"
              />
            </div>

            {/* Highest Education */}
            <div className="form-group">
              <label style={{color:'#004080'}} className="block text-sm font-medium mb-1">
                Highest Education*
              </label>
              <Field
                as="select"
                name="highestEducation"
                className={`w-full p-2 border rounded ${
                  errors.highestEducation && touched.highestEducation
                    ? "border-red-500"
                    : ""
                }`}
              >
                {educationOptions.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="highestEducation"
                component="div"
                className="text-danger"
              />
            </div>

            {/* Work Status */}
            <div className="form-group">
              <label style={{color:'#004080'}} className="block text-sm font-medium mb-1">
                Work Status*
              </label>
              <Field
                as="select"
                name="workStatus"
                className={`w-full p-2 border rounded ${
                  errors.workStatus && touched.workStatus
                    ? "border-red-500"
                    : ""
                }`}
              >
                <option value="">-- Select Work Status --</option>
                <option value="Employed">Employed</option>
                <option value="Unemployed">Unemployed</option>
                <option value="Freelancer">Freelancer</option>
              </Field>
              <ErrorMessage
                name="workStatus"
                component="div"
                className="text-danger"
              />
            </div>

            {/* Preferred Locations */}
            <div className="form-group">
              <label style={{color:'#004080'}} className="block text-sm font-medium mb-1">
                Preferred Locations*
              </label>
              <Field
                type="text"
                name="preferredLocations"
                placeholder="Enter locations separated by commas"
                className={`w-full p-2 border rounded ${
                  errors.preferredLocations && touched.preferredLocations
                    ? "border-red-500"
                    : ""
                }`}
              />
              <ErrorMessage
                name="preferredLocations"
                component="div"
                className="text-danger"
              />
            </div>

            {/* Preferred Salary */}
            <div className="form-group">
              <label style={{color:'#004080'}} className="block text-sm font-medium mb-1">
                Preferred Salary*
              </label>
              <Field
                type="text"
                name="preferredSalary"
                className={`w-full p-2 border rounded ${
                  errors.preferredSalary && touched.preferredSalary
                    ? "border-red-500"
                    : ""
                }`}
              />
              <ErrorMessage
                name="preferredSalary"
                component="div"
                className="text-danger"
              />
            </div>

            {/* Resume Upload */}
            <div className="form-group">
              <label style={{color:'#004080'}} className="block text-sm font-medium mb-1">
                Resume* (upload document)
              </label>
              <Dragger
                name="resume"
                multiple={false}
                fileList={resumeFileList}
                accept=".pdf,.doc,.docx"
                beforeUpload={(file) => {
                  const isValidType = [
                    "application/pdf",
                    "application/msword",
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                  ].includes(file.type);
                  const isLt2M = file.size / 1024 / 1024 < 2; // Changed from 5 to 2 MB
                  if (!isValidType) {
                    message.error("You can only upload PDF or Word files!");
                    return Upload.LIST_IGNORE;
                  }
                  if (!isLt2M) {
                    message.error("File must be smaller than 2MB!"); // Changed message
                    return Upload.LIST_IGNORE;
                  }
                  setFieldValue("resume", file);
                  setResumeFile(file);
                  setResumeFileList([
                    {
                      uid: file.uid,
                      name: file.name,
                      status: "done",
                      url: "",
                      originFileObj: file,
                    },
                  ]);
                  return false;
                }}
                onChange={(info) => {
                  if (info.file.status === "removed") {
                    setResumeFileList([]);
                    setResumeFile(null);
                    setFieldValue("resume", null);
                  }
                }}
                onRemove={() => {
                  setResumeFileList([]);
                  setResumeFile(null);
                  setFieldValue("resume", null);
                }}
                className={`p-4 border-dashed border-2 rounded-lg ${
                  errors.resume && touched.resume ? "border-red-500" : ""
                }`}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to upload</p>
                <p className="ant-upload-hint">
                  PDF or Word files only. Max file size: 2MB.
                </p>
              </Dragger>
              <ErrorMessage
                name="resume"
                component="div"
                className="text-danger"
              />
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="w-100 btn py-3 text-white rounded"
              style={{
                backgroundColor: "#004080",
                border: "none",
              }}
              onClick={() => {}}
            >
              {uploading ? "Processing..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm;
