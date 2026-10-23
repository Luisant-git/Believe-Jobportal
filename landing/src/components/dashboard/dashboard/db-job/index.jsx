import Sidebar from "../common/Sidebar";
import Header from "../../../header/dashboard-header";
import Footer from "../common/Footer";
import ApplicationList from "./components/List";

const index = () => {
  return (
    <>
      <div className="header-margin"></div>
      <Header />
      <div className="dashboard">
        <div className="dashboard__sidebar bg-white scroll-bar-1">
          <Sidebar />
        </div>
        <div className="dashboard__main">
          <div className="dashboard__content bg-light-2">
            <div className="row y-gap-20 justify-between items-end pb-10 lg:pb-40 md:pb-32">
              <div className="col-12"></div>
            </div>
            <div className="py-30 px-30 rounded-4 bg-white shadow-3">
              <ApplicationList />
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
