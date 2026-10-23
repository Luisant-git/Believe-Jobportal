import { useFormik } from "formik";
import * as Yup from "yup";
import { Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./style.css";
import { lookupCategoryAdmin, postCategory } from "@/api/category";
import { postJob, getJobById, updateJob } from "@/api/job";
import { useNavigate, useParams } from "react-router-dom";
import { loookupEmp } from "@/api/employers";

const JobType = {
  FULL_TIME: "full_time",
  PART_TIME: "part_time",
  CONTRACT: "contract",
  FREELANCE: "freelance",
  INTERNSHIP: "internship",
  TEMPORARY: "temporary",
};

const JobStatus = {
  OPEN: "open",
  CLOSED: "closed",
  // PENDING: "pending",
  // DRAFT: "draft",
};

const BenefitsOptions = [
  "Health insurance",
  "Provident Fund",
  "Cell phone reimbursement",
  "Paid sick time",
  "Work from home",
  "Paid time off",
  "Food provided",
];

const QualificationsOptions = [
  "B.A. – Bachelor of Arts",
  "B.Sc. – Bachelor of Science",
  "B.Com. – Bachelor of Commerce",
  "BBA – Bachelor of Business Administration",
  "BCA – Bachelor of Computer Applications",
  "B.Tech. – Bachelor of Technology",
  "B.E. – Bachelor of Engineering",
  "MBBS – Bachelor of Medicine and Bachelor of Surgery",
  "BDS – Bachelor of Dental Surgery",
  "BAMS – Bachelor of Ayurvedic Medicine and Surgery",
  "BHMS – Bachelor of Homeopathic Medicine and Surgery",
  "B.Pharm – Bachelor of Pharmacy",
  "B.Arch – Bachelor of Architecture",
  "B.Ed. – Bachelor of Education (after graduation)",
  "LLB – Bachelor of Laws (3 years or 5 years integrated after 12th)",
  "BFA – Bachelor of Fine Arts",
  "BSW – Bachelor of Social Work",
  "B.Lib.Sc. – Bachelor of Library Science",
  "BPEd – Bachelor of Physical Education",
  "M.A. – Master of Arts",
  "M.Sc. – Master of Science",
  "M.Com. – Master of Commerce",
  "MBA – Master of Business Administration",
  "MCA – Master of Computer Applications",
  "M.Tech. – Master of Technology",
  "M.E. – Master of Engineering",
  "M.Pharm – Master of Pharmacy",
  "M.Arch – Master of Architecture",
  "M.Ed. – Master of Education",
  "LLM – Master of Laws",
  "MSW – Master of Social Work",
  "M.Lib.Sc. – Master of Library Science",
  "MFA – Master of Fine Arts",
  "MPEd – Master of Physical Education",
  "Ph.D. – Doctor of Philosophy",
  "M.Phil. – Master of Philosophy (being phased out)",
  "D.Sc. – Doctor of Science",
  "D.Litt. – Doctor of Literature",
  "LLD – Doctor of Laws",
  "DM – Doctorate of Medicine (post-MD super-specialty)",
  "M.Ch. – Master of Chirurgiae (post-MS super-specialty)",
];

const SkillsOptions = [
  "Customer Service",
  "Administrative Experience",
  "Microsoft Office",
  "English Language",
  "Tamil Language",
  "Typing Skill",
  "Phone Etiquette",
  "Organizational Skills",
];

function FormDetails({}) {
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [benefitInput, setBenefitInput] = useState("");
  const [qualificationInput, setQualificationInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [companyLooUp, setCompanyLookUp] = useState([]);
  console.log("Company Lookup: ", companyLooUp);

  const [stateInput, setStateInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [areaInput, setAreaInput] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const generateJobCode = () => {
    const randomString = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();
    return `JOB_${randomString}`;
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Job Title is required"),
    description: Yup.string().required("Description is required"),
    location: Yup.string().required("Location is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    area: Yup.string().required("Area is required"),
    type: Yup.string()
      .oneOf(Object.values(JobType), "Invalid job type")
      .required("Job Type is required"),
    skillsRequired: Yup.array()
      .of(Yup.string())
      .min(1, "At least one skill is required"),
    benefits: Yup.array()
      .of(Yup.string())
      .min(1, "At least one benefit is required"),
    qualifications: Yup.array()
      .of(Yup.string())
      .min(1, "At least one qualification is required"),
    status: Yup.string().oneOf(Object.values(JobStatus), "Invalid status"),
    companyLogo: Yup.string().url("Invalid URL"),
  });

  const getcompanyLookup = () => {
    loookupEmp().then((res) => {
      setCompanyLookUp(res.data);
    });
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      location: "",
      state: "",
      city: "",
      area: "",
      type: "",
      zipCode: "",
      experience: "",
      salaryRange: "",
      remote: false,
      approved: false,
      numberOfPositions: 1,
      industry: "",
      isUrgent: false,
      notes: "",
      jobCode: generateJobCode(),
      companyName: "",
      skillsRequired: [],
      benefits: [],
      qualifications: [],
      categoryId: "",
      status: JobStatus.OPEN,
      companyId: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);

      try {
        const jobData = {
          ...values,
          salaryRange: `${minSalary}-${maxSalary}`,
          remote: values.remote === "true",
          isUrgent: values.isUrgent === "true",
          numberOfPositions: Number(values.numberOfPositions),
        };
        let response;
        if (id) {
          response = await updateJob(id, jobData);
        } else {
          response = await postJob(jobData);
        }
        if (response?.id) {
          toast.success(
            id ? "Job updated successfully!" : "Job posted successfully!"
          );
          navigate("/dashboard/db-joblist");
          if (!id) {
            formik.resetForm({
              values: {
                ...formik.initialValues,
                jobCode: generateJobCode(),
                skillsRequired: [],
                benefits: [],
                qualifications: [],
                state: "",
                city: "",
                area: "",
              },
            });
            setMinSalary("");
            setMaxSalary("");
          }
        } else {
          toast.error(response?.message || "Failed to process job");
        }
      } catch (error) {
        console.error("Error submitting job:", error);
        toast.error(
          error.message || "An error occurred while submitting the job"
        );
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  useEffect(() => {
    const fetchJobData = async () => {
      if (id) {
        try {
          const response = await getJobById(id);
          const jobData = response.data;

          const [min, max] = jobData.salaryRange
            ? jobData.salaryRange.split("-").map((value) => value.trim())
            : ["", ""];

          setMinSalary(min);
          setMaxSalary(max);

          formik.setValues({
            title: jobData.title || "",
            description: jobData.description || "",
            location: jobData.location || "",
            state: jobData.state || "",
            city: jobData.city || "",
            area: jobData.area || "",
            type: jobData.type || "",
            zipCode: jobData.zipCode || "",
            experience: jobData.experience || "",
            salaryRange: jobData.salaryRange || "",
            remote: jobData.remote ? "true" : "false",
            approved: jobData.approved || false,
            numberOfPositions: jobData.numberOfPositions || 1,
            industry: jobData.industry || "",
            isUrgent: jobData.isUrgent ? "true" : "false",
            notes: jobData.notes || "",
            jobCode: jobData.jobCode || "",
            companyName: jobData.companyName || "",
            skillsRequired: jobData.skillsRequired || [],
            benefits: jobData.benefits || [],
            qualifications: jobData.qualifications || [],
            categoryId: jobData.categoryId || "",
            companyId: jobData.companyId || "",
            status: jobData.status || JobStatus.OPEN,
          });
          setCompanyInput(jobData.companyName || "");
        } catch (error) {
          console.error("Error fetching job data:", error);
        }
      }
    };

    fetchJobData();
    getcompanyLookup();
  }, [id]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await lookupCategoryAdmin();
        setCategories(response?.data?.data || response?.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleAddSkill = () => {
    if (
      skillInput.trim() !== "" &&
      !formik.values.skillsRequired.includes(skillInput)
    ) {
      const newSkills = [...formik.values.skillsRequired, skillInput.trim()];
      formik.setFieldValue("skillsRequired", newSkills);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = [...formik.values.skillsRequired];
    updatedSkills.splice(index, 1);
    formik.setFieldValue("skillsRequired", updatedSkills);
  };

  const handleAddBenefit = () => {
    if (
      benefitInput.trim() !== "" &&
      !formik.values.benefits.includes(benefitInput)
    ) {
      const newBenefits = [...formik.values.benefits, benefitInput.trim()];
      formik.setFieldValue("benefits", newBenefits);
      setBenefitInput("");
    }
  };

  const handleRemoveBenefit = (index) => {
    const updatedBenefits = [...formik.values.benefits];
    updatedBenefits.splice(index, 1);
    formik.setFieldValue("benefits", updatedBenefits);
  };

  const handleAddQualification = () => {
    if (
      qualificationInput.trim() !== "" &&
      !formik.values.qualifications.includes(qualificationInput)
    ) {
      const newQualifications = [
        ...formik.values.qualifications,
        qualificationInput.trim(),
      ];
      formik.setFieldValue("qualifications", newQualifications);
      setQualificationInput("");
    }
  };

  const handleRemoveQualification = (index) => {
    const updatedQualifications = [...formik.values.qualifications];
    updatedQualifications.splice(index, 1);
    formik.setFieldValue("qualifications", updatedQualifications);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleNewCategoryChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOk = async () => {
    if (newCategory.name && newCategory.description) {
      try {
        const userId = localStorage.getItem("userId");
        const response = await postCategory(userId, newCategory);

        if (response.success) {
          toast.success("Category added successfully!");
          setNewCategory({ name: "", description: "" });
          setIsModalVisible(false);
          const updatedCategories = await lookupCategoryAdmin();
          setCategories(updatedCategories.data?.data || updatedCategories.data);
        } else {
          toast.error(response.message || "Failed to add category.");
        }
      } catch (error) {
        console.error("Error adding category:", error);
        toast.error("An error occurred while adding the category.");
      }
    } else {
      toast.error("Please fill in all fields.");
    }
  };

  const renderError = (fieldName) => {
    return formik.touched[fieldName] && formik.errors[fieldName] ? (
      <div className="text-danger small">{formik.errors[fieldName]}</div>
    ) : null;
  };

  const isRequired = (fieldName) => {
    return validationSchema.fields[fieldName]?.exclusiveTests?.required;
  };

  return (
    <div className="row x-gap-20 y-gap-20">
    <h2 style={{ color: "#004080" }}>Job Information</h2>

      <>
        {/* Title */}
        <div className="col-12">
          <div className="form-input">
            <input
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required={isRequired("title")}
            />
            <label className="lh-1 text-16 text-light-1">
              Job Title<span className="text-danger"> *</span>
            </label>
          </div>
          {renderError("title")}
        </div>

        {/* Job Code */}
        <div className="col-12">
          <div className="form-input">
            <input
              type="text"
              name="jobCode"
              value={formik.values.jobCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={!!id}
              required={isRequired("jobCode")}
            />
            <label className="lh-1 text-16 text-light-1">
              Job Code <span className="text-danger"> *</span>
            </label>
          </div>
          {renderError("jobCode")}
        </div>

        {/* Description */}
        <div className="col-12">
          <div className="form-input">
            <textarea
              name="description"
              rows={5}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required={isRequired("description")}
            />
            <label className="lh-1 text-16 text-light-1">
              Description
              {isRequired("description") && (
                <span className="text-danger"> *</span>
              )}
            </label>
          </div>
          {renderError("description")}
        </div>

        {/* Location */}
        <div className="col-md-6">
          <div className="form-input">
            <input
              type="text"
              name="location"
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required={isRequired("location")}
            />
            <label className="lh-1 text-16 text-light-1">
              Location <span className="text-danger"> *</span>
            </label>
          </div>
          {renderError("location")}
        </div>

        {/* State */}
        <div className="col-md-6">
          <div className="form-input">
            <input
              type="text"
              name="state"
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required={isRequired("state")}
            />
            <label className="lh-1 text-16 text-light-1">
              State <span className="text-danger"> *</span>
            </label>
          </div>
          {renderError("state")}
        </div>

        {/* City */}
        <div className="col-md-6">
          <div className="form-input">
            <input
              type="text"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required={isRequired("city")}
            />
            <label className="lh-1 text-16 text-light-1">
              City <span className="text-danger"> *</span>
            </label>
          </div>
          {renderError("city")}
        </div>

        {/* Area */}
        <div className="col-md-6">
          <div className="form-input">
            <input
              type="text"
              name="area"
              value={formik.values.area}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required={isRequired("area")}
            />
            <label className="lh-1 text-16 text-light-1">
              Area <span className="text-danger"> *</span>
            </label>
          </div>
          {renderError("area")}
        </div>

        {/* Salary Range */}
        <div className="col-md-3">
          <div className="form-input">
            <input
              type="number"
              name="minSalary"
              value={minSalary}
              onChange={(e) => setMinSalary(e.target.value)}
            />
            <label className="lh-1 text-16 text-light-1">Min Salary</label>
          </div>
        </div>

        <div className="col-md-3">
          <div className="form-input">
            <input
              type="number"
              name="maxSalary"
              value={maxSalary}
              onChange={(e) => setMaxSalary(e.target.value)}
            />
            <label className="lh-1 text-16 text-light-1">Max Salary</label>
          </div>
        </div>

        {/* Experience */}
        <div className="col-md-6">
          <div className="form-input">
            <input
              type="text"
              name="experience"
              value={formik.values.experience}
              onChange={formik.handleChange}
            />
            <label className="lh-1 text-16 text-light-1">Experience</label>
          </div>
        </div>

        {/* Job Type */}
        <div className="col-md-6">
          <div className="form-input border p-3 mt-3">
            <select
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required={isRequired("type")}
            >
              <option value="">Select Job Type</option>
              <option value={JobType.FULL_TIME}>Full Time</option>
              <option value={JobType.PART_TIME}>Part Time</option>
              <option value={JobType.CONTRACT}>Contract</option>
              <option value={JobType.FREELANCE}>Freelance</option>
              <option value={JobType.INTERNSHIP}>Internship</option>
              <option value={JobType.TEMPORARY}>Temporary</option>
            </select>
          </div>
          {renderError("type")}
        </div>

        {/* Status (only visible in update mode) */}
        {id && (
          <div className="col-md-6">
            <label className="lh-1 text-16 text-light-1">Job Status</label>
            <div className="form-input border p-3">
              <select
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value={JobStatus.OPEN}>Open</option>
                <option value={JobStatus.CLOSED}>Closed</option>
                {/* <option value={JobStatus.PENDING}>Pending</option>
                <option value={JobStatus.DRAFT}>Draft</option> */}
              </select>
              
            </div>
          </div>
        )}

        {/* Remote */}
        <div className="col-md-6">
          <label className="lh-1 text-16 text-light-1 pb-5">Is this a Remote Job?*</label>
          <div className="form-input border p-3">
            <select
              name="remote"
              value={formik.values.remote}
              onChange={formik.handleChange}
            >
              <option value="false">No (On-site)</option>
              <option value="true">Yes (Remote)</option>
            </select>
            
          </div>
        </div>

        {/* Urgent */}
        <div className="col-md-6">
          <div className="form-input border p-3">
            <select
              name="isUrgent"
              value={formik.values.isUrgent}
              onChange={formik.handleChange}
            >
              <option value="false">Normal Hiring</option>
              <option value="true">Urgent Position</option>
            </select>
          </div>
        </div>

        {/* Category */}
        <div className="col-md-6">
          <div className="form-input border p-3">
            <select
              name="categoryId"
              value={formik.values.categoryId}
              onChange={formik.handleChange}
            >
              <option value="">Select a Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <button onClick={showModal} className="btn btn-secondary ms-2">
              Add
            </button>
          </div>
        </div>

        {/* Zip Code */}
        <div className="col-md-6">
          <div className="form-input">
            <input
              type="text"
              name="zipCode"
              value={formik.values.zipCode}
              onChange={formik.handleChange}
            />
            <label className="lh-1 text-16 text-light-1">Pin Code</label>
          </div>
        </div>

        {/* Number of Positions */}
        <div className="col-md-6">
          <div className="form-input">
            <input
              type="number"
              name="numberOfPositions"
              value={formik.values.numberOfPositions}
              onChange={formik.handleChange}
              min="1"
            />
            <label className="lh-1 text-16 text-light-1">
              Number Of Positions
            </label>
          </div>
        </div>

        {/* Industry */}
        <div className="col-md-6">
          <div className="form-input">
            <input
              type="text"
              name="industry"
              value={formik.values.industry}
              onChange={formik.handleChange}
            />
            <label className="lh-1 text-16 text-light-1">Industry</label>
          </div>
        </div>

        {/* Qualifications */}
        <div className="col-12">
          <div className="form-group">
            <div className="d-flex gap-2 mb-2">
              <Select
                showSearch
                placeholder="Select a Qualification"
                value={qualificationInput || undefined}
                onChange={(value) => setQualificationInput(value)}
                style={{ width: "100%", height: "50px" }}
                filterOption={(input, option) =>
                  (option?.children ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                {QualificationsOptions.map((qualification, index) => (
                  <Select.Option key={index} value={qualification}>
                    {qualification}
                  </Select.Option>
                ))}
              </Select>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleAddQualification}
              >
                Add Qualification
              </button>
            </div>

            <div className="d-flex flex-wrap gap-2">
              {formik.values.qualifications.map((qualification, index) => (
                <span
                  key={index}
                  className="badge rounded-pill bg-light border d-flex align-items-center text-dark px-3 py-2"
                >
                  {qualification}
                  <button
                    type="button"
                    className="btn-close btn-close-sm ms-2"
                    onClick={() => handleRemoveQualification(index)}
                    style={{ fontSize: "0.65rem" }}
                    aria-label="Remove"
                  ></button>
                </span>
              ))}
            </div>

            {renderError("qualifications")}
          </div>
        </div>

        {/* Benefits */}
        <div className="col-12">
          <div className="form-group">
            <div className="d-flex gap-2 mb-2">
              <Select
                showSearch
                placeholder="Select a Benefit"
                value={benefitInput || undefined}
                onChange={(value) => setBenefitInput(value)}
                style={{ width: "100%", height: "50px" }}
                filterOption={(input, option) =>
                  (option?.children ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                {BenefitsOptions.map((benefit, index) => (
                  <Select.Option key={index} value={benefit}>
                    {benefit}
                  </Select.Option>
                ))}
              </Select>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleAddBenefit}
              >
                Add Benefit
              </button>
            </div>

            <div className="d-flex flex-wrap gap-2">
              {formik.values.benefits.map((benefit, index) => (
                <span
                  key={index}
                  className="badge rounded-pill bg-light border d-flex align-items-center text-dark px-3 py-2"
                >
                  {benefit}
                  <button
                    type="button"
                    className="btn-close btn-close-sm ms-2"
                    onClick={() => handleRemoveBenefit(index)}
                    style={{ fontSize: "0.65rem" }}
                    aria-label="Remove"
                  ></button>
                </span>
              ))}
            </div>

            {renderError("benefits")}
          </div>
        </div>

        {/* Skills Required */}
        <div className="col-12">
          <div className="form-group">
            <label className="form-label mb-2" style={{ color: "#004080" }}>
              Enter Skills (comma separated)
            </label>
            <div className="d-flex gap-2 mb-2 form-input">
              <input
                type="text"
                name="skillInput"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                className="form-control"
                placeholder="e.g., JavaScript, React, Node.js"
              />
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleAddSkill}
              >
                Add Skill
              </button>
            </div>

            <div className="d-flex flex-wrap gap-2">
              {formik.values.skillsRequired.map((skill, index) => (
                <span
                  key={index}
                  className="badge rounded-pill bg-light border d-flex align-items-center text-dark px-3 py-2"
                >
                  {skill}
                  <button
                    type="button"
                    className="btn-close btn-close-sm ms-2"
                    onClick={() => handleRemoveSkill(index)}
                    style={{ fontSize: "0.65rem" }}
                    aria-label="Remove"
                  ></button>
                </span>
              ))}
            </div>

            {renderError("skillsRequired")}
          </div>
        </div>

        {/* Notes */}
        <div className="col-12">
          <div className="form-input">
            <textarea
              name="notes"
              rows={3}
              value={formik.values.notes}
              onChange={formik.handleChange}
            />
            <label className="lh-1 text-16 text-light-1">Requirements</label>
          </div>
        </div>

        {/* Company */}
        <div className="col-md-12">
          <div className="p-3">
            <Select
              showSearch
              placeholder="Select a Company"
              value={formik.values.companyId || undefined}
              onChange={(value) => {
                const selectedCompany = companyLooUp.find(
                  (company) => company.employer?.id === value
                );
                formik.setValues({
                  ...formik.values,
                  companyId: value,
                  companyName: selectedCompany?.employer?.companyName || "",
                });
              }}
              style={{ width: "100%", height: "50px" }}
              filterOption={(input, option) =>
                (option?.children ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            >
              {companyLooUp?.map((company) => (
                <Select.Option
                  key={company.employer?.id}
                  value={company.employer?.id}
                >
                  {company.employer?.companyName}
                </Select.Option>
              ))}
            </Select>
          </div>
          {renderError("companyId")}
        </div>

        <div className="col-12">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={formik.handleSubmit}
            className="button h-50 px-24 -black-1 text-white w-100 mt-3"
            style={{ backgroundColor: "#004080", fontWeight: "bold" }}
          >
            {isSubmitting ? "Processing..." : id ? "Update Job" : "Post Job"}
          </button>
        </div>
      </>

      <Modal
        title="Add New Category"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <button
            key="submit"
            onClick={handleOk}
            className="button h-50 px-24 -black-1 bg-blue-1 text-white w-100 mt-3"
          >
            Submit
          </button>,
        ]}
      >
        <div className="row">
          <div className="col-12">
            <div className="form-input">
              <input
                type="text"
                name="name"
                value={newCategory.name}
                onChange={handleNewCategoryChange}
                required
              />
              <label className="lh-1 text-16 text-light-1">Category Name</label>
            </div>
          </div>
          <div className="col-12 mt-3">
            <div className="form-input">
              <textarea
                name="description"
                rows={3}
                value={newCategory.description}
                onChange={handleNewCategoryChange}
                required
              />
              <label className="lh-1 text-16 text-light-1">Description</label>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default FormDetails;
