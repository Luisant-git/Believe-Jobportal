import Loading from '@/Loading';
import { useState, useEffect } from 'react';

const ReviewProgress = ({id}) => {
  const [ratingData, setRatingData] = useState(null);


  useEffect(() => {
    // Fetch the data from the endpoint
    const fetchRatingData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/reviews/average-ratings/${id}`); // Replace with your actual endpoint
        const data = await response.json();
        setRatingData(data);
      } catch (error) {
        console.error("Error fetching rating data:", error);
      }
    };

    fetchRatingData();
  }, []);

  // If ratingData is not yet available, show a loading state
  if (!ratingData) {
    return <div><Loading/></div>;
  }

  // Handle missing or undefined rating data gracefully
  const reviewProgressContent = [
    { id: 1, reviewReason: "Location", progressPercent: (ratingData?.locationReviewAvg || 0) / 5 * 100 },
    { id: 2, reviewReason: "Value for money", progressPercent: (ratingData?.valueForMoneyAvg || 0) / 5 * 100 },
    { id: 3, reviewReason: "Comfort", progressPercent: (ratingData?.comfortAvg || 0) / 5 * 100 },
    { id: 4, reviewReason: "Cleanliness", progressPercent: (ratingData?.cleanlinessAvg || 0) / 5 * 100 },
    { id: 5, reviewReason: "Facilities", progressPercent: (ratingData?.facilitiesAvg || 0) / 5 * 100 },
  ];

  return (
    <>
      <div className="row y-gap-30 items-center pt-20">
        <div className="col-lg-3">
          <div className="flex-center rounded-4 min-h-250 bg-blue-1-05">
            <div className="text-center">
              <div className="text-60 md:text-50 fw-600 text-blue-1">{(ratingData.overallRating || 0).toFixed(1)}</div>
              <div className="fw-500 lh-1">Exceptional</div>
              <div className="text-14 text-light-1 lh-1 mt-5">
                {ratingData?.totalRatingsCount} reviews
              </div>
            </div>
          </div>
        </div>
        {/* End .col-lg-3 */}

        <div className="col-lg-9">
          <div className="row y-gap-30">
            {reviewProgressContent.map((item) => (
              <div className="col-md-4 col-sm-6" key={item.id}>
                <div className="d-flex items-center justify-between">
                  <div className="text-15 fw-500">{item.reviewReason}</div>
                  <div className="text-15 text-light-1">
                    {(ratingData[item.reviewReason.toLowerCase() + 'Avg'] || 0).toFixed(1)}
                  </div>
                </div>
                <div className="progressBar mt-10">
                  <div className="progressBar__bg bg-blue-2" />
                  <div
                    className="progressBar__bar bg-dark-1"
                    style={{ width: item.progressPercent + '%' }}
                  />
                </div>
              </div>
            ))}
            {/* End .col-md-4 */}
          </div>
          {/* End .row */}
        </div>
        {/* End .col-lg-9 */}
      </div>
      {/* End .row */}
    </>
  );
};

export default ReviewProgress;
