import { FaLaptopHouse, FaUserShield, FaClock, FaGraduationCap, FaPlane, FaChartLine } from 'react-icons/fa';

const PopularJobBenefits = () => {
  return (
    <>
      <div className="col-md-5">
        <div className="d-flex x-gap-15 y-gap-15 items-center">
          <FaLaptopHouse size={30} />
          <div className="text-15">Remote Work</div>
        </div>
      </div>

      <div className="col-md-5">
        <div className="d-flex x-gap-15 y-gap-15 items-center">
          <FaUserShield size={30} />
          <div className="text-15"> Insurance</div>
        </div>
      </div>

      <div className="col-md-5">
        <div className="d-flex x-gap-15 y-gap-15 items-center">
          <FaClock size={30} />
          <div className="text-15">Flexible Hours</div>
        </div>
      </div>

      <div className="col-md-5">
        <div className="d-flex x-gap-15 y-gap-15 items-center">
          <FaGraduationCap size={30} />
          <div className="text-15">Learning </div>
        </div>
      </div>

      <div className="col-md-5">
        <div className="d-flex x-gap-15 y-gap-15 items-center">
          <FaPlane size={30} />
          <div className="text-15">Paid Time Off</div>
        </div>
      </div>

      <div className="col-md-5">
        <div className="d-flex x-gap-15 y-gap-15 items-center">
          <FaChartLine size={30} />
          <div className="text-15">Career Growth</div>
        </div>
      </div>
    </>
  );
};

export default PopularJobBenefits;
