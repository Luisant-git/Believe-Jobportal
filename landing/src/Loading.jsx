import React from "react";
import { Spin } from "antd"; // Import Ant Design Spin component
import "./TravelBanner.css"; // Ensure this CSS file contains the styles for the animation
import { Atom } from "react-loading-indicators";

function Loading() {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh', 

    }}>
      {/* Ant Design Spin loader with purple color */}
      <Atom color={["#120078", "#327fcd", "#cd32cd", "#cd8032"]} />
    </div>
  );
}

export default Loading;

