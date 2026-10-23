import { getUsersWithJobSeeker } from "@/api/user";
import { getAuthDatum } from "@/utils/auth";
import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  Tag,
  Button,
  Spin,
  Collapse,
  Descriptions,
  Card,
  Space,
  Typography,
} from "antd";
import { SearchOutlined, ClockCircleOutlined } from "@ant-design/icons";

const { Panel } = Collapse;
const { Text } = Typography;

function ApplicationsList() {
  const userId = localStorage.getItem("userId");
  const [list, setList] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  const user = getAuthDatum();

  const getlist = () => {
    getUsersWithJobSeeker(userId)
      .then((res) => {
        setList(res);
        const apps = res.data || [];
        setApplications(apps);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getlist();
  }, []);

  const filteredApps = applications.filter(
    (app) =>
      app.job?.title?.toLowerCase().includes(searchText.toLowerCase()) ||
      app.job?.companyName?.toLowerCase().includes(searchText.toLowerCase()) ||
      app.status?.toLowerCase().includes(searchText.toLowerCase()) ||
      app.expectedSalary?.toString().includes(searchText) ||
      app.currentSalary?.toString().includes(searchText)
  );

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "geekblue";
      case "shortlisted":
        return "blue";
      case "rejected":
        return "red";
      case "accepted":
        return "green";
      case "offered":
        return "cyan";
      case "withdrawn":
        return "orange";
      default:
        return "gray";
    }
  };

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Job Code",
      dataIndex: ["job", "jobCode"],
      key: "jobCode",
      render: (text) => text || "N/A",
    },
    {
      title: "Job Title",
      dataIndex: ["job", "title"],
      key: "jobTitle",
      render: (text) => text || "N/A",
    },
    {
      title: "Company",
      dataIndex: ["job", "companyName"],
      key: "companyName",
      render: (text) => text || "N/A",
    },
    {
      title: "Expected Salary",
      dataIndex: "expectedSalary",
      key: "expectedSalary",
      render: (salary) => <Tag color="green">{salary}</Tag>,
    },
    {
      title: "Current Salary",
      dataIndex: "currentSalary",
      key: "currentSalary",
      render: (salary) => <Tag color="orange">{salary}</Tag>,
    },
    {
      title: "Experience (Years)",
      dataIndex: "experienceYears",
      key: "experienceYears",
      render: (years) => <Tag color="blue">{years} yrs</Tag>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={getStatusColor(status)}>{status.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Resume",
      dataIndex: "resumeUrl",
      key: "resumeUrl",
      render: (url) => (
        <Button
          type="link"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          size="small"
        >
          View Resume
        </Button>
      ),
    },
  ];

  const expandedRowRender = (record) => {
    console.log("Expanded Record:", record);
    
    return (
      <div className="p-4 bg-gray-50">
        <Descriptions title="Application Details" bordered column={1}>
          <Descriptions.Item label="Application Date">
            {new Date(record.applicationDate).toLocaleString()}
          </Descriptions.Item>  
          {/* job code  */}
          <Descriptions.Item label="Job Code">
            {record.job?.jobCode || "N/A"}
          </Descriptions.Item>
          
          <Descriptions.Item label="Job Title">
            {record.job?.title || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Company Name">
            {record.job?.companyName || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Number of Positions">
            {record.job?.numberOfPositions || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Job Type">
            {record.job?.type || "N/A"}
          </Descriptions.Item>

          <Descriptions.Item label="Job Location">
            {record.job?.location || "N/A"}
          </Descriptions.Item>
          {/* area */}
          <Descriptions.Item label="Job Area">
            {record.job?.area || "N/A"}
          </Descriptions.Item>

          <Descriptions.Item label="Status">
            <Tag color={getStatusColor(record.status)}>
              {record.status.toUpperCase()}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Experience">
            {record.experienceYears} years
          </Descriptions.Item>
          <Descriptions.Item label="Skills Required">
            {record.job?.skillsRequired?.join(", ") || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Qualifications">
            {record.job?.qualifications?.join(", ") || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Current Salary">
            {record.currentSalary ? `₹${record.currentSalary}` : "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Expected Salary">
            {record.expectedSalary ? `₹${record.expectedSalary}` : "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Job Description">
            <Text type="secondary">
              {record.job?.description || "No description available"}
            </Text>
          </Descriptions.Item>
          <Descriptions.Item label="Notes">
            {record.job?.notes || "No notes available"}
          </Descriptions.Item>
          <Descriptions.Item label="Resume">
            <a
              href={record.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#ff4d4f" }}
            >
              View Resume
            </a>
          </Descriptions.Item>

        </Descriptions>
      </div>
    );
  };

  return (
    <div className="p-4">
      <h2 style={{color:'#004080'}} className="mb-4">Applications List</h2>

      <Input
        placeholder="Search applications..."
        prefix={<SearchOutlined />}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 20, maxWidth: 400 }}
      />

      {loading ? (
        <div className="text-center">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={filteredApps}
          rowKey="id"
          expandable={{
            expandedRowRender,
            rowExpandable: (record) => true,
          }}
          pagination={{
            pageSize: 5,
            showSizeChanger: false,
          }}
          bordered
        />
      )}

      <style jsx global>{`
        .custom-table .ant-table-thead > tr > th {
          background-color: #f8fafc !important;
          font-weight: 600;
        }
        .custom-descriptions .ant-descriptions-item-label {
          font-weight: 500;
        }
        .timeline-container {
          position: relative;
          padding-left: 24px;
        }
        .timeline-item {
          position: relative;
          padding-bottom: 16px;
        }
        .timeline-dot {
          position: absolute;
          left: -8px;
          top: 4px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          z-index: 1;
        }
        .timeline-content {
          padding-left: 16px;
        }
        .timeline-item:not(:last-child)::after {
          content: "";
          position: absolute;
          left: -2px;
          top: 16px;
          bottom: 0;
          width: 2px;
          background-color: #e5e7eb;
        }
      `}</style>
    </div>
  );
}

export default ApplicationsList;
