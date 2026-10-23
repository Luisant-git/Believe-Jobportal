const CompanyFeaturesFilter = () => {
  const features = [
    { label: "Startup Culture", count: 35 },
    { label: "Fortune 500", count: 27 },
    { label: "Diversity & Inclusion", count: 58 },
    { label: "Fast Growth", count: 42 },
    { label: "Work-Life Balance", count: 74 },
    { label: "Flexible Hours", count: 66 },
    { label: "Employee Wellness Programs", count: 20 },
  ];

  return (
    <>
      {features.map((feature, index) => (
        <div className="row y-gap-10 items-center justify-between" key={index}>
          <div className="col-auto">
            <div className="form-checkbox d-flex items-center">
              <input type="checkbox" name="companyFeatures" value={feature.label} />
              <div className="form-checkbox__mark">
                <div className="form-checkbox__icon icon-check" />
              </div>
              <div className="text-15 ml-10">{feature.label}</div>
            </div>
          </div>
          <div className="col-auto">
            <div className="text-15 text-light-1">{feature.count}</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CompanyFeaturesFilter;
