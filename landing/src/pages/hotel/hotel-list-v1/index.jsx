import CallToActions from "@/components/common/CallToActions";
import Header11 from "@/components/header/header-11";
import DefaultFooter from "@/components/footer/default";
import MainFilterSearchBox from "@/components/hotel-list/hotel-list-v1/MainFilterSearchBox";
import TopHeaderFilter from "@/components/hotel-list/hotel-list-v1/TopHeaderFilter";
import HotelProperties from "@/components/hotel-list/hotel-list-v1/HotelProperties";
import Pagination from "@/components/hotel-list/common/Pagination";
import Sidebar from "@/components/hotel-list/hotel-list-v1/Sidebar";

import MetaComponent from "@/components/common/MetaComponent";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const metadata = {
  title: "Hotel List v1 || TravelMoyo - Travel & Tour ReactJs Template",
  description: "TravelMoyo - Travel & Tour ReactJs Template",
};

const HotelListPage1 = () => {
  const [searchParams] = useSearchParams();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;
  const [priceRange, setPriceRange] = useState([0, 100000]); 
  const [selectedSort, setSelectedSort] = useState(""); 

  const getAllParams = () => {
    const params = {};
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    return params;
  };

  const getFilteredParams = () => {
    const allParams = getAllParams();
    return {
      destinationCountry: allParams.destination,
      minDuration: 0,
      maxDuration: 1000,
      minPrice: 0,
      maxPrice: 100000,
    };
  };

  const options = [
    { label: "₹1,000 - ₹250,000", value: "1000-250000" },
    { label: "₹250,001 - ₹500,000", value: "250001-500000" },
    { label: "₹500,001 - ₹750,000", value: "500001-750000"},
    { label: "₹750,001 - ₹1,000,000", value: "750001-1000000" },
  ];

  const sortHotelsByPrice = (hotels, sortOption) => {
    if (!sortOption) return hotels; // Return all hotels if no sort option is selected

    const [minPrice, maxPrice] = sortOption.split("-").map(Number);

    return hotels.filter(
      (hotel) => hotel.basePrice >= minPrice && hotel.basePrice <= maxPrice
    );
  };

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      const filteredParams = getFilteredParams();
      try {
        const query = new URLSearchParams(filteredParams).toString();
      

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/holiday-packages/filter?${query}`
        );
        const data = await response.json();
        setHotels(data?.data || []); // Fetch all hotels and store in state
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [searchParams]);

  const filteredHotels = sortHotelsByPrice(
    hotels.filter(
      (hotel) =>
        hotel.basePrice >= priceRange[0] &&
        hotel.basePrice <= priceRange[1] &&
        hotel.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    selectedSort
  );

  // Calculate paginated data
  const totalPages = Math.ceil(filteredHotels.length / itemsPerPage);
  const paginatedHotels = filteredHotels.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePriceChange = (min, max) => {
    setPriceRange([min, max]); // Update price range state
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleSortChange = (event) => {
    setSelectedSort(event.target.value); // Update the selected sort value
    setCurrentPage(1); // Reset to the first page
  };

  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="header-margin"></div>
      <Header11 />
      <section className="pt-40 pb-40 bg-light-2">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="text-center">
                <h1 className="text-30 fw-600">
                  Find Your Dream Luxury Package
                </h1>
              </div>
              <MainFilterSearchBox />
            </div>
          </div>
        </div>
      </section>

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row y-gap-30">
            <div className="col-xl-3">
              <aside className="sidebar y-gap-40 xl:d-none">
                <div className="sidebar__item -no-border">
                  <h5 className="text-18 fw-500 mb-10">
                    Search by property name
                  </h5>
                  <form>
                    <div className="single-field relative d-flex items-center py-10">
                      <input
                        onChange={handleSearchChange}
                        className="pl-50 border-light text-dark-1 h-50 rounded-8"
                        type="text"
                        placeholder="e.g. Best Western"
                      />
                      <button
                        type="submit"
                        className="absolute d-flex items-center h-full"
                      >
                        <i className="icon-search text-20 px-15 text-dark-1" />
                      </button>
                    </div>
                  </form>
                </div>
                <Sidebar
                  handlePriceChange={handlePriceChange}
                  priceRange={priceRange}
                />
                <div className="sidebar__item">
                  <h5 className="text-18 fw-500 mb-10">Package Sort</h5>
                  <div className="sidebar-checkbox">
                    {options.map((option, index) => (
                      <div
                        className="row items-center justify-between"
                        key={index}
                      >
                        <div className="col-auto">
                          <div className="form-radio">
                            <div className="radio d-flex items-center">
                              <input
                                type="radio"
                                name="rating"
                                value={option?.value}
                                checked={selectedSort === option?.value}
                                onChange={handleSortChange}
                              />
                              <div className="radio__mark">
                                <div className="radio__icon" />
                              </div>
                              <div className="ml-10">{option?.label}</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-auto">
                          <div className="text-15 text-light-1">
                            {option.count}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>

            <div className="col-xl-9">
              <TopHeaderFilter hotels={hotels} />
              <div className="mt-30"></div>
              <div className="row y-gap-30">
                <HotelProperties hotels={paginatedHotels} loading={loading} />
              </div>
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </section>

      <CallToActions />
      <DefaultFooter />
    </>
  );
};

export default HotelListPage1;
