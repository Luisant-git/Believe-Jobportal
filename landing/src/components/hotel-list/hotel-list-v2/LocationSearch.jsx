const SearchBar = ({ setSearchTeam, searchteam }) => {
  return (
    <>
      <div className="searchMenu-loc px-20 py-10 bg-white rounded-4 js-form-dd js-liverSearch">
        <div
          data-bs-toggle="dropdown"
          data-bs-auto-close="true"
          data-bs-offset="0,22"
        >
          <h4 className="text-15 fw-500 ls-2 lh-16">Filter Job</h4>
          <div className="text-15 text-light-1 ls-2 lh-16">
            <input
              autoComplete="off"
              type="search"
              placeholder="Type here..."
              className="js-search js-dd-focus"
              value={searchteam}
              onChange={(e) => setSearchTeam(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
