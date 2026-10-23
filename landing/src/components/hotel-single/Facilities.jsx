const JobFacilities = () => {
  const jobFacilitiesContent = [
    {
      id: 1,
      items: [
        {
          id: 1,
          icon: "icon-briefcase ",
          title: "Job Roles",
          facilities: [
            "Software Engineer",
            "Product Manager",
            "Marketing Specialist",
            "Sales Associate",
            "UI/UX Designer",
            "HR Manager",
          ],
        },
        {
          id: 2,
          icon: "icon-office ",
          title: "Office Amenities",
          facilities: ["Ergonomic Chairs", "Standing Desks", "Free Snacks", "Coffee Machine"],
        },
        {
          id: 3,
          icon: "icon-bell-ring ",
          title: "Employee Services",
          facilities: [
            "Employee Assistance Program",
            "Flexible Working Hours",
            "Health Insurance",
            "24/7 HR Support",
          ],
        },
      ],
    },

    {
      id: 2,
      items: [
        {
          id: 1,
          icon: "icon-laptop",
          title: "Tech Equipment",
          facilities: [
            "Laptop with latest specs",
            "Dual monitors",
            "Noise-cancelling headphones",
            "Software licenses",
          ],
        },
        {
          id: 2,
          icon: "icon-food",
          title: "Catering & Meals",
          facilities: [
            "Lunch Provided",
            "Snacks and Beverages",
            "Team Lunches",
            "Free Coffee/Tea",
          ],
        },
        {
          id: 3,
          icon: "icon-clean",
          title: "Cleanliness & Maintenance",
          facilities: ["Daily Office Cleaning", "On-demand cleaning", "Laundry Service"],
        },
      ],
    },

    {
      id: 3,
      items: [
        {
          id: 1,
          icon: "icon-security",
          title: "Security & Safety",
          facilities: [
            "24/7 Office Security",
            "Secure Access",
            "Fire Safety Measures",
            "CCTV Surveillance",
          ],
        },
        {
          id: 2,
          icon: "icon-building",
          title: "General Workplace Amenities",
          facilities: [
            "Climate-controlled environment",
            "Meeting Rooms",
            "Event Spaces",
            "Recreational Area",
            "Parking Spaces",
            "Elevator Access",
            "On-site Gym",
            "Accessibility for Disabled Employees",
          ],
        },
      ],
    },
  ];

  return (
    <>
      {jobFacilitiesContent.map((item) => (
        <div className="col-xl-4" key={item.id}>
          <div className="row y-gap-30">
            {item?.items?.map((facility) => (
              <div className="col-12" key={facility.id}>
                <div>
                  <div className="d-flex items-center text-16 fw-500">
                    <i className={`${facility.icon} text-20 mr-10`} />
                    {facility.title}
                  </div>
                  <ul className="text-15 pt-10">
                    {facility?.facilities?.map((val, i) => (
                      <li className="d-flex items-center" key={i}>
                        <i className="icon-check text-10 mr-20" />
                        {val}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default JobFacilities;
