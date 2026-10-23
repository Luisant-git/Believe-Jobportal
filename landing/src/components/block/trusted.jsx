import React, { useEffect, useState } from "react";
import { getTrustedEmployers } from "@/api/employers";
import { useNavigate } from "react-router-dom";
 
const TrustedBy = () => {
  const [trustedCompanies, setTrustedCompanies] = useState([]);
  const navigate = useNavigate();
  console.log(trustedCompanies, "Trusted Companies");
  
  const fetchTrustedEmployers = async () => {
    try {
      const response = await getTrustedEmployers();
      const employers = response?.data || response;
      console.log("Fetched Trusted Employers:", employers);
      
      setTrustedCompanies(employers);
    } catch (error) {
      console.error('Error fetching trusted employers:', error);
    }
  };

  useEffect(() => {
    fetchTrustedEmployers();
  }, []);
 
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
 
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
 
  // Always use scroll container, but only 6 fully visible on desktop, others overflow with scroll
  return (
    <div className="py-32 lg:py-20 md:py-14 w-full">
      <div className="container mx-auto px-20 w-full">
        {/* Header Section */}
        <div className="row justify-center w-full">
          <div className="col-12 text-center mb-32 lg:mb-20 md:mb-14 w-full">
            <h2 className="text-28 lg:text-24 md:text-20 fw-600" style={{ color: '#054A91' }}>
              TRUSTED BY
            </h2>
            <p className="text-16 lg:text-14 md:text-12 mt-10 text-dark-1" style={{ color: "#004080" }}>
              Leading companies and organizations trust our services
            </p>
          </div>
        </div>
 
        <div className="trustedby-scroll-container">
          <div className="trustedby-scroll">
            {trustedCompanies.map((company, idx) => (
              <div
                key={company.id}
                className="trustedby-item"
                style={{
                  width: '180px',
                  flex: "0 0 auto",
                  textAlign: "center"
                }}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div
                  onClick={() => navigate(`/jobs?search=${encodeURIComponent(company.employer.companyName)}`)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "110px",
                    backgroundColor: "#F8F9FA",
                    borderRadius: "12px",
                    padding: "10px",
                    margin: "0 auto",
                    cursor: "pointer",
                    textDecoration: "none",
                    transition: "all 0.3s ease"
                  }}
                >
                  {company.employer.companyLogo && company.employer.companyLogo.trim() !== '' ? (
                    <img
                      src={company.employer.companyLogo}
                      alt={company.employer.companyName}
                      style={{
                        width: "100%",
                        height: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                        objectPosition: "center",
                        cursor: "pointer"
                      }}
                    />
                  ) : (
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      height: "100%",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#054A91",
                      textAlign: "center"
                    }}>
                      {company.employer.companyName}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
 
        {/* Footer Text */}
        <div className="row justify-center mt-24 lg:mt-18 w-full">
          <div className="col-12 text-center">
            <p className="text-14 lg:text-12 text-dark-2" style={{ color: "#004080" }}>
              And many more reputable organizations that trust our platform
            </p>
          </div>
        </div>
      </div>
      <style>{`
        .trustedby-scroll-container {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scroll-snap-type: x mandatory;
          padding-bottom: 6px;
          margin-left: -10px;
          margin-right: -10px;
        }
        .trustedby-scroll {
          display: flex;
          gap: 16px;
          padding: 0 10px;
          min-width: min-content;
        }
        .trustedby-item {
          scroll-snap-align: start;
        }
        /* Desktop: Show only 6 fully at a time, enable horizontal scroll for more */
        @media (min-width: 768px) {
          .trustedby-scroll-container {
            max-width: 1200px; /* 180px * 6 + 16px * 5 = 1200px */
            margin-left: auto;
            margin-right: auto;
            overflow-x: auto;
          }
        }
        /* Scrollbar styles: transparent for desktop */
        .trustedby-scroll-container::-webkit-scrollbar {
          height: 8px;
          background: transparent;
        }
        .trustedby-scroll-container::-webkit-scrollbar-thumb {
          background: transparent;
        }
        .trustedby-scroll-container {
          scrollbar-color: transparent transparent;
        }
        /* Hide scroll bar on mobile if you want */
        @media (max-width: 767px) {
          .trustedby-scroll-container::-webkit-scrollbar {
            display: none;
          }
          .trustedby-scroll-container {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        }
      `}</style>
    </div>
  );
};
 
export default TrustedBy;
 