import AminitesFilter from "../sidebar/AminitesFilter";
import PirceSlider from "../sidebar/PirceSlider";
import MainFilterSearchBox from "../hotel-list-v2/MainFilterSearchBox";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Sidebar = () => {

  const [priceRange, setPriceRange] = useState([null, 100000]);
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePriceChange = (min, max) => {
    setPriceRange([min, max]);
  };

  // useEffect(() => {
  //   if (priceRange[0] !== null && priceRange[1] !== null) {
  //     const newParams = new URLSearchParams(searchParams);
  //     newParams.set("salaryRange", `${priceRange[0]}-${priceRange[1]}`);
  //     setSearchParams(newParams);
  //   }
  // }, [priceRange, searchParams, setSearchParams]);

  return (
    <>
      <div className="sidebar__item -no-border">
        <div className="px-20 py-20 bg-light-2 rounded-4">
          <h5 className="text-18 fw-500 mb-10" style={{ color: "#004080" }}>Search Job </h5>
          <div className="row y-gap-20 pt-20">
            <MainFilterSearchBox />
          </div>
        </div>
      </div>
{/* 
      <div className="sidebar__item pb-30">
        <h5 className="text-18 fw-500 mb-10">Salary Range</h5>
        <div className="row x-gap-10 y-gap-30">
          <div className="col-12">
            <PirceSlider
              priceRange={priceRange}
              handlePriceChange={handlePriceChange}
            />
          </div>
        </div>
      </div> */}

      {/* <div className="sidebar__item">
        <h5 style={{ color: "#004080"}} className="text-18 fw-500 mb-10">Job Type</h5>
        <div className="sidebar-checkbox">
          <AminitesFilter />
        </div>
      </div> */}
    </>
  );
};

export default Sidebar;