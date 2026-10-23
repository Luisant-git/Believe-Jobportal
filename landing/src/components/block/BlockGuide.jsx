const BlockGuide = () => {
  return (
    <div className="row">
      {/* First row - 3 columns */}
      <div className="col-lg-4 col-sm-6" data-aos="fade" data-aos-delay="100">
        <div className="featureIcon -type-1">
          <div className="d-flex justify-center">
            <img src="/img/featureIcons/3/2.svg" alt="Customized Career Packages" className="js-lazy" />
          </div>
          <div className="text-center mt-30">
            <h4 className="text-18 fw-500" style={{ color: '#054A91' }}>Customized Career Packages</h4>
            <p className="text-15 mt-10">Tailored consulting packages designed to align with your career goals and aspirations.</p>
          </div>
        </div>
      </div>

      <div className="col-lg-4 col-sm-6" data-aos="fade" data-aos-delay="200">
        <div className="featureIcon -type-1">
          <div className="d-flex justify-center">
            <img src="/img/featureIcons/1/2.svg" alt="Quick Career Path Guidance" className="js-lazy" />
          </div>
          <div className="text-center mt-30">
            <h4 className="text-18 fw-500" style={{ color: '#054A91' }}>Quick Career Path Guidance</h4>
            <p className="text-15 mt-10">Receive expert advice to streamline your career growth and decision-making process.</p>
          </div>
        </div>
      </div>

      <div className="col-lg-4 col-sm-6" data-aos="fade" data-aos-delay="300">
        <div className="featureIcon -type-1">
          <div className="d-flex justify-center">
            <img src="/img/featureIcons/1/3.svg" alt="24/7 Support for Job Seekers" className="js-lazy" />
          </div>
          <div className="text-center mt-30">
            <h4 className="text-18 fw-500" style={{ color: '#054A91' }}>24/7 Support for Job Seekers</h4>
            <p className="text-15 mt-10">Our dedicated team is available round the clock to assist you with job search and career queries.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockGuide;