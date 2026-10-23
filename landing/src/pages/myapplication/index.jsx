import CallToActions from "@/components/common/CallToActions";
import Header11 from "@/components/header/header-11";
import DefaultFooter from "@/components/footer/default";

import MetaComponent from "@/components/common/MetaComponent";
import ProfileCard from "../profile/components/Profile";
import List from "./components/list";
// import ProfileCard from "./components/Profile";

const metadata = {
  title: "Application || Believe Jobs",
  description: "Believe Jobs",
};

const MyApplication = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <Header11 />
      {/* End Header 1 */}

      <section className="pt-40 layout-pb-md">
        <div className="container">
          <List />
        </div>
        {/* End container */}
      </section>
      {/* End stepper */}

      <CallToActions />
      {/* End Call To Actions Section */}

      <DefaultFooter />
    </>
  );
};

export default MyApplication;
