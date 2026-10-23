import CallToActions from "@/components/common/CallToActions";
import DefaultHeader from "@/components/header/default-header";
import DefaultFooter from "@/components/footer/default";
import LoginWithSocial from "@/components/common/LoginWithSocial";
import SignUpForm from "@/components/common/SignUpForm";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Believe Jobs",
  description: "TravelMoyo - Travel & Tour ReactJs Template",
};

const SignUp = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <DefaultHeader />
      {/* End Header 1 */}

      <section className="layout-pt-lg layout-pb-lg bg-blue-2">
        <div className="container">
          <div className="row justify-center">
            <div className="col-xl-10 col-lg-10 col-md-12">
              <div
                className="px-50 py-50 sm:px-20 sm:py-20 bg-white shadow-4 rounded-4"
                style={{
                  width: "100%",
                  maxWidth: "900px",
                  margin: "0 auto",
                }}
              >
                <SignUpForm />
                {/* End SignUP */}

                <div className="row y-gap-20 pt-30">
                  <div className="col-12">
                    {/* <div style={{color:'#004080'}} className="text-center">or sign in with</div> */}
                  </div>
                  <LoginWithSocial />
                  <div className="col-12">
                    <div style={{color:'#004080'}} className="text-center px-30">
                      By creating an account, you agree to our Terms of Service
                      and Privacy Statement.
                    </div>
                  </div>
                </div>
                {/* End .row */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End login section */}

      <CallToActions />
      {/* End Call To Actions Section */}

      <DefaultFooter />
      {/* End Footer */}
    </>
  );
};

export default SignUp;
