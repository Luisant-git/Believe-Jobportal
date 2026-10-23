import { useState } from "react";
import axiosServices from "../../utils/axios";
import { toast } from "react-toastify";

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handleSubmit called', { email });
    
    if (!email) {
      toast.error('Please enter your email');
      return;
    }
    
    setLoading(true);

    try {
      console.log('Making API call...');
      await axiosServices.post('/auth/forgot-password', {
        email,
      });
      console.log('API call successful');
      toast.success("Password reset email sent!");
      setEmail("");
      onClose();
    } catch (err) {
      console.error('API call failed:', err);
      toast.error(err.response?.data?.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000
    }}>
      <div className="modal-content" style={{
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "8px",
        width: "400px",
        maxWidth: "90%"
      }}>
        <h2 className="text-20 fw-500 mb-20" style={{ color: "#004080" }}>Reset Password</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-input mb-20">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className="lh-1 text-14 text-light-1" >Email</label>
          </div>
          <div className="d-flex gap-10">
            <button
              type="submit"
              disabled={loading || !email}
              className="button py-15 px-30 text-white"
              style={{ backgroundColor: "#004080" }}
              onClick={handleSubmit}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="button py-15 px-30 border-light"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;