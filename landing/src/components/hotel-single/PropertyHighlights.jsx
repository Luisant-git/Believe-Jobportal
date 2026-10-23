import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faCity,               // City icon
  faPlane,              // Airplane icon
  faBell,               // Notification or bell icon
  faTv,                 // Television icon
  faUtensils,           // Dining or food icon
  faWifi,               // WiFi icon
  faDumbbell,           // Gym or fitness icon
  faSwimmer,            // Swimming pool icon
  faSpa,                // Spa facilities icon
  faDog,                // Pet-friendly icon
  faBroom,              // Cleaning or housekeeping icon
  faParking,            // Parking facilities icon
  faBriefcase,          // Business or work icon
  faChair,              // Lounge or seating icon
  faLeaf,               // Eco-friendly or green practices icon
  faBaby,               // Child-friendly amenities icon
  faConciergeBell,      // Concierge services icon
  faMapMarkedAlt,       // Map or location services icon
  faCocktail,           // Cocktail icon for bar services
  faBed,                // Bed icon for sleeping facilities
  faShower,             // Shower or bathroom icon
  faCoffee,             // Coffee or tea services icon
  faSnowflake,          // Air conditioning or cold environment
  faHotTub,             // Hot tub or Jacuzzi
  faTachometerAlt,      // Speed or efficiency (e.g., fast service)
  faFireExtinguisher,   // Safety/fire extinguisher
  faHandSparkles,       // Cleanliness or hygiene
  faCar,                // Car or transportation icon
  faMountain,           // Scenic or mountain views
  faFish,               // Aquarium or fish-based services
  faPlaneDeparture,     // Airport proximity
  faShoppingBag,        // Shopping services or nearby malls
  faFirstAid,           // Medical assistance or first aid
} from '@fortawesome/free-solid-svg-icons';

// Correct Icon Map
const iconMap = {
  city: faCity,
  plane: faPlane,
  bell: faBell,
  tv: faTv,
  utensils: faUtensils,
  wifi: faWifi,
  dumbbell: faDumbbell,
  swimmer: faSwimmer,
  spa: faSpa,
  dog: faDog,
  broom: faBroom,
  parking: faParking,
  briefcase: faBriefcase,
  chair: faChair,
  leaf: faLeaf,
  baby: faBaby,
  conciergeBell: faConciergeBell,
  mapMarkedAlt: faMapMarkedAlt,
  cocktail: faCocktail,
  bed: faBed,
  shower: faShower,
  coffee: faCoffee,
  snowflake: faSnowflake,
  hotTub: faHotTub,
  tachometerAlt: faTachometerAlt,
  fireExtinguisher: faFireExtinguisher,
  handSparkles: faHandSparkles,
  car: faCar,
  mountain: faMountain,
  fish: faFish,
  planeDeparture: faPlaneDeparture,
  shoppingBag: faShoppingBag,
  firstAid: faFirstAid,
};


const PropertyHighlights2 = ({ hotel }) => {
  if (!hotel || !hotel.highlights) {
    return <div>No highlights available</div>;
  }
  const highlights = typeof hotel.highlights === 'string'
  ? JSON.parse(hotel.highlights)
  : Array.isArray(hotel.highlights)
  ? hotel.highlights
  : [];


  return (
    <div className="row y-gap-20 pt-30">
      {highlights.map((highlight) => (
        <div className="col-lg-3 col-6" key={highlight.id}>
          <div className="text-center">
            {/* Use FontAwesomeIcon dynamically */}
            <FontAwesomeIcon
              icon={iconMap[highlight.icons.iconName]||faMountain}
              className="text-24 text-blue-1"
            />
            <div className="text-15 lh-1 mt-10">{highlight.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyHighlights2;
