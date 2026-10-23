import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const OrderSubmittedInfo = ({ packageData, formData, handleChange ,bookingid,totalChild,totaladult,total}) => {
  const today = new Date();
  const formattedDate = `${String(today.getDate()).padStart(2, "0")}/${String(
    today.getMonth() + 1
  ).padStart(2, "0")}/${today.getFullYear()}`;
  const additionalFees = 600; // Sum of the fixed additional fees
  const totalGuests = formData.totalAdult + formData.totalChildren; // Total guests calculation
  const totalAmount = (packageData?.basePrice + additionalFees) * totalGuests; // Total amount formula
  

  return (
    <>
      <div className="col-xl-12 col-lg-12">
        <div className="order-completed-wrapper">
          <div className="d-flex flex-column items-center mt-40 lg:md-40 sm:mt-24">
            <div className="size-80 flex-center rounded-full bg-warning">
            <FontAwesomeIcon icon={faInfoCircle} className="text-30 text-white" />
            </div>
            <div className="text-30 lh-1 fw-600 mt-20">
             Check and Click Submit to Conform Your Booking!
            </div>
            {/* <div className="text-15 text-light-1 mt-10">
              Booking details has been sent to: admin@bookingcore.test
            </div> */}
          </div>
          {/* End header */}

          <div className="border-type-1 rounded-8 px-50 py-35 mt-40">
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <div className="text-15 lh-12">booking Number</div>
                <div className="text-15 lh-12 fw-500 text-blue-1 mt-10">
                 {bookingid}
                </div>
              </div>
              {/* End .col */}
              <div className="col-lg-3 col-md-6">
                <div className="text-15 lh-12">Date</div>
                <div className="text-15 lh-12 fw-500 text-blue-1 mt-10">
                  {formattedDate}
                </div>
              </div>
              {/* End .col */}
              <div className="col-lg-3 col-md-6">
                <div className="text-15 lh-12">Total</div>
                <div className="text-15 lh-12 fw-500 text-blue-1 mt-10">
                  INR ₹ {total+additionalFees}
                </div>
              </div>
              {/* End .col */}
              <div className="col-lg-3 col-md-6">
                <div className="text-15 lh-12">Payment Method</div>
                <div className="text-15 lh-12 fw-500 text-blue-1 mt-10">
                  Pending
                </div>
              </div>
              {/* End .col */}
            </div>
          </div>
          {/* order price info */}

          <div className="border-light rounded-8 px-50 py-40 mt-40">
            <h4 className="text-20 fw-500 mb-30">Your Information</h4>
            <div className="row y-gap-10">
              <div className="col-12">
                <div className="d-flex justify-between ">
                  <div className="text-15 lh-16">First name</div>
                  <div className="text-15 lh-16 fw-500 text-blue-1">{formData.name}</div>
                </div>
              </div>
              {/* End .col */}
              <div className="col-12">
                <div className="d-flex justify-between border-top-light pt-10">
                  <div className="text-15 lh-16">Phone</div>
                  <div className="text-15 lh-16 fw-500 text-blue-1">
                  {formData.phone}
                  </div>
                </div>
              </div>
              {/* End .col */}
              <div className="col-12">
                <div className="d-flex justify-between border-top-light pt-10">
                  <div className="text-15 lh-16">Address line 1</div>
                  <div className="text-15 lh-16 fw-500 text-blue-1" />
                  {formData.address}
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex justify-between border-top-light pt-10">
                  <div className="text-15 lh-16">Totaldays</div>
                  <div className="text-15 lh-16 fw-500 text-blue-1" />
                  {packageData.durationDays}
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex justify-between border-top-light pt-10">
                  <div className="text-15 lh-16">Total Members</div>
                  <div className="text-15 lh-16 fw-500 text-blue-1" />
                  {formData.totalChildren+formData.totalAdult}
                </div>
              </div>
             

              {/* End .col */}
              <div className="col-12">
                <div className="d-flex justify-between border-top-light pt-10">
                  <div className="text-15 lh-16">ZIP code/Postal code</div>
                  <div className="text-15 lh-16 fw-500 text-blue-1" />
                  {formData.postalcode}
                </div>
              </div>
     
              {/* End .col */}
            </div>
            {/* End .row */}
          </div>
          {/* End order information */}
        </div>
      </div>
    </>
  );
};

export default OrderSubmittedInfo;
