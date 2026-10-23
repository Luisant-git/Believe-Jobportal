import AddBanner from "@/components/add-banner/AddBanner";
import PopularDestinations from "@/components/destinations/PopularDestinations";
import DefaultFooter from "@/components/footer/default";
import Header1 from "@/components/header/header-8";
import Hero1 from "@/components/hero/hero-8";
import BlockGuide from "@/components/block/BlockGuide";
import Socialmedia from "@/components/block/Socialmedia";
import JobPoster from "@/components/block/jobposters";

import Trusted from "@/components/block/trusted";
import Blog from "@/components/blog/Blog3";
import CallToActions from "@/components/common/CallToActions";
import Testimonial from "@/components/home/home-1/Testimonial";
import TestimonialLeftCol from "@/components/home/home-1/TestimonialLeftCol";
import MetaComponent from "@/components/common/MetaComponent";
import PopularDestinationInternational from "@/components/destinations/PopularDestinationInternational";
import SelectFilter from "@/components/hotels/filter-tabs/SelectFilter";
import Hotels from "@/components/hotels/Hotels";

const metadata = {
  title: "Believe Jobs",
  description: "Believe Jobs - Career & Job Placement Services",
};

const Home_1 = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      {/* End Page Title */}

      <Header1 />
      {/* End Header 1 */}

      <Hero1 />
      {/* End Hero 1 */}

      <JobPoster />

      <section
        className="layout-pt-md layout-pb-md"
        style={{ backgroundColor: "#EDF9FF" }}
      >
        <div className="container">
          <div className="row y-gap-20">
            <AddBanner />
          </div>
        </div>
      </section>

      {/* End AddBanner */}

      <section
        className="layout-pt-md layout-pb-md"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <div className="container">
          <div className="row y-gap-20">
            <Socialmedia />
          </div>
        </div>
      </section>

      <section
        className="layout-pt-md layout-pb-md"
        style={{ backgroundColor: "#EDF9FF" }}
      >
        <div className="container">
          <div className="row y-gap-20">
            <Trusted />
          </div>
        </div>
      </section>

      <section
        className="layout-pt-md layout-pb-lg"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <div className="container">
          <div className="row y-gap-20 justify-between">
            <BlockGuide />
          </div>
        </div>
      </section>
      {/* End Block Guide Section */}

      <section
        className="layout-pt-lg layout-pb-lg"
        style={{ backgroundColor: "#EBF8FF" }}
      >
        <div className="container">
          <div className="row y-gap-40 justify-between">
            <div className="col-xl-5 col-lg-6" data-aos="fade-up">
              <TestimonialLeftCol />
            </div>

            <div className="col-lg-6">
              <div
                className="overflow-hidden js-testimonials-slider-3"
                data-aos="fade-up"
                data-aos-delay="50"
              >
                <Testimonial />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End testimonial Section */}

      {/* <section className="layout-pt-lg layout-pb-md" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title" style={{ color: '#054A91' }}>
                  Get inspired to land your dream job
                </h2>
                <p className="sectionTitle__text mt-5 sm:mt-0">
                  Trusted by professionals and teams to accelerate job placement and talent discovery
                </p>
              </div>
            </div>
          </div> */}
      {/* End .row  */}
      {/* <div className="row y-gap-30 pt-40"> */}
      {/* <Blog /> */}
      {/* </div> */}
      {/* End .row */}
      {/* </div> */}
      {/* End .container */}
      {/* // </section> */}
      {/* End blog Section */}

      <CallToActions />
      {/* End Call To Actions Section */}

      <DefaultFooter />
      {/* End Footer Section */}
    </>
  );
};

export default Home_1;
