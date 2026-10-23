import LoginForm from "@/components/common/LoginForm";
import LoginWithSocial from "@/components/common/LoginWithSocial";
import React from "react";

function LoginF() {
  return (
    <div>
      <div className="px-50 py-50 sm:px-20 sm:py-20 bg-white shadow-4 rounded-4">
        <LoginForm />
        {/* End .Login */}

        <div className="row y-gap-20 pt-10">
          <div className="col-12">
            {/* <div style={{color:'#004080'}} className="text-center">or sign in with</div> */}
          </div>
          <LoginWithSocial />
          <div className="col-12">
            <div style={{color:'#004080'}} className="text-center px-30">
              By creating an account, you agree to our Terms of Service and
              Privacy Statement.
            </div>
          </div>
        </div>
        {/* End .row */}
      </div>
    </div>
  );
}

export default LoginF;
