const PricingSummary = ({packageData,formData,total,totalChild,totaladult}) => {
  const additionalFees = 600;



  return (
    <div className="px-30 py-30 border-light rounded-4 mt-30">
      <div className="text-20 fw-500 mb-20">Your price summary</div>
      <div className="row y-gap-5 justify-between">
        <div className="col-auto">
          <div className="text-15">Price per person</div>
        </div>
        {/* End col */}
        <div className="col-auto">
          <div className="text-15">INR ₹ {packageData?.basePrice}</div>
        </div>
        {/* End col */}
      </div>
      <div className="row y-gap-5 justify-between">
        <div className="col-auto">
          <div className="text-15">Price per Children</div>
        </div>
        {/* End col */}
        <div className="col-auto">
          <div className="text-15">INR ₹ {packageData?.childrenPrice}</div>
        </div>
        {/* End col */}
      </div>
      {/* End .row */}

      <div className="row y-gap-5 justify-between pt-5">
        <div className="col-auto">
          <div className="text-15">Taxes and fees</div>
        </div>
        <div className="col-auto">
          <div className="text-15">INR ₹ 600</div>
        </div>
      </div>
      {/* End .row */}

      <div className="row y-gap-5 justify-between pt-5">
        <div className="col-auto">
          <div className="text-15">Booking fees</div>
        </div>
        <div className="col-auto">
          <div className="text-15">FREE</div>
        </div>
      </div>
      <div className="row y-gap-5 justify-between pt-5">
        <div className="col-auto">
          <div className="text-15">Total Members</div>
        </div>
        <div className="col-auto">
          <div className="text-15">{formData.totalAdult+formData.totalChildren}</div>
        </div>
      </div>
      <div className="row y-gap-5 justify-between pt-5">
        <div className="col-auto">
          <div className="text-15">Total</div>
        </div>
        <div className="col-auto">
          <div className="text-15">children: {totalChild} + adult : {totaladult} + tax : {additionalFees}</div>
        </div>
      </div>
      {/* End .row */}

      <div className="px-20 py-20 bg-blue-2 rounded-4 mt-20">
        <div className="row y-gap-5 justify-between">
          <div className="col-auto">
            <div className="text-18 lh-13 fw-500">Total Price</div>
          </div>
          <div className="col-auto">
            <div className="text-18 lh-13 fw-500">INR ₹ {total+additionalFees}</div>
          </div>
        </div>
      </div>
      {/* End .row */}
    </div>
    // End px-30
  );
};

export default PricingSummary;
