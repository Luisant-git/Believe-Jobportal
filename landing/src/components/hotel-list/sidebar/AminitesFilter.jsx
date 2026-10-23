import { useEffect, useState } from "react";
import { lookupCategory } from "@/api/category";

const AminitesFilter = () => {
  const [datasets, setDatasets] = useState([]);
  const [filterCategory, setFilterCategory] = useState(null);

  const category = () => {
    lookupCategory().then((res) => {
      if (res) {
        setDatasets(res.data);
      }
    });
  };

  const updateUrlParams = (categoryId, add) => {
    const url = new URL(window.location.href);
    const params = url.searchParams;

    if (add) {
      params.set("categoryId", categoryId);
    } else {
      params.delete("categoryId");
    }

    window.location.href = `${url.pathname}?${params.toString()}`;
  };

  const handleCheckboxChange = (id) => {
    if (filterCategory === id) {
      setFilterCategory(null);
      updateUrlParams(id, false);
    } else {
      setFilterCategory(id);
      updateUrlParams(id, true);
    }
  };

  useEffect(() => {
    category();
    const url = new URL(window.location.href);
    const categoryId = url.searchParams.get("categoryId");
    if (categoryId) {
      setFilterCategory(categoryId);
    }
  }, []);

  return (
    <>
      {datasets.map((dataset, index) => (
        <div className="row y-gap-10 items-center justify-between" key={index}>
          <div className="col-auto">
            <div className="form-checkbox d-flex items-center">
              <input
                type="checkbox"
                checked={filterCategory === dataset.id.toString()}
                onChange={() => handleCheckboxChange(dataset.id)}
              />
              <div className="form-checkbox__mark">
                <div className="form-checkbox__icon icon-check" />
              </div>
              <div className="text-15 ml-10">{dataset.name}</div>
            </div>
          </div>
          <div className="col-auto">
            <div className="text-15 text-light-1">{dataset?._count?.jobs || 0}</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AminitesFilter;
