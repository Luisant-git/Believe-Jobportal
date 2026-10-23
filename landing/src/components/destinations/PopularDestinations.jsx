import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { Scrollbar } from "swiper";
import { truncateDescription } from "@/utils/auth";

const PopularDestinations = () => {
  const [holidayPackages, setHolidayPackages] = useState([]);
  const navigate = useNavigate(); // Get the navigate function
  


  return (
    <>
      <Swiper
        spaceBetween={30}
        className="overflow-visible"
        scrollbar={{
          el: ".js-popular-destination-scrollbar",
          draggable: true,
        }}
        modules={[Scrollbar, Navigation]}
        navigation={{
          nextEl: ".js-destination-next",
          prevEl: ".js-destination-prev",
        }}
        breakpoints={{
          500: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 22,
          },
          1024: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
      >
        {holidayPackages.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="citiesCard -type-1 d-block rounded-4">
              <div className="citiesCard__image ratio ratio-3:4">
                <img style={{objectFit:'cover'}} src={item.img[0] || "#"} alt="image" className="js-lazy" />
              </div>
              <div className="citiesCard__content d-flex flex-column justify-between text-center pt-30 pb-20 px-20">
                <div className="citiesCard__bg" />
                <div className="citiesCard__top">
                  <div className="text-14 text-white">{truncateDescription(item?.description, 10)}</div>
                </div>
                <div className="citiesCard__bottom">
                  <h4 className="text-26 md:text-20 lh-13 text-white mb-20">
                    {item.title}
                  </h4>
                  <button
                    onClick={() => handleDiscoverClick(item.id)}  // Navigate on click
                    className="button col-12 h-60 -blue-1 bg-white text-dark-1"
                  >
                    Discover
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div>
        <button className="section-slider-nav -prev flex-center button -blue-1 bg-white shadow-1 size-40 rounded-full sm:d-none js-destination-prev">
          <i className="icon icon-chevron-left text-12" />
        </button>
        <button className="section-slider-nav -next flex-center button -blue-1 bg-white shadow-1 size-40 rounded-full sm:d-none js-destination-next">
          <i className="icon icon-chevron-right text-12" />
        </button>
        <div className="slider-scrollbar bg-light-2 mt-40 js-popular-destination-scrollbar" />
      </div>
    </>
  );
};

export default PopularDestinations;
