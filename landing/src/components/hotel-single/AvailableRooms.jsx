import React, { useState, useRef } from "react";
import './style.css'
const AvailableRooms = ({ hotel }) => {
  const [openIndex, setOpenIndex] = useState(0);
  const contentRefs = useRef([]);

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };


  const handleStyle = (index) => {
    return openIndex === index
      ? {
          maxHeight: contentRefs.current[index]?.scrollHeight + "px",
          transition: "max-height 0.3s ease",
        }
      : {
          maxHeight: "0px",
          transition: "max-height 0.3s ease",
        };
  };

  return (
    <div className="accordion">
      {hotel?.itinerary?.map((day, index) => (
        <div className="accordion-item" key={index}>
          <h2 className="accordion-header" id={`heading${index}`}>
            <button
              className={`accordion-button ${openIndex === index ? "" : "collapsed"}`}
              type="button"
              onClick={() => toggleAccordion(index)}
              aria-expanded={openIndex === index ? "true" : "false"}
              style={{
                backgroundColor: "#662EA7", // Applying a consistent background color for all accordion headers
                color: "#FFFFFF", // White text for all headers
              }}
            >
              Day {day.day} - {day.title}
            </button>
          </h2>
          <div
            className={`accordion-collapse`}
            ref={(el) => (contentRefs.current[index] = el)}
            style={handleStyle(index)}
          >
            <div className="accordion-body">
              <div className="row y-gap-20">
                <div className="col-12">
                  <div className="roomGrid">
                    <div className="roomGrid__grid">
                      <div>
                   
                          <img
                            src={day.img?.[0]}
                            alt="image"
                            className="rounded-4"
                            style={{minWidth:'200px'}}
                          />
                           
                        <div className="y-gap-5 mt-20">
                          
                        </div>
                      </div>
                      

                      <div>
                        <div className="text-15 fw-500 mt-30">
                          <h3>{day.title}</h3>
                        </div>

                        <ul  className="list-disc y-gap-4 pt-5">
                          <li style={{listStyle:'none'}} className="text-14" dangerouslySetInnerHTML={{ __html: day.notes }}></li>
                        </ul>

                  
                      
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AvailableRooms;
