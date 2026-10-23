import { useState, useEffect } from "react";
import InputRange from "react-input-range";

const PriceSlider = ( { priceRange = [0, 100000], handlePriceChange = () => {}  }) => {

    const [localPrice, setLocalPrice] = useState({
      min: priceRange[0],
      max: priceRange[1],
    });
  
    useEffect(() => {
      if (
        priceRange &&
        (priceRange[0] !== localPrice.min || priceRange[1] !== localPrice.max)
      ) {
        setLocalPrice({
          min: priceRange[0],
          max: priceRange[1],
        });
      }
    }, [priceRange]);
  
    const handleOnChange = (value) => {
      if (value.min !== localPrice.min || value.max !== localPrice.max) {
        setLocalPrice(value);
        handlePriceChange(value.min, value.max);
      }
    };

  return (
    <div className="js-price-rangeSlider">
      <div className="text-14 fw-500"></div>

      <div className="d-flex justify-between mb-20">
        <div className="text-15 text-dark-1">
          <span className="js-lower mx-1">₹{localPrice.min}</span>-
          <span className="js-upper mx-1">₹{localPrice.max}</span>
        </div>
      </div>

      <div className="px-5">
        <InputRange
          minValue={0}
          maxValue={100000}
          value={localPrice}
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
};

export default PriceSlider;
