import { Descriptions, Modal } from "antd";
import {
  FaGlobe,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUserTie,
} from "react-icons/fa";
import React from "react";

function ModalList({ selectedEmployer, closeViewModal, viewModalVisible }) {

  console.log("SELECTED-EM-",selectedEmployer);
  
  // Extract employer data from nested object
  const employerData = selectedEmployer || {};
  
  return (
    <div>
      <Modal
        title="Employer Details"
        visible={viewModalVisible}
        onCancel={closeViewModal}
        footer={null}
        width={700}
        bodyStyle={{
          padding: "20px",
        }}
        style={{
          top: "20px",
        }}
      >
        {selectedEmployer && (
          <div className="bootstrap-modal-content">
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              {(employerData.companyLogo || selectedEmployer.profilePicture) && (
                <img
                  src={employerData.companyLogo || selectedEmployer.profilePicture}
                  alt="Company Logo"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "1px solid #eee",
                  }}
                />
              )}
              <h2 style={{ marginTop: "10px" }}>
                {employerData.companyName || selectedEmployer.firstName}
              </h2>
            </div>

            <Descriptions bordered column={1}>
              <Descriptions.Item label="Contact Person">
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <FaUserTie />
                  <span>{employerData.contactPerson || "N/A"}</span>
                </div>
              </Descriptions.Item>

              <Descriptions.Item label="Email">
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <FaEnvelope />
                  <span>{selectedEmployer.email}</span>
                </div>
              </Descriptions.Item>

              <Descriptions.Item label="Company Description">
                {employerData.companyDescription || "N/A"}
              </Descriptions.Item>

              <Descriptions.Item label="Company Type">
                {employerData.companyType || "N/A"}
              </Descriptions.Item>

              <Descriptions.Item label="Company Size">
                {employerData.companySize || "N/A"}
              </Descriptions.Item>

              <Descriptions.Item label="Company Industry">
                {employerData.companyIndustry || "N/A"}
              </Descriptions.Item>

              <Descriptions.Item label="Address">
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <FaMapMarkerAlt />
                  <span>
                    {employerData.companyAddress || employerData.companyLocation || "N/A"}
                    {employerData.companyCity && `, ${employerData.companyCity}`}
                    {employerData.companyState && `, ${employerData.companyState}`}
                  </span>
                </div>
              </Descriptions.Item>

              <Descriptions.Item label="Company Website">
                {employerData.companyWebsite ? (
                  <a
                    href={employerData.companyWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <FaGlobe /> Visit Website
                  </a>
                ) : (
                  "N/A"
                )}
              </Descriptions.Item>

              <Descriptions.Item label="Company Phone">
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <FaPhone />
                  <span>{employerData.companyPhone || "N/A"}</span>
                </div>
              </Descriptions.Item>

              <Descriptions.Item label="Company Email">
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <FaEnvelope />
                  <span>{employerData.companyEmail || "N/A"}</span>
                </div>
              </Descriptions.Item>

              <Descriptions.Item label="Identity Proof">
                {employerData.identityProof || "N/A"}
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
                  background: "#1890ff",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
                className="-black-1 bg-blue-1"
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