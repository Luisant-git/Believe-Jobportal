import "photoswipe/dist/photoswipe.css";
import { hotelsData } from "@/data/hotels";
import Header11 from "@/components/header/header-11";
import Overview from "@/components/hotel-single/Overview";
import PopularFacilities from "@/components/hotel-single/PopularFacilities";
import PropertyHighlights from "@/components/hotel-single/PropertyHighlights";
import RatingTag from "@/components/hotel-single/RatingTag";
import StickyHeader from "@/components/hotel-single/StickyHeader";
import TopBreadCrumb from "@/components/hotel-single/TopBreadCrumb";
import SidebarRight from "@/components/hotel-single/SidebarRight";
import AvailableRooms from "@/components/hotel-single/AvailableRooms";
import ReviewProgress from "@/components/hotel-single/guest-reviews/ReviewProgress";
import DetailsReview from "@/components/hotel-single/guest-reviews/DetailsReview";
import ReplyForm from "@/components/hotel-single/ReplyForm";
import ReplyFormReview from "@/components/hotel-single/ReplyFormReview";
import Facilities from "@/components/hotel-single/Facilities";
import Surroundings from "@/components/hotel-single/Surroundings";
import HelpfulFacts from "@/components/hotel-single/HelpfulFacts";
import Faq from "@/components/faq/Faq";
import Hotels2 from "@/components/hotels/Hotels2";
import CallToActions from "@/components/common/CallToActions";
import DefaultFooter from "@/components/footer/default";
import GalleryOne from "@/components/hotel-single/GalleryOne";
import { useParams } from "react-router-dom";

import MetaComponent from "@/components/common/MetaComponent";
import { useEffect, useState } from "react";
import SummaryPolicy from "@/components/hotel-single/SummaryPolicy";
import Loading from "@/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCity,
  faCoffee,
  faFan,
  faGlassMartiniAlt,
  faSpa,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";

const metadata = {
  title: "Hotel Single v1 || TravelMoyo - Travel & Tour ReactJs Template",
  description: "TravelMoyo - Travel & Tour ReactJs Template",
};

const HotelSingleV1Dynamic = () => {
  const [loading, setLoading] = useState(false);
  const [vacation, setVacation] = useState([]);
  let params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetchsetVacation = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/holiday-packages/data/${id}`
        );
        const data = await response.json();
        setVacation([data]);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchsetVacation();
  }, [id]);
  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <>
      {vacation.map((item) => (
        <>
          <MetaComponent meta={metadata} />
          {/* End Page Title */}
          <div className="header-margin"></div>
          {/* header top margin */}
          <Header11 />
          {/* End Header 1 */}
          {/* <TopBreadCrumb /> */}
          {/* End top breadcrumb */}
          <StickyHeader hotel={item} />
          {/* sticky single header for hotel single */}
          <GalleryOne hotel={item} />
          {/* End gallery grid wrapper */}
          <section className="pt-30">
            <div className="container">
              <div className="row y-gap-30">
                <div className="col-xl-8">
                  <div className="row y-gap-40">
                    <div className="col-12">
                      <h3 className="text-22 fw-500">Package  highlights</h3>
                      <PropertyHighlights hotel={item} />
                    </div>
                    {/* End .col-12 Property highlights */}

                    {/* End .col-12  Overview */}
                    {/* <div className="col-12">
                      <h3 className="text-22 fw-500 pt-40 border-top-light">
                        Most Popular Facilities
                      </h3>
                      <div className="row y-gap-10 pt-20">
                        <PopularFacilities />
                      </div>
                    </div> */}

                    {/* End .col-12 Most Popular Facilities */}
                    {/* <div className="col-12">
                      <RatingTag />
                    </div> */}
                    {/* End .col-12 This property is in high demand! */}
                  </div>
                  {/* End .row */}
                </div>
                {/* End .col-xl-8 */}
                <div className="col-xl-4">
                  <SidebarRight hotel={item} />
                </div>
                {/* End .col-xl-4 */}
              </div>
              {/* End .row */}
            </div>
            {/* End container */}
          </section>
          <section id="rooms" className="pt-30">
            <div className="container border "> 
              <div className=" pb-20 mt-3">
                <div className="">
                  <h3 className="text-22 fw-500">Hotels</h3>

                  <div>
                    <div className="mt-4">
                      <div className="">
  
                      {item?.rooms?.map((m, index) => (
  <div key={index} className="row g-4 align-items-start">
    <div className="col-lg-8 col-md-6 col-sm-12">
      <div className="roomGrid border rounded shadow-sm p-3">
        <div className="roomGrid__details">
          <div className="d-flex align-items-center">
            <FontAwesomeIcon
              icon={faCity}
              size="lg"
              className="text-primary me-2"
            />
            <h5 className="mb-0">Hotel Name: {m.type}</h5>
          </div>
          <p className="text-muted mt-2" dangerouslySetInnerHTML={{ __html: m.name }} />

          <ul className="list-unstyled bg-light p-3 rounded">
            {/* <li className="text-dark">
              <strong>Hotel:</strong> <p dangerouslySetInnerHTML={{ __html: m.name }}></p>
            </li> */}
            {/* <li className="text-dark">
              <strong>Capacity:</strong> {m.capacity}
            </li> */}
            {/* <li className="text-dark">
              <strong>Discription:</strong> {m.type}
            </li> */}
            {/* <li className="text-dark">
              <strong>Max Occupancy:</strong> {m?.maxOccupancy}
            </li> */}
            {/* <li className="text-dark">
              <strong>Price Per Night:</strong> {m?.pricePerNight}
            </li> */}
          </ul>
        </div>

        <div className="features mt-3">
          <div className="d-flex flex-wrap gap-2">
            <span className="badge bg-light text-dark d-flex align-items-center gap-2">
              <FontAwesomeIcon icon={faWifi} /> WiFi
            </span>
            <span className="badge bg-light text-dark d-flex align-items-center gap-2">
              <FontAwesomeIcon icon={faGlassMartiniAlt} /> Bar
            </span>
            <span className="badge bg-light text-dark d-flex align-items-center gap-2">
              <FontAwesomeIcon icon={faBell} /> Room Service
            </span>
            <span className="badge bg-light text-dark d-flex align-items-center gap-2">
              <FontAwesomeIcon icon={faFan} /> Air Conditioning
            </span>
          </div>
        </div>
      </div>
    </div>

    <div className="col-lg-3 col-md-6 col-sm-12">
      <div className="image-container position-relative">
        <img
          src={m.imgUrl}
          
          alt="Hotel Room"
          className="img-fluid rounded"
        />
      </div>
    </div>
  </div>
))}

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="rooms" className="pt-30">
            <div className="container">
              <div className="row pb-20">
                <div className="col-auto">
                  <h3 className="text-22 fw-500">Package Itinerary</h3>
                </div>
              </div>
              {/* End .row */}
              <AvailableRooms hotel={item} />
              <div id="overview" className="col-12">
                <Overview vacation={item} />
              </div>
            </div>
            {/* End .container */}
          </section>
          {/* End single page content */}

          <section className="pt-40">
            <SummaryPolicy item={item} />
          </section>

          {/* End Available Rooms */}
          {/* <section className="pt-40" id="reviews">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <h3 className="text-22 fw-500">Guest reviews</h3>
                </div>
              </div>
          
              <ReviewProgress id={id} />
            
              <div className="pt-40">
                <DetailsReview id={id} />
        
              </div>

            
            </div>
            
          </section> */}
          {/* End Review section */}
          {/* <section className="pt-40">
            <div className="container">
              <div className="row">
                <div className="col-xl-8 col-lg-10">
                  <div className="row">
                    <div className="col-auto">
                      <h3 className="text-22 fw-500">Leave a Reply</h3>
                      <p className="text-15 text-dark-1 mt-5">
                        Your email address will not be published.
                      </p>
                    </div>
                  </div>
                
                  <ReplyForm id={id} />
                </div>
              </div>
            </div>
          </section> */}
          {/* End Reply Comment box section */}
          {/* <section className="mt-40" id="facilities">
            <div className="container">
              <div className="row x-gap-40 y-gap-40">
                <div className="col-12">
                  <h3 className="text-22 fw-500">Facilities of this Package</h3>
                  <div className="row x-gap-40 y-gap-40 pt-20">
                    <Facilities />
                  </div>
             
                </div>
               
              </div>
             
            </div>
         
          </section> */}
{/* 
          <section className="pt-40">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="px-24 py-20 rounded-4 bg-light-2">
                    <div className="row x-gap-20 y-gap-20 items-center">
                      <div className="col-auto">
                        <div className="flex-center size-60 rounded-full bg-white">
                          <img src="/img/icons/health.svg" alt="icon" />
                        </div>
                      </div>
                      <div className="col-auto">
                        <h4 className="text-18 lh-15 fw-500">
                          Extra health &amp; safety measures
                        </h4>
                        <div className="text-15 lh-15">
                          This property has taken extra health and hygiene
                          measures to ensure that your safety is their priority
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section> */}
          {/* End health &  safety measures section */}
          {/* <section className="pt-40">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <h3 className="text-22 fw-500">Hotel surroundings</h3>
                </div>
              </div>
      
              <div className="row x-gap-50 y-gap-30 pt-20">
                <Surroundings />
              </div>
      
            </div>
     
          </section> */}
          {/* End hotel surroundings */}
          {/* <section className="pt-40">
            <div className="container">
              <div className="pt-40 border-top-light">
                <div className="row">
                  <div className="col-12">
                    <h3 className="text-22 fw-500">Some helpful facts</h3>
                  </div>
                </div>
               
                <div className="row x-gap-50 y-gap-30 pt-20">
                  <HelpfulFacts />
                </div>
              
              </div>
        
            </div>
           
          </section> */}
          {/* End helpful facts surroundings */}
          {/* <section id="faq" className="pt-40 layout-pb-md">
            <div className="container">
              <div className="pt-40 border-top-light">
                <div className="row y-gap-20">
                  <div className="col-lg-4">
                    <h2 className="text-22 fw-500">
                      FAQs about
                      <br /> The Crown Hotel
                    </h2>
                  </div>
               
                  <div className="col-lg-8">
                    <div className="accordion -simple row y-gap-20 js-accordion">
                      <Faq />
                    </div>
                  </div>
              
                </div>
            
              </div>
            
            </div>
       
          </section> */}
          {/* End Faq about sections */}
          {/* <section className="layout-pt-md layout-pb-lg">
            <div className="container">
              <div className="row justify-center text-center">
                <div className="col-auto">
                  <div className="sectionTitle -md">
                    <h2 className="sectionTitle__title">
                      Popular properties similar to The Crown Hotel
                    </h2>
                    <p className=" sectionTitle__text mt-5 sm:mt-0">
                      Interdum et malesuada fames ac ante ipsum
                    </p>
                  </div>
               
                </div>
            
              </div>
   
              <div className="pt-40 sm:pt-20 item_gap-x30">
   
              </div>
          
            </div>
            
          </section> */}
          {/* End similar hotel */}
          <CallToActions />
          {/* End Call To Actions Section */}
          <DefaultFooter />
        </>
      ))}
    </>
  );
};

export default HotelSingleV1Dynamic;
