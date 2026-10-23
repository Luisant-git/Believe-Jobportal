import { FaYoutube, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Social = () => {
  const socialContent = [
    { 
      id: 1, 
      icon: <FaFacebook size={18} />, 
      link: "https://www.facebook.com/believejobsindia",
      title: "Facebook"
    },
    { 
      id: 2, 
      icon: <FaTwitter size={18} />, 
      link: "https://x.com/believejobss",
      title: "Twitter"
    },
    { 
      id: 3, 
      icon: <FaInstagram size={18} />, 
      link: "https://www.instagram.com/believejobs/",
      title: "Instagram"
    },
    { 
      id: 4, 
      icon: <FaLinkedin size={18} />, 
      link: "https://linkedin.com/company/believe-jobs",
      title: "LinkedIn"
    },
    { 
      id: 5, 
      icon: <FaYoutube size={18} />, 
      link: "https://www.youtube.com/@believejobs",
      title: "YouTube"
    },
  ];
  
  return (
    <div className="d-flex x-gap-20 items-center">
      {socialContent.map((item) => (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          key={item.id}
          className="text-14"
          title={item.title}
          style={{ color: '#054A91' }}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
};

export default Social;