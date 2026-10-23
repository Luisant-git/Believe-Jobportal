import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const CreatePassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (!tokenFromUrl) {
      toast.error("Invalid registration link");
      navigate("/");
    } else {
      setToken(tokenFromUrl);
    }
  }, [searchParams, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/create-password`, {
        token,
        password,
      });
      toast.success("Password created successfully!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="row justify-center" style={{ width: "100%" }}>
        <div
          className="col-xl-8 col-lg-9 col-md-10"
          style={{ maxWidth: "700px", width: "100%" }}
        >
          <div className="px-50 py-50 md:px-25 md:py-25 bg-white shadow-1 rounded-16">
            <form className="row y-gap-20" onSubmit={handleSubmit}>
              <div className="col-12">
                <h1 className="text-22 fw-500" style={{ color: "#004080" }}>
                  Create Password
                </h1>
                <p className="mt-10">Complete your registration by setting up your password</p>
              </div>

              <div className="col-12">
                <div className="form-input">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label className="lh-1 text-14 text-light-1">Password</label>
                </div>
              </div>

              <div className="col-12">
                <div className="form-input">
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <label className="lh-1 text-14 text-light-1">Confirm Password</label>
                </div>
              </div>

              <div className="col-12">
                <button
                  type="submit"
                  disabled={loading}
                  className="button py-20 text-white w-100"
                  style={{ backgroundColor: "#004080" }}
                >
                  {loading ? "Creating Password..." : "Create Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePassword;