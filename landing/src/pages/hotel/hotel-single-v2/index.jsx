import "photoswipe/dist/photoswipe.css";
import { hotelsData } from "@/data/hotels";
import Header1 from "../../../components/header/header-11";
import RatingTag from "@/components/hotel-single/RatingTag";
import TopBreadCrumb from "@/components/hotel-single/TopBreadCrumb";
import AvailableRooms2 from "@/components/hotel-single/AvailableRooms2";
import ReviewProgress2 from "@/components/hotel-single/guest-reviews/ReviewProgress2";
import DetailsReview2 from "@/components/hotel-single/guest-reviews/DetailsReview2";
import ReplyForm from "@/components/hotel-single/ReplyForm";
import ReplyFormReview2 from "@/components/hotel-single/ReplyFormReview2";
import Facilities from "@/components/hotel-single/Facilities";

import Surroundings from "@/components/hotel-single/Surroundings";
import HelpfulFacts from "@/components/hotel-single/HelpfulFacts";
import Faq from "@/components/faq/Faq";
import Hotels2 from "@/components/hotels/Hotels2";
import CallToActions from "@/components/common/CallToActions";
import DefaultFooter from "@/components/footer/default";
import FilterBox2 from "@/components/hotel-single/filter-box-2";
import StickyHeader2 from "@/components/hotel-single/StickyHeader2";
import GalleryTwo from "@/components/hotel-single/GalleryTwo";
import { useParams } from "react-router-dom";

import MetaComponent from "@/components/common/MetaComponent";
import JobReviewProgress from "@/components/hotel-single/guest-reviews/ReviewProgress2";
import JobDetailsReview from "@/components/hotel-single/guest-reviews/DetailsReview2";
import { getJobById } from "@/api/job";
import { useEffect, useState } from "react";

const metadata = {
  title: "Company information || Believe Jobs",
  description: "TravelMoyo - Travel & Tour ReactJs Template",
};

const HotelSingleV2Dynamic = () => {
  let params = useParams();
  const id = params.id;
  const [job, setJob] = useState({});
  const [loading, setLoading] = useState(false);

  const getjob = () => {
    setLoading(true);
    getJobById(id)
      .then((res) => {
        setJob(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getjob();
  }, [id]);

  return (
    <>
      <MetaComponent meta={metadata} />

      <div className="header-margin"></div>

      <Header1 />

      {/* <div className="py-10 bg-dark-2"> */}
        {/* <div className="container">
          <div className="row">
            <div className="col-12">
              <FilterBox2 />
            </div>
          </div>
        </div> */}
        {/* End .contaienr */}
      {/* </div> */}
      {/* End Search filter top */}

      {/* <StickyHeader2 hotel={hotel} /> */}

      <TopBreadCrumb />

      <GalleryTwo loading={loading} job={job} />

      <section className="pt-30">
        <div className="container">
          <div className="row y-gap-30">
            <div className="col-12">
              <RatingTag />
            </div>
          </div>
        </div>
      </section>

      {/* <section id="rooms" className="pt-30">
        <div className="container">
          <div className="row pb-20">
            <div className="col-auto">
              <h3 className="text-22 fw-500">Available Rooms</h3>
            </div>
          </div>
         

          <AvailableRooms2 hotel={hotel} />
        </div>

      </section> */}

      {/* <section className="mt-40" id="facilities">
        <div className="container">
          <div className="row x-gap-40 y-gap-40">
            <div className="col-12">
              <h3 className="text-22 fw-500">Facilities of this Company</h3>
              <div className="row x-gap-40 y-gap-40 pt-20">
                <Facilities />
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* <div className="container mt-40 mb-40">
        <div className="border-top-light"></div>
      </div> */}

      {/* <section className="pt-40" id="reviews">
        <div className="container">
          <div className="row y-gap-40 justify-between">
            <div className="col-xl-3">
              <h3 className="text-22 fw-500">User reviews</h3>
              <JobReviewProgress />
            </div>

            <div className="col-xl-8">
              <JobDetailsReview />
            </div>
          </div>
        </div>
      </section> */}
      {/* End Review section */}

      {/* <div className="container mt-40 mb-40">
        <div className="border-top-light"></div>
      </div> */}

      {/* <section>
        <div className="container">
          <div className="row y-gap-30 justify-between">
            <div className="col-xl-3">
              <div className="row">
                <div className="col-auto">
                  <h3 className="text-22 fw-500">Leave a Reply</h3>
                  <p className="text-15 text-dark-1 mt-5">
                    Your email address will not be published.
                  </p>
                </div>
              </div>

              <ReplyFormReview2 />
            </div>

            <div className="col-xl-8">
              <ReplyForm />
            </div>
          </div>
        </div>
      </section> */}

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
                    <h4 style={{color:'#004080'}} className="text-18 lh-15 fw-500">
                      Extra health & safety measures at the workplace
                    </h4>
                    <div style={{color:'#004080'}} className="text-15 lh-15">
                      This company has implemented extra health, safety, and
                      hygiene measures to ensure that employee well-being and
                      safety are their top priorities.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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

      <section id="faq" className="pt-40 layout-pb-md">
        <div className="container">
          <div className="pt-40 border-top-light">
            <div className="row y-gap-20">
              <div className="col-lg-4">
                <h2 className="text-22 fw-500">
                  {/* FAQs about */}
                  {/* <br /> The Crown Hotel */}
                </h2>
              </div>
              {/* End .row */}

              <div className="col-lg-8">
                <div className="accordion -simple row y-gap-20 js-accordion">
                  {/* <Faq /> */}
                </div>
              </div>
              {/* End .col */}
            </div>
            {/* End .row */}
          </div>
          {/* End .pt-40 */}
        </div>
        {/* End .container */}
      </section>
      {/* End Faq about sections */}

      {/* <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">
                  Popular job opportunities similar to Software Engineer
                </h2>
                <p className="sectionTitle__text mt-5 sm:mt-0">
                  Explore career paths and positions that offer similar
                  challenges and growth opportunities as the Software Engineer
                  role.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-40 sm:pt-20 item_gap-x30">
            <Hotels2 />
          </div>
      
        </div>

      </section> */}
      {/* End similar hotel */}

      <CallToActions />
      {/* End Call To Actions Section */}

      <DefaultFooter />
    </>
  );
};

export default HotelSingleV2Dynamic;
