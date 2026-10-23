import ModalVideo from "react-modal-video";
import { Gallery, Item } from "react-photoswipe-gallery";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import ContactForm from "../common/ContactForm";

export default function GalleryOne({ hotel }) {
  const [isOpen, setOpen] = useState(false);

const navigate=useNavigate()
const handleShowOnMap = () => {
  const latitude = hotel?.map[0]?.latitude;
  const longitude = hotel?.map[0]?.longitude;

  // Ensure that latitude and longitude are valid
  if (latitude && longitude) {
    const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(googleMapsUrl, '_blank');
  } else {
    console.log('Invalid latitude or longitude');
  }
};

const[openenquire,setEnquire]=useState(false)
const handleopenequire=()=>{
setEnquire(true)
}
const handlecloseequire=()=>{
setEnquire(false)
}
  return (
    <>
      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        
        videoId={hotel?.videoUrl}
        onClose={() => setOpen(false)}
      />
      <section className="pt-40">
        <div className="container">
          <div className="row y-gap-20 justify-between items-end">
            <div className="col-auto">
              <div className="row x-gap-20  items-center">
                <div className="col-auto">
                  <h1 className="text-30 sm:text-25 fw-600">{hotel?.title}</h1>
                </div>
                {/* End .col */}
                {/* <div className="col-auto">
                  <i className="icon-star text-10 text-yellow-1" />
                  <i className="icon-star text-10 text-yellow-1" />
                  <i className="icon-star text-10 text-yellow-1" />
                  <i className="icon-star text-10 text-yellow-1" />
                  <i className="icon-star text-10 text-yellow-1" />
                </div> */}
              </div>
              {/* End .row */}

              <div className="row x-gap-20 y-gap-20 items-center">
                <div className="col-auto">
                  <div className="d-flex items-center text-15 text-light-1">
                    <i className="icon-location-2 text-16 mr-5" />
                    {hotel?.destinations?.[0]?.country || "No destination available"}
                  </div>
                  <div className="d-flex items-center text-15 text-light-1">
                  <FontAwesomeIcon icon={faSun} className="text-16 mr-5" />
                    {hotel?.durationDays|| "No destination available"} Days /
                    <FontAwesomeIcon icon={faMoon} className="text-16 mr-5 ms-2" />
                    {hotel?.durationNights|| "No destination available"} Nights 
                  </div>
                </div>
                <div onClick={handleShowOnMap} className="col-auto">
                  <button
                    data-x-click="mapFilter"
                    className="text-blue-1 text-15 underline"
                  >
                    Show on map
                  </button>
                </div>
              </div>
              {/* End .row */}
            </div>
            {/* End .col */}

            <div className="col-auto">
              <div className="row x-gap-15 y-gap-15 items-center">
                <div className="col-auto">
                  <div className="text-14">
            
                    {/* <span className="text-22 text-dark-1 fw-500">
                     INR  ₹{hotel?.basePrice}
                    </span>
                    <div>Per Adult</div> */}
                  </div>
                  <div className="text-14">
            
                    
                    {/* <div>For children : ₹{hotel?.childrenPrice}</div>  */}
                  </div>
                </div>
                <div className="col-auto">
                <button onClick={() => {
                const token = localStorage.getItem("token");
                if (!token) {
                  // Show modal if token is not found
                  Modal.warning({
                    title: "Warning",
                    content: "You need to be logged in to proceed. Please log in first.",
                    onOk: () => {
                      // Redirect to login page when OK is clicked
                      navigate(`/signup?redirect=${encodeURIComponent(location.pathname)}`);
                    },
                  });
                } else {
                  // Redirect to booking page if token is found
                  navigate(`/booking-page/${hotel.id}`);
                }
              }} className="button -dark-1 px-35 h-60 col-12 bg-blue-1 text-white">
                Book Now
              </button>
              <button onClick={handleopenequire} className="button -dark-1 px-35 h-40 col-12 bg-yellow-1 text-black mt-2">Enquire</button>
                </div>
              </div>
            </div>
            {/* End .col */}
          </div>
          {/* End .row */}

          <Gallery>
            
            <div className="galleryGrid -type-1 pt-30">
              <div className="galleryGrid__item relative d-flex">
                
                <Item
                  original={hotel?.img[0]}
                  thumbnail={hotel?.img[0]}
                  width={660}
                  height={660}
                >
                  {({ ref, open }) => (
                    <img
                      src={hotel?.img[0]}
                      ref={ref}
                      onClick={open}
                      alt="image"
                      role="button"
                      className="rounded-4"
                    />
                  )}
                </Item>
                {/* <div className="absolute px-20 py-20 col-12 d-flex justify-end">
                  <button className="button -blue-1 size-40 rounded-full flex-center bg-white text-dark-1">
                    <i className="icon-heart text-16" />
                  </button>
                </div> */}
              </div>
              {/* End .galleryGrid__item */}

              <div className="galleryGrid__item">
                <Item
                  original={hotel?.img[1]}
                  thumbnail={hotel?.img[1]}
                  width={450}
                  height={375}
                >
                  {({ ref, open }) => (
                    <img
                      ref={ref}
                      onClick={open}
                      src={hotel.img[1]}
                      alt="image"
                      className="rounded-4"
                      role="button"
                    />
                  )}
                </Item>
              </div>
              {/* End .galleryGrid__item */}

              <div className="galleryGrid__item relative d-flex">
                <img
                  src={hotel.img[2]}
                  alt="image"
                  className="rounded-4"
                  role="button"
                />
                <div className="absolute h-full col-12 flex-center">
                  <div
                    className="button -blue-1 size-40 rounded-full flex-center bg-white text-dark-1 js-gallery"
                    role="button"
                    onClick={() => setOpen(true)}
                  >
                    <i className="icon-play text-16" />
                  </div>
                </div>
              </div>
              {/* End .galleryGrid__item */}

              <div className="galleryGrid__item">
                <Item
                  original={hotel?.img[3]}
                  thumbnail={hotel?.img[3]}
                  width={450}
                  height={375}
                >
                  {({ ref, open }) => (
                    <img
                      ref={ref}
                      onClick={open}
                      src={hotel.img[3]}
                      alt="image"
                      className="rounded-4"
                      role="button"
                    />
                  )}
                </Item>
              </div>
              {/* End .galleryGrid__item */}

              <div className="galleryGrid__item relative d-flex">
                <img
                  src={hotel?.img[4]}
                  alt="image"
                  className="rounded-4"
                />
                <div className="absolute px-10 py-10 col-12 h-full d-flex justify-end items-end">
                  <Item
                    original={hotel.img[4]}
                    thumbnail={hotel.img[4]}
                    width={450}
                    height={375}
                  >
                    {({ ref, open }) => (
                      <div
                        className="button -blue-1 px-24 py-15 bg-white text-dark-1 js-gallery"
                        ref={ref}
                        onClick={open}
                        role="button"
                      >
                        See All Photos
                      </div>
                    )}
                  </Item>
                </div>
              </div>
              {/* End .galleryGrid__item */}
            </div>
          </Gallery>
        </div>
        <Modal
        width={900}
        title="Enquire here"
        visible={openenquire}
        footer={null}
        onOk={handlecloseequire}
        onCancel={handlecloseequire}
      >
   <ContactForm/>
      </Modal>
        {/* End .container */}
      </section>
    </>
  );
}
