import { getAllJobs } from "@/api/job";
import { useEffect, useState } from "react";

const PickUpLocation = ({ setSearchTerm, searchTerm }) => {
  const [searchValue, setSearchValue] = useState(searchTerm || "");
  const [selectedItem, setSelectedItem] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);

  const getJobTitles = () => {
    getAllJobs().then((res) => {
      if (res) {
        setAllJobs(res.data);
        setJobs(res.data.slice(0, 5));
      }
    });
  };

  useEffect(() => {
    getJobTitles();
  }, []);

  useEffect(() => {
    if (searchValue.trim() === "") {
      setJobs(allJobs.slice(0, 5));
    } else {
      const filtered = allJobs.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setJobs(filtered);
    }
  }, [searchValue, allJobs]);

  useEffect(() => {
    if (searchTerm) {
      setSearchValue(searchTerm);
    }
  }, [searchTerm]); 

  const handleOptionClick = (item) => {
    setSearchValue(item.name);
    setSelectedItem(item);
    setSearchTerm(item.name);
  };

  return (
    <>
      <div className="searchMenu-loc px-20 lg:py-20 lg:px-0 js-form-dd js-liverSearch">
        <div
          data-bs-toggle="dropdown"
          data-bs-auto-close="true"
          data-bs-offset="0,22"
        >
          <h4 className="text-16 fw-500 ls-2 lh-16"   style={{ color: "#004080", marginTop: "-10px" }}>Search job by title</h4>
          <div className="text-15 text-light-1 ls-2 lh-16">
            <input
              autoComplete="off"
              type="search"
              placeholder="Type job title..."
              className="js-search js-dd-focus"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>

        <div className="shadow-2 dropdown-menu min-width-400">
          <div className="bg-white px-20 py-20 sm:px-0 sm:py-15 rounded-4">
            <ul className="y-gap-5 js-results">
              {jobs.length > 0 ? (
                jobs.map((item) => (
                  <li
                    className={`-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option mb-1 ${
                      selectedItem && selectedItem.name === item.name
                        ? "active"
                        : ""
                    }`}
                    key={item.name}
                    role="button"
                    onClick={() => handleOptionClick(item)}
                  >
                    <div className="d-flex">
                      <i className="icon-briefcase text-light-1 text-20 pt-4" />
                      <div className="ml-10">
                        <div className="text-15 lh-12 fw-500 js-search-option-target">
                          {item.name}
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="-link d-block col-12 text-left rounded-4 px-20 py-15">
                  <div className="text-15 text-gray fw-bold">No jobs found</div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default PickUpLocation;