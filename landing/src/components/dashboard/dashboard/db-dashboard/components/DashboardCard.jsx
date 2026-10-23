import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup, faBriefcase, faListAlt, faUserTie, faUsers } from "@fortawesome/free-solid-svg-icons";

const DashboardCard = ({dashboardData}) => {
  console.log("DashboardCard received data:", dashboardData);
  const data = [
    {
      title: "Job Categories",
      amount: dashboardData?.categories || 0,
      description: "Total Categories",
      icon: <FontAwesomeIcon icon={faLayerGroup} size="2x" style={{color: "#004080"}}/>,
    },
    {
      title: "Jobs",
      amount: dashboardData?.jobs || 0,
      description: "Total Jobs",
      icon: <FontAwesomeIcon icon={faBriefcase} size="2x" style={{color: "#004080"}}/>,
    },
    {
      title: "Applications",
      amount: dashboardData?.applications || 0,
      description: "Total Applications",
      icon: <FontAwesomeIcon icon={faListAlt} size="2x" style={{color: "#004080"}}/>,
    },
    {
      title: "Employers",
      amount: dashboardData?.employers || 0,
      description: "Total Employers",
      icon: <FontAwesomeIcon icon={faUserTie} size="2x" style={{color: "#004080"}}/>,
    },
    {
      title: "Job Seekers",
      amount: dashboardData?.jobSeekers || 0,
      description: "Total Job Seekers",
      icon: <FontAwesomeIcon icon={faUsers} size="2x" style={{color: "#004080"}}/>,
    },
  ];
  return (
    <div className="row y-gap-30">
      {data?.map((item, index) => (
        <div key={index} className="col-xl-3 col-md-6">
          <div className="py-30 px-30 rounded-4 bg-white shadow-3">
            <div className="row y-gap-20 justify-between items-center">
              <div className="col-auto">
                <div className="fw-500 lh-14" style={{color: '#004080'}}>{item.title}</div>
                <div className="text-26 lh-16 fw-600 mt-5" style={{color: '#004080'}}>{item.amount}</div>
                <div className="text-15 lh-14 text-light-1 mt-5">
                  {item.description}
                </div>
              </div>
              <div className="col-auto">
                {item.icon}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCard;
