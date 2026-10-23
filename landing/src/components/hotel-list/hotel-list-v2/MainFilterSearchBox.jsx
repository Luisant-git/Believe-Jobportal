import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PickUpLocation from "@/components/hero/hero-8/PickUpLocation";
import Skill from "@/components/hero/hero-8/Skill";
import DropOffLocation from "@/components/hero/hero-8/DropOffLocation";
import JobType from "@/components/hero/hero-8/Jobtype";
import { WindowSharp } from "@mui/icons-material";

const MainFilterSearchBox = () => {
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
    }

    const queryParams = {};

    if (searchTerm) queryParams.search = searchTerm;
    if (titleFilter) queryParams.title = titleFilter;
    if (skillFilter) queryParams.skills = skillFilter;
    if (locationFilter) queryParams.location = locationFilter;
    if (typeFilter) queryParams.type = typeFilter;

    navigate(`/jobs?${new URLSearchParams(queryParams).toString()}`);
    location.reload()
  };

  return (
    <>
      <div className="mainSearch -col-5 -w-1070   pr-20 py-20 lg:px-20 lg:pt-5 lg:pb-20 ">
        <div className="flex flex-col align-items-center ">
          <PickUpLocation
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
          />
          <br />
         

          <Skill setSkillFilter={setSkillFilter} skillFilter={skillFilter} />

          <br />

          <DropOffLocation
            setLocationFilter={setLocationFilter}
            locationFilter={locationFilter}
          />
           <br />

          <JobType setTypeFilter={setTypeFilter} typeFilter={typeFilter} />
          <br />

          <div className="button-item w-full">
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

export default MainFilterSearchBox;
