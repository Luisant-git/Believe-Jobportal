import React from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import logo from "../../../public/img/building.png";
import { useNavigate } from "react-router-dom";
import { Modal, Spin, message } from "antd"; 
import { CiMail } from "react-icons/ci";
import { MdOutlinePermPhoneMsg } from "react-icons/md";
import { IoMdGlobe } from "react-icons/io";

export default function GalleryTwo({ job, loading }) { 
  const navigate = useNavigate();

  const handleApplyClick = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate(`/application/${job?.id}`);
    } else {
      Modal.confirm({
        title: "Login Required",
        content:
          "You need to login to apply for this job. Do you want to go to login page?",
        okText: "Yes, Login",
        cancelText: "Cancel",
        onOk() {
          navigate("/login", { state: { from: window.location.pathname } });
        },
        onCancel() {
          message.info("You can login later to apply for this job");
        },
      });
    }
  };

  if (loading || !job) {
    return (
      <div className="container pt-40" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <section className="pt-40">
        <div className="container">
          <div className="hotelSingleGrid">
            <div>
              <Gallery>
                <div className="galleryGrid -type-3">
                  <div className="galleryGrid__item relative d-flex justify-end">
                    <Item
                      original={job?.companyDetails?.companyLogo}
                      thumbnail={job?.companyDetails?.companyLogo}
                    >
                      {({ ref, open }) => (
                        <img
                          src="https://wallpaperaccess.com/full/4623488.jpg"
                          ref={ref}
                          onClick={open}
                          alt="company logo"
                          role="button"
                          className="rounded-4"
                        />
                      )}
                    </Item>
                  </div>
                </div>
              </Gallery>

              <div className="row justify-evenly  pt-40">
                <div className="row">
                  <div className="col-6">
                    <div className="row x-gap-20 items-center">
                      <div className="col-auto">
                        <h1 style={{color:'#004080'}} className="text-30 sm:text-25 fw-600">
                          {job?.title}
                        </h1>
                      </div>
                      <div className="col-auto">
                        <span style={{color:'#004080'}} className="text-14 bg-blue-1-05 text-blue-1 py-5 px-15 rounded-100">
                          {job?.type}
                        </span>
                      </div>
                    </div>
                    <div className="row x-gap-20 y-gap-20 items-center pt-10">
                      <div className="col-auto">
                        <div className="d-flex items-center text-15 text-light-1">
                          <i className="icon-location-2 text-16 mr-5" />
                          {job?.location}
                        </div>
                      </div>
                      <div className="col-auto">
                        <div className="d-flex items-center text-15 text-light-1">
                          <i className="icon-clock text-16 mr-5" />
                          {job?.experience} experience
                        </div>
                      </div>
                      {job?.remote && (
                        <div className="col-auto">
                          <div className="d-flex items-center text-15 text-light-1">
                            <i className="icon-globe text-16 mr-5" />
                            Remote
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="row y-gap-10 pt-20">
                      <div className="col-12">
                        <h3 style={{color:'#004080'}} className="text-18 fw-500"> category</h3>
                        <p className="text-15">{job?.category?.name}</p>
                      </div>
                    </div>
                    <div className="row y-gap-10 pt-20">
                      <div className="col-12">
                        <h3 style={{color:'#004080'}} className="text-18 fw-500">Job Description</h3>
                        <p className="text-15">{job?.description}</p>
                      </div>
                    </div>
                    <div className="row y-gap-10 pt-20">
                      <div className="col-12">
                        <h3 style={{color:'#004080'}} className="text-18 fw-500">Notes</h3>
                        <p className="text-15">{job?.notes}</p>
                      </div>
                    </div>
                 
                  </div>
                  <div className="col-6 mt-0">
                  {job?.skillsRequired?.length > 0 && (
                      <div className="row y-gap-10 pt-20">
                        <div className="col-12">
                          <h3 style={{color:'#004080'}} className="text-18 fw-500">Skills Required</h3>
                          <div className="d-flex flex-wrap x-gap-10 y-gap-10 pt-10 mt-2">
                            {job?.skillsRequired?.map((skill, index) => (
                              <div className="col-auto ">
                                <span style={{color:'#004080'}} className="text-14 bg-blue-1-05 text-blue-1 py-5 px-15 rounded-100">
                                  {skill}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="mt-3">
                    <h3 style={{color:'#004080'}} className="text-18 fw-500 mt-50">Company Informations</h3>
                      <div className="d-flex items-center mt-10"  style={{color:'#004080'}}>
                        <IoMdGlobe />
                        <a
                        style={{color:'#004080'}}
                          className="ms-3"
                          href={job?.companyDetails?.companyWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Company Website
                        </a>
                      </div>
                      <div className="d-flex items-center mt-5"  style={{color:'#004080'}}>
                        <CiMail />
                        <a
                        style={{color:'#004080'}}
                          className="ms-3"
                          href={`mailto:${job?.companyDetails?.companyEmail}`}
                        >
                          {job?.companyDetails?.companyEmail}
                        </a>
                      </div>
                      <div className="d-flex items-center mt-5"  style={{color:'#004080'}}>
                        <MdOutlinePermPhoneMsg />
                        <a
                        style={{color:'#004080'}}
                          className="ms-3"
                          href={`tel:${job?.companyDetails?.companyPhone}`}
                        >
                          {job?.companyDetails?.companyPhone}
                        </a>
                      </div>
                    </div>
               
                  </div>
                </div>
                <div className="text-14 text-md mt-30">
                <h3 style={{color:'#004080'}} className="text-18 fw-500">Salary Range</h3>
                      <span style={{color:'#004080'}} className="text-22 text-dark-1 fw-500">
                       ₹  {job?.salaryRange}
                      </span>
                    </div>
                <a
                  href="#"
                  onClick={handleApplyClick}
                  style={{backgroundColor:'#004080'}}
                  className="button h-50 px-24  mt-3 text-white"
                >
                  Apply
                  <div className="icon-arrow-top-right ml-15" />
                </a>
              </div>
            </div>
            <div>
              <div className="sidebar__item -no-border">
                <h3 style={{color:'#004080'}} className="text-18 fw-500 mb-10">Company Information</h3>
                <div className="sidebar-company">
                  <img
                    src={job?.companyDetails?.companyLogo || logo}
                    alt={job?.companyDetails?.companyName || "Company Logo"}
                    className="rounded-4 mb-15"
                    style={{ maxWidth: "150px" }}
                  />
                  <h4 style={{color:'#004080'}} className="text-16 fw-500">
                    {job?.companyDetails?.companyName}
                  </h4>
                  <p style={{color:'#004080'}} className="text-14 mt-5">
                    {job?.companyDetails?.companyDescription}
                  </p>

                  <div className="row y-gap-10 pt-20">
                    <div className="col-12">
                      <h3 style={{color:'#004080'}} className="text-16 fw-500">Company Type</h3>
                      <p className="text-14">
                        {job?.companyDetails?.companyType}
                      </p>
                    </div>
                  </div>

                  <div className="row y-gap-10 pt-10">
                    <div className="col-12">
                      <h3 style={{color:'#004080'}} className="text-16 fw-500">Company Size</h3>
                      <p className="text-14">
                        {job?.companyDetails?.companySize}
                      </p>
                    </div>
                  </div>

                  <div className="row y-gap-10 pt-10">
                    <div className="col-12">
                      <h3 style={{color:'#004080'}} className="text-16 fw-500">Industry</h3>
                      <p className="text-14">
                        {job?.companyDetails?.companyIndustry}
                      </p>
                    </div>
                  </div>

                  <div className="row y-gap-10 pt-10">
                    <div className="col-12">
                      <h3 style={{color:'#004080'}} className="text-16 fw-500">Location</h3>
                      <p className="text-14">
                        {job?.companyDetails?.companyLocation}
                      </p>
                    </div>
                  </div>

                  <div className="row y-gap-10 pt-10">
                    <div className="col-12">
                      <h3 style={{color:'#004080'}} className="text-16 fw-500">Address</h3>
                      <p className="text-14">
                        {job?.companyDetails?.companyAddress}
                      </p>
                    </div>
                  </div>

                  <div className="row y-gap-10 pt-10">
                    <div className="col-12">
                      <h3 style={{color:'#004080'}} className="text-16 fw-500">City</h3>
                      <p className="text-14">
                        {job?.companyDetails?.companyCity}
                      </p>
                    </div>
                  </div>

                  <div className="row y-gap-10 pt-10">
                    <div className="col-12">
                      <h3 style={{color:'#004080'}} className="text-16 fw-500">State</h3>
                      <p className="text-14">
                        {job?.companyDetails?.companyState}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}