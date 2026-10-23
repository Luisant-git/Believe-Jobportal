import BookingDetails from "./sidebar/BookingDetails";

const CustomerInfo = ({ packageData, formData, handleChange,setCheckInDate,checkInDate ,setCheckOutDate,checkOutDate,errors,total }) => {
  return (
    <>
      <div className="col-xl-7 col-lg-8 mt-30">
        <h2 className="text-22 fw-500 mt-40 md:mt-24">
          Let us know who you are
        </h2>

        <div className="row x-gap-20 y-gap-20 pt-20">
          <div className="col-12">
          {errors.name && <div className="text-danger">{errors.name}</div>}
            <div className="form-input ">
              <input
               name="name" // Add the correct name attribute
                value={formData.name}
                onChange={handleChange}
                type="text"
                required
              />
              
              <label className="lh-1 text-16 text-light-1">Full Name</label>
              
            </div>
            
          </div>
          {/* End col-12 */}

          {/* End col-12 */}

          <div className="col-md-6">
          {errors.phone && <div className="text-danger">{errors.phone}</div>}
            <div className="form-input ">
              <input
              name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="text"
                required
              />
              <label className="lh-1 text-16 text-light-1">Phone Number</label>
          
            </div>
          </div>
          <div className="col-md-6">
          {errors.postalcode && <div className="text-danger">{errors.postalcode}</div>}
            <div className="form-input ">
              <input
              name="postalcode"
                value={formData.postalcode}
                onChange={handleChange}
                type="text"
                required
              />
              <label className="lh-1 text-16 text-light-1">
                ZIP code/Postal code
              </label>
             
            </div>
          </div>
          {/* End col-12 */}

          <div className="col-12">
          {errors.address && <div className="text-danger">{errors.address}</div>}
            <div className="form-input ">
              <input
              name="address"
                value={formData.address}
                onChange={handleChange}
                type="text"
                required
              />
              <label className="lh-1 text-16 text-light-1">
                Address line 1
              </label>
             
            </div>
          </div>

          <div className="col-12">
            <div className="row y-gap-20 items-center justify-between">
              <div className="col-auto">
                <div className="text-14 text-light-1">
                  By proceeding with this booking, I agree to TravelMoyo Terms
                  of Use and Privacy Policy.
                </div>
              </div>
              {/* End col-12 */}
            </div>
          </div>
          {/* End col-12 */}
        </div>
        {/* End .row */}
      </div>
      {/* End .col-xl-7 */}

      <div className="col-xl-5 col-lg-4 mt-30">
        <div className="booking-sidebar">
          <BookingDetails errors={errors} checkOutDate={checkOutDate} total={total} setCheckOutDate={setCheckOutDate} setCheckInDate={setCheckInDate} checkInDate={checkInDate} formData={formData} handleChange={handleChange} packageData={packageData} />
        </div>
      </div>
      {/*  */}
    </>
  );
};

export default CustomerInfo;
