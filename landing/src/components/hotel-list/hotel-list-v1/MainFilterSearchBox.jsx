import DateSearch from "../common/DateSearch";
import GuestSearch from "../common/GuestSearch";
import LocationSearch from "../common/LocationSearch";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const MainFilterSearchBox = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [destination, setDestination] = useState({ name: "" });
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState({ Adults: 1, Children: 0 ,Rooms:0});
  const [Tdays, setTdays] = useState(0);

  // Parse query parameters and set initial state
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const destinationName = params.get("destination") || "";
    const price = params.get("price") || "";
    const checkInDate = params.get("checkIn") || "";
    const checkOutDate = params.get("checkOut") || "";
    const adults = parseInt(params.get("Adults")) || 1;
    const children = parseInt(params.get("Children")) || 0;
    const Rooms = parseInt(params.get("Rooms")) || 0;
    const totalDays = parseInt(params.get("totalDays")) || 0;

    setDestination({ name: destinationName });
    setCheckIn(checkInDate);
    setCheckOut(checkOutDate);
    setGuests({ Adults: adults, Children: children,Rooms:Rooms });
    setTdays(totalDays);


    sessionStorage.setItem('data', JSON.stringify({ Adults: adults, Children: children, Rooms: Rooms }));

  }, [location.search]);

  const handleSearch = () => {
    // Build query string
    const queryParams = new URLSearchParams({
      destination: destination.name,
      price: "123123",
      checkIn: checkIn,
      checkOut: checkOut,
      Adults: guests.Adults,
      Children: guests.Children,
      Rooms:guests.Rooms,
      totalDays: Tdays,
    }).toString();

    // Navigate to results page with query
    navigate(`/hotel-list-v1?${queryParams}`);
  };

  return (
    <>
      <div className="mainSearch -col-3-big bg-white px-10 py-10 lg:px-20 lg:pt-5 lg:pb-20 rounded-4 mt-30">
        <div className="button-grid items-center">
          <LocationSearch onChange={setDestination} value={destination.name} />
          {/* End Location */}

          <div className="searchMenu-date px-30 lg:py-20 sm:px-20 js-form-dd js-calendar">
            <div>
              <h4 className="text-15 fw-500 ls-2 lh-16">Check in - Check out</h4>
              <DateSearch
                onChange={({ startDate, endDate, totalDays }) => {
                  setCheckIn(startDate);
                  setCheckOut(endDate);
                  setTdays(totalDays);
                }}
                value={{ startDate: checkIn, endDate: checkOut, totalDays: Tdays }}
              />
            </div>
          </div>
          {/* End check-in-out */}

          <GuestSearch
            onChange={setGuests}
            value={{ Adults: guests.Adults, Children: guests.Children, Rooms:guests.Rooms }}
          />
          {/* End guest */}

          <div className="button-item h-full">
            <button
              onClick={handleSearch}
              className="button -dark-1 py-15 px-40 h-full col-12 rounded-0 bg-blue-1 text-white"
            >
              <i className="icon-search text-20 mr-10" />
              Search
            </button>
          </div>
          {/* End search button_item */}
        </div>
      </div>
    </>
  );
};

export default MainFilterSearchBox;
