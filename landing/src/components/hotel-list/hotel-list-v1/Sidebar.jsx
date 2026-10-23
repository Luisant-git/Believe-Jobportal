import SearchBox from "../sidebar/SearchBox";
import RatingsFilter from "../sidebar/RatingsFilter";
import GuestRatingFilters from "../sidebar/GuestRatingFilters";
import PirceSlider from "../sidebar/PirceSlider";

const Sidebar = ({priceRange,handlePriceChange}) => {
  return (
    <>

      <div className="sidebar__item pb-30">
        <h5 className="text-18 fw-500 mb-10">Price Filter</h5>
        <div className="row x-gap-10 y-gap-30">
          <div className="col-12">
            <PirceSlider handlePriceChange={handlePriceChange} priceRange={priceRange} />
          </div>
        </div>
      </div>

      {/* <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Star Rating</h5>
        <div className="row x-gap-10 y-gap-10 pt-10">
          <RatingsFilter />
        </div>
      </div> */}

      {/* <div className="sidebar__item">
        <h5 className="text-18 fw-500 mb-10">Package Rating</h5>
        <div className="sidebar-checkbox">
          <GuestRatingFilters  handlePriceChange={handlePriceChange} priceRange={priceRange} />
        </div>
      </div> */}
    </>
  );
};

export default Sidebar;
