import { useFormik } from "formik";
import * as Yup from "yup";
import { Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { createJob, getEmployerJobsByID, updateJob } from "@/api/em-jobs";
import { createJobCategory, getJobCategoriesByUser } from "@/api/em-category";
import { getCompany } from "@/api/employers";
import "./style.css";

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

// Use your requested Indian qualification list
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

function JobForm() {
  const userId = localStorage.getItem("userId");
  console.log("User ID: ", userId);
  const { id } = useParams();
  const navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [benefitInput, setBenefitInput] = useState("");
  const [qualificationInput, setQualificationInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [companies, setCompanies] = useState({});
  console.log("Companies: ", companies);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  });

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
    minSalary: Yup.number()
      .required("Minimum Salary is required")
      .positive("Must be a positive number"),
    maxSalary: Yup.number()
      .required("Maximum Salary is required")
      .positive("Must be a positive number")
      .moreThan(
        Yup.ref("minSalary"),
        "Max Salary must be greater than Min Salary"
      ),
    experience: Yup.string().required("Experience is required"),
    zipCode: Yup.string().required("Pin Code is required"),
    numberOfPositions: Yup.number()
      .required("Number of Positions is required")
      .min(1, "At least one position is required"),
    industry: Yup.string().required("Industry is required"),
    categoryId: Yup.string().required("Category is required"),
    companyId: Yup.string().required("Company is required"),
    remote: Yup.boolean().required("Remote option is required"),
    isUrgent: Yup.boolean().required("Urgency option is required"),
  });

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
      minSalary: "",
      maxSalary: "",
      remote: false,
      approved: false,
      numberOfPositions: 1,
      industry: "",
      isUrgent: false,
      notes: "",
      jobCode: generateJobCode(),
      skillsRequired: [],
      benefits: [],
      qualifications: [],
      categoryId: "",
      status: JobStatus.OPEN,
      companyId: "",
      companyName: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);

      try {
        const {
          minSalary,
          maxSalary,
          id: _id,
          userId: _userId,
          dateOpened,
          targetDate,
          createdAt,
          updatedAt,
          deletedBy,
          applications,
          applicationCount,
          tags,
          category,
          companyDetails,
          ...filteredValues
        } = values;

        const jobData = {
          ...filteredValues,
          salaryRange: `${minSalary}-${maxSalary}`,
          remote: values.remote,
          isUrgent: values.isUrgent,
          numberOfPositions: Number(values.numberOfPositions),
          categoryId: values.categoryId,
          companyId: values.companyId,
          companyName: values.companyName,
        };

        let response;
        if (id) {
          response = await updateJob(userId, id, jobData);
        } else {
          response = await createJob(userId, jobData);
        }

        if (response?.id) {
          toast.success(
            id ? "Job updated successfully!" : "Job posted successfully!"
          );
          navigate("/em-JobList");
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
          }
        } else {
          toast.error(response?.message || "Failed to process job");
        }
      } catch (error) {
        console.error("Error submitting job:", error);
        toast.error(
          error.response?.data?.message ||
            "An error occurred while submitting the job"
        );
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const jobResponse = await getEmployerJobsByID(userId, id);
          const jobData = jobResponse;

          const [min, max] = jobData.salaryRange
            ? jobData.salaryRange.split("-").map((value) => value.trim())
            : ["", ""];

          formik.setValues({
            ...jobData,
            minSalary: min,
            maxSalary: max,
            remote: jobData.remote || false,
            isUrgent: jobData.isUrgent || false,
            state: jobData.state || "",
            city: jobData.city || "",
            area: jobData.area || "",
          });
        }

        const categoriesResponse = await getJobCategoriesByUser(userId);
        setCategories(categoriesResponse.data);

        const companiesResponse = await getCompany();
        console.log("company-response : ", companiesResponse);

        // Check if companiesResponse is an array or a single object
        if (Array.isArray(companiesResponse)) {
          const userCompany = companiesResponse.find(
            (company) => company.employer.userId == userId
          );
          console.log("User Company: ", userCompany);
          
          setCompanies(userCompany || {});
        } else {
          console.log("Single company response: ", companiesResponse);
          // If it's a single object, just use it directly
          setCompanies(companiesResponse);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load required data");
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, [id]);

  // Set companyId when companies data is loaded
  useEffect(() => {
    if (companies?.employer?.id && !formik.values.companyId) {
      formik.setFieldValue("companyId", companies.employer.id);
    }
  }, [companies]);

  const handleAddItem = (type, value, setValue) => {
    if (value.trim() && !formik.values[type].includes(value)) {
      formik.setFieldValue(type, [...formik.values[type], value.trim()]);
      setValue("");
    }
  };

  const handleRemoveItem = (type, index) => {
    const updatedItems = [...formik.values[type]];
    updatedItems.splice(index, 1);
    formik.setFieldValue(type, updatedItems);
  };

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => {
    setIsModalVisible(false);
    setNewCategory({ name: "", description: "" });
  };

  const handleNewCategoryChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCategory = async () => {
    if (!newCategory.name || !newCategory.description) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await createJobCategory(userId, newCategory);
      if (response.success) {
        toast.success("Category added successfully!");
        const updatedCategories = await getJobCategoriesByUser(userId);
        setCategories(updatedCategories.data);
        handleCancel();
      } else {
        toast.error(response.message || "Failed to add category");
      }
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Failed to add category");
    }
  };

  const renderError = (fieldName) => {
    return formik.touched[fieldName] && formik.errors[fieldName] ? (
      <div className="text-danger small">{formik.errors[fieldName]}</div>
    ) : null;
  };

  return (
    <div className="row x-gap-20 y-gap-20">
      <h2 style={{ color: "#004080" }}>
  {id ? "Edit Job" : "Create New Job"}
</h2>


      {/* Job Title */}
      <div className="col-12">
        <div className="form-input">
          <input
            type="text"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
          />
          <label className="lh-1 text-16 text-light-1">
            Job Code<span className="text-danger"> *</span>
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
          />
          <label className="lh-1 text-16 text-light-1">
            Description<span className="text-danger"> *</span>
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
          />
          <label className="lh-1 text-16 text-light-1">
            Location<span className="text-danger"> *</span>
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
          />
          <label className="lh-1 text-16 text-light-1">
            State<span className="text-danger"> *</span>
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
          />
          <label className="lh-1 text-16 text-light-1">
            City<span className="text-danger"> *</span>
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
          />
          <label className="lh-1 text-16 text-light-1">
            Area<span className="text-danger"> *</span>
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
            value={formik.values.minSalary}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label className="lh-1 text-16 text-light-1">
            Min Salary<span className="text-danger"> *</span>
          </label>
        </div>
        {renderError("minSalary")}
      </div>

      <div className="col-md-3">
        <div className="form-input">
          <input
            type="number"
            name="maxSalary"
            value={formik.values.maxSalary}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label className="lh-1 text-16 text-light-1">
            Max Salary<span className="text-danger"> *</span>
          </label>
        </div>
        {renderError("maxSalary")}
      </div>

      {/* Experience */}
      <div className="col-md-6">
        <div className="form-input">
          <input
            type="text"
            name="experience"
            value={formik.values.experience}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label className="lh-1 text-16 text-light-1">
            Experience<span className="text-danger"> *</span>
          </label>
        </div>
        {renderError("experience")}
      </div>

      {/* Job Type */}
      <div className="col-md-6 pt-3">
        <div className="form-input border p-3">
          <select
            name="type"
            value={formik.values.type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Select Job Type</option>
            {Object.values(JobType).map((type) => (
              <option key={type} value={type}>
                {type.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>
        {renderError("type")}
      </div>

      {/* Status (only visible in edit mode) */}
      {id && (
        <div className="col-md-6">
          <div className="form-input border p-3">
            <select
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              {Object.values(JobStatus).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          {renderError("status")}
        </div>
      )}

      {/* Remote */}
      <div className="col-md-6">
        <label className="lh-1 text-16 text-light-1 pb-5">Is this a Remote Job?*</label>
        <div className="form-input border p-3">
          <select
            name="remote"
            value={formik.values.remote}
            onChange={(e) =>
              formik.setFieldValue("remote", e.target.value === "true")
            }
          >
            <option value="false">On-site</option>
            <option value="true">Remote</option>
          </select>
        </div>
        {renderError("remote")}
      </div>

      {/* Urgent */}
      <div className="col-md-6 mt-2">
        <div className="form-input border p-3">
          <select
            name="isUrgent"
            value={formik.values.isUrgent}
            onChange={(e) =>
              formik.setFieldValue("isUrgent", e.target.value === "true")
            }
          >
            <option value="false">Normal Hiring</option>
            <option value="true">Urgent Position</option>
          </select>
        </div>
        {renderError("isUrgent")}
      </div>

      {/* Category */}
      <div className="col-md-6">
        <div className="form-input border p-3">
          <select
            name="categoryId"
            value={formik.values.categoryId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button onClick={showModal} className="btn btn-secondary ms-2">
            Add New
          </button>
        </div>
        {renderError("categoryId")}
      </div>

      {/* Zip Code */}
      <div className="col-md-6">
        <div className="form-input">
          <input
            type="text"
            name="zipCode"
            value={formik.values.zipCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label className="lh-1 text-16 text-light-1">
            Pin Code<span className="text-danger"> *</span>
          </label>
        </div>
        {renderError("zipCode")}
      </div>

      {/* Number of Positions */}
      <div className="col-md-6">
        <div className="form-input">
          <input
            type="number"
            name="numberOfPositions"
            value={formik.values.numberOfPositions}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            min="1"
          />
          <label className="lh-1 text-16 text-light-1">
            Number of Positions<span className="text-danger"> *</span>
          </label>
        </div>
        {renderError("numberOfPositions")}
      </div>

      {/* Industry */}
      <div className="col-md-6">
        <div className="form-input">
          <input
            type="text"
            name="industry"
            value={formik.values.industry}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label className="lh-1 text-16 text-light-1">
            Industry<span className="text-danger"> *</span>
          </label>
        </div>
        {renderError("industry")}
      </div>

      {/* Company */}
      <div className="col-md-12">
        <div className="form-input">
          <input
            type="text"
            name="companyName"
            className="mt-2"
            value={companies?.employer?.companyName || ""}
            disabled
          />
          <label className="lh-1 text-16 text-light-1">
            Company<span className="text-danger"> *</span>
          </label>
        </div>
        {renderError("companyId")}
      </div>

      {/* Qualifications */}
      <div className="col-12">
        <div className="form-group">
          <div className="d-flex gap-2 mb-2">
            <Select
              showSearch
              value={qualificationInput || undefined}
              onChange={setQualificationInput}
              placeholder="Select a Qualification"
              style={{ width: '100%', height: '50px' }}
              filterOption={(input, option) =>
                (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
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
              onClick={() =>
                handleAddItem(
                  "qualifications",
                  qualificationInput,
                  setQualificationInput
                )
              }
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
                  onClick={() => handleRemoveItem("qualifications", index)}
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
              value={benefitInput || undefined}
              onChange={setBenefitInput}
              placeholder="Select a Benefit"
              style={{ width: '100%', height: '50px' }}
              filterOption={(input, option) =>
                (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
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
              onClick={() =>
                handleAddItem("benefits", benefitInput, setBenefitInput)
              }
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
                  onClick={() => handleRemoveItem("benefits", index)}
                  style={{ fontSize: "0.65rem" }}
                  aria-label="Remove"
                ></button>
              </span>
            ))}
          </div>
          {renderError("benefits")}
        </div>
      </div>

      {/* Skills */}
      <div className="col-12">
        <div className="form-group">
          <label className="form-label mb-2"
          style={{ color: "#004080" }}>
            Enter Skills (comma separated)
          </label>

          <div className="d-flex gap-2 mb-2 form-input">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              className="form-control"
              placeholder="e.g., JavaScript, React, Node.js"
            />
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() =>
                handleAddItem("skillsRequired", skillInput, setSkillInput)
              }
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
                  onClick={() => handleRemoveItem("skillsRequired", index)}
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
            onBlur={formik.handleBlur}
          />
          <label className="lh-1 text-16 text-light-1">Notes</label>
        </div>
        {renderError("notes")}
      </div>

      {/* Submit Button */}
      <div className="col-12">
      <button
  type="button"
  onClick={formik.handleSubmit}
  className="button h-50 px-24 -black-1 text-white w-100 mt-3"
  style={{ backgroundColor: "#004080" }}
>
  {isSubmitting ? "Processing..." : id ? "Update Job" : "Post Job"}
</button>

      </div>

      {/* Add Category Modal */}
      <Modal
        title="Add New Category"
        open={isModalVisible}
        onOk={handleAddCategory}
        onCancel={handleCancel}
        footer={[
          <button
            key="submit"
            onClick={handleAddCategory}
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
              <label className="lh-1 text-16 text-light-1">
                Category Name<span className="text-danger"> *</span>
              </label>
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
              <label className="lh-1 text-16 text-light-1">
                Description<span className="text-danger"> *</span>
              </label>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default JobForm;
