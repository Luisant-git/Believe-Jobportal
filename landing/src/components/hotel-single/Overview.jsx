const Overview = ({ vacation }) => {

  
  return (
    <>
        {/* <h3 className="text-22 fw-500 pt-40 border-top-light">Guide Info</h3>
        <p> {vacation?.guideInfo ||""}</p> */}
        <h3 className="text-22 fw-500 pt-40 border-top-light">Package inclusions</h3>
  <p dangerouslySetInnerHTML={{ __html: vacation?.inclusions?.[0]?.description || " " }}></p>
      <h3 className="text-22 fw-500 pt-40 border-top-light">Package exclusions</h3>
  <p dangerouslySetInnerHTML={{ __html: vacation?.exclusions?.[0]?.description || " " }}></p>

        <br />
     

    </>
  );
};

export default Overview;
