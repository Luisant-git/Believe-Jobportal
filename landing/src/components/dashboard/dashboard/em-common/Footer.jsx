import React from "react";

function Footer() {
  const linksData = [
    // { label: "Privacy", url: "#" },
    // { label: "Terms", url: "#" },
    // { label: "Site Map", url: "#" },
  ];

  return (
    <footer className="footer -dashboard mt-60">
      <div className="footer__row row y-gap-10 items-center justify-between">
        <div className="col-auto">
          <div className="row y-gap-20 items-center">
            <div className="col-auto">
              <div className="text-14 lh-14 mr-30" style={{ color: "#004080" }}>
                © {new Date().getFullYear()} Believe Jobs All rights reserved.
              </div>

            </div>

            <div className="col-auto">
              <div className="row x-gap-20 y-gap-10 items-center text-14">
                {linksData.map((link, index) => (
                  <div className="col-auto" key={index}>
                    <a href={link.url} className="text-13 lh-1" style={{ color: "#004080" }}>
                      {link.label}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* End .col-auto */}

        <div className="col-auto">
          <a href="#" style={{ color: "#004080" }}>
            <span className="fw-bold">hr@believejobs.com</span>
          </a>
        </div>
        {/* End .col-auto */}
      </div>
      {/* End .row */}
    </footer>
  );
}

export default Footer;
