import CallToActions from "@/components/common/CallToActions";
import Header11 from "@/components/header/header-11";
import DefaultFooter from "@/components/footer/default";
import ResumeBuilder from "@/components/hotel-list/hotel-list-v5/ResumeBuilder";
import Pagination from "@/components/hotel-list/common/Pagination";
import HotelProperties from "@/components/hotel-list/hotel-list-v5/HotelProperties";
import DropdownSelelctBar from "@/components/hotel-list/common/DropdownSelelctBar";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Resume || Believe Jobs",
  description: "TravelMoyo - Travel & Tour ReactJs Template",
};

const ResumeBuilders = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <Header11 />

        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* End text-center */}
              <ResumeBuilder />
            </div>
            {/* End col-12 */}
          </div>
        </div>
     
      {/* Top SearchBanner */}
      {/* End layout for listing sidebar and content */}

      <CallToActions />
      {/* End Call To Actions Section */}

      <DefaultFooter />
    </>
  );
};

export default ResumeBuilders;
