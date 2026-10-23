import React, { useState } from "react";
import { Rate, Modal } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import LoginF from "@/pages/others/login/LoginF";
import { useNavigate } from "react-router-dom";
import { getAuthData } from "@/utils/auth";


const ReplyForm = ({ id }) => {
  // State to hold ratings and form data
  const [rating, setRating] = useState(0);
  const [locationReview, setLocationReview] = useState(0);
  const [valueForMoney, setValueForMoney] = useState(0);
  const [comfort, setComfort] = useState(0);
  const [cleanliness, setCleanliness] = useState(0);
  const [facilities, setFacilities] = useState(0);
  const [comment, setComment] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSecondModalVisible, setIsSecondModalVisible] = useState(false);
  const userid=getAuthData()

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if token exists in localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      // If no token, show login modal
      setIsModalVisible(true);
      return;
    }

    // Validation: Ensure ratings and comment are provided
    if (rating === 0 || comment.trim() === "") {
      toast.error("Please provide a rating and a comment.");
      return;
    }





    const payload = {
      userId: userid?.sub, // Example user ID
      packageId: id,
      rating,
      comment,
      locationReview,
      valueForMoney,
      comfort,
      cleanliness,
      facilities,
    };

    try {
      // Sending POST request to backend
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/reviews`, payload);
      toast.success("Review submitted successfully!");
      // Clear form after successful submission
      window.location.reload();
      setRating(0);
      setLocationReview(0);
      setValueForMoney(0);
      setComfort(0);
      setCleanliness(0);
      setFacilities(0);
      setComment("");
    } catch (error) {
      toast.error("Error submitting review. Please try again.");
      console.error("Error submitting review:", error);
    }
  };
  const navigate = useNavigate();
  // Handle first modal OK button click
  const handleFirstModalOk = () => {
    navigate(`/signup?redirect=${encodeURIComponent(location.pathname)}`);
  };

  // Handle second modal OK button click (redirect to login or close modal)
  const handleSecondModalOk = () => {
    setIsSecondModalVisible(false);
    // You can redirect to the login page here if needed
    // window.location.href = "/login";
  };

  return (
    <form className="reply-form" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label text-16">Overall Rating</label>
        <div className="d-flex align-items-center">
          <Rate value={rating} onChange={setRating} />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label text-16">Location Review</label>
        <div className="d-flex align-items-center">
          <Rate value={locationReview} onChange={setLocationReview} />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label text-16">Value for Money</label>
        <div className="d-flex align-items-center">
          <Rate value={valueForMoney} onChange={setValueForMoney} />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label text-16">Comfort</label>
        <div className="d-flex align-items-center">
          <Rate value={comfort} onChange={setComfort} />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label text-16">Cleanliness</label>
        <div className="d-flex align-items-center">
          <Rate value={cleanliness} onChange={setCleanliness} />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label text-16">Facilities</label>
        <div className="d-flex align-items-center">
          <Rate value={facilities} onChange={setFacilities} />
        </div>
      </div>

      <div className="col-12">
        <div className="form-input">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            rows={4}
            defaultValue={""}
          />
          <label className="lh-1 text-16 text-light-1">Write Your Comment</label>
        </div>
      </div>

      <div>
        <button htmlType="submit" className="btn btn-secondary mt-3">
          Post Review
        </button>
      </div>

      {/* First Modal for login prompt */}
      <Modal
        title="Login Required"
        visible={isModalVisible}
        onOk={handleFirstModalOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>You need to log in to submit a review.</p>
      </Modal>

      {/* Second Modal for login action */}
      <Modal
        title="Login"
        visible={isSecondModalVisible}
        onOk={handleSecondModalOk}
        width={900}
        onCancel={() => setIsSecondModalVisible(false)}
      >
      <LoginF/>
      </Modal>
    </form>
  );
};

export default ReplyForm;
