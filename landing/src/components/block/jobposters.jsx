import { getActiveJobs, getAllJobsForJobPosters } from "@/api/job";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// const jobPosters = [
//   {
//     id: 1,
//     title: "Warehouse Helper",
//     company: "SIS Security",
//     location: "Chennai, India",
//     img: "https://believehrdapi.shoppingsto.com/uploads/7a4f103d-d1f9-45b0-83b4-cb615015edd2.png",
//     url: "#"
//   },
//   {
//     id: 2,
//     title: "Delivery Driver",
//     company: "Flipkart",
//     location: "Bangalore, India",
//     img: "https://believehrdapi.shoppingsto.com/uploads/3ca89b8f-1405-4ca7-a029-b02b8c64b9d9.png",
//     url: "#"
//   },
//   {
//     id: 3,
//     title: "Teacher",
//     company: "UrbanClap",
//     location: "Hyderabad, India",
//     img: "https://believehrdapi.shoppingsto.com/uploads/e1bb9f74-6bb3-4ac2-be4d-9ac0b0ee1cfb.png",
//     url: "#"
//   },
//   {
//     id: 4,
//     title: "Security Guard",
//     company: "Amazon India",
//     location: "Mumbai, India",
//     img: "https://believehrdapi.shoppingsto.com/uploads/aa779e70-3a94-494e-aa3e-b827ea49b805.png",
//     url: "#"
//   },
//   {
//     id: 5,
//     title: "Hotel Staff",
//     company: "Saravana Bhavan",
//     location: "Chennai, India",
//     img: "https://believehrdapi.shoppingsto.com/uploads/d9866c91-b46b-4caa-9ea6-41137f5c6bf8.png",
//     url: "#"
//   },
//   {
//     id: 6,
//     title: "Electrician",
//     company: "at Larsen & Toubro (L&T)",
//     location: "Delhi, India",
//     img: "https://believehrdapi.shoppingsto.com/uploads/f3fd930a-74c9-40ad-a2a8-6a769015bef0.png",
//     url: "#"
//   },
//   {
//     id: 7,
//     title: "Driver",
//     company: "at Ola(ANI Technologies Pvt. Ltd)",
//     location: "Remote",
//     img: "https://believehrdapi.shoppingsto.com/uploads/b9ce87cd-a9f3-4987-a6b4-51dce8e1758e.png",
//     url: "#"
//   },
//   {
//     id: 7,
//     title: "Tailor",
//     company: "at Raymond",
//     location: "Remote",
//     img: "https://believehrdapi.shoppingsto.com/uploads/6c80cadf-9d1c-44b4-b81f-d9f572c2245a.png",
//     url: "#"
//   },
//   {
//     id: 7,
//     title: "Plumber",
//     company: "at Plumber",
//     location: "Remote",
//     img: "https://www.shutterstock.com/image-vector/industrial-design-logo-pipe-system-260nw-2461209153.jpg",
//     url: "#"
//   }
// ];

const JobPoster = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const scrollInterval = useRef(null);
  const [jobPosters, setjobPosters] = useState([]);

  const handleSearch = (searchTerm) => {
    if (
      !searchTerm
    ) {
      toast.warning("Relevant job not found ...", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const queryParams = {};

    if (searchTerm) queryParams.search = searchTerm;
    navigate(`/jobs?${new URLSearchParams(queryParams).toString()}`);
  };

  const getAllJobs = async () =>{
    const response = await getActiveJobs();
    console.log('getAll-Active-jobs', response);
    setjobPosters(response?.data)
  }

  useEffect(()=>{
    getAllJobs();
  },[])

  // Auto-scroll effect with 1 second interval
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let isHovered = false;

    const scrollStep = () => {
      if (!isHovered && scrollContainer) {
        if (
          scrollContainer.scrollLeft + scrollContainer.offsetWidth >=
          scrollContainer.scrollWidth - 1
        ) {
          scrollContainer.scrollLeft = 0;
        } else {
          scrollContainer.scrollLeft += 260; // Scroll by one card width (260px)
        }
      }
    };

    scrollInterval.current = setInterval(scrollStep, 1000); // 1 second interval

    // Pause scroll on mouse hover
    const handleMouseEnter = () => {
      isHovered = true;
      clearInterval(scrollInterval.current);
    };
    const handleMouseLeave = () => {
      isHovered = false;
      scrollInterval.current = setInterval(scrollStep, 1000);
    };

    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearInterval(scrollInterval.current);
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="w-full" style={{ background: "#fff", padding: "10px 0" }}>
      <div className="container mx-auto px-4 w-full">
        <div className="jobposter-scroll-container" ref={scrollRef}>
          <div className="jobposter-scroll">
            {jobPosters.map((job) => (
              <a
                key={job.id}
                href={job.url}
                className="jobposter-item"
                target="_blank"
                rel="noopener noreferrer"
                onClick={()=>handleSearch(job?.title)}
                style={{cursor:'pointer'}}
              >
                <div className="jobposter-image-rect">
                  <img
                    src={job?.companyDetails?.companyLogo}
                    alt={job.companyName}
                    style={{
                      width: "100%",
                      height: "60px",
                      objectFit: "contain",
                      background: "#fff"
                    }}
                  />
                </div>
                <div className="jobposter-details">
                  <div className="job-title">{job.title}</div>
                  <div className="job-company">{job.companyName}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .jobposter-scroll-container {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scroll-snap-type: x mandatory;
          padding-bottom: 4px;
        }
        .jobposter-scroll-container::-webkit-scrollbar {
          display: none;
        }
        .jobposter-scroll-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .jobposter-scroll {
          display: flex;
          gap: 18px;
          padding: 10px 5px;
          min-width: min-content;
        }
        .jobposter-item {
          width: 200px;
          flex: 0 0 auto;
          text-align: center;
          background: #fff;
          border-radius: 10px;
          padding: 10px 8px 10px 8px;
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          scroll-snap-align: start;
          text-decoration: none;
          transition: none;
          // border: 1px solid #f3f3f3;
        }
        .jobposter-image-rect {
          width: 100%;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          // background: #f7fafd;
          border-radius: 6px;
          border: 1px solid #eee;
        }
        .jobposter-details {
          margin-top: 0.5rem;
          width: 100%;
        }
        .job-title {
          font-weight: 600;
          font-size: 15px;
          color: #054A91;
          margin: 10px 0 3px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
        }
        .job-company {
          font-size: 13px;
          color: #ff6600;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
        }

        @media (max-width: 900px) {
          .jobposter-item {
            width: 140px;
            padding: 8px 3px 8px 3px;
          }
          .jobposter-image-rect {
            height: 30px;
          }
          .job-title {
            font-size: 12px;
          }
          .job-company {
            font-size: 11px;
          }
        }
        @media (max-width: 600px) {
          .jobposter-scroll {
            gap: 8px;
          }
          .jobposter-item {
            width: 100px;
            padding: 4px 1px 6px 1px;
          }
          .jobposter-image-rect {
            height: 18px;
          }
          .job-title {
            font-size: 10px;
            margin: 4px 0 2px 0;
          }
          .job-company {
            font-size: 9px;
          }
        }
      `}</style>
    </div>
  );
};

export default JobPoster;