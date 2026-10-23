import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { Link } from "react-router-dom";
import logo from "../../../../public/img/building.png";
import { Col, Row, Skeleton } from "antd";

const HotelProperties = ({ jobList, loading }) => {
  const HotelPropertiesSkeleton = ({ count = 4 }) => {
    return (
      <Row gutter={[16, 16]}>
        {Array.from({ length: count }).map((_, index) => (
          <Col key={index} span={24}>
            <div className="border-top-light pt-30">
              <Row className="x-gap-20 y-gap-20">
                {/* Image Skeleton */}
                <Col md={6}>
                  <Skeleton.Image
                    active
                    style={{ width: 200, height: 200, borderRadius: "8px" }}
                  />
                </Col>

                {/* Text and Info Skeleton */}
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

                {/* Price and Action Skeleton */}
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
    return <HotelPropertiesSkeleton count={4} />;
  }

  if (!jobList || jobList.length === 0) {
    return (
      <div className="col-12">
        <div className="text-center py-5">
          <img
            src="https://img.freepik.com/free-vector/hand-drawn-no-data-concept_52683-127818.jpg?t=st=1745563008~exp=1745566608~hmac=cb209352949ff859fa8229dc202963020b51555284690f114e972a24be741525&w=1060"
            alt="No data found"
            style={{ maxWidth: "300px", margin: "0 auto" }}
          />
          <h3 className="text-18 lh-16 fw-500 mt-20">No jobs found</h3>
          <p className="text-14 text-light-1 mt-10">
            We couldn't find any jobs matching your criteria.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {jobList.map((item) => (
        <div className="col-12" key={item?.id}>
          <div className="border-top-light pt-30">
            <div className="row x-gap-20 y-gap-20">
              <div className="col-md-auto">
                <div className="cardImage ratio ratio-1:1 w-250 md:w-1/1 rounded-4">
                  <div className="cardImage__content">
                    <div className="cardImage-slider rounded-4 custom_inside-slider">
                      <Swiper
                        className="mySwiper"
                        modules={[Pagination, Navigation]}
                        pagination={{
                          clickable: true,
                        }}
                        navigation={true}
                      >
                        <SwiperSlide>
                          <img
                            className="img-fluid rounded-4 col-12 js-lazy"
                            style={{
                              objectFit: "contain",
                              height: "100%",
                              width: "100%",
                            }}
                            src={item?.companyDetails?.companyLogo || logo}
                            alt="company logo"
                          />
                        </SwiperSlide>
                      </Swiper>
                    </div>
                  </div>


                </div>
              </div>
              {/* End .col */}

              <div className="col-md">
                <h3 className="text-18 lh-16 fw-500" style={{ color: "#004080" }}>
                  {item?.title}
                  <br className="lg:d-none" /> at{" "}
                  {item?.companyDetails?.companyName}
                  {/* <div className="d-inline-block ml-10">
                    <i className="icon-star text-10 text-yellow-2"></i>
                    <i className="icon-star text-10 text-yellow-2"></i>
                    <i className="icon-star text-10 text-yellow-2"></i>
                    <i className="icon-star text-10 text-yellow-2"></i>
                    <i className="icon-star text-10 text-yellow-2"></i>
                  </div> */}
                </h3>

                <div className="row x-gap-10 y-gap-10 items-center pt-10">
                  <div className="col-auto">
                    <p className="text-14">
                      {" "}
                      {item?.companyDetails?.companyName}
                    </p>
                  </div>
                  <div className="col-auto">
                    <p className="text-14">{item?.location}</p>
                  </div>

                  {/* <div className="col-auto">
                    <button
                      data-x-click="mapFilter"
                      className="d-block text-14 text-blue-1 underline"
                    >
                      Show on map
                    </button>
                  </div> */}

                  <div className="col-auto">
                    <div className="size-3 rounded-full bg-light-1"></div>
                  </div>

                  <div className="col-auto">
                    <span className="text-14 bg-secondary text-light py-5 px-15 rounded-100">
                      {item?.type?.replace("_", " ")}
                    </span>
                  </div>
                </div>

                <div className="text-14 lh-15 mt-20">
                  <div className="fw-500" style={{ color: "#004080" }}>Skills Required</div>
                  <div className="d-flex flex-wrap x-gap-10 y-gap-10 pt-10 mt-2">
                    {item?.skillsRequired?.map((skill, index) => (
                      <div className="col-auto ">
                        <span className="text-14 bg-blue-1-05 py-5 px-15 rounded-100" style={{ color: "#004080" }}>
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-14 text-green-2 lh-15 mt-10">
                  <div className="fw-500" style={{ color: "#004080" }}>Salary Range</div>
                  <div className="">
                    {item?.salaryRange || "Competitive salary"}
                  </div>
                </div>
              </div>
              {/* End .col-md */}

              <div className="col-md-auto text-right md:text-left">
                <div className="row x-gap-10 y-gap-10 justify-end items-center md:justify-start">
                  <div className="col-auto">
                    <div className="text-14 lh-14 fw-500"  style={{ color: "#004080" }}>Experience</div>
                    {/* <div className="text-14 lh-14 text-light-1">
                      {item?.experience}
                    </div> */}
                  </div>
                  <div className="col-auto">
                  <div
  className="flex-center text-white fw-600 text-14 size-40 rounded-4"
  style={{ backgroundColor: "#ff6600" }}
>
  {item?.experience}
</div>

                  </div>
                </div>

                <div className="">
                  <div className="text-14 text-light-1 mt-50 md:mt-20">
                    Showing jobs for your profile
                  </div>
                  <div style={{ color: "#004080" }} className="text-22 lh-12 fw-600 mt-5">
                    {item?.numberOfPositions || 1} Position
                    {item?.numberOfPositions !== 1 ? "s" : ""}
                  </div>
                  <div className="text-14 text-light-1 mt-5">
                    {item?.remote
                      ? "Remote work available"
                      : "On-site position"}{" "}
                    · {item?.approved ? "Verified employer" : "New listing"}
                  </div>

                  <Link
  to={`/jobs/${item.id}`}
  className="button -md text-white mt-24 fs-6"
  style={{ backgroundColor: "#004080" }}
>
  View Details
  <div className="icon-arrow-top-right ml-15"></div>
</Link>

                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default HotelProperties;
