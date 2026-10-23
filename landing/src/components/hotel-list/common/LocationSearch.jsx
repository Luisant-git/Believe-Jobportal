import { useState, useEffect } from "react";
import axios from "axios";

const SearchBar = ({ onChange }) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [filteredRecommendations, setFilteredRecommendations] = useState([]);
  const [popularLocations, setPopularLocations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/destinations`);
        const fetchedRecommendations = response.data;
  
        // De-duplicate the data (case-insensitive)
        const uniqueRecommendations = [];
        const seenNames = new Set();
  
        fetchedRecommendations.forEach((item) => {
          const normalizedName = item.name.trim().toLowerCase(); // Normalize by trimming and converting to lowercase
          if (!seenNames.has(normalizedName)) {
            seenNames.add(normalizedName); // Add normalized name to the set
            uniqueRecommendations.push(item);
          }
        });
  
        setRecommendations(uniqueRecommendations);
  
        // Set popular locations dynamically (case-insensitive)
        const uniqueCountries = Array.from(
          new Set(
            fetchedRecommendations.map((item) => item.country.trim().toLowerCase())
          )
        );
  
        const dynamicPopularLocations = uniqueCountries.slice(0, 5).map((country, index) => ({
          id: `dynamic-${index}`,
          name: country.charAt(0).toUpperCase() + country.slice(1), // Capitalize for display
          address: `Popular destination in ${country.charAt(0).toUpperCase() + country.slice(1)}`,
        }));
  
        setPopularLocations(dynamicPopularLocations);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };
  
    fetchRecommendations();
  }, []);
  
  
  
  

  useEffect(() => {
    if (searchValue) {
      const filtered = recommendations.filter((item) =>
        ["name", "country", "holidayPackages"]
          .some((key) => {
            if (key === "holidayPackages") {
              return item[key]?.some((pkg) =>
                pkg.title.toLowerCase().startsWith(searchValue.toLowerCase())
              );
            }
            return item[key]?.toLowerCase().startsWith(searchValue.toLowerCase());
          })
      );

      // De-duplicate filtered recommendations
      const uniqueFiltered = [];
      const seenFiltered = new Set();

      filtered.forEach((item) => {
        const key = `${item.name}-${item.country}`;

        if (!seenFiltered.has(key)) {
          seenFiltered.add(key);
          uniqueFiltered.push(item);
        }
      });

      setFilteredRecommendations(uniqueFiltered);
    } else {
      setFilteredRecommendations(popularLocations);
    }
  }, [searchValue, recommendations, popularLocations]);

  const handleOptionClick = (item) => {
    setSearchValue(item.name);
    setSelectedItem(item);
    onChange(item);
  };

  return (
    <div className="searchMenu-loc px-30 lg:py-20 lg:px-0">
      <div data-bs-toggle="dropdown" data-bs-auto-close="true" data-bs-offset="0,22">
        <h4 className="text-15 fw-500 ls-2 lh-16">Location</h4>
        <div className="text-15 text-light-1 ls-2 lh-16">
          <input
            autoComplete="off"
            type="search"
            placeholder="Where are you going?"
            className="js-search js-dd-focus"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      <div className="shadow-2 dropdown-menu min-width-400" style={{ overflowX: "auto", height: "350px" }}>
        <div className="bg-white px-20 py-20 sm:px-0 sm:py-15 rounded-4">
          <ul className="y-gap-5 js-results">
            {filteredRecommendations.length === 0 ? (
              <li className="text-center text-14 text-light-1 mt-2">
                <h5>No place available</h5>
              </li>
            ) : (
              filteredRecommendations.map((item) => (
                <li
                  key={item.id}
                  className={`-link d-block col-12 text-left rounded-4 px-20 py-15 mb-1 ${
                    selectedItem && selectedItem.id === item.id ? "active" : ""
                  }`}
                  role="button"
                  onClick={() => handleOptionClick(item)}
                >
                  <div className="d-flex">
                    <div className="icon-location-2 text-light-1 text-20 pt-4" />
                    <div className="ml-10">
                      <div className="text-15 lh-12 fw-500">{item.name}</div>
                      <div className="text-14 lh-12 text-light-1 mt-5">{item.country}</div>
                      {item.holidayPackages &&
                        item.holidayPackages.map((pkg, index) => (
                          <div key={index} className="text-13 text-dark-2 mt-5">
                            {pkg.title}
                          </div>
                        ))}
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
