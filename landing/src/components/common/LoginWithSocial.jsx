import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginWithSocial = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");
    const user = queryParams.get("user");

    if (token && user) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", user);
      toast.success("Login successful!");
      navigate("/");

    }
  }, [navigate]);

  const handleGoogleLogin = () => {
    sessionStorage.setItem("preAuthPath", window.location.pathname);
    window.location.href =
      "https://believehrdapi.shoppingsto.com/api/v1/auth/google?redirect_uri=https://believejob.shoppingsto.com/auth/callback";
  };

  return (
    <></>
    // <div className="w-100">
    //   <button
    //     onClick={handleGoogleLogin}
    //     style={{
    //       display: "flex",
    //       alignItems: "center",
    //       padding: "10px 20px",
    //       border: "1px solid #ddd",
    //       borderRadius: "8px",
    //       backgroundColor: "#fff",
    //       cursor: "pointer",
    //       boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    //       fontSize: "16px",
    //       fontWeight: "500",
    //       width: "100%",
    //       textAlign: "center",
    //       justifyContent: "center",
    //     }}
    //   >
    //     <img
    //       src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-1024.png"
    //       alt="Google"
    //       style={{
    //         width: "24px",
    //         height: "24px",
    //         marginRight: "10px",
    //       }}
    //     />
    //     Sign in with Google
    //   </button>
    // </div>
  );
};

export default LoginWithSocial;
