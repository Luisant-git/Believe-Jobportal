const DealsFilter = () => {
  const jobFilters = [
 
    { label: "Entry level" },
    { label: "Mid level" },
    { label: "Senior level" },
    { label: "Urgently " },
    { label: "Recently posted" },
  ];

  return (
    <>
      {jobFilters.map((filter, index) => (
        <div className="col-auto" key={index}>
          <div className="form-checkbox d-flex items-center">
            <input type="checkbox" id={`job-filter-${index}`} />
            <div className="form-checkbox__mark">
              <div className="form-checkbox__icon icon-check" />
            </div>
            <label className="text-15 ml-10" htmlFor={`job-filter-${index}`}>
              {filter.label}
            </label>
          </div>
        </div>
      ))}
    </>
  );
};

export default DealsFilter;
