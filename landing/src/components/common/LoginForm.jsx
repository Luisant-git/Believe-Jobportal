import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosServices from "../../utils/axios";
import { getAuthData } from "@/utils/auth";
import { toast } from "react-toastify";
import ForgotPasswordModal from "./ForgotPasswordModal";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const navigate = useNavigate();
  const data = getAuthData();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosServices.post("/auth/login/job-seeker", {
        email,
        password,
      });

      const { access_token, user } = response.data;
      localStorage.setItem("userId", user?.id);
      localStorage.setItem("token", access_token);
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);
    }
  };

  return (
    <form className="row y-gap-20" onSubmit={handleSubmit}>
      <div className="col-12">
        <h1 className="text-22 fw-500" style={{ color: "#004080" }}>
          Welcome back Job Seeker
        </h1>
        <p className="mt-10">
          Don&apos;t have an account yet?{" "}
          <Link to="/signup" style={{ color: "#004080", fontWeight: "bold" }}>
            Sign up for free
          </Link>
        </p>
      </div>

      <div className="col-12">
        <div className="form-input">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="lh-1 text-14 text-light-1">Email</label>
        </div>
      </div>

      <div className="col-12">
        <div className="form-input">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className="lh-1 text-14 text-light-1">Password</label>
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              cursor: "pointer",
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "30px",
            }}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>
      </div>

      {error && (
        <div>
          <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
            {error}
          </p>
        </div>
      )}

      <div className="col-12">
       

        <button
          type="button"
          onClick={() => setShowForgotModal(true)}
          className="text-14 fw-500 text-blue-1 underline"
          style={{color: "#004080", fontWeight: "bold" ,background: "none", border: "none", cursor: "pointer" }}
        >
          Forgot your password?
        </button>
      </div>

      <div className="col-12">
        <button
          type="submit"
          className="button py-20 text-white w-100"
          style={{ backgroundColor: "#004080" }}
        >
          Sign In <div className="icon-arrow-top-right ml-15" />
        </button>
      </div>

      <ForgotPasswordModal
        isOpen={showForgotModal}
        onClose={() => setShowForgotModal(false)}
      />
    </form>
  );
};

export default LoginForm;
