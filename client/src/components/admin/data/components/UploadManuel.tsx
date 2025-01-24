import { useState } from 'react';
import SelectIndustry from './SelectIndustry';

const UploadManuel = () => {
  const [showToast, setShowToast] = useState(false);

  const handleIndustryCreated = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="flex flex-col gap-5 ">
      <SelectIndustry onIndustryCreated={handleIndustryCreated} />

      <input
        type="text"
        placeholder="Enter data manually"
        className="input input-bordered"
      />
      <button type="submit" className="btn btn-primary">
        Create data
      </button>

      {showToast && (
        <div className="toast toast-end">
          <div className="alert alert-success">
            <span>Industry created successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadManuel;
