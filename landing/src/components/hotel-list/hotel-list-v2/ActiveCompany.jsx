import React, { useState, useEffect } from "react";
import {
  Input,
  Pagination,
  Spin,
  Col,
  Row,
  Skeleton,
  Modal,
  Descriptions,
} from "antd";
import {
  FaBuilding,
  FaEye,
  FaGlobe,
  FaMapMarkerAlt,
  FaUser,
  FaIndustry,
  FaUsers,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import logo from "../../../../public/img/building.png";

const { Search } = Input;

const ActiveCompany = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const pageSize = 25;

  const getCompanies = () => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/employers/active`)
      .then((res) => res.json())
      .then((data) => {
        setCompanies(data);
        setTotalItems(data.length);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredCompanies = companies.filter(
    (company) =>
      company.employer.companyName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      company.employer.contactPerson
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      company.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredCompanies.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    getCompanies();
  }, []);

  const CompanySkeleton = ({ count = 4 }) => {
    return (
      <Row gutter={[16, 16]}>
        {Array.from({ length: count }).map((_, index) => (
          <Col key={index} span={24}>
            <div className="border-top-light pt-30">
              <Row className="x-gap-20 y-gap-20">
                <Col md={6}>
                  <Skeleton.Image
                    active
                    style={{ width: 200, height: 200, borderRadius: "8px" }}
                  />
                </Col>
                <Col md={12}>
                  <Skeleton
                    active
                    title={false}
                    paragraph={{ rows: 4, width: ["80%", "70%", "90%", "60%"] }}
                  />
                  <div className="mt-10">
                    <Skeleton.Button
                      active
                      shape="round"
                      size="default"
                      style={{ width: "150px" }}
                    />
                  </div>
                </Col>
                <Col md={6} className="text-right">
                  <div className="mb-20">
                    <Skeleton.Input
                      active
                      style={{ width: "100px", height: "20px" }}
                    />
                    <Skeleton.Input
                      active
                      style={{
                        width: "60px",
                        height: "20px",
                        marginTop: "10px",
                      }}
                    />
                  </div>
                  <Skeleton.Button
                    active
                    shape="round"
                    size="large"
                    style={{ width: "120px" }}
                  />
                </Col>
              </Row>
            </div>
          </Col>
        ))}
      </Row>
    );
  };

  if (loading) {
    return <CompanySkeleton count={4} />;
  }

  if (!companies || companies.length === 0) {
    return (
      <div className="col-12">
        <div className="text-center py-5">
          <img
            src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127818.jpg?t=st=1745563008~exp=1745566608~hmac=cb209352949ff859fa8229dc202963020b51555284690f114e972a24be741525&w=1060"
            alt="No data found"
            style={{ maxWidth: "300px", margin: "0 auto" }}
          />
          <h3 className="text-18 lh-16 fw-500 mt-20">No companies found</h3>
          <p className="text-14 text-light-1 mt-10">
            We couldn't find any companies matching your criteria.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={{ paddingBottom: "30px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "12px",
            flexDirection: window.innerWidth <= 768 ? "column" : "row",
            gap: window.innerWidth <= 768 ? "16px" : "8px",
          }}
        >
          <h1
            style={{
              fontSize: "20px",
              lineHeight: "14px",
              fontWeight: 600,
              color: "#004080",
            }}
          >
            Companies
          </h1>
          <div style={{ display: "flex", gap: "8px" }}>
            <Search
              placeholder="Search companies"
              allowClear
              enterButton="Search"
              size="large"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onSearch={handleSearch}
              style={{
                maxWidth: "400px",
                "--ant-primary-color": "#004080",
              }}
              className="custom-search"
            />
            <style jsx>{`
              .custom-search .ant-btn-primary {
                background-color: #004080 !important;
                border-color: #004080 !important;
              }
              .custom-search .ant-btn-primary:hover {
                background-color: #0066cc !important;
                border-color: #0066cc !important;
              }
            `}</style>
          </div>
        </div>
      </div>

      {paginatedData.map((company) => (
        <div className="col-12" key={company?.id}>
          <div className="border-top-light pt-30 pb-40">
            <div className="row x-gap-20 y-gap-20">
              <div className="col-md-auto">
                <div className="cardImage ratio ratio-1:1 w-250 md:w-1/1 rounded-4">
                  <div className="cardImage__content">
                    <div className="cardImage-slider rounded-4 custom_inside-slider">
                      <img
                        className="img-fluid rounded-4 col-12 js-lazy"
                        style={{
                          objectFit: "contain",
                          height: "100%",
                          width: "100%",
                        }}
                        src={company?.employer?.companyLogo || logo}
                        alt="company logo"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md">
                <h3 className="text-20 lh-16 fw-600" style={{ color: "#004080" }}>
                  {company?.employer?.companyName}
                </h3>

                <div className="row x-gap-10 y-gap-10 items-center pt-10">
                  <div className="col-auto">
                    <p className="text-16">
                      <FaUser className="mr-5" />
                      {company?.employer?.contactPerson}
                    </p>
                  </div>
                  <div className="col-auto">
                    <p className="text-16">
                      <FaMapMarkerAlt className="mr-5" />
                      {company?.employer?.companyCity}, {company?.employer?.companyState}
                    </p>
                  </div>
                  <div className="col-auto">
                    <div className="size-3 rounded-full bg-light-1"></div>
                  </div>
                  <div className="col-auto">
                    <span className="text-16 py-5 px-15 rounded-100" style={{ backgroundColor: "#6c757d", color: "white" }}>
                      {company?.employer?.companyType}
                    </span>
                  </div>
                </div>

                <div className="text-16 lh-15 mt-20">
                  <div className="fw-600" style={{ color: "#004080" }}>Industry</div>
                  <div className="d-flex flex-wrap x-gap-10 y-gap-10 pt-10 mt-2">
                    <div className="col-auto">
                      <span className="text-16 bg-blue-1-05 py-5 px-15 rounded-100" style={{ color: "#004080" }}>
                        <FaIndustry className="mr-5" />
                        {company?.employer?.companyIndustry}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-16 lh-15 mt-10">
                  <div className="fw-600" style={{ color: "#004080" }}>Company Size</div>
                  <div className="pt-5 text-16" style={{ color: "#004080" }}>
                    <FaUsers className="mr-5" style={{ color: "#004080" }} />
                    {company?.employer?.companySize}
                  </div>
                </div>
              </div>

              <div className="col-md-auto text-right md:text-left">
                <div className="row x-gap-10 y-gap-10 justify-end items-center md:justify-start">
                  <div className="col-auto">
                    <div className="text-16 lh-14 fw-600 text-light-1">{company?.employer?.companyType}</div>
                  </div>
                  <div className="col-auto">
                    <div
                      className="flex-center text-white fw-600 text-16 size-40 rounded-4"
                      style={{ backgroundColor: "#ff6600" }}
                    >
                      <FaBuilding />
                    </div>
                  </div>
                </div>

                <div className="">
                  <div className="text-16 text-light-1 mt-50 md:mt-20">
                    Trusted companies for you
                  </div>
                  <div style={{ color: "#004080" }} className="text-22 lh-12 fw-600 mt-5">
                    Verified Company
                  </div>
                  <div className="text-16 text-light-1 mt-5">
                    Active employer · Established business
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div
        style={{
          marginTop: "30px",
          marginBottom: "50px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination
          current={currentPage}
          total={filteredCompanies.length}
          pageSize={pageSize}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>

      <Modal
        title={selectedCompany?.employer?.companyName}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedCompany && (
          <div>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <img
                src={selectedCompany?.employer?.companyLogo || logo}
                alt="Company Logo"
                style={{
                  maxWidth: "150px",
                  maxHeight: "150px",
                  objectFit: "contain",
                }}
              />
            </div>

            <Descriptions bordered column={1}>
              <Descriptions.Item label="Company Name">
                {selectedCompany?.employer?.companyName}
              </Descriptions.Item>
              <Descriptions.Item label="Contact Person">
                {selectedCompany?.employer?.contactPerson}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {selectedCompany?.employer?.companyEmail ||
                  selectedCompany?.email}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                {selectedCompany?.employer?.companyPhone || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Website">
                {selectedCompany?.employer?.companyWebsite ? (
                  <a
                    href={selectedCompany?.employer?.companyWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {selectedCompany?.employer?.companyWebsite}
                  </a>
                ) : (
                  "N/A"
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Industry">
                {selectedCompany?.employer?.companyIndustry}
              </Descriptions.Item>
              <Descriptions.Item label="Company Type">
                {selectedCompany?.employer?.companyType}
              </Descriptions.Item>
              <Descriptions.Item label="Company Size">
                {selectedCompany?.employer?.companySize}
              </Descriptions.Item>
              <Descriptions.Item label="Location">
                {selectedCompany?.employer?.companyLocation}
              </Descriptions.Item>
              <Descriptions.Item label="City">
                {selectedCompany?.employer?.companyCity}
              </Descriptions.Item>
              <Descriptions.Item label="State">
                {selectedCompany?.employer?.companyState}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                {selectedCompany?.employer?.companyAddress}
              </Descriptions.Item>
              <Descriptions.Item label="Description">
                {selectedCompany?.employer?.companyDescription}
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ActiveCompany;
