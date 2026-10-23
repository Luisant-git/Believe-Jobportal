import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const JobType = ({ setTypeFilter, typeFilter }) => {
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const jobTypesOption = [
    {
      id: "full_time",
      name: "Full Time",
      address: "Greater India, United Kingdom",
    },
    {
      id: "part_time",
      name: "Part Time",
      address: "New York State, United States",
    },
    {
      id: "contract",
      name: "Contract",
      address: "France",
    },
    {
      id: "freelance",
      name: "Freelance",
      address: "Spain",
    },
    {
      id: "internship",
      name: "Internship",
      address: "Greece",
    },
    {
      id: "temporary",
      name: "Temporary",
      address: "Greece",
    },
  ];

  // Initialize from URL parameter if present
  useEffect(() => {
    const urlType = searchParams.get("type");
    if (urlType) {
      const foundItem = jobTypesOption.find(item => item.id === urlType);
      if (foundItem) {
        setSearchValue(foundItem.name);
        setSelectedItem(foundItem);
        setTypeFilter(foundItem.id);
      }
    }
  }, [searchParams, setTypeFilter]);

  // Filter job types based on search input
  const filteredJobTypes = useMemo(() => {
    if (!searchValue.trim()) return jobTypesOption;

    return jobTypesOption.filter(
      (item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.address.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, jobTypesOption]);

  const handleOptionClick = (item) => {
    setSearchValue(item.name);
    setSelectedItem(item);
    setTypeFilter(item.id);
  };

  return (
    <>
      <div className="searchMenu-loc px-20 lg:py-20 lg:px-0 js-form-dd js-liverSearch">
        <div
          data-bs-toggle="dropdown"
          data-bs-auto-close="true"
          data-bs-offset="0,22"
        >
          <h4 className="text-16 fw-500 ls-2 lh-16"   style={{ color: "#004080", marginTop: "-10px" }}>Search job by Type</h4>
          <div className="text-15 text-light-1 ls-2 lh-16">
            <input
              autoComplete="off"
              type="search"
              placeholder="Select job type"
              className="js-search js-dd-focus"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>

        <div className="shadow-2 dropdown-menu min-width-400">
          <div className="bg-white px-20 py-20 sm:px-0 sm:py-15 rounded-4">
            <ul className="y-gap-5 js-results">
              {filteredJobTypes.length > 0 ? (
                filteredJobTypes.map((item) => (
                  <li
                    className={`-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option mb-1 ${
                      selectedItem && selectedItem.id === item.id ? "active" : ""
                    }`}
                    key={item.id}
                    role="button"
                    onClick={() => handleOptionClick(item)}
                  >
                    <div className="d-flex">
                      <div className="icon-newsletter text-light-1 text-20 pt-4" />
                      <div className="ml-10">
                        <div className="text-15 lh-12 fw-500 js-search-option-target">
                          {item.name}
                        </div>
                        <div className="text-14 lh-12 text-light-1 mt-5">
                          {item.address}
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="-link d-block col-12 text-left rounded-4 px-20 py-15">
                  <div className="text-15 text-gray">No job types found</div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobType;