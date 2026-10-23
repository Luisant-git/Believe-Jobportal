import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CryptoJS from "crypto-js";
import { toast } from "react-toastify";

function MainLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const navigate = useNavigate();





  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login/admin`, {
        email,
        password,
      });
  
      const access_token = response.data.access_token; 

      localStorage.setItem("token", access_token);
      toast.success("Login Successfully");
      navigate("/dashboard/db-dashboard");
      window.location.reload();
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
      toast.error("Invalid email or password. Please try again!");
    }
  };



  return (
    <form className="row y-gap-20" onSubmit={handleSubmit}>
      <div className="col-12">
      <h1 className="text-22 fw-500" style={{ color: "#004080" }}>
  Welcome back Admin
</h1>

        <p className="mt-10">Admin use only</p>
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
            type={showPassword ? "text" : "password"} // Toggle password visibility
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className="lh-1 text-14 text-light-1">Password</label>
          <span
            onClick={() => setShowPassword(!showPassword)} // Toggle password state
            style={{
              cursor: "pointer",
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "30px",
            }}
          >
            {showPassword ? "🙈" : "👁️"} {/* Emoji for show/hide password */}
          </span>
        </div>
      </div>

      {error && (
        <div className="col-12">
          <p className="text-danger">{error}</p>
        </div>
      )}

      <div className="col-12">
      <button
  type="submit"
  className="button py-20 text-white w-100"
  style={{ backgroundColor: "#004080" }}
>
  Sign In <div className="icon-arrow-top-right ml-15" />
</button>

      </div>
    </form>
  );
}

export default MainLogin;
