import { useEffect, useState } from "react";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaShareAlt,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Top: 0 takes us all the way back to the top of the page
  // Behavior: smooth keeps it smooth!
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Button is displayed after scrolling for 500 pixels
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const socialMedia = [
    {
      id: 1,
      name: "LinkedIn",
      icon: <FaLinkedinIn size={20} color="#0077B5" />,
      url: "https://linkedin.com/company/believe-jobs",
      color: "#0077B5",
    },
    {
      id: 2,
      name: "Facebook",
      icon: <FaFacebookF size={20} color="#1877F2" />,
      url: "https://www.facebook.com/believejobsindia",
      color: "#1877F2",
    },
    {
      id: 3,
      name: "Twitter",
      icon: <FaTwitter size={20} color="#1DA1F2" />,
      url: "https://x.com/believejobss",
      color: "#1DA1F2",
    },
    {
      id: 4,
      name: "Instagram",
      icon: <FaInstagram size={20} color="#E4405F" />,
      url: "https://www.instagram.com/believejobs/",
      color: "#E4405F",
    },
    {
      id: 5,
      name: "YouTube",
      icon: <FaYoutube size={20} color="#FF0000" />,
      url: "https://www.youtube.com/@believejobs",
      color: "#FF0000",
    },
    {
      id: 6,
      name: "WhatsApp",
      icon: <FaWhatsapp size={22} color="#25D366" />,
      url: "https://wa.me/919600917123",
      color: "#25D366",
    },
    {
      id: 8,
      name: "Google",
      icon: <FcGoogle size={22} />,
      url: "https://share.google/TgviJVbXbtn7cjf5Z",
      color: "#4285F4",
    },
    {
      id: 7,
      name: "Share Site",
      icon: <FaShareAlt size={18} color="#6B7280" />,
      url: "share",
      color: "#6B7280",
    },
  ];

  return (
    <>
      <>
        {/* Social Media Icons - Fixed on right side */}
        <div
          style={{
            position: "fixed",
            right: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 999,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            maxHeight: "80vh",
            overflowY: "auto",
            padding: "10px",
            background: "rgba(255, 255, 255, 0.8)",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
          className="social-media-sidebar"
        >
          {socialMedia.map((platform) => (
            <a
              key={platform.id}
              href={platform.url === "share" ? "#" : platform.url}
              target={platform.url === "share" ? "_self" : "_blank"}
              rel="noopener noreferrer"
              title={platform.name}
              onClick={platform.url === "share" ? (e) => {
                e.preventDefault();
                if (navigator.share) {
                  navigator.share({
                    title: document.title,
                    url: window.location.href
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Site URL copied to clipboard!');
                }
              } : undefined}
              style={{
                display: "block",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
            >
              <div
                className="rounded-full shadow-sm"
                style={{
                  backgroundColor: "#ffffff",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `2px solid ${platform.color}`,
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                  margin: "5px 0",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.12)";
                  e.currentTarget.style.boxShadow = `0 4px 10px ${platform.color}44`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
                }}
              >
                {typeof platform.icon === "string" ? (
                  <img
                    src={platform.icon}
                    alt={platform.name}
                    className="js-lazy"
                    style={{
                      width: "24px",
                      height: "24px",
                      filter: `drop-shadow(0 1px 1px rgba(0, 0, 0, 0.1))`,
                    }}
                  />
                ) : (
                  platform.icon
                )}
              </div>
            </a>
          ))}
        </div>

        {/* Scroll to top button */}
       {isVisible && (
<div
  className="scroll-to-top scroll-to-target"
  onClick={scrollToTop}
  style={{ cursor: "pointer" }}
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = "#004080";
    e.currentTarget.querySelector("span").style.color = "#fff";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.backgroundColor = "";
    e.currentTarget.querySelector("span").style.color = "#004080";
  }}
>
  <span
    className="icon icon-arrow-top-right"
    style={{ color: "#004080" }}
  ></span>
</div>


)}

      </>
    </>
  );
}
