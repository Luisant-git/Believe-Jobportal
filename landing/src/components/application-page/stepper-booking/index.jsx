import { useNavigate } from 'react-router-dom';
import { getJobById } from "@/api/job";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingDetails from "../sidebar/BookingDetails";
import { message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { getAuthDatum } from "@/utils/auth";
import { posApplication } from "@/api/application";
import { getJobSeekerByIdApi } from "@/api/jobseeker";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import Dragger from "antd/es/upload/Dragger";
import axios from "axios";
import Swal from "sweetalert2";

const JobApplicationForm = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [jobSeeker, setJobSeeker] = useState(null);
  const Userdata = getAuthDatum();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const validationSchema = Yup.object().shape({
    expectedSalary: Yup.string().required("Expected salary is required"),
    currentSalary: Yup.string().required("Current salary is required"),
    experienceYears: Yup.number()
      .min(0, "Experience years must be 0 or more")
      .required("Years of experience is required"),
    resumeUrl: Yup.string().when([], {
      is: () => !jobSeeker?.resume,
      then: (schema) => schema.required("Resume is required"),
      otherwise: (schema) => schema,
    }),
  });
const navigate = useNavigate();
const userId = localStorage.getItem("userId");
  const formik = useFormik({
    initialValues: {
      expectedSalary: jobSeeker?.preferredSalary || "",
      currentSalary: "",
      experienceYears: jobSeeker?.experience ? parseInt(jobSeeker.experience) || 0 : "",
      resumeUrl: jobSeeker?.resume || "",
      jobId: id,
      jobSeekerId: Userdata?.decodedToken?.specificId||Userdata?.decodedToken?.seekerId,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      try {
        setUploading(true);

        if (file) {
          const formData = new FormData();
          formData.append("files", file);

          const uploadResponse = await axios.post(
            `${import.meta.env.VITE_API_URL}/uploads`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (uploadResponse.data?.urls?.[0]) {
            values.resumeUrl = uploadResponse.data.urls[0];
          } else {
            throw new Error("Failed to upload resume");
          }
        }
        const response = await posApplication(userId, values);
        if (response) {
          toast.success("Application submitted successfully!");
          Swal.fire({
            title: "Job Applied Successfully",
            text: "You clicked the button!",
            icon: "success"
          });
          formik.resetForm();
          setFile(null);
          navigate('/myapplications')
        } else {
          toast.error("Failed to submit application. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting application:", error);
        toast.error(
          error.response?.data?.message ||
            "An error occurred. Please try again later."
        );
      } finally {
        setUploading(false);
      }
    },
  });

  const fetchJobDetails = () => {
    getJobById(id)
      .then((res) => {
        setJob(res.data);
      })
      .catch((error) => {
        console.error("Error fetching job:", error);
        toast.error("Failed to load job details");
      });
  };

  const fetchJobSeekerDetails = () => {
    const seekerId = Userdata?.decodedToken?.specificId || Userdata?.decodedToken?.seekerId;
    if (seekerId) {
      getJobSeekerByIdApi(seekerId)
        .then((res) => {
          setJobSeeker(res.data);
        })
        .catch((error) => {
          console.error("Error fetching job seeker details:", error);
        });
    }
  };

  useEffect(() => {
    fetchJobDetails();
    fetchJobSeekerDetails();
  }, []);

  const handleBeforeUpload = (file) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      message.error("You can only upload PDF, DOC, DOCX, or TXT files!");
      return false;
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error("File must be smaller than 5MB!");
      return false;
    }

    setFile(file);
    formik.setFieldValue("resumeUrl", "file_selected"); 
    return false; 
  };

  return (
    <div className="row y-gap-30 x-gap-30 pt-20">
      <div className="col-xl-7 col-lg-8 mt-30">
        <h2 style={{color:'#004080'}} className="text-22 fw-500 mt-40 md:mt-24">Job Application Form</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="row x-gap-20 y-gap-20 pt-20">
            <div className="col-md-6">
              <div className="form-input">
                <input
                  name="expectedSalary"
                  value={formik.values.expectedSalary}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                />
                <label className="lh-1 text-16 text-light-1">
                  Expected Salary
                </label>
              </div>
              {formik.touched.expectedSalary &&
                formik.errors.expectedSalary && (
                  <div className="text-danger">
                    {formik.errors.expectedSalary}
                  </div>
                )}
            </div>
            <div className="col-md-6">
              <div className="form-input">
                <input
                  name="currentSalary"
                  value={formik.values.currentSalary}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                />
                <label className="lh-1 text-16 text-light-1">
                  Current Salary
                </label>
              </div>
              {formik.touched.currentSalary && formik.errors.currentSalary && (
                <div className="text-danger">{formik.errors.currentSalary}</div>
              )}
            </div>
            <div className="col-md-12">
              <div className="form-input">
                <input
                  name="experienceYears"
                  value={formik.values.experienceYears}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="number"
                  min="0"
                />
                <label className="lh-1 text-16 text-light-1">
                  Years of Experience
                </label>
              </div>
              {formik.touched.experienceYears &&
                formik.errors.experienceYears && (
                  <div className="text-danger">
                    {formik.errors.experienceYears}
                  </div>
                )}
            </div>
            <div className="col-12">
              <h6 style={{color:'#004080'}} className="mt-3">Upload new resume {!jobSeeker?.resume ? '(Required)' : '(Optional)'}</h6>
              <div className="form-group">
                <label style={{color:'#004080'}} className="block text-sm font-medium mb-1">
                  Resume {!jobSeeker?.resume ? '*' : ''} (PDF, DOC, DOCX, TXT - max 5MB)
                </label>
                <Dragger
                  accept=".pdf,.doc,.docx,.txt"
                  multiple={false}
                  beforeUpload={handleBeforeUpload}
                  showUploadList={{
                    showRemoveIcon: true,
                  }}
                  onRemove={() => {
                    setFile(null);
                    formik.setFieldValue("resumeUrl", jobSeeker?.resume || "");
                  }}
                  className={`p-4 border-dashed border-2 rounded-lg ${
                    formik.touched.resumeUrl && formik.errors.resumeUrl
                      ? "border-red-500"
                      : ""
                  }`}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag document file to upload
                  </p>
                  <p className="ant-upload-hint">
                    PDF, DOC, DOCX, TXT files are accepted. Maximum file size: 5MB.
                  </p>
                </Dragger>
                {(jobSeeker?.resume && !file && formik.values.resumeUrl) && (
                  <div style={{color: '#28a745'}}>
                    📄 {jobSeeker.resume.split('/').pop()} (Pre-filled from your profile) 
                    <span 
                      style={{cursor: 'pointer', marginLeft: '10px', color: '#dc3545'}}
                      onClick={() => {
                        formik.setFieldValue("resumeUrl", "");
                      }}
                    >
                      🗑️
                    </span>
                  </div>
                )}
                {formik.touched.resumeUrl && formik.errors.resumeUrl && (
                  <div className="text-danger">{formik.errors.resumeUrl}</div>
                )}
              </div>
            </div>
            <div className="col-12">
              <div className="row y-gap-20 items-center justify-between">
                <div className="col-auto">
              <button
  type="submit"
  style={{ backgroundColor: "#004080", color: "#ffffff", fontWeight: "bold" }}
  className="button py-20 px-24 -dark-1 w-100"
  disabled={uploading || !formik.isValid}
>
  {uploading ? "Submitting..." : "Submit Application"}
</button>

                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="col-xl-5 col-lg-4 mt-30">
        <div className="booking-sidebar">
          <BookingDetails job={job} formData={formik.values} />
        </div>
      </div>
    </div>
  );
};

export default JobApplicationForm;
