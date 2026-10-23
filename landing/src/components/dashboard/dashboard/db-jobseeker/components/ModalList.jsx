import { Descriptions, Modal, Switch, Tag } from "antd";
import React from "react";
import dayjs from "dayjs";

function ModalList({ selectedJobSeeker, closeViewModal, viewModalVisible }) {
  // Extract job seeker data from nested object
  const jobSeekerData = selectedJobSeeker?.jobSeeker || {};
  console.log(selectedJobSeeker);
  
  return (
    <div>
      <Modal
        title="Job Seeker Details"
        open={viewModalVisible}
        onCancel={closeViewModal}
        footer={null}
        width={700}
      >
        {selectedJobSeeker && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Name">
              {selectedJobSeeker.user.firstName} {selectedJobSeeker.user.lastName}
            </Descriptions.Item>
            
            <Descriptions.Item label="Email">
              {selectedJobSeeker.user.email}
            </Descriptions.Item>
            
            <Descriptions.Item label="Phone Number">
              {selectedJobSeeker.phoneNumber || "Not specified"}
            </Descriptions.Item>
            
            <Descriptions.Item label="Role">
              <Tag
                color={
                  selectedJobSeeker.user.role === "job_seeker" ? "blue" : "default"
                }
              >
                {selectedJobSeeker.user.role === "job_seeker"
                  ? "Job Seeker"
                  : selectedJobSeeker.user.role}
              </Tag>
            </Descriptions.Item>
            
            <Descriptions.Item label="Status">
              <Switch
                checked={selectedJobSeeker.isactive}
                checkedChildren="Active"
                unCheckedChildren="Inactive"
                disabled
                style={{
                  backgroundColor: selectedJobSeeker.user.isactive
                    ? "#52c41a"
                    : "#f5222d",
                }}
              />
            </Descriptions.Item>
            
            <Descriptions.Item label="Skills">
              {selectedJobSeeker.skills?.join(", ") || "No skills listed"}
            </Descriptions.Item>
            
            <Descriptions.Item label="Experience">
              {selectedJobSeeker.experience ? `${selectedJobSeeker.experience} years` : "Not specified"}
            </Descriptions.Item>
            
            <Descriptions.Item label="Education">
              {selectedJobSeeker.education || selectedJobSeeker.highestEducation || "Not specified"}
            </Descriptions.Item>
            
            <Descriptions.Item label="City">
              {selectedJobSeeker.city || "Not specified"}
            </Descriptions.Item>
            
            <Descriptions.Item label="Created">
              {dayjs(selectedJobSeeker.createdAt).format("DD/MM/YYYY HH:mm")}
            </Descriptions.Item>
            
            <Descriptions.Item label="Updated">
              {dayjs(selectedJobSeeker.updatedAt).format("DD/MM/YYYY HH:mm")}
            </Descriptions.Item>
            
            <Descriptions.Item label="Resume">
              {selectedJobSeeker.resume ? (
                <a
                  href={selectedJobSeeker.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Resume
                </a>
              ) : (
                "No resume uploaded"
              )}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
}

export default ModalList;