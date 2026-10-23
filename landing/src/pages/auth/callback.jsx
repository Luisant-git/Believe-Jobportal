import { getUserJobSeekerById } from "@/api/user";
import useRouter from "@/utils/useRoute";
import { Spin } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthSuccess = () => {
  const navigate = useNavigate();
  const route = useRouter();

  useEffect(() => {
    const handleCheck = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const token = queryParams.get("token");
      const user = queryParams.get("user");
      if (token && user) {
        const decodedUser = JSON.parse(decodeURIComponent(user));
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(decodedUser));
        localStorage.setItem("userId", decodedUser?.id);
        // route.backtoback();
        const data = await getUserJobSeekerById(decodedUser?.jobSeeker?.id);
        console.log("checking----------------------", data);

        if (
          !data?.data?.phoneNumber ||
          !data?.data?.resume ||
          !data?.data?.experience ||
          !data?.data?.city ||
          !data?.data?.education ||
          !data?.data?.highestEducation ||
          data?.data?.highestEducation === "" ||
          !data?.data?.skills ||
          data?.data?.skills?.length === 0
        ) {
          navigate("/profile");
          toast.error("Some required fields are missing...");
        } else {
          navigate("/");
        }
      } else {
        route.push("/login");
      }
    };

    handleCheck();
  }, [navigate]);

  return (
    <div>
      <Spin size="large" style={{ display: "block", margin: "auto" }} />
      <p>Redirecting...</p>
    </div>
  );
};

export default AuthSuccess;
