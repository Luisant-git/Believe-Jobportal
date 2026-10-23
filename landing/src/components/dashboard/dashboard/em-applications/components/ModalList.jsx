import { Button, Descriptions, Modal } from "antd";
import React from "react";
import { FaFilePdf } from "react-icons/fa";

function ModalList({ selectedApplication, closeViewModal, viewModalVisible }) {
  console.log("SELECTED-APPLICATION",selectedApplication);
  
  const getStatusTag = (status) => {
    let color = "";
    let bgColor = "";
    let textColor = "";

    switch (status) {
      case "pending":
        color = "orange";
        bgColor = "#fff7e6";
        textColor = "#fa8c16";
        break;
      case "withdrawn":
        color = "gray";
        bgColor = "#f5f5f5";
        textColor = "#8c8c8c";
        break;
      case "rejected":
        color = "red";
        bgColor = "#fff1f0";
        textColor = "#f5222d";
        break;
      case "accepted":
        color = "green";
        bgColor = "#f6ffed";
        textColor = "#52c41a";
        break;
      case "shortlisted":
        color = "blue";
        bgColor = "#e6f7ff";
        textColor = "#1890ff";
        break;
      case "interviewed":
        color = "purple";
        bgColor = "#f9f0ff";
        textColor = "#722ed1";
        break;
      case "offered":
        color = "cyan";
        bgColor = "#e6fffb";
        textColor = "#13c2c2";
        break;
      default:
        color = "gray";
        bgColor = "#f5f5f5";
        textColor = "#8c8c8c";
    }

    return (
      <Button
        style={{
          backgroundColor: bgColor,
          color: textColor,
          borderColor: textColor,
          fontWeight: 500,
          borderRadius: "4px",
          padding: "0 8px",
          height: "24px",
          fontSize: "12px",
        }}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Button>
    );
  };

  return (
    <div>
      <Modal
        title="Application Details"
        open={viewModalVisible}
        onCancel={closeViewModal}
        footer={null}
        width={700}
        styles={{
          padding: "20px",
        }}
        style={{
          top: "20px",
        }}
      >
        {selectedApplication && (
          <div className="bootstrap-modal-content">
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Job Title">
                {selectedApplication.jobTitle}
              </Descriptions.Item>
              <Descriptions.Item label="Applicant Name">
                {selectedApplication.jobSeeker.user.firstName +" "+selectedApplication.jobSeeker.user.lastName}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                {getStatusTag(selectedApplication.status)}
              </Descriptions.Item>
              <Descriptions.Item label="Application Date">
                {new Date(selectedApplication.applicationDate).toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="Current Salary">
                {selectedApplication.currentSalary
                  ? `₹${selectedApplication.currentSalary}`
                  : "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Expected Salary">
                {selectedApplication.expectedSalary
                  ? `₹${selectedApplication.expectedSalary}`
                  : "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Experience">
                {selectedApplication.experienceYears} years
              </Descriptions.Item>
              <Descriptions.Item label="Internal Applicant">
                {selectedApplication.isInternal ? "Yes" : "No"}
              </Descriptions.Item>
              <Descriptions.Item label="Rating">
                {selectedApplication.rating || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Resume">
                <a
                  href={selectedApplication.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#ff4d4f" }}
                >
                  <FaFilePdf style={{ marginRight: "5px" }} /> View Resume
                </a>
              </Descriptions.Item>
              <Descriptions.Item label="Cover Letter">
                <div style={{ whiteSpace: "pre-wrap" }}>
                  {selectedApplication.coverLetter || "N/A"}
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="Interview Feedback">
                {selectedApplication.interviewFeedback || "N/A"}
              </Descriptions.Item>
              {selectedApplication.shortlistedDate && (
                <Descriptions.Item label="Shortlisted Date">
                  {selectedApplication.shortlistedDate}
                </Descriptions.Item>
              )}
              {selectedApplication.rejectedDate && (
                <Descriptions.Item label="Rejected Date">
                  {selectedApplication.rejectedDate}
                </Descriptions.Item>
              )}
              {selectedApplication.selectedDate && (
                <Descriptions.Item label="Selected Date">
                  {selectedApplication.selectedDate}
                </Descriptions.Item>
              )}
            </Descriptions>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={closeViewModal}
                style={{
                  padding: "8px 16px",
                  fontSize: "14px",
                  borderRadius: "4px",
                  border: "none",
                  background: "#004080",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
            
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default ModalList;
