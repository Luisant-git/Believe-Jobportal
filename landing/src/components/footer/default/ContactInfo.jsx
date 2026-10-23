import { Link } from "react-router-dom";

const ContactInfo = () => {
  const contactContent = [
    {
      id: 1,
      title: "",
      action: "tel:+91 9600917123",
      text: "+91 96009-17123",
    },
    {
      id: 2,
      title: "Need live support?",
      action: "mailto:believejobs@gmail.com",
      text: "For job seekers: believejobs@gmail.com",
    },
    {
      id: 3,
      title: "",
      action: "mailto:hr@believejobs.com",
      text: "For companies: hr@believejobs.com",
    },
  ];

  return (
    <>
      <div className="company-name text-20 fw-600 mb-20" style={{ color: '#004080' }}>
        Believe Jobs
      </div>

      {contactContent.map((item) => (
        <div className="mt-30" key={item.id}>
          <div style={{ color: '#004080' }} className={"mt-30"}>{item.title}</div>
          <a href={item.action} className="text-18 fw-500 mt-5" style={{ color: '#004080' }}>
            {item.text}
          </a>
        </div>
      ))}
      {/* <Link to='/contact' className="mt-20" style={{ color: '#004080' }}>About Us</Link>
      <div className="mt-20">
        <Link to='/faq' className="mr-15" style={{ color: '#004080' }}>FAQ</Link>
        <Link to='/terms' style={{ color: '#004080' }}>Terms and Conditions</Link>
      </div> */}
    </>
  );
};

export default ContactInfo;