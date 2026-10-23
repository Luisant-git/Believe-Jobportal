import CallToActions from "@/components/common/CallToActions";
import Header11 from "@/components/header/header-11";
import DefaultFooter from "@/components/footer/default";
import TopHeaderFilter from "@/components/hotel-list/hotel-list-v2/TopHeaderFilter";
import HotelProperties from "@/components/hotel-list/hotel-list-v2/HotelProperties";
import Pagination from "@/components/hotel-list/common/Pagination";
import Sidebar from "@/components/hotel-list/hotel-list-v2/Sidebar";

import MetaComponent from "@/components/common/MetaComponent";
import { getFilter } from "@/api/job";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const metadata = {
  title: "job List  || Believe Jobs",
  description: "TravelMoyo - Travel & Tour ReactJs Template",
};

const HotelListPage2 = () => {
  const [jobList, setJobList] = useState([]);
  const [loading, setLoading] = useState(false);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();

  const search = query.get("search");
  const skills = query.get("skills");
  const location = query.get("location");
  const salaryRange = query.get("salaryRange");
  const categoryId = query.get("categoryId");
  const type = query.get("type");

  const filteredJobList = () => {
    setLoading(true);
    const skillsArray = skills ? skills.split(",") : [];
    const formattedSkills =
      skillsArray.length > 0
        ? skillsArray.map((skill) => skill.trim()).filter((skill) => skill)
        : null;

    const filterParams = {
      search,
      location,
      type,
      salaryRange,
      categoryId,
    };

    if (formattedSkills) {
      filterParams.skills = formattedSkills;
    }

    getFilter(filterParams)
      .then((response) => {
        setJobList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setJobList([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    filteredJobList();
  }, []);

  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="header-margin"></div>
      <Header11 />
      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row y-gap-30">
            <div className="col-xl-3">
              <aside className="sidebar y-gap-40 xl:d-none">
                <Sidebar />
              </aside>
              <div
                className="offcanvas offcanvas-start"
                tabIndex="-1"
                id="listingSidebar"
              >
                <div className="offcanvas-header">
                  <h5 className="offcanvas-title" id="offcanvasLabel">
                    Filter Hotels
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="offcanvas-body">
                  <aside className="sidebar y-gap-40  xl:d-block">
                    <Sidebar />
                  </aside>
                </div>
              </div>
            </div>
            <div className="col-xl-9 ">
              <TopHeaderFilter />
              <div className="mt-30"></div>
              <div className="row y-gap-30">
                <HotelProperties loading={loading} jobList={jobList} />
              </div>
              <Pagination />
            </div>
          </div>
        </div>
      </section>
      <CallToActions />
      <DefaultFooter />
    </>
  );
};

export default HotelListPage2;
