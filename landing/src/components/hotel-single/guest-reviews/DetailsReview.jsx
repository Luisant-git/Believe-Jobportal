import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns"; // Import the function


const DetailsReview = ({ id }) => {
  const [reviews, setReviews] = useState([]);
  const [visibleReviews, setVisibleReviews] = useState(2); // State to control the number of visible reviews

  useEffect(() => {
    // Fetch reviews from the API
    axios
      .get(`${import.meta.env.VITE_API_URL}/reviews`)
      .then((response) => {
        // Filter reviews based on the packageId
        const filteredReviews = response.data.filter(
          (review) => review.packageId === id
        );
        setReviews(filteredReviews);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, [id]);

  // Show more reviews
  const handleShowMore = () => {
    setVisibleReviews(visibleReviews + 3); // Increase by 3 when 'Show More' is clicked
  };

  return (
    <div className="row y-gap-60">
      {reviews.length > 0 ? (
        reviews.slice(0, visibleReviews).map((review) => (
          <div key={review.id} className="col-lg-6">
            <div className="row x-gap-20 y-gap-20 items-center">
              <div className="col-auto">
                <img src="https://cdn-icons-png.freepik.com/512/3135/3135715.png?ga=GA1.1.852988304.1732155881" style={{width:'36px'}} alt="user avatar" />
              </div>
              <div className="col-auto">
                <div className="fw-500 lh-15">User</div>
                <div className="text-14 text-light-1 lh-15">
                  {/* Format the createdAt time */}
                  {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                </div>
              </div>
            </div>
            {/* End .row */}
            <h5 className="fw-500 text-blue-1 mt-20">
              {review.rating || 0} {review.rating >= 3 ? "Good" : "Average"}
            </h5>
            <p className="text-15 text-dark-1 mt-10">{review.comment}</p>
            {/* <ReviewGallery /> */}
            <div className="d-flex x-gap-30 items-center pt-20">
              <button className="d-flex items-center text-blue-1">
                <i className="icon-like text-16 mr-10" />
                Helpful
              </button>
              <button className="d-flex items-center text-light-1">
                <i className="icon-dislike text-16 mr-10" />
                Not helpful
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="col-lg-12">
          <p>No reviews available for this package.</p>
        </div>
      )}

      {/* Show More Button */}
      {reviews.length > visibleReviews && (
        <div className="row pt-30">
          <div className="col-auto">
            <button 
              onClick={handleShowMore} 
              className="button -md -outline-blue-1 text-blue-1"
            >
              Show more {reviews?.length} reviews{" "}
              <div className="icon-arrow-top-right ml-15"></div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsReview;
