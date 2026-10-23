import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import MainFilterSearchBox from "./SearchMainFilter";
import SearchMainFilter from "./SearchMainFilter";
import { getActiveBanner } from "@/api/banner";
import { useEffect, useState } from "react";

const index = () => {
  const [banner, setBanner] = useState([]);

  const getAllActiveBanner = async () => {
    const response = await getActiveBanner();
    setBanner(response?.data || response);
  };

  useEffect(() => {
    getAllActiveBanner();
  }, []);
  return (
    <section
      className="masthead -type-8 pt-90"
      style={{ backgroundColor: "#004080" }}
    >
      <div className="masthead__bg">
        <img
          src="/img/masthead/8/bg.png"
          alt="image"
          className="col-12 h-full object-cover"
        />
      </div>

      <div style={{ marginTop: 50 }} className="container">
        <div className="row justify-center">
          <div className="col-xl-10">
            <div className="text-center">
              <h1
                className="text-60 lg:text-40 md:text-30 text-white"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                Believe Jobs
              </h1>
              <h1
                className="text-60 lg:text-40 md:text-30 text-white"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                Your Gateway to Career Success
              </h1>
              <p
                className="text-white mt-5"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                Explore jobs that match your skills, passion, and potential —
                all in one place.
                <br></br>
                Find Your Dream Job Today
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* End .container */}

      <div
        className="masthead-bottom mt-80 md:mt-4"
        data-aos="fade-up"
        data-aos-delay="400"
        data-aos-offset="0"
      >
        <SearchMainFilter />
        {/* End Search filter box */}

        <div className="masthead-slider overflow-hidden js-masthead-slider-8">
          <Swiper
            modules={[Navigation, Autoplay]}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            speed={2000}
            navigation={{
              nextEl: ".hero8-next-active",
              prevEl: ".hero8-prev-active",
            }}
          >
            {banner?.map((item) => (
              <SwiperSlide key={item.id}>
                <img src={item.image} alt={item.name} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Start Slider Prev and Next */}
          <div className="masthead-slider__nav -prev">
            <button
              className="button -outline-white size-50 flex-center text-white rounded-full hero8-prev-active"
              style={{ borderColor: "#ffcc00", color: "#ffcc00" }}
            >
              <i className="icon-arrow-left" />
            </button>
          </div>

          <div className="masthead-slider__nav -next">
            <button
              className="button -outline-white size-50 flex-center text-white rounded-full hero8-next-active"
              style={{ borderColor: "#ffcc00", color: "#ffcc00" }}
            >
              <i className="icon-arrow-right" />
            </button>
          </div>
          {/* End Slider Prev and Next */}
        </div>
        {/* End image slider */}
      </div>
      {/* End masthead bottom slider */}
    </section>
  );
};

export default index;
