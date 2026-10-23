import { useEffect, useState } from "react";
import FilterBox from "../../components/hotel-single/filter-box";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import ContactForm from "../common/ContactForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const SidebarRight = ({ hotel }) => {
  const [rating, setRating] = useState(null);
 const[error,setError]=useState(false)
  const navigate = useNavigate();
  useEffect(() => {
    // Replace this with your actual URL
    const url = `${import.meta.env.VITE_API_URL}/reviews/average-ratings/${hotel?.id}`;

    // Fetch data from the URL
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setRating(data); // Assuming the data has the average rating value
      })
      .catch(err => {
        setError(err.message);
      });
  }, []);

  const[openenquire,setEnquire]=useState(false)
  const handleopenequire=()=>{
  setEnquire(true)
  }
  const handlecloseequire=()=>{
  setEnquire(false)
  }

  
  return (
    <aside className="ml-50 lg:ml-0">
      <div className="px-30 py-30 border-light rounded-4 shadow-4">
        <div className="d-flex items-center justify-between">
          <div className="d-flex w-100 justify-content-evenly">
            <span className="text-20 fw-500"> <FontAwesomeIcon icon={faSun} className="text-16 mr-5" /> {hotel?.durationDays}  Days </span>
            <div className="text-20 fw-500"> <FontAwesomeIcon icon={faMoon} className="text-16 mr-5" /> {hotel?.durationNights}  Nights</div>
          </div>
          <div className="d-flex items-center">
            <div className="text-14 text-right mr-10">
              {/* <div className="lh-15 fw-500">Exceptional</div> */}
              {/* <div className="lh-15 text-light-1">
                {hotel?.reviews?.length} reviews
              </div> */}
            </div>
            {/* <div className="size-40 flex-center bg-blue-1 rounded-4">
              <div className="text-14 fw-600 text-white"> {rating?.totalRatingsCount}⭐</div>
            </div> */}
          </div>
        </div>
        {/* End d-flex */}

        <div className="row y-gap-20 pt-30">
        <div className="col-12">
        <div className="button-item h-full">
        <button onClick={() => {
                const token = localStorage.getItem("token");
                if (!token) {
                  // Show modal if token is not found
                  Modal.warning({
                    title: "Warning",
                    content: "You need to be logged in to proceed. Please log in first.",
                    onOk: () => {
                      // Redirect to login page when OK is clicked
                      navigate(`/signup?redirect=${encodeURIComponent(location.pathname)}`);
                    },
                  });
                } else {
                  // Redirect to booking page if token is found
                  navigate(`/booking-page/${hotel.id}`);
                }
              }} className="button -dark-1 px-35 h-60 col-12 bg-blue-1 text-white">
                Book Now
              </button>
              <button onClick={handleopenequire} className="button -dark-1 px-35 h-40 col-12 bg-yellow-1 text-black mt-2">Enquire</button>
        </div>
        {/* End search button_item */}
      </div>
        </div>
        <Modal
        width={900}
        title="Enquire here"
        visible={openenquire}
        onOk={handlecloseequire}
        onCancel={handlecloseequire}
      >
   <ContactForm/>
      </Modal>
      </div>
      {/* End px-30 FilterBox */}
    </aside>
  );
};

export default SidebarRight;
