import React, { useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import NotificationSystem from "react-notification-system";
import axios from "axios";
import { toast } from "react-toastify";

const MAX_FILE_SIZE = 2 * 1024 * 1024;

// Validation schema
const validationSchema = Yup.object().shape({
  full_name: Yup.string().required("Full name is required"),
  designation: Yup.string().required("Designation is required"),
  employee_id: Yup.mixed()
    .required("Employee ID file is required")
    .test(
      "fileSize",
      "File too large (max 2MB)",
      (value) => !value || (value && value.size <= MAX_FILE_SIZE)
    ),
  authorization_letter: Yup.mixed()
    .required("Authorization letter is required")
    .test(
      "fileSize",
      "File too large (max 2MB)",
      (value) => !value || (value && value.size <= MAX_FILE_SIZE)
    ),
  business_card: Yup.mixed()
    .required("Business card is required")
    .test(
      "fileSize",
      "File too large (max 2MB)",
      (value) => !value || (value && value.size <= MAX_FILE_SIZE)
    ),
});

export const Register2 = () => {
  const notificationSystem = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const initialFormData = location.state?.formData || {};

  // Upload a single file to the backend and return the uploaded file URL
  const uploadSingleFile = async (file) => {
    const formData = new FormData();
    formData.append("files", file);
    const uploadURL = `${import.meta.env.VITE_API_URL}/uploads`;
    const response = await axios.post(uploadURL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.urls[0];
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        toast.error(
          "User ID is missing. Please complete the first registration step."
        );
        throw new Error(
          "User ID is missing. Please complete the first registration step."
        );
      }

      // 1. Upload files and get their URLs
      const employeeIdUrl = values.employee_id
        ? await uploadSingleFile(values.employee_id)
        : null;
      const authorizationLetterUrl = values.authorization_letter
        ? await uploadSingleFile(values.authorization_letter)
        : null;
      const businessCardUrl = values.business_card
        ? await uploadSingleFile(values.business_card)
        : null;

      // 2. Prepare payload with URLs
      const payload = {
        full_name: values.full_name,
        designation: values.designation,
        employee_id: employeeIdUrl,
        authorization_letter: authorizationLetterUrl,
        business_card: businessCardUrl,
      };

      // 3. Send PATCH to employer endpoint
      const apiUrl = `${import.meta.env.VITE_API_URL}/users/${userId}/employer`;
      const registrationResponse = await axios.patch(apiUrl, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (
        registrationResponse.status >= 200 &&
        registrationResponse.status < 300
      ) {
        toast.success("Employer registration completed!");
        resetForm();
        navigate("/employee/login");
      } else {
        toast.error("Registration completed but with unexpected status");
      }
    } catch (error) {
      console.error("Submission error:", error);
      let errorMessage = "Registration failed. Please try again.";

      const status = error?.response?.status;

      if (status === 404) {
        errorMessage =
          "API endpoint not found. Please check the server configuration.";
      } else if (status === 401) {
        errorMessage = "Unauthorized. Please complete the previous steps.";
      } else if (status === 413) {
        errorMessage = "File too large. Please upload a smaller file.";
      } else if (status) {
        errorMessage = error.response.data?.message || errorMessage;
      } else if (error.message?.includes("User ID or token is missing")) {
        errorMessage = error.message;
      }

      notificationSystem.current?.addNotification({
        message: errorMessage,
        level: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-1/2 m-auto items-center bg-gray-100 dark:bg-gray-900 py-50 px-20 sm:px-6">
      <div className="w-full mx-auto p-5 bg-white dark:bg-gray-800 rounded-3g shadow-lg border-10 border-gray-300 dark:border-gray-600">
        <NotificationSystem ref={notificationSystem} />
        <Formik
          initialValues={{
            full_name: initialFormData.full_name || "",
            designation: initialFormData.designation || "",
            employee_id: null,
            authorization_letter: null,
            business_card: null,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched, setFieldValue, values }) => (
            <Form className="space-y-6">
              <div className="text-center">
                <h2
                  className="text-3xl font-bold text-gray-900"
                  style={{ color: "#004080" }}
                >
                  Employee Registration <br /> (AUTHORIZED REPRESENTATIVE)
                </h2>
                <p className="mt-2 text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/employee/login"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Log in
                  </Link>
                </p>
              </div>

              {/* Text Fields */}
              {[
                { label: "Full Name", name: "full_name" },
                { label: "Designation", name: "designation" },
              ].map(({ label, name }) => (
                <div className="form-group" key={name}>
                  <label
                    htmlFor={name}
                    style={{color:'#004080'}}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {label} <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="text"
                    name={name}
                    id={name}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${
                      errors[name] && touched[name]
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  <ErrorMessage
                    name={name}
                    component="div"
                    className="text-danger"
                  />
                </div>
              ))}

              {/* File Uploads */}
              {[
                { label: "Employee ID", name: "employee_id" },
                { label: "Authorization Letter", name: "authorization_letter" },
                { label: "Business Card", name: "business_card" },
              ].map(({ label, name }) => (
                <div className="form-group" key={name}>
                  <label
                    htmlFor={name}
                    style={{color:'#004080'}}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {label} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id={name}
                    name={name}
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={(event) => {
                      setFieldValue(name, event.currentTarget.files[0]);
                    }}
                    className="w-full p-2 border rounded-lg bg-white"
                  />
                  {values[name] && values[name].name && (
                    <div style={{color:'#004080'}} className="text-xs text-gray-500 mt-1">
                      Selected file: {values[name].name}
                    </div>
                  )}
                  <ErrorMessage
                    name={name}
                    component="div"
                    className="text-danger"
                  />
                </div>
              ))}

              {/* Buttons */}
              <div className="flex justify-between gap-4">
                <div className="mt-40">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`block mx-auto w-100 px-6 py-3 rounded-lg font-medium transition duration-200 ${
                      isSubmitting ? "cursor-not-allowed" : ""
                    }`}
                    style={{
                      backgroundColor: "#004080",
                      color: "#ffffff",
                      border: "none",
                      opacity: isSubmitting ? 0.7 : 1,
                    }}
                  >
                    {isSubmitting ? "Processing..." : "Complete Registration"}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register2;
