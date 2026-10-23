import { Link } from "react-router-dom";
import { getAuthDatum } from "@/utils/auth";
import jobImage from '../../assets/img/job1.jpg';
import companyImage from '../../assets/img/job2.jpg';

const AddBanner = () => {
  const { decodedToken } = getAuthDatum();
  const isJobSeeker = decodedToken?.role == "job_seeker";
  const isEmployer = decodedToken?.role == "employer";
  const isAuthenticated = !!decodedToken;

  const addContent = [
    {
      id: 1,
      img: jobImage,
      buttonText: "Start Applying Now",
      buttonStyle: {
        backgroundColor: "#ffcc00",
        color: "#000000",
        border: "none",
        borderRadius: "6px",
        fontWeight: "600",
      },
      getRouterPath: () => (isJobSeeker && isAuthenticated ? "/jobs" : "/login"),
      delayAnimation: "0",
    },
    {
      id: 2,
      img: companyImage,
      buttonText: "Post a Job Now",
      buttonStyle: {
        backgroundColor: "#004080",
        color: "#ffffff",
        border: "none",
        borderRadius: "6px",
        fontWeight: "600",
      },
      getRouterPath: () => (isEmployer && isAuthenticated ? "/em-CategoryList" : "/employee/login"),
      delayAnimation: "100",
    },
  ];

  return (
    <div
      className="d-flex justify-content-center align-items-center px-3"
      style={{
        minHeight: "70vh",
        width: "100%",
      }}
    >
      <div className="row gx-4 gy-4 justify-content-center w-100" style={{ maxWidth: "1400px" }}>
        {addContent.map((item) => (
          <div
            className="col-12 col-md-6 d-flex"
            data-aos="fade-up"
            data-aos-delay={item.delayAnimation}
            key={item.id}
          >
            <div
              className="ctaCard -type-1 rounded-4 w-100 d-flex flex-column"
              style={{
                backgroundColor: "#004080",
                minHeight: "100%",
              }}
            >
              <div className="ctaCard__image ratio ratio-63:55">
                <img
                  className="img-ratio js-lazy loaded"
                  src={item.img}
                  alt="image"
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "auto",
                 
                  }}
                />
              </div>
              <div
                className="ctaCard__content d-flex flex-column p-4 p-md-5"
                style={{ flexGrow: 1 }}
              >
                <div>
                  <h4
                    className="text-white mb-2 fw-bold"
                    style={{
                      fontSize: "1.5rem",
                      lineHeight: "2rem",
                    }}
                  >
                    {item.title || ""}
                  </h4>
                  <p
                    className="text-white mb-3 fw-semibold"
                    style={{
                      fontSize: "1.125rem",
                      lineHeight: "1.75rem",
                    }}
                  >
                    {item.subtitle || ""}
                  </p>
                  <div
                    className="text-white mb-4"
                    style={{
                      fontSize: "1rem",
                      lineHeight: "1.6rem",
                    }}
                  >
                    {item.description || ""}
                  </div>
                </div>
                <div className="mt-auto">
                  <Link
                    to={item.getRouterPath()}
                    className="d-inline-block text-center"
                    style={{
                      ...item.buttonStyle,
                      fontSize: "1rem",
                      padding: "14px 32px",
                      lineHeight: "1.1rem",
                      minWidth: "150px",
                      display: "inline-block",
                      transition: "all 0.3s ease",
                      textDecoration: "none",
                    }}
                  >
                    {item.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddBanner;
