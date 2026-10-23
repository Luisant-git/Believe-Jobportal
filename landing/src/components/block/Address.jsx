const Address = () => {
  const addressContent = [
    {
  id: 1,
  colClass: "col-lg-3",
  title: "Address",
  content: (
    <span style={{ color: "#004080" }}>
      Kuralagam Complex, Omalur Main Road, Peramanur, Salem - 636007 (TVS Bus Stop)
    </span>
  ),
},

    {
      id: 2,
      colClass: "col-auto",
      title: "Toll Free Customer Care",
      content: (
<>
  <div>
    <a href="tel:+919600917123" style={{ color: "#004080" }}>
      +91 96009-17123
    </a>
  </div>
  <div>
    <a href="mailto:believejobs@gmail.com" style={{ color: "#004080" }}>
      believejobs@gmail.com
    </a>
  </div>
</>


      ),
    },
    {
      id: 3,
      colClass: "col-auto",
      title: "Need live support?",
      content: (
        <>
          {" "}
          <a href="mailto:i@gotrip.com" style={{ color: "#004080" }}>believejobs@gmail.com</a>
        </>
      ),
    },
  ];
  return (
    <>
      {addressContent.map((item) => (
        <div className={`${item.colClass}`} key={item.id}>
          <div className="text-14 text-light-1">{item.title}</div>
          <div className="text-18 fw-500 mt-10">{item.content}</div>
        </div>
      ))}
    </>
  );
};

export default Address;
