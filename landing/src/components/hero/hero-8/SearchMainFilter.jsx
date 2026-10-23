import { useNavigate } from "react-router-dom";
import JobType from "./Jobtype";
import Skill from "./Skill";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PickUpLocation from "./PickUpLocation";
import DropOffLocation from "./location";

const SearchMainFilter = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [titleFilter, setTitleFilter] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const handleSearch = () => {
    if (
      !searchTerm &&
      !titleFilter &&
      !skillFilter &&
      !locationFilter &&
      !typeFilter
    ) {
      toast.warning("Please select at least one filter before searching", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
      return;
    }

    const queryParams = {};

    if (searchTerm) queryParams.search = searchTerm;
    if (titleFilter) queryParams.title = titleFilter;
    if (skillFilter) queryParams.skills = skillFilter;
    if (locationFilter) queryParams.location = locationFilter;
    if (typeFilter) queryParams.type = typeFilter;

    navigate(`/jobs?${new URLSearchParams(queryParams).toString()}`);
  };

  return (
    <>
      <div className="mainSearch -col-5 -w-1070 mx-auto bg-white pr-20 py-20 lg:px-20 lg:pt-5 lg:pb-20 rounded-4 shadow-1">
        <div className="button-grid items-center">
          <PickUpLocation
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
          />

          <Skill setSkillFilter={setSkillFilter} skillFilter={skillFilter} />

          <DropOffLocation
            setLocationFilter={setLocationFilter}
            locationFilter={locationFilter}
          />

          <JobType setTypeFilter={setTypeFilter} typeFilter={typeFilter} />

          <div className="button-item">
          <button
  className="mainSearch__submit button py-15 px-35 h-60 col-12 rounded-4 text-white"
  onClick={handleSearch}
  style={{ backgroundColor: "#004080", borderColor: "#004080" }}
>
  <i className="icon-search text-20 mr-10" />
  Search Jobs
</button>

          </div>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default SearchMainFilter;
