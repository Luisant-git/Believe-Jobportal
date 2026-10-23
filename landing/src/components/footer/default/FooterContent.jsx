import { Link } from "react-router-dom";
import footerDataContent from "../../../data/footerContent";

const FooterContent = () => {
  return (
    <>
      {footerDataContent.map((item) => (
        <div className="col-xl-2 col-lg-4 col-sm-6" key={item.id}>
          <h5
            className="fw-bold mb-30"
            style={{ color: "#004080"}}
          >
            {item.title}
          </h5>

          <div className="d-flex y-gap-10 flex-column">
            {item.menuList.map((menu, i) => (
              <Link
                to={menu.routerPath}
                key={i}
                style={{
                  color: "#004080",
                  textDecoration: "none",
                  fontWeight: "500",
                }}
              >
                {menu.name}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default FooterContent;
