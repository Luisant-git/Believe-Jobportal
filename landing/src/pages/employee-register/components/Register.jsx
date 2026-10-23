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
  companyName: Yup.string().required("Company name is required"),
  contactPerson: Yup.string().required("Contact person is required"),
  companyType: Yup.string().required("Organization type is required"),
  companyIndustry: Yup.string().required("Industry type is required"),
  companySize: Yup.string().required("Number of employees is required"),
  companyDescription: Yup.string().required("Company description is required"),
  companyWebsite: Yup.string()
    .url("Invalid URL format")
    .required("Website is required"),
  identityProof: Yup.mixed().required("Identity proof is required"),
  legalRegistrationDocument: Yup.mixed().required(
    "Legal registration document is required"
  ),
  companyLogo: Yup.mixed().required("Company logo is required"),
});

const Register = () => {
  const [uploading, setUploading] = useState(false);
  const notificationSystem = useRef(null);
  const [companyLogoFileList, setCompanyLogoFileList] = useState([]);
  const [companyLogoFile, setCompanyLogoFile] = useState(null);
  const [identityProofFileList, setIdentityProofFileList] = useState([]);
  const [identityProofFile, setIdentityProofFile] = useState(null);
  const [legalRegDocFileList, setLegalRegDocFileList] = useState([]);
  const [legalRegistrationDocumentFile, setLegalRegistrationDocumentFile] =
    useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setUploading(true);

      // Upload identity proof
      let identityProofUrl = "";
      if (identityProofFile) {
        const formData = new FormData();
        formData.append("files", identityProofFile);

        const uploadResponse = await axios.post(
          `${import.meta.env.VITE_API_URL}/Uploads`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        identityProofUrl = uploadResponse.data.urls[0];
      }

      // Upload legal registration document
      let legalRegistrationDocumentUrl = "";
      if (legalRegistrationDocumentFile) {
        const formData = new FormData();
        formData.append("files", legalRegistrationDocumentFile);
        const uploadResponse = await axios.post(
          `${import.meta.env.VITE_API_URL}/Uploads`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        legalRegistrationDocumentUrl = uploadResponse.data.urls[0];
      }

      // Upload company logo
      let companyLogoUrl = "";
      if (companyLogoFile) {
        const formData = new FormData();
        formData.append("files", companyLogoFile);
        const uploadResponse = await axios.post(
          `${import.meta.env.VITE_API_URL}/Uploads`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        companyLogoUrl = uploadResponse.data.urls[0];
      }

      const registrationData = {
        email: values.email,
        password: values.password,
        companyName: values.companyName,
        contactPerson: values.contactPerson,
        companyType: values.companyType,
        companyIndustry: values.companyIndustry,
        companySize: values.companySize,
        identityProof: identityProofUrl,
        legal_registration_document: legalRegistrationDocumentUrl,
        companyLogo: companyLogoUrl,
        companyDescription: values.companyDescription,
        companyWebsite: values.companyWebsite,
      };

      const registrationResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register/employer`,
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
      localStorage.setItem("token", data.access_token || registrationResponse.data.access_token);
      toast.success("Employer registration step completed!");
      resetForm();
      setIdentityProofFile(null);
      setIdentityProofFileList([]);
      setLegalRegistrationDocumentFile(null);
      setLegalRegDocFileList([]);
      setCompanyLogoFile(null);
      setCompanyLogoFileList([]);
      navigate("/employee/register1");
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
    <div className="w-full mx-auto items-center bg-gray-100 dark:bg-gray-900 py-50 px-20 sm:px-6">
      <NotificationSystem ref={notificationSystem} />
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
          companyName: "",
          contactPerson: "",
          companyType: "",
          companyIndustry: "",
          companySize: "",
          identityProof: null,
          legalRegistrationDocument: null,
          companyLogo: null,
          companyDescription: "",
          companyWebsite: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, errors, touched }) => (
          <Form className="space-y-6">
            <FormikDebug />
            <div className="text-center">
              <h1 className="text-2xl font-bold" style={{ color: "#004080" }}>Employer Registration</h1>
              <p className="mt-2">
                Already have an account?{" "}
                <Link to="/employee/login" className="text-blue-500">
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
                <label style={{color:'#004080'}} className="block text-sm font-medium mb-1">
                  Password*
                </label>
                <Field
                  type="password"
                  name="password"
                  className={`w-full p-2 border rounded ${
                    errors.password && touched.password
                      ? "border-red-500"
                      : ""
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

              {/* Company Name */}
              <div className="form-group">
                <label style={{color:'#004080'}} className="block text-sm font-medium mb-1">
                  Company Name*
                </label>
                <Field
                  type="text"
                  name="companyName"
                  className={`w-full p-2 border rounded ${
                    errors.companyName && touched.companyName
                      ? "border-red-500"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="companyName"
                  component="div"
                  className="text-danger"
                />
              </div>

              {/* Contact Person */}
              <div className="form-group">
                <label style={{color:'#004080'}} className="block text-sm font-medium mb-1">
                  Contact Person*
                </label>
                <Field
                  type="text"
                  name="contactPerson"
                  className={`w-full p-2 border rounded ${
                    errors.contactPerson && touched.contactPerson
                      ? "border-red-500"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="contactPerson"
                  component="div"
                  className="text-danger"
                />
              </div>

              {/* Organization Type */}
              <div className="form-group">
                <label style={{color:'#004080'}} className="block text-sm font-medium mb-1">
                  Company Industry*
                </label>
                <Field
                  as="select"
                  name="companyIndustry"
                  className={`w-full p-2 border rounded ${
                    errors.companyIndustry && touched.companyIndustry
                      ? "border-red-500"
                      : ""
                  }`}
                >
                  <option value="">-- Select Industry --</option>
                  {/* options as in your original code */}
                  <option value="Analytics/KPO/Research">
                    Analytics/KPO/Research
                  </option>
                  <option value="BPM/BPO">BPM / BPO</option>
                  <option value="IT Services & Consulting">
                    IT Services & Consulting
                  </option>
                  {/* ... all other options ... */}
                  <option value="Miscellaneous">Miscellaneous</option>
                  <option value="NGO/Social Services/Industry Associations">
                    NGO / Social Services / Industry Associations
                  </option>
                </Field>
                <ErrorMessage
                  name="companyIndustry"
                  component="div"
                  className="text-danger"
                />
              </div>

              {/* Number of Employees */}
              <div className="form-group">
                <label style={{color:'#004080'}} className="block text-sm font-medium mb-1">
                  Company Size*
                </label>
                <Field
                  as="select"
                  name="companySize"
                  className={`w-full p-2 border rounded ${
                    errors.companySize && touched.companySize
                      ? "border-red-500"
                      : ""
                  }`}
                >
                  <option value="">-- Select --</option>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                  <option value="201-500">201-500</option>
                  <option value="501+">501+</option>
                </Field>
                <ErrorMessage
                  name="companySize"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>

            {/* Company Description */}
            <div className="form-group">
              <label
                htmlFor="companyDescription"
                style={{color:'#004080'}}
                className="block text-sm font-medium mb-2"
              >
                Company Description*
              </label>
              <Field
                as="textarea"
                id="companyDescription"
                name="companyDescription"
                rows="4"
                cols="50"
                className={`w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.companyDescription && touched.companyDescription
                    ? "border-red-500"
                    : ""
                }`}
                placeholder="Write a description about your company..."
              />
              <ErrorMessage
                name="companyDescription"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="form-group">
              <label style={{color:'#004080'}} className="block text-sm font-medium mb-1">
                Company Type *
              </label>
              <Field
                as="select"
                name="companyType"
                className={`w-full p-2 border rounded ${
                  errors.companyType && touched.companyType
                    ? "border-red-500"
                    : ""
                }`}
              >
                <option value="">-- Select Organization Type --</option>
                <option value="Private Ltd">Private Ltd</option>
                <option value="Public Ltd">Public Ltd</option>
                <option value="Proprietorship">Proprietorship</option>
                <option value="Partnership">Partnership</option>
                <option value="LLP">LLP</option>
                <option value="NGO">NGO</option>
                <option value="Other">Other</option>
              </Field>
              <ErrorMessage
                name="companyType"
                component="div"
                className="text-danger"
              />
            </div>

            {/* Company Website */}
            <div className="form-group">
              <label style={{color:'#004080'}} className="block text-sm font-medium mb-1">
                Company Website*
              </label>
              <Field
                type="url"
                name="companyWebsite"
                className={`w-full p-2 border rounded ${
                  errors.companyWebsite && touched.companyWebsite
                    ? "border-red-500"
                    : ""
                }`}
              />
              <ErrorMessage
                name="companyWebsite"
                component="div"
                className="text-danger"
              />
            </div>

            {/* Identity Proof Upload */}
            <div className="form-group">
              <label style={{color:'#004080'}} className="block text-sm font-medium mb-1">
                Identity Proof* (upload document)
              </label>
              <Dragger
                name="identityProof"
                multiple={false}
                fileList={identityProofFileList}
                accept=".png,.jpg,.jpeg"
                beforeUpload={(file) => {
                  const isImage = [
                    "image/png",
                    "image/jpeg",
                    "image/jpg",
                  ].includes(file.type);
                  const isLt5M = file.size / 1024 / 1024 < 5;
                  if (!isImage) {
                    message.error("You can only upload image files!");
                    return Upload.LIST_IGNORE;
                  }
                  if (!isLt5M) {
                    message.error("Image must be smaller than 5MB!");
                    return Upload.LIST_IGNORE;
                  }
                  setFieldValue("identityProof", file);
                  setIdentityProofFile(file);
                  setIdentityProofFileList([
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
                    setIdentityProofFileList([]);
                    setIdentityProofFile(null);
                    setFieldValue("identityProof", null);
                  }
                }}
                onRemove={() => {
                  setIdentityProofFileList([]);
                  setIdentityProofFile(null);
                  setFieldValue("identityProof", null);
                }}
                className={`p-4 border-dashed border-2 rounded-lg ${
                  errors.identityProof && touched.identityProof
                    ? "border-red-500"
                    : ""
                }`}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to upload
                </p>
                <p className="ant-upload-hint">
                  Image files only. Max file size: 5MB.
                </p>
              </Dragger>
              <ErrorMessage
                name="identityProof"
                component="div"
                className="text-danger"
              />
            </div>

            {/* Legal Registration Document Upload */}
            <div className="form-group">
              <label style={{color:'#004080'}} className="block text-sm font-medium mb-1">
                Legal Registration Document* (upload document)
              </label>
              <Dragger
                name="legalRegistrationDocument"
                multiple={false}
                fileList={legalRegDocFileList}
                accept=".png,.jpg,.jpeg"
                beforeUpload={(file) => {
                  const isImage = [
                    "image/png",
                    "image/jpeg",
                    "image/jpg",
                  ].includes(file.type);
                  const isLt5M = file.size / 1024 / 1024 < 5;
                  if (!isImage) {
                    message.error("You can only upload image files!");
                    return Upload.LIST_IGNORE;
                  }
                  if (!isLt5M) {
                    message.error("Image must be smaller than 5MB!");
                    return Upload.LIST_IGNORE;
                  }
                  setFieldValue("legalRegistrationDocument", file);
                  setLegalRegistrationDocumentFile(file);
                  setLegalRegDocFileList([
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
                    setLegalRegDocFileList([]);
                    setLegalRegistrationDocumentFile(null);
                    setFieldValue("legalRegistrationDocument", null);
                  }
                }}
                onRemove={() => {
                  setLegalRegDocFileList([]);
                  setLegalRegistrationDocumentFile(null);
                  setFieldValue("legalRegistrationDocument", null);
                }}
                className={`p-4 border-dashed border-2 rounded-lg ${
                  errors.legalRegistrationDocument &&
                  touched.legalRegistrationDocument
                    ? "border-red-500"
                    : ""
                }`}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to upload
                </p>
                <p className="ant-upload-hint">
                  Image files only. Max file size: 5MB.
                </p>
              </Dragger>
              <ErrorMessage
                name="legalRegistrationDocument"
                component="div"
                className="text-danger"
              />
            </div>

            {/* Company Logo Upload */}
            <div className="form-group">
              <label style={{color:'#004080'}} className="block text-sm font-medium mb-1">
                Company Logo* (upload image)
              </label>
              <Dragger
                name="companyLogo"
                multiple={false}
                fileList={companyLogoFileList}
                accept=".png,.jpg,.jpeg"
                beforeUpload={(file) => {
                  const isImage = [
                    "image/png",
                    "image/jpeg",
                    "image/jpg",
                  ].includes(file.type);
                  const isLt5M = file.size / 1024 / 1024 < 5;
                  if (!isImage) {
                    message.error("You can only upload image files!");
                    return Upload.LIST_IGNORE;
                  }
                  if (!isLt5M) {
                    message.error("Image must be smaller than 5MB!");
                    return Upload.LIST_IGNORE;
                  }
                  setFieldValue("companyLogo", file);
                  setCompanyLogoFile(file);
                  setCompanyLogoFileList([
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
                    setCompanyLogoFileList([]);
                    setCompanyLogoFile(null);
                    setFieldValue("companyLogo", null);
                  }
                }}
                onRemove={() => {
                  setCompanyLogoFileList([]);
                  setCompanyLogoFile(null);
                  setFieldValue("companyLogo", null);
                }}
                className={`p-4 border-dashed border-2 rounded-lg ${
                  errors.companyLogo && touched.companyLogo
                    ? "border-red-500"
                    : ""
                }`}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag company logo to upload
                </p>
                <p className="ant-upload-hint">
                  Only .png, .jpg, .jpeg files. Max 5MB.
                </p>
              </Dragger>
              <ErrorMessage
                name="companyLogo"
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
  onClick={() => {
    // Optionally handle click event
  }}
>
  {uploading ? "Processing..." : "Register Company"}
</button>

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;