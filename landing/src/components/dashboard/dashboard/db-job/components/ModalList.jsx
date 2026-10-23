import React from "react";
import { Modal, Descriptions } from "antd";

function ModalList({ selectedJob, closeViewModal, viewModalVisible }) {
  // Optional: For debugging
  // console.log('SELECTED - JOB', selectedJob);

  return (
    <div>
      <Modal
        title="Job Details"
        open={viewModalVisible}
        onCancel={closeViewModal}
        footer={null}
        width={700}
        style={{
          top: "20px",
        }}
      >
        {selectedJob && (
          <div className="bootstrap-modal-content">
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Job Code">
                {selectedJob.jobCode}
              </Descriptions.Item>
              <Descriptions.Item label="Job Title">
                {selectedJob.title}
              </Descriptions.Item>
              <Descriptions.Item label="Company">
                {selectedJob.companyName}
              </Descriptions.Item>
              <Descriptions.Item label="Location">
                {selectedJob.location} {selectedJob.remote && "(Remote)"}
              </Descriptions.Item>
              <Descriptions.Item label="State">
                {selectedJob.state || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="City">
                {selectedJob.city || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Area">
                {selectedJob.area || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Salary Range">
                {selectedJob.salaryRange}
              </Descriptions.Item>
              <Descriptions.Item label="Job Type">
                {selectedJob.type?.charAt(0).toUpperCase() +
                  selectedJob.type?.slice(1)}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                {selectedJob.status?.charAt(0).toUpperCase() +
                  selectedJob.status?.slice(1)}
              </Descriptions.Item>
              <Descriptions.Item label="Description">
                {selectedJob.description || "No description available"}
              </Descriptions.Item>
              <Descriptions.Item label="Requirements">
                {selectedJob.notes || "No requirements specified"}
              </Descriptions.Item>
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