import React, { useState, useEffect } from "react";

const counters = [
  { name: "Adults", defaultValue: 0 },
  { name: "Children", defaultValue: 0 },
  { name: "Rooms", defaultValue: 0 },
];

const Counter = ({ name, value, onCounterChange }) => {
  const incrementCount = () => {
    onCounterChange(name, value + 1);
  };

  const decrementCount = () => {
    if (value > 0) {
      onCounterChange(name, value - 1);
    }
  };


  return (
    <>
      <div className="row y-gap-10 justify-between items-center">
        <div className="col-auto">
          <div className="text-15 lh-12 fw-500">{name}</div>
          {name === "Children" && (
            <div className="text-14 lh-12 text-light-1 mt-5">Ages 0 - 17</div>
          )}
        </div>
        <div className="col-auto">
          <div className="d-flex items-center js-counter">
            <button
              className="button -outline-blue-1 text-blue-1 size-38 rounded-4 js-down"
              onClick={decrementCount}
            >
              <i className="icon-minus text-12" />
            </button>
            <div className="flex-center size-20 ml-15 mr-15">
              <div className="text-15 js-count">{value}</div>
            </div>
            <button
              className="button -outline-blue-1 text-blue-1 size-38 rounded-4 js-up"
              onClick={incrementCount}
            >
              <i className="icon-plus text-12" />
            </button>
          </div>
        </div>
      </div>
      <div className="border-top-light mt-24 mb-24" />
    </>
  );
};

const GuestSearch = ({ onChange, value }) => {
  const [guestCounts, setGuestCounts] = useState({
    Adults: 0,
    Children: 0,
    Rooms: 1,
  });



  // Synchronize state with value prop
  useEffect(() => {
    if (value) {
      setGuestCounts(value);
    }
  }, [value]);


  const handleCounterChange = (name, updatedValue) => {
    const updatedCounts = { ...guestCounts, [name]: updatedValue };
    setGuestCounts(updatedCounts);
    onChange(updatedCounts); // Notify parent component
  };

  return (
    <div className="searchMenu-guests px-30 lg:py-20 lg:px-0 js-form-dd js-form-counters position-relative">
      <div
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        aria-expanded="false"
        data-bs-offset="0,22"
      >
        <h4 className="text-15 fw-500 ls-2 lh-16">Guest</h4>
        <div className="text-15 text-light-1 ls-2 lh-16">
          <span className="js-count-adult">{guestCounts.Adults}</span> adults -{" "}
          <span className="js-count-child">{guestCounts.Children}</span>{" "}
          children - <span className="js-count-room">{guestCounts.Rooms}</span>{" "}
          rooms
        </div>
      </div>
      <div className="shadow-2 dropdown-menu min-width-400">
        <div className="bg-white px-30 py-30 rounded-4 counter-box">
          {counters.map((counter) => (
            <Counter
              key={counter.name}
              name={counter.name}
              value={guestCounts[counter.name]}
              onCounterChange={handleCounterChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuestSearch;
