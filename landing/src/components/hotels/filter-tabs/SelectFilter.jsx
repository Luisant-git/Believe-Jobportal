const SelectFilter = () => {
  return (
    <select className="form-select rounded-4 border-light justify-between text-16 fw-500 px-20 h-50 w-140 sm:w-full text-14">
      <option defaultValue>All Jobs</option>
      <option value="software">Software Development</option>
      <option value="marketing">Marketing</option>
      <option value="design">Design</option>
      <option value="finance">Finance</option>
      <option value="hr">Human Resources</option>
      <option value="sales">Sales</option>
      <option value="project-management">Project Management</option>
    </select>
  );
};

export default SelectFilter;
