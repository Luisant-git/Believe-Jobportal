import { getActivePoster } from "@/api/poster";
import React, { useEffect, useState } from "react";

const BlockGuide = () => {
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    const fetchPosters = async () => {
      const response = await getActivePoster();
      console.log('Poster response:', response);
      setPosters(response?.data || response);
    };
    fetchPosters();
  }, []);

  return (
    <div className="w-full" style={{ paddingTop: "1px", paddingBottom: "1px" }}>
      <div className="container mx-auto px-20 w-full">
        {/* Poster Cards */}
        <div 
          style={{
            display: 'flex',
            overflowX: 'auto',
            gap: '16px',
            paddingBottom: '16px',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            justifyContent: 'flex-start',
            alignItems: 'center',
            margin: '20px 0',
            marginLeft: '50px',
          }}
        >
          {posters?.map((poster) => (
            <div 
              key={poster.id} 
              style={{
                flexShrink: 0,
                width: '560px',
                height: '480px'
              }}
            >
              <img
                src={poster.image}
                alt={poster.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
            </div>
          ))}
        </div>

        {/* Footer Text */}
        <div className="row justify-center mt-28 lg:mt-6 w-full">
          <div className="col-12 text-center">
            <p style={{ color: '#004080' }} className="text-14 lg:text-12 text-dark-2">
              {/* Follow us for the latest job opportunities and career advice across all platforms */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockGuide;