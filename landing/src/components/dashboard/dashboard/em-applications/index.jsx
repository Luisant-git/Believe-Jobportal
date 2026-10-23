import Sidebar from "../em-common/Sidebar";
import Header from "../../../header/em-dashboard-header";
import Footer from "../em-common/Footer";
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
