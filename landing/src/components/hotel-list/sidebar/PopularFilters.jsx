const PopularFilters = () => {
  const filters = [
    { label: "Software Engineering", count: 210 },
    { label: "Marketing", count: 125 },
    { label: "Design", count: 90 },
    { label: "Product Management", count: 60 },
    { label: "Data Science", count: 75 },
  ];

  return (
    <>
      {filters.map((filter, index) => (
        <div key={index} className="row y-gap-10 items-center justify-between">
          <div className="col-auto">
            <div className="form-checkbox d-flex items-center">
              <input type="checkbox" id={`job-category-filter-${index}`} />
              <div className="form-checkbox__mark">
                <div className="form-checkbox__icon icon-check" />
              </div>
              <label className="text-15 ml-10" htmlFor={`job-category-filter-${index}`}>
                {filter.label}
              </label>
            </div>
          </div>
          <div className="col-auto">
            <div className="text-15 text-light-1">{filter.count}</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PopularFilters;
