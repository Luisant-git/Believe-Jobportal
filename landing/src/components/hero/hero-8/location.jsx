import { getAllLocations } from "@/api/job";
import { useEffect, useState } from "react";

const DropOffLocation = ({ setLocationFilter, locationFilter }) => {
  const [searchValue, setSearchValue] = useState(locationFilter || ""); // Initialize with locationFilter
  const [selectedItem, setSelectedItem] = useState(null);
  const [location, setLocation] = useState([]);
  const [allLocations, setAllLocations] = useState([]);

  const getLookUp = () => {
    getAllLocations().then((res) => {
      if (res) {
        setAllLocations(res.data);
        setLocation(res.data.slice(0, 5));
      }
    });
  };

  useEffect(() => {
    getLookUp();
  }, []);

  useEffect(() => {
    if (searchValue.trim() === "") {
      setLocation(allLocations.slice(0, 5));
    } else {
      const filtered = allLocations.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setLocation(filtered);
    }
  }, [searchValue, allLocations]);

  // Sync searchValue with locationFilter when locationFilter changes
  useEffect(() => {
    if (locationFilter) {
      setSearchValue(locationFilter);
    }
  }, [locationFilter]);

  const handleOptionClick = (item) => {
    setSearchValue(item.name);
    setSelectedItem(item);
    setLocationFilter(item.name);
    console.log(item);
  };

  return (
    <>
      <div className="searchMenu-loc px-20 lg:py-20 lg:px-0 js-form-dd js-liverSearch">
        <div
          data-bs-toggle="dropdown"
          data-bs-auto-close="true"
          data-bs-offset="0,22"
        >
          
         <h4
  className="text-16 fw-500 ls-2 lh-16"
  style={{ color: "#004080", marginTop: "-10px" }}
>
  Search job by Location
</h4>

          <div className="text-15 text-light-1 ls-2 lh-16">
            <input
              autoComplete="off"
              type="search"
              placeholder="Select location"
              className="js-search js-dd-focus"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>

        <div className="shadow-2 dropdown-menu min-width-400">
          <div className="bg-white px-20 py-20 sm:px-0 sm:py-15 rounded-4">
            <ul className="y-gap-5 js-results">
              {location.length > 0 ? (
                location.map((item) => (
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
                      <i className="icon-location-2 text-light-1 text-20 pt-4" />
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
                  <div className="text-15 text-gray fw-bold">No data found</div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default DropOffLocation;