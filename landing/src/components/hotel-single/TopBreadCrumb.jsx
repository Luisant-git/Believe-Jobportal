const TopBreadCrumb = () => {
  return (
    <section className="py-10 d-flex items-center bg-light-2">
      <div className="container">
        <div className="row y-gap-10 items-center justify-between">
          <div className="col-auto">
            <div className="row x-gap-10 y-gap-5 items-center text-14 text-light-1">
              {/* <div className="col-auto">Home</div> */}
              {/* End .col-auto */}
              {/* <div className="col-auto">&gt;</div> */}
              {/* End .col-auto */}
              {/* <div className="col-auto">jobList</div> */}
              {/* End .col-auto */}
              {/* <div className="col-auto">&gt;</div> */}
              {/* End .col-auto */}
              <div className="col-auto">
                {/* <div style={{color:'#004080'}} className="text-dark-1">
                Employees in tech, marketing, and design collaborate to drive company growth
                </div> */}
              </div>
              {/* End .col-auto */}
            </div>
            {/* End .row */}
          </div>
          {/* End .col-auto */}

          {/* <div className="col-auto">
            <a href="#" className="text-14 text-blue-1 underline">
              All Job list
            </a>
          </div> */}
          {/* End col-auto */}
        </div>
        {/* End .row */}
      </div>
      {/* End .container */}
    </section>
  );
};

export default TopBreadCrumb;
