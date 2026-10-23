import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { Link } from "react-router-dom";
import { Col, Row, Skeleton } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Blurhash } from "react-blurhash";
import "react-lazy-load-image-component/src/effects/blur.css";

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
                    style={{ width: "60px", height: "20px", marginTop: "10px" }}
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

const HotelProperties = ({ hotels, loading }) => {
  const handleShowOnMap = () => {
    const googleMapsUrl = `https://www.google.com/maps?q=11.664325,78.146011`;
    window.open(googleMapsUrl, "_blank");
  };


  if (loading || !job) {
    return (
      <div className="container pt-40" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      {hotels.length === 0 ? (
        <div>No Packages found.</div> 
      ) : (
        hotels.map((item) => (
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
                          pagination={{ clickable: true }}
                          navigation={true}
                        >
                          {item.img.map((slide, i) => (
                            <SwiperSlide key={i}>
                              <LazyLoadImage
                                className="rounded-4 col-12 js-lazy"
                                src={slide}
                                alt="image"
                                loading="lazy"
                                effect="blur"
                                placeholderSrc="path-to-placeholder-image.jpg" // Optionally use a placeholder image
                              />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md">
                  <h3 className="text-18 lh-16 fw-500">
                    {item?.title}
                    <br className="lg:d-none" />
                    {item?.destinations?.[0]?.country || "No destination available"}
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
                        {item?.destinations?.[0]?.name || "No destination available"}
                      </p>
                    </div>

                    <div className="col-auto">
                      <button
                        data-x-click="mapFilter"
                        onClick={handleShowOnMap}
                        className="d-block text-14 text-blue-1 underline"
                      >
                        Show on map
                      </button>
                    </div>

                    <div className="col-auto">
                      <div className="size-3 rounded-full bg-light-1"></div>
                    </div>

                    <div className="col-auto">
                      <p className="text-14">Language : {item.languages}</p>
                    </div>
                  </div>

                  <div className="text-14 lh-15 mt-20">
                    <div className="fw-500">Adventure Level</div>
                    <div className="text-light-1">{item.difficultyLevel}</div>
                  </div>

                  {/* <div className="text-14 text-green-2 lh-15 mt-10">
                    <div className="fw-500">Guide Info</div>
                    <div className="">{item.guideInfo}</div>
                  </div> */}

                  <div className="row x-gap-10 y-gap-10 pt-20">
                    <div className="col-auto">
                      <div className="border-light rounded-100 py-5 px-20 text-14 lh-14">
                        Meals
                      </div>
                    </div>

                    <div className="col-auto">
                      <div className="border-light rounded-100 py-5 px-20 text-14 lh-14">
                        Hotel
                      </div>
                    </div>

                    <div className="col-auto">
                      <div className="border-light rounded-100 py-5 px-20 text-14 lh-14">
                        Transfer
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-auto text-right md:text-left">
                  <div className="row x-gap-10 y-gap-10 justify-end items-center md:justify-start">
                    <div className="col-auto">
                      <div className="text-14 lh-14 fw-500">Exceptional</div>
                    
                    </div>
                    <div className="col-auto">
                      <div className="flex-center text-white fw-600 text-14 size-40 rounded-4 bg-blue-1">
                        4.7
                      </div>
                    </div>
                  </div>

                  <div className="">
                    <div className="text-14 text-light-1 mt-50 md:mt-20">
                      {item.durationDays} Days, {item.durationNights} Nights
                    </div>
                    {/* <div className="text-22 lh-12 fw-600 mt-5">
                      INR₹{item?.basePrice}
                    </div> */}

                    {/* <div className="text-14 text-light-1 mt-5">
                      Per Person on twin sharing
                    </div> */}

                    <Link
                      to={`/hotel-single-v1/${item.id}`}
                      className="button -md -dark-1 bg-blue-1 text-white mt-24"
                    >
                      View Details <div className="icon-arrow-top-right ml-15"></div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default HotelProperties;
