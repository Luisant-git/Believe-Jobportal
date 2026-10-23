import React from "react";
import { format } from "date-fns";
import Loading from "@/Loading";

const BookingDetails = ({ job }) => {
  if (!job) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="px-30 py-30 border-light rounded-4">
      <div style={{color:'#004080'}} className="text-20 fw-500 mb-30">Job Details</div>
      <div className="row x-gap-15 y-gap-20">
        <div className="col-auto">
          <img
            src={job?.companyDetails?.companyLogo}
            alt={job?.companyDetails?.companyName}
            className="size-140 rounded-4 object-contain"
            
          />
        </div>
        <div className="col">
          <div style={{color:'#004080'}} className="lh-17 fw-500">{job?.title}</div>
          <div style={{color:'#004080'}} className="text-14 lh-15 mt-5">{job?.companyDetails?.companyName}</div>
          <div style={{color:'#004080'}} className="text-14 lh-15 mt-5">{job?.location}</div>
          <div className="row x-gap-10 y-gap-10 items-center pt-10">
            <div className="col-auto">
              <div className="d-flex items-center">
                <div className="size-30 flex-center bg-blue-1 rounded-4">
                  <div style={{color:'#004080', backgroundColor: '#004080'}} className="text-12 fw-600 text-white">
                    {job?.numberOfPositions}
                  </div>
                </div>
                <div style={{color:'#004080'}} className="text-14 fw-500 ml-10">Positions</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Job Information */}
      <div className="border-top-light mt-30 mb-20" />
      <div className="row">
        <div className="col-6">
          <div style={{color:'#004080'}} className="text-15">Job Type:</div>
          <div style={{color:'#004080'}} className="fw-500">{job?.type?.replace('_', ' ')}</div>
          
          <div style={{color:'#004080'}} className="text-15 mt-10">Experience Required:</div>
          <div style={{color:'#004080'}} className="fw-500">{job?.experience}</div>
        </div>
        <div className="col-6">
          <div style={{color:'#004080'}} className="text-15">Salary Range:</div>
          <div style={{color:'#004080'}} className="fw-500">{job?.salaryRange}</div>
          
          <div style={{color:'#004080'}} className="text-15 mt-10">Remote:</div>
          <div style={{color:'#004080'}} className="fw-500">{job?.remote ? 'Yes' : 'No'}</div>
        </div>
      </div>
      
     
      <div className="row">
        <div className="col-12">
          <div style={{color:'#004080'}} className="text-15">Job Description:</div>
          <div style={{color:'#004080'}} className="fw-500">{job?.description}</div>
        </div>
      </div>
      
      <div className="border-top-light mt-30 mb-20" />
      {/* <div className="row">
        <div className="col-6">
          <div className="text-15">Skills Required:</div>
          <div className="d-flex flex-wrap gap-5 mt-5">
            {job?.skillsRequired?.map((skill, index) => (
              <span key={index} className="badge bg-primary">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="col-6">
          <div className="text-15">Job Status:</div>
          <div className="fw-500">{job?.status}</div>
          
          <div className="text-15 mt-10">Job Code:</div>
          <div className="fw-500">{job?.jobCode}</div>
        </div>
      </div> */}
      
      {/* Company Information */}
      <div className="border-top-light mt-30 mb-20" />
      <div style={{color:'#004080'}} className="text-18 fw-500 mb-15">Company Information</div>
      <div className="row">
        <div className="col-6">
        <div className="text-15" style={{ color: "#004080"}}>
  Company Website:
</div>

          <a
  href={job?.companyDetails?.companyWebsite}
  target="_blank"
  rel="noopener noreferrer"
  className="fw-500"
  style={{ color: "#004080" }}
>
  {job?.companyDetails?.companyWebsite}
</a>

          
          <div style={{color:'#004080'}} className="text-15 mt-10">Company Email:</div>
          <div style={{color:'#004080'}} className="fw-500">{job?.companyDetails?.companyEmail}</div>
        </div>
        <div className="col-6">
          <div style={{color:'#004080'}} className="text-15">Company Address:</div>
          <div style={{color:'#004080'}} className="fw-500">{job?.companyDetails?.companyAddress}</div>
          
          <div style={{color:'#004080'}} className="text-15 mt-10">Company Phone:</div>
          <div style={{color:'#004080'}} className="fw-500">{job?.companyDetails?.companyPhone}</div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;