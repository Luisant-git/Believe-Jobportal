import DashboardCard from "./components/DashboardCard";
import Sidebar from "../common/Sidebar";
import Header from "../../../header/dashboard-header";
import ChartSelect from "./components/ChartSelect";
import ChartMain from "./components/ChartMain";
import { Link } from "react-router-dom";
import Footer from "../common/Footer";
import { useEffect, useState } from "react";
import { getDashboardCounts } from "@/api/db-dashboard";

const index = () => {

  const [dashboardData, setDashboardData] = useState({});

  // Fetch dashboard counts
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const countsResponse = await getDashboardCounts();
        console.log("Dashboard API Response:", countsResponse);
        if (countsResponse.success && countsResponse.data) {
          setDashboardData(countsResponse.data);
          console.log("Dashboard Data Set:", countsResponse.data);
        } else {
          console.error("Failed to fetch dashboard counts:", countsResponse.message);
        }
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
                        <Link to="/dashboard/db-categorylist" className="button h-50 px-24 w-100" style={{backgroundColor: 'transparent', border: '2px solid #004080', color: '#004080', textDecoration: 'none'}} onMouseEnter={(e) => e.target.style.backgroundColor = 'transparent'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>Add New Job Category</Link>
                      </div>
                      <div className="col-12">
                        <Link to="/dashboard/db-joblist" className="button h-50 px-24 w-100" style={{backgroundColor: 'transparent', border: '2px solid #004080', color: '#004080', textDecoration: 'none'}} onMouseEnter={(e) => e.target.style.backgroundColor = 'transparent'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>Create New Job</Link>
                      </div>
                      <div className="col-12">
                        <Link to="/dashboard/db-booking" className="button h-50 px-24 w-100" style={{backgroundColor: 'transparent', border: '2px solid #004080', color: '#004080', textDecoration: 'none'}} onMouseEnter={(e) => e.target.style.backgroundColor = 'transparent'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>View All Applications</Link>
                      </div>
                      <div className="col-12">
                        <Link to="/dashboard/db-interview" className="button h-50 px-24 w-100" style={{backgroundColor: 'transparent', border: '2px solid #004080', color: '#004080', textDecoration: 'none'}} onMouseEnter={(e) => e.target.style.backgroundColor = 'transparent'} onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>Manage Employers</Link>
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
                          <div className="text-15 fw-500" style={{color: '#004080'}}>Total Active Jobs</div>
                          <div className="text-15 fw-600" style={{color: '#004080'}}>{dashboardData?.jobs || 0}</div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-flex justify-between items-center py-10 px-15 rounded-4 bg-light-2">
                          <div className="text-15 fw-500" style={{color: '#004080'}}>Pending Applications</div>
                          <div className="text-15 fw-600" style={{color: '#004080'}}>{dashboardData?.applications || 0}</div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-flex justify-between items-center py-10 px-15 rounded-4 bg-light-2">
                          <div className="text-15 fw-500" style={{color: '#004080'}}>Active Employers</div>
                          <div className="text-15 fw-600" style={{color: '#004080'}}>{dashboardData?.employers || 0}</div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-flex justify-between items-center py-10 px-15 rounded-4 bg-light-2">
                          <div className="text-15 fw-500" style={{color: '#004080'}}>Registered Job Seekers</div>
                          <div className="text-15 fw-600" style={{color: '#004080'}}>{dashboardData?.jobSeekers || 0}</div>
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
