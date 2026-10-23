import React, { useState, useEffect } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";

const DateSearch = ({ value, onChange }) => {
  const [dates, setDates] = useState([]);

  // Synchronize local state with value prop
  useEffect(() => {
    if (value && value.startDate && value.endDate) {
      const startDateObj = new DateObject(new Date(value.startDate));
      const endDateObj = new DateObject(new Date(value.endDate));
      setDates([startDateObj, endDateObj]);
    }
  }, [value]);

  const handleDateChange = (selectedDates) => {
    setDates(selectedDates);

    if (selectedDates.length === 2) {
      const [startDateObj, endDateObj] = selectedDates;
      const startDate = startDateObj.toDate();
      const endDate = endDateObj.toDate();

      const totalDays =
        (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;

      if (onChange) {
        onChange({
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          totalDays,
        });
      }
    }
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);

  return (
    <div className="text-15 text-light-1 ls-2 lh-16 custom_dual_datepicker">
      <DatePicker
        inputClass="custom_input-picker"
        containerClassName="custom_container-picker"
        value={dates}
        onChange={handleDateChange}
        numberOfMonths={2}
        offsetY={10}
        range
        rangeHover
        minDate={minDate}
        format="MMMM DD"
      />
    </div>
  );
};

export default DateSearch;
