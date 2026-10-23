import React from "react";
import { Modal, Descriptions, Tag } from "antd";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const PaymentDetailModal = ({ visible, onClose, payment }) => {
  if (!payment) return null;

  const statusColors = {
    pending: "orange",
    completed: "green",
    failed: "red",
    refunded: "purple",
  };

  return (
    <Modal
      title="Payment Details"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={700}
    >
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Employer">
          {payment.employerName || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Amount">
          ${payment.amount?.toFixed(2) || "0.00"}
        </Descriptions.Item>
        <Descriptions.Item label="Payment Date">
          {payment.paymentDate ? formatDate(payment.paymentDate) : "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Payment Method">
          {payment.paymentMethod
            ? payment.paymentMethod.charAt(0).toUpperCase() +
              payment.paymentMethod.slice(1)
            : "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Transaction ID">
          {payment.transactionId || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag color={statusColors[payment.status] || "default"}>
            {payment.status
              ? payment.status.charAt(0).toUpperCase() + payment.status.slice(1)
              : "N/A"}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Created At">
          {payment.createdAt ? formatDateTime(payment.createdAt) : "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Updated At">
          {payment.updatedAt ? formatDateTime(payment.updatedAt) : "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Notes">
          {payment.notes || "No notes available"}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default PaymentDetailModal;