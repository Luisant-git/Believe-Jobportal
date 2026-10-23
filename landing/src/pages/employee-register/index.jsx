import CallToActions from "@/components/common/CallToActions";
import DefaultHeader from "@/components/header/default-header";
import DefaultFooter from "@/components/footer/default";

import MetaComponent from "@/components/common/MetaComponent";
import Register from "./components/Register";

const metadata = {
  title: "Believe Jobs",
  description: "Believe Jobs",
};

const EmployeeRgister = () => {
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
            <div className="col-xl-8 col-lg-9 col-md-10">
              <div className="px-50 py-50 sm:px-20 sm:py-20 bg-white shadow-4 rounded-4">
                <Register />
                {/* End .Login */}

                <div className="row y-gap-20 pt-10">
                  <div className="col-12">
                    {/* <div style={{color:'#004080'}} className="text-center">or sign in with</div> */}
                  </div>

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
      {/* End Call To Actions Section */}
    </>
  );
};

export default EmployeeRgister;
