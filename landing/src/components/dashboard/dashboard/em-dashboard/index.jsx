import DashboardCard from "./components/DashboardCard";
import Sidebar from "../em-common/Sidebar";
import Header from "../../../header/em-dashboard-header";
import ChartSelect from "./components/ChartSelect";
import ChartMain from "./components/ChartMain";

import Footer from "../em-common/Footer";
import { useEffect, useState } from "react";
import { getEmployerDashboardCounts } from "@/api/em-dashboard";
import { Link } from "react-router-dom";

const index = () => {

  const [dashboardData, setDashboardData] = useState({});

  // Fetch employer dashboard counts
  useEffect(() => {
    const fetchDashboardData = async () => {
      const userId = localStorage.getItem("userId");
      console.log("UserId from localStorage:", userId);
      if (!userId) {
        console.log("No userId found");
        return;
      }

      try {
        console.log("Calling API with userId:", userId);
        const data = await getEmployerDashboardCounts(userId);
        console.log("API returned data:", data);
        setDashboardData(data);
        console.log("Dashboard data set to:", data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);
  return (
    <>
      {/*  */}
      {/* End Page Title */}

      <div className="header-margin"></div>

      <Header />
      {/* End dashboard-header */}

      <div className="dashboard">
        <div className="dashboard__sidebar bg-white scroll-bar-1">
          <Sidebar />
          {/* End sidebar */}
        </div>
        {/* End dashboard__sidebar */}

        <div className="dashboard__main">
          <div className="dashboard__content bg-light-2">
            <div className="row y-gap-20 justify-between items-end pb-20 lg:pb-15 md:pb-10">
              <div className="col-12">
                <h1 className="text-30 lh-14 fw-600" style={{color: '#004080'}}>Dashboard</h1>
                <div className="text-15" style={{color: '#004080'}}>
                  Job Portal Statistics
                </div>
              </div>
              {/* End .col-12 */}
            </div>
            {/* End .row */}

            <DashboardCard dashboardData={dashboardData} />

            <div className="row y-gap-30 pt-20">
              <div className="col-xl-6 col-md-6">
                <div className="py-30 px-30 rounded-4 bg-white shadow-3">
                  <div className="d-flex justify-between items-center">
                    <h2 className="text-18 lh-1 fw-500" style={{color: '#004080'}}>Quick Actions</h2>
                  </div>
                  {/* End .d-flex */}
                  
                  <div className="pt-30">
                    <div className="row y-gap-15">
                      <div className="col-12">
                        <Link to="/em-CategoryList" className="button h-50 px-24 w-100" style={{backgroundColor: 'transparent', border: '2px solid #004080', color: '#004080', textDecoration: 'none'}} onMouseEnter={(e) => e.target.style.backgroundColor = 'transparent'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>Add New Job Category</Link>
                      </div>
                      <div className="col-12">
                        <Link to="/em-JobList" className="button h-50 px-24 w-100" style={{backgroundColor: 'transparent', border: '2px solid #004080', color: '#004080', textDecoration: 'none'}} onMouseEnter={(e) => e.target.style.backgroundColor = 'transparent'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>Manage Jobs</Link>
                      </div>
                      <div className="col-12">
                        <Link to="/em-ApplicationList" className="button h-50 px-24 w-100" style={{backgroundColor: 'transparent', border: '2px solid #004080', color: '#004080', textDecoration: 'none'}} onMouseEnter={(e) => e.target.style.backgroundColor = 'transparent'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>View Applications</Link>
                      </div>
                      <div className="col-12">
                        <Link to="/em-subscription" className="button h-50 px-24 w-100" style={{backgroundColor: 'transparent', border: '2px solid #004080', color: '#004080', textDecoration: 'none'}} onMouseEnter={(e) => e.target.style.backgroundColor = 'transparent'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>Manage Subscription</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End .col */}
              
              <div className="col-xl-6 col-md-6">
                <div className="py-30 px-30 rounded-4 bg-white shadow-3">
                  <div className="d-flex justify-between items-center">
                    <h2 className="text-18 lh-1 fw-500" style={{color: '#004080'}}>System Status</h2>
                  </div>
                  {/* End .d-flex */}
                  
                  <div className="pt-30">
                    <div className="row y-gap-15">
                      <div className="col-12">
                        <div className="d-flex justify-between items-center py-10 px-15 rounded-4 bg-light-2">
                          <div className="text-15 fw-500" style={{color: '#004080'}}>Job Categories</div>
                          <div className="text-15 fw-600" style={{color: '#004080'}}>{dashboardData?.categories || 0}</div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-flex justify-between items-center py-10 px-15 rounded-4 bg-light-2">
                          <div className="text-15 fw-500" style={{color: '#004080'}}>Total Jobs</div>
                          <div className="text-15 fw-600" style={{color: '#004080'}}>{dashboardData?.jobs || 0}</div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-flex justify-between items-center py-10 px-15 rounded-4 bg-light-2">
                          <div className="text-15 fw-500" style={{color: '#004080'}}>Applications Received</div>
                          <div className="text-15 fw-600" style={{color: '#004080'}}>{dashboardData?.applications || 0}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End .col */}
            </div>
            {/* End .row */}
            
            <div className="row y-gap-30 pt-20">
              <div className="col-12">
                <div className="py-30 px-30 rounded-4 bg-white shadow-3">
                  <div className="d-flex justify-between items-center">
                    <h2 className="text-18 lh-1 fw-500" style={{color: '#004080'}}>Recent Activity</h2>
                  </div>
                  {/* End .d-flex */}
                  
                  <div className="pt-30">
                    <div className="text-center">
                      <div className="text-15" style={{color: '#004080'}}>No recent activities to display</div>
                      <div className="text-14 mt-5" style={{color: '#004080'}}>Activities will appear here as users interact with the system</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End .col */}
            </div>
            {/* End .row */}

            {/* Statistics Overview Section - Commented Out */}
            {/* <div className="row y-gap-30 pt-20 chart_responsive">
              <div className="col-12">
                <div className="py-30 px-30 rounded-4 bg-white shadow-3">
                  <div className="d-flex justify-between items-center">
                    <h2 className="text-18 lh-1 fw-500" style={{color: '#004080'}}>Statistics Overview</h2>
                    <ChartSelect />
                  </div>
                  <div className="pt-30">
                    <ChartMain />
                  </div>
                </div>
              </div>
            </div> */}

            <Footer />
          </div>
          {/* End .dashboard__content */}
        </div>
        {/* End dashbaord content */}
      </div>
      {/* End dashbaord content */}
    </>
  );
};

export default index;
