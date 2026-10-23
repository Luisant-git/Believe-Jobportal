import ReviewGallery from "./ReviewGallery";

const JobDetailsReview = () => {
  return (
    <div className="row y-gap-40">
      {/* Review 1 */}
      <div className="col-lg-12">
        <div className="row x-gap-20 y-gap-20 items-center">
          <div className="col-auto">
            <img src="/img/avatars/2.png" alt="image" />
          </div>
          <div className="col-auto">
            <div className="fw-500 lh-15">Tonko</div>
            <div className="text-14 text-light-1 lh-15">March 2022</div>
          </div>
        </div>
        {/* End .row */}
        <h5 className="fw-500 text-blue-1 mt-20">9.2 Superb</h5>
        <p className="text-15 text-dark-1 mt-10">
          The work-life balance here is amazing. You have plenty of time for personal life while also performing at your best at work. Highly recommended!
        </p>

        <ReviewGallery />

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

      {/* Review 2 */}
      <div className="col-lg-12">
        <div className="row x-gap-20 y-gap-20 items-center">
          <div className="col-auto">
            <img src="/img/avatars/2.png" alt="image" />
          </div>
          <div className="col-auto">
            <div className="fw-500 lh-15">Tonko</div>
            <div className="text-14 text-light-1 lh-15">March 2022</div>
          </div>
        </div>
        {/* End .row */}
        <h5 className="fw-500 text-blue-1 mt-20">8.7 Great</h5>
        <p className="text-15 text-dark-1 mt-10">
          The salary is competitive, and they offer a good range of benefits. It's an overall great place to work, with the opportunity for career growth.
        </p>

        <ReviewGallery />

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

      {/* Review 3 */}
      <div className="col-lg-12">
        <div className="row x-gap-20 y-gap-20 items-center">
          <div className="col-auto">
            <img src="/img/avatars/2.png" alt="image" />
          </div>
          <div className="col-auto">
            <div className="fw-500 lh-15">Tonko</div>
            <div className="text-14 text-light-1 lh-15">March 2022</div>
          </div>
        </div>
        {/* End .row */}
        <h5 className="fw-500 text-blue-1 mt-20">8.5 Good</h5>
        <p className="text-15 text-dark-1 mt-10">
          The company culture is supportive and inclusive. I feel comfortable expressing my thoughts and ideas. The management team is approachable.
        </p>

        <ReviewGallery />

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

      {/* Review 4 */}
      <div className="col-lg-12">
        <div className="row x-gap-20 y-gap-20 items-center">
          <div className="col-auto">
            <img src="/img/avatars/2.png" alt="image" />
          </div>
          <div className="col-auto">
            <div className="fw-500 lh-15">Tonko</div>
            <div className="text-14 text-light-1 lh-15">March 2022</div>
          </div>
        </div>
        {/* End .row */}
        <h5 className="fw-500 text-blue-1 mt-20">8.0 Good</h5>
        <p className="text-15 text-dark-1 mt-10">
          Job security here is excellent. The company has a strong financial position, and I feel confident about my future here.
        </p>

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

      {/* Show All Reviews Button */}
      <div className="col-auto">
        <a href="#" className="button -md -outline-blue-1 text-blue-1">
          Show all 116 reviews
          <div className="icon-arrow-top-right ml-15"></div>
        </a>
      </div>
    </div>
  );
};

export default JobDetailsReview;
