import { Form, Input, Modal, Select } from "antd";
import React from "react";

function UpdateApplicationStatus({
  statusOptions,
  statusForm,
  closeStatusModal,
  handleStatusSubmit,
  statusModalVisible,
}) {
  return (
    <div>
      {" "}
      <Modal
        title={
          <span className="text-lg font-semibold">
            Update Application Status
          </span>
        }
        open={statusModalVisible}
        onOk={handleStatusSubmit}
        onCancel={closeStatusModal}
        okText="Update"
        cancelText="Cancel"
        width={400}
        centered
        maskClosable={false}
      >
        <Form form={statusForm} layout="vertical" className="space-y-2">
          <Form.Item
            name="status"
            label={<span className="text-gray-700 font-medium">Status</span>}
            rules={[{ required: true, message: "Please select a status" }]}
          >
            <Select placeholder="Select status" className="w-full h-10">
              {statusOptions.map((option) => (
                <Option
                  key={option.value}
                  value={option.value}
                  className="px-2 py-1 hover:bg-blue-50"
                >
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="reason"
            label={
              <span className="text-gray-700 font-medium">
                Reason for status change
              </span>
            }
          >
            <Input
              placeholder="Enter reason"
              allowClear
              className="h-10 rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500"
            />
          </Form.Item>

          <Form.Item
            name="description"
            label={
              <span className="text-gray-700 font-medium">
                Additional Details
              </span>
            }
          >
            <Input.TextArea
              rows={3}
              placeholder="Enter any additional information"
              showCount
              maxLength={500}
              className="rounded-lg border-gray-300 hover:border-blue-400 focus:border-blue-500"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default UpdateApplicationStatus;
