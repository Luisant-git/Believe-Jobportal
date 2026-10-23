import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Modal } from "antd";
import ContactForm from "../common/ContactForm";


const StickyHeader = ({ hotel }) => {
  const [header, setHeader] = useState(false);
  const navigate = useNavigate();
  const changeBackground = () => {
    if (window.scrollY >= 200) {
      setHeader(true);
    } else {
      setHeader(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);
  const[openenquire,setEnquire]=useState(false)
  const handleopenequire=()=>{
  setEnquire(true)
  }
  const handlecloseequire=()=>{
  setEnquire(false)}
  return (
    <div className={`singleMenu js-singleMenu ${header ? "-is-active" : ""}`}>
      <div className="singleMenu__content">
        <div className="container">
          <div className="row y-gap-20 justify-between items-center">
            <div className="col-auto">
              <div className="singleMenu__links row x-gap-30 y-gap-10">
            
              </div>
            </div>
            {/* End .col */}

            <div className="col-auto">
              <div className="row x-gap-15 y-gap-15 items-center">
                <div className="col-auto">

                  <div className="text-14">
                  
                  <button onClick={handleopenequire} className="button -dark-1 px-35 h-40 col-12 bg-yellow-1 text-black ">Enquire</button>
                  </div>
                </div>
                <div className="col-auto d-flex">
                  <button
                    onClick={() => {
                      const token = localStorage.getItem("token");
                      if (!token) {
                        // Show modal if token is not found
                        Modal.warning({
                          title: "Warning",
                          content:
                            "You need to be logged in to proceed. Please log in first.",
                          onOk: () => {
                            // Redirect to login page when OK is clicked
                            navigate(
                              `/signup?redirect=${encodeURIComponent(
                                location.pathname
                              )}`
                            );
                          },
                        });
                      } else {
                        // Redirect to booking page if token is found
                        navigate(`/booking-page/${hotel.id}`);
                      }
                    }}
                    className="button -dark-1 px-30 h-40 col-12 bg-blue-1 text-white"
                  >
                    Book Now <div className="icon-arrow-top-right ml-15" />
                  </button>
                
                </div>
                
              </div>
            </div>

            {/* End .col */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </div>
      <Modal
        width={900}
        title="Enquire here"
        visible={openenquire}
        onOk={handlecloseequire}
        onCancel={handlecloseequire}
        footer={null}
      >
   <ContactForm/>
      </Modal>
      {/* End .singleMenu__content */}
    </div>
  );
};

export default StickyHeader;
