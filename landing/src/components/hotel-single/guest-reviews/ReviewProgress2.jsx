const JobReviewProgress = () => {
  const jobReviewContent = [
    { id: 1, reviewReason: "Work-Life Balance", ratings: "9.0", progressPercent: "90%" },
    { id: 2, reviewReason: "Salary", ratings: "8.2", progressPercent: "82%" },
    {
      id: 3,
      reviewReason: "Career Growth",
      ratings: "8.9",
      progressPercent: "89%",
    },
    {
      id: 4,
      reviewReason: "Company Culture",
      ratings: "7.8",
      progressPercent: "78%",
    },
    { id: 5, reviewReason: "Job Security", ratings: "9.2", progressPercent: "92%" },
    {
      id: 6,
      reviewReason: "Benefits & Perks",
      ratings: "8.4",
      progressPercent: "84%",
    },
    {
      id: 7,
      reviewReason: "Management",
      ratings: "8.7",
      progressPercent: "87%",
    },
  ];

  return (
    <>
      <div className="d-flex items-center mt-20">
        <div className="flex-center bg-blue-1 rounded-4 size-70 text-22 fw-600 text-white">
          8.5
        </div>
        <div className="ml-20">
          <div className="text-16 text-dark-1 fw-500 lh-14">Great Place to Work</div>
          <div className="text-15 text-light-1 lh-14 mt-4">1,500 reviews</div>
        </div>
      </div>
      {/* End .d-flex */}

      <div className="row y-gap-20 pt-20">
        {jobReviewContent.map((item) => (
          <div className="col-12" key={item.id}>
            <div className="d-flex items-center justify-between">
              <div className="text-15 fw-500">{item.reviewReason}</div>
              <div className="text-15 text-light-1">{item.ratings}</div>
            </div>
            <div className="progressBar mt-10">
              <div className="progressBar__bg bg-blue-2" />
              <div
                className="progressBar__bar bg-dark-1"
                style={{ width: item.progressPercent }}
              />
            </div>
          </div>
        ))}
        {/* End .col-md-4 */}
      </div>
      {/* End .row */}
    </>
  );
};

export default JobReviewProgress;
