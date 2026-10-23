import React, { useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { message } from "antd";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import NotificationSystem from "react-notification-system";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Debug component to log Formik state
const FormikDebug = () => {
  const { values, errors, touched, isValid, isSubmitting } = useFormikContext();
  console.log("Formik state:", {
    values,
    errors,
    touched,
    isValid,
    isSubmitting,
  });
  return null;
};

// Validation schema for the form
const validationSchema = Yup.object().shape({
  companyEmail: Yup.string()
    .email("Invalid email address")
    .required("Company email is required"),
  companyPhone: Yup.string().required("Company phone is required"),
  companyState: Yup.string().required("State is required"),
  companyCity: Yup.string().required("City is required"),
  companyPincode: Yup.string().required("Pincode is required"),
  companyAddress: Yup.string().required("Registered address is required"),
});

export const Register1 = () => {
  const [uploading, setUploading] = useState(false);
  const notificationSystem = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const initialFormData = location.state?.formData || {};

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    setUploading(true);
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error(
          "User ID is missing. Please complete the first registration step."
        );
      }

      const registrationData = {
        companyEmail: values.companyEmail,
        companyPhone: values.companyPhone,
        companyState: values.companyState,
        companyCity: values.companyCity,
        companyPincode: values.companyPincode,
        companyAddress: values.companyAddress,
      };

      console.log("Sending registration data:", registrationData);

      const apiUrl = `${import.meta.env.VITE_API_URL}/users/${userId}/employer`;
      console.log("API URL:", apiUrl);

      const registrationResponse = await axios.patch(apiUrl, registrationData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (
        registrationResponse.status >= 200 &&
        registrationResponse.status < 300
      ) {
        toast.success("Employer registration step completed!");
      } else {
        toast.error("Registration completed but with unexpected status");
      }

      navigate("/employee/register2");
    } catch (error) {
      console.error("Submission error:", error);

      let errorMessage = "Registration failed. Please try again.";
      if (error.response) {
        if (error.response.status === 404) {
          errorMessage =
            "API endpoint not found. Please check the server configuration.";
        } else if (error.response.status === 401) {
          errorMessage =
            "Unauthorized. Please complete the first registration step.";
        } else {
          errorMessage = error.response.data?.message || errorMessage;
        }
      } else if (
        error.message.includes("User ID is missing") ||
        error.message.includes("token")
      ) {
        errorMessage = error.message;
      }

      notificationSystem.current?.addNotification({
        message: errorMessage,
        level: "error",
      });
    } finally {
      console.log("Resetting states...");
      setUploading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="w-1/2 m-auto items-center bg-gray-100 dark:bg-gray-900 py-50 px-10 sm:px-6">
      <div className="w-full mx-auto p-5 bg-white dark:bg-gray-800 rounded-3g shadow-lg border-10 border-gray-300 dark:border-gray-600">
        <NotificationSystem ref={notificationSystem} />
        <Formik
          initialValues={{
            companyEmail: initialFormData.companyEmail || "",
            companyPhone: initialFormData.companyPhone || "",
            companyState: initialFormData.companyState || "",
            companyCity: initialFormData.companyCity || "",
            companyPincode: initialFormData.companyPincode || "",
            companyAddress: initialFormData.companyAddress || "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="space-y-8">
              <FormikDebug />
              <div className="text-center">
                <h2
                  className="text-3xl font-bold text-gray-900"
                  style={{ color: "#004080" }}
                >
                  Employer Registration <br /> (COMPANY INFORMATION)
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Company Email */}
                <div className="form-group">
                  <label
                    htmlFor="companyEmail"
                    style={{color:'#004080'}}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Company Email<span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="email"
                    name="companyEmail"
                    id="companyEmail"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${
                      errors.companyEmail && touched.companyEmail
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    aria-required="true"
                    aria-describedby="companyEmail-error"
                  />
                  <ErrorMessage
                    name="companyEmail"
                    component="div"
                    className="text-danger"
                    id="companyEmail-error"
                  />
                </div>

                {/* Company Phone */}
                <div className="form-group">
                  <label
                    htmlFor="companyPhone"
                    style={{color:'#004080'}}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Company Phone<span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="tel"
                    name="companyPhone"
                    id="companyPhone"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${
                      errors.companyPhone && touched.companyPhone
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    aria-required="true"
                    aria-describedby="companyPhone-error"
                  />
                  <ErrorMessage
                    name="companyPhone"
                    component="div"
                    className="text-danger"
                    id="companyPhone-error"
                  />
                </div>

                {/* Company State */}
                <div className="form-group">
                  <label
                    htmlFor="companyState"
                    style={{color:'#004080'}}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Company State<span className="text-red-500">*</span>
                  </label>
                  <Field
                    as="select"
                    name="companyState"
                    id="companyState"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${
                      errors.companyState && touched.companyState
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    aria-required="true"
                    aria-describedby="companyState-error"
                  >
                    <option value="">Select State</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Andaman and Nicobar Islands">
                      Andaman and Nicobar Islands
                    </option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Dadra and Nagar Haveli and Daman and Diu">
                      Dadra and Nagar Haveli and Daman and Diu
                    </option>
                    <option value="Delhi">Delhi</option>
                    <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                    <option value="Ladakh">Ladakh</option>
                    <option value="Lakshadweep">Lakshadweep</option>
                    <option value="Puducherry">Puducherry</option>
                  </Field>
                  <ErrorMessage
                    name="companyState"
                    component="div"
                    className="text-danger"
                    id="companyState-error"
                  />
                </div>

                {/* Company City */}
                <div className="form-group">
                  <label
                    htmlFor="companyCity"
                    style={{color:'#004080'}}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Company City<span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="text"
                    name="companyCity"
                    id="companyCity"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${
                      errors.companyCity && touched.companyCity
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    aria-required="true"
                    aria-describedby="companyCity-error"
                  />
                  <ErrorMessage
                    name="companyCity"
                    component="div"
                    className="text-danger"
                    id="companyCity-error"
                  />
                </div>

                {/* Company Address */}
                <div className="form-group">
                  <label
                    htmlFor="companyAddress"
                    style={{color:'#004080'}}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Company Address<span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="text"
                    name="companyAddress"
                    id="companyAddress"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${
                      errors.companyAddress && touched.companyAddress
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    aria-required="true"
                    aria-describedby="companyAddress-error"
                  />
                  <ErrorMessage
                    name="companyAddress"
                    component="div"
                    className="text-danger"
                    id="companyAddress-error"
                  />
                </div>

                {/* Company Pincode */}
                <div className="form-group">
                  <label
                    htmlFor="companyPincode"
                    style={{color:'#004080'}}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Company Pincode<span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="text"
                    name="companyPincode"
                    id="companyPincode"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${
                      errors.companyPincode && touched.companyPincode
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    aria-required="true"
                    aria-describedby="companyPincode-error"
                  />
                  <ErrorMessage
                    name="companyPincode"
                    component="div"
                    className="text-danger"
                    id="companyPincode-error"
                  />
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center gap-6 mt-6">
                {/* Back Button */}
                {/* <button
    type="button"
    disabled={uploading}
    onClick={() => navigate("/employee/register2")}
    className={`px-6 py-3 btn btn-primary  m-lg-4 rounded-lg font-medium transition duration-200 ${
      uploading
        ? "bg-gray-400 text-white cursor-not-allowed"
        : "bg-gray-600 hover:bg-gray-700 text-red"
    }`}
  >
    {uploading ? "Processing..." : "Next"}
  </button> */}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || uploading}
                  style={{
                    marginTop: 30,
                    backgroundColor: "#004080",
                    color: "#ffffff",
                    border: "none",
                    opacity: isSubmitting || uploading ? 0.7 : 1,
                    cursor:
                      isSubmitting || uploading ? "not-allowed" : "pointer",
                  }}
                  onClick={() =>
                    console.log("Register button clicked", {
                      isSubmitting,
                      uploading,
                    })
                  }
                  className="w-100 px-6 py-3 rounded-lg font-medium transition duration-200"
                >
                  {isSubmitting || uploading
                    ? "Processing..."
                    : "Save & Continue"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register1;
