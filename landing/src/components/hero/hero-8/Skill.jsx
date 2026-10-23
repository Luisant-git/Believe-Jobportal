import { getAllSkills } from "@/api/job";
import { useEffect, useState } from "react";

const Skill = ({ setSkillFilter, skillFilter }) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [skills, setSkills] = useState([]);
  const [allSkills, setAllSkills] = useState([]);

  const getLookUp = () => {
    getAllSkills().then((res) => {
      if (res) {
        setAllSkills(res.data);
        setSkills(res.data.slice(0, 5));
      }
    });
  };

  useEffect(() => {
    getLookUp();
  }, []);

  useEffect(() => {
    if (searchValue.trim() === "") {
      setSkills(allSkills.slice(0, 5));
    } else {
      const filtered = allSkills.filter(item =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setSkills(filtered);
    }
  }, [searchValue, allSkills]);

  useEffect(() => {
    // Initialize selectedItems from skillFilter if it exists
    if (skillFilter && typeof skillFilter === 'string') {
      setSelectedItems([{ name: skillFilter }]);
    } else if (Array.isArray(skillFilter)) {
      setSelectedItems(skillFilter.map(skill => ({ name: skill })));
    }
  }, [skillFilter]);

  const handleOptionClick = (item) => {
    const isSelected = selectedItems.some(selected => selected.name === item.name);
    
    let newSelectedItems;
    if (isSelected) {
      // Remove if already selected
      newSelectedItems = selectedItems.filter(selected => selected.name !== item.name);
    } else {
      // Add to selection
      newSelectedItems = [...selectedItems, item];
    }
    
    setSelectedItems(newSelectedItems);
    setSearchValue(""); // Clear search after selection
    
    // Convert selected items to array of skill names and pass to parent
    const skillNames = newSelectedItems.map(skill => skill.name);
    setSkillFilter(skillNames);
  };

  const removeSkill = (skillName) => {
    const newSelectedItems = selectedItems.filter(item => item.name !== skillName);
    setSelectedItems(newSelectedItems);
    
    const skillNames = newSelectedItems.map(skill => skill.name);
    setSkillFilter(skillNames);
  };

  return (
    <>
      <div className="searchMenu-loc px-20 lg:py-20 lg:px-0 js-form-dd js-liverSearch">
        <div
          data-bs-toggle="dropdown"
          data-bs-auto-close="true"
          data-bs-offset="0,22"
        >
          <h4 className="text-16 fw-500 ls-2 lh-16"  style={{ color: "#004080" }}>Search job by Skills</h4>
          <div className="text-15 text-light-1 ls-2 lh-16">
            <input
              autoComplete="off"
              type="search"
              placeholder="Select Skills"
              className="js-search js-dd-focus"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          
          {/* Display selected skills as chips */}
          <div className="selected-skills-container mt-10">
            {selectedItems.map((item) => (
              <span key={item.name} className="skill-chip">
                {item.name}
                <button 
                  type="button" 
                  className="skill-chip-remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSkill(item.name);
                  }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="shadow-2 dropdown-menu min-width-400">
          <div className="bg-white px-20 py-20 sm:px-0 sm:py-15 rounded-4">
            <ul className="y-gap-5 js-results">
              {skills.length > 0 ? (
                skills.map((item) => (
                  <li
                    className={`-link d-block col-12 text-left rounded-4 px-20 py-15 js-search-option mb-1 ${
                      selectedItems.some(selected => selected.name === item.name)
                        ? "active"
                        : ""
                    }`}
                    key={item.name}
                    role="button"
                    onClick={() => handleOptionClick(item)}
                  >
                    <div className="d-flex">
                      <div className="icon-shield text-light-1 text-20 pt-4" />
                      <div className="ml-10">
                        <div className="text-15 lh-12 fw-500 js-search-option-target">
                          {item.name}
                          {selectedItems.some(selected => selected.name === item.name) && (
                            <span className="float-right">✓</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="-link d-block col-12 text-left rounded-4 px-20 py-15">
                  <div className="text-15 text-gray fw-bold">No skills found</div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .selected-skills-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 8px;
        }
        .skill-chip {
          display: inline-flex;
          align-items: center;
          background-color: #e0e0e0;
          border-radius: 16px;
          padding: 4px 12px;
          font-size: 14px;
        }
        .skill-chip-remove {
          margin-left: 8px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          font-size: 16px;
          line-height: 1;
        }
      `}</style>
    </>
  );
};

export default Skill;